/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import simpleGit from 'simple-git/promise';
import { spawn } from 'child-process-promise';
import * as tmp from 'tmp';

/**
 * check if there is any doc changes from baseSha to headSha
 */
async function docChanged(baseSha: string, headSha: string): Promise<boolean> {
  const tmpDir = tmp.dirSync().name;
  console.log('tmpDir is', tmpDir);
  // clone repo to the tmpDir
  await spawn(
    'git',
    ['clone', 'https://github.com/firebase/firebase-js-sdk.git', tmpDir],
    { stdio: 'inherit' }
  );

  const git = simpleGit(tmpDir);

  // generate reference docs using the baseSha
  await git.checkout(baseSha);
  await spawn('yarn', [], { cwd: tmpDir, stdio: 'inherit' });
  await spawn('yarn', ['docgen:exp', 'devsite'], {
    cwd: tmpDir,
    stdio: 'inherit'
  });

  // revert yarn.lock, so we can checkout the headSha without conflict.
  await git.checkout('yarn.lock');
  // stash changes, so we can checkout the headSha without conflict.
  await git.stash();

  // generate reference docs using the headSha
  await git.checkout(headSha);
  await spawn('yarn', [], { cwd: tmpDir, stdio: 'inherit' });

  // stage the docs generated by baseSha, so we can use git diff to tell if any docs are different in the headSha
  await git.stash(['pop']);
  await git.add('*');
  await spawn('yarn', ['docgen:exp'], { cwd: tmpDir, stdio: 'inherit' });

  // check if any file is changed.
  const diff = await git.diff();
  // check if new files are created.
  const untracked = await git.raw([
    'ls-files',
    '-o',
    '--directory',
    '--exclude-standard'
  ]);

  return !!diff || !!untracked;
}

// this function is supposed to run in the Github action.
async function runInCI() {
  const headSha = process.env.GITHUB_PULL_REQUEST_HEAD_SHA;
  const mergeBaseSha = process.env.GITHUB_PULL_REQUEST_BASE_SHA;

  if (!headSha || !mergeBaseSha) {
    console.log('No merge base or head found. Is it not a PR?');
    process.exit(1);
  }

  if (await docChanged(mergeBaseSha, headSha)) {
    console.log(`::set-output name=DOC_CHANGED::true`);
  } else {
    console.log(`::set-output name=DOC_CHANGED::false`);
  }
}

runInCI();
