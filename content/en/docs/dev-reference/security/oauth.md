---
title: "OAuth Support"
lead: "Explanation of OAuth Support."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---


External applications can access to the Slingr App API via OAuth requests. Those applications we will call as OAuth Apps.

Follow the next steps to obtain and refresh the Access Token.

### In the Slingr App

**1) Enable OAuth support in Builder and create scopes**

Go to `Security -> OAuth` and enable OAuth support. After that, a form for OAuth Scopes is enabled.
Instead of user groups, oauth tokens security is managed by oauth scope groups.

<table class="table">
    <thead>
        <tr class="header">
            <th align="left">Field</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="left">
                <p markdown="1">Name</p>
            </td>
            <td align="left">
                <p markdown="1">This is the name of the OAuth Scope. Must be unique.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p markdown="1">Description</p>
            </td>
            <td align="left">
                <p markdown="1">This a human readable description of the OAuth Scope, as long as the oauth app scopes are shown in the authorize page, it must be shorter than 140 characters.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p markdown="1">Groups</p>
            </td>
            <td align="left">
                <p markdown="1">Here you can set the groups of the OAuth App. Oauth tokens security is managed by these groups, instead of user's groups. Before deleting a scope, remember to check if it is being used in an OAuth App.</p>
            </td>
        </tr>
    </tbody>
</table>

Don't forget to push changes.

**2) Registering the OAuth App in the Slingr App**

Once OAuth is enabled, Go to Runtime and in the secondary menu, you will find the `OAuth Apps`.

Create an OAuth App with the following fields.

<table class="table">
    <thead>
        <tr class="header">
            <th align="left">Field</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="left">
                <p markdown="1">Label</p>
            </td>
            <td align="left">
                <p markdown="1">This is a human readable name for the OAuth App and will be shown to the user in the Authorize page.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p markdown="1">Name</p>
            </td>
            <td align="left">
                <p markdown="1">This the name of the OAuth App.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p markdown="1">Icon</p>
            </td>
            <td align="left">
                <p markdown="1">This is the icon shown to the user in the authorization page. It must be 64x64 px. If not set, puts a default icon in the Authorize page.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p markdown="1">Description</p>
            </td>
            <td align="left">
                <p markdown="1">A description of the OAuth App.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p markdown="1">Authorization Callback URL</p>
            </td>
            <td align="left">
                <p markdown="1">After the authorize step an authorization code will be appended to this URL and be called.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p markdown="1">Scopes</p>
            </td>
            <td align="left">
                <p markdown="1">Oauth tokens security is managed by groups set in scopes.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p markdown="1">Client Id</p>
            </td>
            <td align="left">
                <p markdown="1">A random generated key used to identify the OAuth App in requests.</p>
            </td>
        </tr>
    </tbody>
</table>

### In the OAuth App

**1) Prompt the user to log in and authorize the OAuth App.**

Open the Authorize URL (with `response_type` and `client_id` parameters) in a new window and expect the user to log in and authorize the OAuth App. 
 

```
https://<appName>.slingrs.io/<env>/runtime/authorize?response_type=code&client_id=<client_id>
```

where `appName` is the name of the app, `env` is the name of the environment, like `dev` and `prod` and `client_id` is the client id set in the OAuth App.

A form prompting the user to authorize the OAuth App will be shown if there exist an OAuth Authorization for the user and the OAuth App. 
OAuth authorizations can be revoked from the Slingr App, in that case the authorization form will be appear again.

After that, a callback URL with the `authorization_code` will be called from the Authorize page.

```
https://<oAuthAppAuthorizationCallbackUrl>?code=<authorization_code>
```

where `oAuthAppAuthorizationCallbackUrl` is the callback URL set in the OAuth App and `authorization_code` is the authorization code you will need to request the access token.

It is expected that the endpoint executed by the callback URL, store the authorization code giving by the `code` parameter and close the authorization window.

**2) With the authorization code, ask an access token.**

Make a POST to the slingr app OAuth token endpoint.

```
POST https://<appName>.slingrs.io/<env>/runtime/api/oauth/token?grant_type=authorization_code&client_id=<client_id>&code=<authorization_code>
```

where `appName` is the name of the app, `env` is the name of the environment, like `dev` and `prod`, `client_id` is the client id set in the OAuth App and `authorization_code` is the code given in step 1.

The authorization code is now expired. You receive the following information.

