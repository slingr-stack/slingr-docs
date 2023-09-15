---
title: "Partner REST API"
lead: "General documentation for the partner REST API to create and manage accounts in the platform."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "slingr-dev-portal"
toc: true
weight: 5
---

This API is for partners that need to create accounts or apps on the Slingr platform on behalf of other
people.

You can access the API at the following endpoint:

``` js
https://developer-portal.slingrs.io/api
```

Notice that **you always have to use HTTPS**. Trying to access out API using HTTP will return an error.

Additionally, all calls should have the following headers:

- `Content-Type: application/json`
- `Accept: application/json`
- `token: <token received after login>`

## **General error codes**

Here are some general error descriptions. Then on each method you will see a better description to some of the errors that can show up.

<table>
  <tr>
    <th>HTTP Status Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Everything went fine. No errors.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Request is not valid. This can be due to validation errors in the data you are sending or because the operation you are trying to do is not valid.</td>
  </tr>
  <tr>
    <td>401</td>
    <td>Unauthorized. You need to log in or the provided token is not valid.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>Forbidden. You have credentials, but you are trying to access data or execute an operation you don’t have permissions.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Not found. The resource you are trying to access does not exist.</td>
  </tr>
  <tr>
    <td>409</td>
    <td>Optimistic locking exception. This happens when two users tries to update the same record at the same time. The once that enters in the second place will get this error.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal error. This happens when something went wrong and was not expected. If you get this type of errors please contact support.</td>
  </tr>
  <tr>
    <td>503</td>
    <td>Service unavailable. This is when the application is under maintenance.</td>
  </tr>
</table>


## **Authorization**

In order to call methods in this API you will need a partner token. You need to request this token to the Platform team support (<support@slingr.io>). So for all request you will need to send the header **token** with the partner token.

## **Create an account**

```js
POST /accounts
```
Creates a new account in the platform. This account will be associated to the partner that created it.

### Request

```
POST /accounts
> Content-Type: application/json
> Accept: application/json
> token: token

{
  "firstName": "first name",
  "lastName": "last name",
  "email": "name@company.com",
  "password": "abcd1234"
}
```

<br>
<table>
  <tr>
    <th>Path</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>firstName</td>
    <td>First name of the owner of the account.</td>
  </tr>
  <tr>
    <td>lastName</td>
    <td>Last name of the owner of the account.</td>
  </tr>
  <tr>
    <td>email</td>
    <td>Email of the owner of the account.</td>
  </tr>
  <tr>
    <td>password</td>
    <td>Password to set this this account.</td>
  </tr>
</table>

<br>

### Response

The created account in JSON format.

```
POST /accounts
< Content-Type: application/json

{
  "id": "asdw432j4bu9bdf92323",
  "firstName": "first name",
  "lastName": "last name",
  "email": "name@company.com",
  "status": "ACTIVE",
  "timeZoneMode": "AUTO"
}
```
<br>

<style>
table {
  margin-top: 10px;
  margin-bottom: 20px;
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

code {
  display: block;
  white-space: pre-wrap;
  background-color: #f2f2f2;
  margin-bottom: 10px;
  font-family: Consolas, monospace;
  font-size: 14px;
}

td {
  vertical-align: top;
}
</style>

<table>
  <tr>
    <th>Error code</th>
    <th>HTTP Status Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>validationErrors</td>
    <td>400</td>
    <td>
      If there are validation errors. When this happens you will get the details of the errors in the body:
      <code>
        {
          "code": "validationErrors",
          "message": "There are validation errors",
          "errors": [
            {
              "field": "firstName",
              "fieldLabel": null,
              "code": "required",
              "message": "First name cannot be empty",
              "additionalInfo": null
            }
          ]
        }
      </code>
    </td>
  </tr>
  <tr>
    <td>forbidden</td>
    <td>403</td>
    <td>
      You don’t have permissions to create an account. You should check the token.
    </td>
  </tr>
</table>

### Samples

```
creates a new account

POST /accounts
> Content-Type: application/json
> Accept: application/json
> token: token

{
  "firstName": "first name",
  "lastName": "last name",
  "email": "name@company.com",
  "password": "abcd1234"
}


POST /accounts
< Content-Type: application/json

{
  "id": "asdw432j4bu9bdf92323",
  "firstName": "first name",
  "lastName": "last name",
  "email": "name@company.com",
  "status": "ACTIVE",
  "timeZoneMode": "AUTO"
}
```

## **Check app name**
```
GET /utils/checkAppName
```
Checks if an app name is available.

### Request
```
GET /utils/checkAppName
> Accept: application/json
> token: token

```

<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>appName</td>
    <td>yes</td>
    <td>-</td>
    <td>This is the app name to check availability.</td>

  </tr>
  <tr>
  </tr>
</table>

### Response

The response indicating if the app name is available.
```
GET /utils/checkAppName
< Content-Type: application/json

{
  "status": "available"
}

```
<table>
  <tr>
    <th>Path</th>
    <th>Description</th>

  </tr>
  <tr>
    <td>status</td>
    <td>
      Indicates if it is available. Values could be:
      <br><br/>
      <table>
        <tr>
          <th>Status</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>available</td>
          <td>App name is available.</td>
        </tr>
        <tr>
          <td>notUnique</td>
          <td>There is another app with the same name.</td>
        </tr>
        <tr>
          <td>invalid</td>
          <td>The name is not valid.</td>
        </tr>
      </table>

  <div>For notUnique and invalid you will also get a field message with more details about the problem.</div>
  </tr>
  <tr>
    <td>message</td>
    <td>yes</td>
  </tr>
  </tr>
</table>

### Possible errors

<table>
  <tr>
    <th>Error code</th>
    <th>HTTP status code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Unathorized</td>
    <td>401</td>
    <td>You are not authenticated or credentials are invalid.</td>
  </tr>
  <tr>
  </tr>
</table>

### Samples

```
checks a name that is available

GET /utils/checkAppName?appName=uniqueAndValidName
> Accept: application/json
> token: token

GET /utils/checkAppName?appName=uniqueAndValidName
< Content-Type: application/json

{
  "status": "available"
}
```

```
checks a name that is not unique

GET /utils/checkAppName?appName=notUniqueName
> Accept: application/json
> token: token



GET /utils/checkAppName?appName=notUniqueName
< Content-Type: application/json

{
  "status": "notUnique",
  "message": "Code is already in use."
}

```

```
checks an invalid name

GET /utils/checkAppName?appName=$invalid#
> Accept: application/json
> token: token

GET /utils/checkAppName?appName=$invalid#
< Content-Type: application/json

{
  "status": "invalid",
  "message": "Only lowercase letters and numbers are allowed. The first character must be a letter."
}
```