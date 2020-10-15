<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@firebase/auth-types](./auth-types.md) &gt; [EmailAuthProvider](./auth-types.emailauthprovider.md)

## EmailAuthProvider class

Email and password auth provider implementation.

<b>Signature:</b>

```typescript
export abstract class EmailAuthProvider implements AuthProvider 
```
<b>Implements:</b> [AuthProvider](./auth-types.authprovider.md)

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [EMAIL\_LINK\_SIGN\_IN\_METHOD](./auth-types.emailauthprovider.email_link_sign_in_method.md) | <code>static</code> | [SignInMethod](./auth-types.signinmethod.md) | Always set to [SignInMethod.EMAIL\_LINK](./auth-types.signinmethod.email_link.md)<!-- -->. |
|  [EMAIL\_PASSWORD\_SIGN\_IN\_METHOD](./auth-types.emailauthprovider.email_password_sign_in_method.md) | <code>static</code> | [SignInMethod](./auth-types.signinmethod.md) | Always set to [SignInMethod.EMAIL\_PASSWORD](./auth-types.signinmethod.email_password.md)<!-- -->. |
|  [PROVIDER\_ID](./auth-types.emailauthprovider.provider_id.md) | <code>static</code> | [ProviderId](./auth-types.providerid.md) | Always set to [ProviderId.PASSWORD](./auth-types.providerid.password.md)<!-- -->, even for email link. |
|  [providerId](./auth-types.emailauthprovider.providerid.md) |  | [ProviderId](./auth-types.providerid.md) | Always set to [ProviderId.PASSWORD](./auth-types.providerid.password.md)<!-- -->, even for email link. |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [credential(email, password)](./auth-types.emailauthprovider.credential.md) | <code>static</code> | Initialize an [AuthCredential](./auth-types.authcredential.md) using an email and password. |
|  [credentialWithLink(auth, email, emailLink)](./auth-types.emailauthprovider.credentialwithlink.md) | <code>static</code> | Initialize an [AuthCredential](./auth-types.authcredential.md) using an email and an email link after a sign in with email link operation. |
