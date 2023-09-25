---
title: "OAuth Support"
description: "Explanation of OAuth Support."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

External applications can access the Slingr App API through OAuth requests. We refer to these applications as OAuth Apps.

Follow the steps below to acquire and refresh the Access Token.

## **In the Slingr app**

#### 1) Enabling OAuth support in builder and creating scopes

Navigate to **`Security -> OAuth`** and enable OAuth support. This action will activate a form for OAuth Scopes.
OAuth tokens security is now managed through OAuth scope groups, rather than user groups.

Field | Description
--- | ---
Name | This is the name of the OAuth Scope, which must be unique.
Description | Provide a human-readable description of the OAuth Scope. Ensure it is under 140 characters since OAuth app scopes are displayed on the authorization page.
Groups | Here, you can define the groups associated with the OAuth App. Security for OAuth tokens is regulated by these groups, instead of user groups. Before deleting a scope, verify if it's being used in any OAuth App.

Remember to save your changes after making modifications.

#### 2) Registering the OAuth app in the Slingr app

Once OAuth is enabled, head to the Runtime section. In the secondary menu, locate **`OAuth Apps`**.

Proceed to create an OAuth App with the following fields:

Field | Description
--- | ---
Label | This is a user-friendly name for the OAuth App, displayed to users on the Authorization page.
Name | Enter the name of the OAuth App.
Icon | Upload an icon that will be presented to users on the authorization page. It should have dimensions of 64x64 px. If not provided, a default icon will be displayed.
Description | Include a description for the OAuth App.
Authorization Callback URL | After the authorization step, an authorization code will be appended to this URL and triggered.
Scopes | OAuth tokens security is regulated by groups defined in scopes.
Client Id | A randomly generated key assigned to identify the OAuth App in requests.

---

## **In the OAuth app**

#### 1) Prompt the user to log in and authorize the OAuth App.

Prompt the user to log in and authorize the OAuth App by opening the Authorize URL in a new window. The URL should include the **`response_type`** and **`client_id`** parameters.

```
https://<appName>.slingrs.io/<env>/runtime/authorize?response_type=code&client_id=<client_id>
```
<br>

In this URL:
- **`appName`** refers to the app's name.
- **`env`** is the environment name (e.g., **`dev`** or **`prod`**).
- **`client_id`** should be the client id specified in the OAuth App.

If an OAuth Authorization exists for the user and the OAuth App, a form requesting the user's authorization for the OAuth App will be displayed. If the OAuth authorization is revoked from the Slingr App, the authorization form will reappear.

After the user's authorization, a callback URL containing the **`authorization_code`** will be invoked from the Authorize page.

```
https://<oAuthAppAuthorizationCallbackUrl>?code=<authorization_code>
```
<br>

In this URL:
- **`oAuthAppAuthorizationCallbackUrl`** stands for the callback URL set in the OAuth App.
- **`authorization_code`** corresponds to the authorization code required for requesting the access token.

It's expected that the endpoint executed by the callback URL will store the authorization code provided by the **`code`** parameter and subsequently close the authorization window.

#### 2) Acquiring an Access Token with the Authorization Code

To obtain an access token, initiate a POST request to the slingr app's OAuth token endpoint.

```
POST https://<appName>.slingrs.io/<env>/runtime/api/oauth/token?grant_type=authorization_code&client_id=<client_id>&code=<authorization_code>
```
<br>

In this URL:
- **`appName`** is the app's name.
- **`env`** refers to the environment name (e.g., **`dev`** or **`prod`**).
- **`client_id`** corresponds to the client id established in the OAuth App.
- **`authorization_code`** should be replaced with the code obtained in step 1.

If you encounter an expired authorization code while attempting to retrieve an access token, you will receive the following information:

```js
{
    "access_token": "5HMxY4eBEK2xvmkATMCzSdJ0wTxMlSlF",
    "refresh_token": "ZqUeuPwAezCZWpDQqjCW",
    "token_type": "bearer",
    "expires_in": 28800,
    "scope": "scope1 scope2 scope3"
}
```
<br>

Field | Description
--- | ---
Access Token | The access token to be included in the Authorization header of your REST API requests.
Refresh Token | Use this token to refresh the Access Token in case a request to the REST API results in a 401 error.
Token Type | Indicates that the token type is bearer.
Expires in | Specifies the token's expiration time in seconds. Once expired, you can obtain a new token using the refresh token.
Scope | Provides information about the scopes defined for the OAuth App.

#### 3) Put the access token in an authorization header in your requests

Example: To retrieve a list of companies, execute a **`GET`** request while including the **`Authorization`** header with the **`Bearer`** token, which is the access token you obtained. Below is a sample request:

```
GET https://<appName>.slingrs.io/<env>/runtime/api/data/companies
> Authorization: Bearer <access_token>
```
<br>

In this request:

- **`appName`** stands for the app's name.
- **`env`** represents the environment name, such as dev or prod.
- **`access_token`** should be replaced with the actual access token obtained in step 2. Upon successful authentication, this request will retrieve the desired list of companies from the API.

More info about using the [REST API]({{<ref "/dev-reference/rest-apis/apps-api.md">}})

#### 4) Refresh the token

Utilize the refresh token acquired in step 2 to initiate a request for a new access token. This enables you to obtain a new access token without requiring user involvement (as in step 1).

```
POST https://<appName>.slingrs.io/<env>/runtime/api/oauth/token?grant_type=refresh_token&client_id=<client_id>&code=<refresh_token>
```
<br>

In this URL:
- **`appName`** is the name of the app.
- **`env`** is the environment name (e.g., **`dev`** or **`prod`**).
- **`client_id`** corresponds to the client id established in the OAuth App.
- **`refresh_token`** is the refresh token obtained in step 2.

This process will yield a new access token, allowing you to seamlessly continue API interactions.

```js
{
    "access_token": "oqChNyTJhKvTrHWawj61jTgsZTGrgVGT",
    "refresh_token": "gJYDedgagcZalmptnhBg",
    "token_type": "bearer",
    "expires_in": 28800,
    "scope": "scope1 scope2 scope3"
}
```
<br>

## **General Error Codes**

Below are descriptions for various general errors. More specific error descriptions for each method can be found in their respective sections.

HTTP Status Code | Description
--- | ---
200 | Request successfully processed; no errors occurred.
400 | Invalid client ID. Double-check the accuracy of the client ID.
400 | OAuth is not enabled. Ensure that OAuth support is enabled for the Slingr app.
400 | Invalid authorization code. The provided authorization code is invalid. Obtain a new one using the authorize URL.
400 | Authorization code has expired.
400 | App is not authorized by the user.
400 | Invalid grant type. Only **`authorization_code`** and **`refresh_token`** are accepted values.
400 | Refresh token has expired.
400 | Token is not yet expired. While refreshing the token, verify if the Access Token is still valid.
401 | Unauthorized. User login is required.
500 | Unknown OAuth error. If you encounter this error unexpectedly, please contact support.
502 | Token is missing. This error could occur when attempting to authorize the OAuth App without a logged-in user.