```js
{
    "access_token": "5HMxY4eBEK2xvmkATMCzSdJ0wTxMlSlF",
    "refresh_token": "ZqUeuPwAezCZWpDQqjCW",
    "token_type": "bearer",
    "expires_in": 28800,
    "scope": "scope1 scope2 scope3"
}
```
<table class="table">
    <thead>
        <tr class="header">
            <th align="left">Field</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="left">
                <p markdown="1">Access Token</p>
            </td>
            <td align="left">
                <p markdown="1">The access token that will be used in an Authorization header in your requests to the REST API.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p markdown="1">Refresh Token</p>
            </td>
            <td align="left">
                <p markdown="1">You can use it to renew the Access Token when a request to the REST API throws 401 error.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p markdown="1">Token type</p>
            </td>
            <td align="left">
                <p markdown="1">Means that the token type is bearer.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p markdown="1">Expires in</p>
            </td>
            <td align="left">
                <p markdown="1">In seconds the time that the access token will be expired. Once expired, you can request a new token with the refresh token.</p>
            </td>
        </tr>
        <tr>
            <td align="left">
                <p markdown="1">Scope</p>
            </td>
            <td align="left">
                <p markdown="1">This show information about the scopes set for the OAuth App.</p>
            </td>
        </tr>
    </tbody>
</table>

**3) Put the access token in an authorization header in your requests**

Example, to request a list of companies execute a get including the header Authorization with Bearer and the access token:

```
GET https://<appName>.slingrs.io/<env>/runtime/api/data/companies
> Authorization: Bearer <access_token>
```
where `appName` is the name of the app, `env` is the name of the environment, like `dev` and `prod` and `access_token` is the code given in step 2.

More info about using the [REST API]({{site.baseurl}}/app-development-apps-rest-api.html)

**4) Refresh the token**

Use the refresh token code obtained in step 2, to request a new access token. This ables you to request a new access token without prompting the user (step 1).

```
POST https://<appName>.slingrs.io/<env>/runtime/api/oauth/token?grant_type=refresh_token&client_id=<client_id>&code=<refresh_token>
```

where `appName` is the name of the app, `env` is the name of the environment, like `dev` and `prod`, `client_id` is the client id set in the OAuth App and `refresh_token` is the refresh token obtain in step 2.

```js
{
    "access_token": "oqChNyTJhKvTrHWawj61jTgsZTGrgVGT",
    "refresh_token": "gJYDedgagcZalmptnhBg",
    "token_type": "bearer",
    "expires_in": 28800,
    "scope": "scope1 scope2 scope3
}
```

### General error codes

Here are some general error descriptions. Then on each method you will see a better description to some
of the errors that can show up.

<table class="table">
    <thead>
    <tr class="header">
        <th align="left">HTTP Status Code</th>
        <th align="left">Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td align="left">
            <p markdown="1">200</p>
        </td>
        <td align="left">
            <p markdown="1">Everything went fine. No errors.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <p markdown="1">400</p>
        </td>
        <td align="left">
            <p markdown="1">Invalid client id. Check that the client id is correct</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <p markdown="1">400</p>
        </td>
        <td align="left">
            <p markdown="1">OAuth is not enabled. Make sure that the slingr app has OAuth support enabled</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <p markdown="1">400</p>
        </td>
        <td align="left">
            <p markdown="1">Invalid authorization code. The authorization code is invalid, request another one with authorize URL</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <p markdown="1">400</p>
        </td>
        <td align="left">
            <p markdown="1">Authorization code is expired.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <p markdown="1">400</p>
        </td>
        <td align="left">
            <p markdown="1">App is not authorized by the user.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <p markdown="1">400</p>
        </td>
        <td align="left">
            <p markdown="1">Invalid grant type.  Only `authorization_code` and `refresh_token` are allowed values</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <p markdown="1">400</p>
        </td>
        <td align="left">
            <p markdown="1">Refresh token has expired.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <p markdown="1">400</p>
        </td>
        <td align="left">
            <p markdown="1">Token is not expired yet. When refreshing the token, check if Access Token is not expired yet</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <p markdown="1">401</p>
        </td>
        <td align="left">
            <p markdown="1">Unauthorized. You need to log in.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <p markdown="1">500</p>
        </td>
        <td align="left">
            <p markdown="1">OAuth unknown error, please contact us. This happens when something went wrong and was not expected. If you get this type of errors please contact support.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <p markdown="1">502</p>
        </td>
        <td align="left">
            <p markdown="1">Token is not provided. Probably you are trying to authorize the OAuth App without a logged in user</p>
        </td>
    </tr>
    </tbody>
</table>

