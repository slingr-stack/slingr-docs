---
title: "Apps REST API"
lead: "General documentation for the automatic generated REST API for Slingr apps. Security and authentication. Data manipulation."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---
This API allows to work with your app data, execute actions, check status of jobs, logs, etc., all
through a simple REST interface. Everything that can be done from the UI in an app can also be done using 
these web services.

Slingr API is based on REST recommendations (we don't follow all of them though) and we use JSON as the main 
data format.

You can access the API at the following endpoint:

```
https://<appName>.slingrs.io/<env>/runtime/api
``` 

where `appName` is the name of the app and `env` is the name of the environment, like `dev` and `prod`.

Notice that **you always have to use HTTPS**. Trying to access out API using HTTP will return an error.

Additionally, all calls should have the following headers:

- `Content-Type: application/json`
- `Accept: application/json`
- `token: <token received after login>`

## General error codes

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
            <code>200</code>
        </td>
        <td align="left">
            <p>Everything went fine. No errors.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code>400</code>
        </td>
        <td align="left">
            <p >Request is not valid. This can be due to validation errors in the data you are sending or because the operation you are trying to do is not valid.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code>401</code>
        </td>
        <td align="left">
            <p >Unauthorized. You need to log in or the provided token is not valid.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code>403</code>
        </td>
        <td align="left">
            <p >Forbidden. You have credentials, but you are trying to access data or execute an operation you don't have permissions.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code>404</code>
        </td>
        <td align="left">
            <p >Not found. The resource you are trying to access does not exist.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code >409</code>
        </td>
        <td align="left">
            <p >Optimistic locking exception. This happens when two users tries to update the same record at the same time. The once that enters in the second place will get this error.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code >500</code>
        </td>
        <td align="left">
            <p >Internal error. This happens when something went wrong and was not expected. If you get this type of errors please contact support.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code>503</code>
        </td>
        <td align="left">
            <p >Service unavailable. This is when the application is under maintenance.</p>
        </td>
    </tr>
    </tbody>
</table>

## Authentication

Before being able to use the API, you need to log in and get a valid token. The URL to get the token is the following:

```
POST /auth/login
```

This method has no parameters and the body should have the following form:

```js
{
  "email": "user@test.com",
  "password": "abcdefgh"
}
```

The response will be something like this:

```js
{
  "app": "appname",
  "adminUserEmail": null,
  "ip": "::ffff:10.240.0.38",
  "userEmail": "user@test.com",
  "userName": "User Test",
  "userId": "57fce0c3e4b0ce322b0c06b2",
  "token": "eLJjYSjLUPLlIEe8lfJUOmzsVNvSRpOv"
}
```

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
            <code >app</code>
        </td>
        <td align="left">
            <p >Code of the app the token belongs to.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code >adminUserEmail</code>
        </td>
        <td align="left">
            <p >This field is used when impersonating another user. Please read more on the following section.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code >ip</code>
        </td>
        <td align="left">
            <p >The IP the user logged in from.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code>userEmail</code>
        </td>
        <td align="left">
            <p >The email of the user you have logged in with.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code >userName</code>
        </td>
        <td align="left">
            <p >The full name of the user you have logged in with.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code >userId</code>
        </td>
        <td align="left">
            <p >The ID of the user you have logged in with.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code >token</code>
        </td>
        <td align="left">
            <p >This is the most important field and contains the token you will need to use in any further 
            call to the API. This token might expire, so you need to keep that in mind when coding your integration.</p>
        </td>
    </tr>
    </tbody>
</table>

Once you have the token, you have to send it over the header of every request. For example:

```
GET /data/companies
> Accept: application/json
> token: eLJjYSjLUPLlIEe8lfJUOmzsVNvSRpOv
```

When the token expires (usually after 8 hours of inactivity, but could be less due to maintenance or other
internal tasks) you will get a `401` error and you need to login again.

### Impersonating other users

Developer users or users with the flag to manage groups have the ability to impersonate other users. In order to
do that, when logging in the following body should be sent:

```js
{
  "email": "manager@test.com",
  "password": "manager_password",
  "emailImpersonatedUser": "employee@test.com"
}
```

The response will be something like this:

```js
{
  "app": "appname",
  "adminUserEmail": "manager@test.com",
  "ip": "::ffff:10.240.0.39",
  "userEmail": "employee@test.com",
  "userName": "Employee Test",
  "userId": "57fe52ade4b0ce322b0cea32",
  "token": "NE8lUuA2Yi9K6gL9EaQaTLIQLvYIhIyv"
}
```

You can notice that the `adminUserEmail` field contains now the email of the manager user that is 
impersonating `employee@test.com`.

### Possible errors

<table class="table">
    <thead>
    <tr class="header">
        <th align="left">Error code</th>
        <th align="left">HTTP Status Code</th>
        <th align="left">Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td align="left">
            <code >unauthorized</code>
        </td>
        <td align="left">
            <code >401</code>
        </td>
        <td align="left">
            <p >Thrown when credentials are invalid. This can be either the user email does not exist or password does not match.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code >notFound</code>
        </td>
        <td align="left">
            <code >404</code>
        </td>
        <td align="left">
            <p >The user you are trying to impersonate does not exist.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code >forbidden</code>
        </td>
        <td align="left">
            <code >403</code>
        </td>
        <td align="left">
            <p >If credentials are valid but you are not allowed to log in. For example, this can happen 
            when there are IP restrictions. Another case is that you are trying to impersonate a user and 
            you don't have enough permissions.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code>badRequest</code>
        </td>
        <td align="left">
            <code >400</code>
        </td>
        <td align="left">
            <p >Malformed request. For example, you didn't provide `email` and `password` fields.</p>
        </td>
    </tr>
    <tr>
        <td align="left">
            <code >applicationUnavailable</code>
        </td>
        <td align="left">
            <code >503</code>
        </td>
        <td align="left">
            <p >If the application is suspended or in maintenance mode. Developer users should be 
            able to log in anyway.</p>
        </td>
    </tr>
    </tbody>
</table>

## App data

For each entity in the app, a set of methods will be automatically created. For example if there is 
an entity called `companies`, the following methods will be available:

```
GET /data/companies
GET /data/companies/{id}
PUT /data/companies/{id}
POST /data/companies
DELETE /data/companies/{ids}
```

These are the basic operations for each entity that allow to list, read, update, create and delete records.

The content of the data will be dictated by the structure of the fields in the entity. For example getting 
a company record will return something like this:

```js
{
  "id": "57fd2d65e4b0ce322b0c8665",
  "version": 379,
  "label": "Browsezoom",
  "name": "Browsezoom",
  "state": "pending",
  "type": "a",
  "numberOfEmployees": 95,
  "isCustomer": false,
  "contactInformation": {
    "phoneNumber": "1-702-845-9380",
    "email": "jwoodsrq@spotify.com",
    "id": "58837fdd3b063a0007603547",
    "label": "Contact Information"
  },
  "addresses": [
    {
      "addressLine": "4 Magdeline Place",
      "zipCode": "89145",
      "city": "Las Vegas",
      "state": "NV",
      "id": "57fd45aee4b0ce322b0c86aa",
      "label": "NV - 89145"
    }
  ],
  "homepage": "http://www.browsezoom.com",
  "taxId": "350-KWM",
  "rating": "2.8",
  "notes": "modified notes",
  "lastMeeting": 1429623180000,
  "lastUpdate": 1485012900000
}
```

There are basically two types of fields:

- Record fields: these are the fields defined in the entity. The format for them depends on the
  type of the field. You should check the [types documentation]({{site.baseurl}}/app-development-types-overview.html).
- System fields: they are always there. These are:
    - `id`: the ID of the record.
    - `label`: this is the label of the record based on the instance label expression defined in the entity.
    - `version`: the version of the record that will be used for optimistic locking.

### Basic operations

#### Read one record

{{< rest_api_method context="data/readOne" >}}

#### List records

{{< rest_api_method context="data/list" >}}

#### Create record

{{< rest_api_method context="data/create" >}}

#### Update record

{{< rest_api_method context="data/update" >}}

#### Delete one record

{{< rest_api_method context="data/deleteOne" >}}

#### Delete many records

{{< rest_api_method context="data/deleteMany" >}}

#### Delete records over query

{{< rest_api_method context="data/deleteOverQuery" >}}

#### Optimistic locking

Optimistic locking is a feature that helps to avoid overwriting changes made by other
users in a record. To do that it uses the record version, which is a number that
increases every time there is a change in a record.

When updating a record, if you send the field `version` as part of the
body, and that version doesn't match the version of the record in the server,
a 409 error will be returned. This prevents changes made by other users to be
overwritten.

If the field `version` is not sent, then no version control will be done
and you might end up overwriting changes from other users, so it is strongly
recommended to use it when updating records.

### Aggregate queries

{{< rest_api_method context="data/deleteOverQuery" >}}

### Actions

#### Execute action over one record

{{< rest_api_method context="actions/actionOneRecord" >}}

#### Execute action over many records

{{< rest_api_method context="actions/actionManyRecords" >}}

#### Execute action over query

{{< rest_api_method context="actions/actionQuery" >}}

### Import records

{{< rest_api_method context="import_export/importRecords"  >}}

### Export records

{{< rest_api_method context="import_export/exportRecords">}}

### History

#### History for one record

{{< rest_api_method context="history/recordHistory" >}}

#### History in entity

{{< rest_api_method context="history/entityHistory" >}}

### Files handling

Slingr apps can store any kind of files than later can be downloaded, shared or referenced
by fields in records.

If you need to reference a file in a record from a file field, you will usually upload
the file first and then, once you have the ID of the file, you can set it as the
the value of the file field.

If a file isn't referenced by any record, it will be deleted after a few hours. This means
you shouldn't upload files here if you won't reference them from records in your app.

#### Uploading files

{{< rest_api_method context="files/uploadFile">}}

#### Downloading files

{{< rest_api_method context="files/downloadFile">}}

#### Downloading record files

{{< rest_api_method context="files/downloadRecordFile"  >}}

#### Sharing files

{{< rest_api_method context="files/shareFile"  >}}

#### Fetch shared file

{{< rest_api_method context="files/downloadSharedFile"  >}}

## Monitoring and troubleshooting

### Logs

Logs allow to know what's going on in the app. The structure of a log is this one:

```js
{
  "id": "57fce0bfe4b0f6600fdfb82c",
  "type": "APP",
  "subType": null,
  "level": "INFO",
  "message": "PUT /api/metadata/clearCache",
  "userEmail": "system@docs.slingrs.io",
  "adminUserEmail": null,
  "timestamp": 1476190399791,
  "ip": "10.64.2.3",
  "additionalInfo": {}
}
```

{{< json_fields context="logs/jsonFields" >}}


#### Get logs

{{< rest_api_method context="logs/listLogs"  >}}

#### Post logs

{{< rest_api_method context="logs/createLog"  >}}

### Jobs

With the API for jobs it is possible to check status, progress, logs, as well as some additional information
to get a good understanding of what's going on with the of a job.

This is the general structure of a job:

```js
{
  "id": "588a02c13b063a0007605032",
  "label": "Executing action countEmployees on entity companies",
  "type": "EXECUTE_ACTION",
  "runBy": {
    "id": "57fce0c3e4b0ce322b0c06b2",
    "fullName": "Diego Gaviola"
  },
  "parentJob": null,
  "rootJob": null,
  "createDate": 1485439681643,
  "startDate": 1485439681652,
  "endDate": 1485439681807,
  "status": "FINISHED",
  "hasErrors": false,
  "progress": 100,
  "recordsCount": 0,
  "recordsProcessed": 0,
  "childrenJobsCount": 0,
  "childrenJobsProcessed": 0,
  "stoppable": true,
  "lowPriority": false,
  "data": {}
  "results": {}
}
```

{{< json_fields context="jobs/jsonFields" >}}


#### Get one job

{{< rest_api_method context="jobs/readOneJob" >}}

#### List jobs

{{< rest_api_method context="jobs/listJobs" >}}

#### Get logs of a job

{{< rest_api_method context="jobs/readOneJob" >}}

#### Stop job

{{< rest_api_method context="jobs/stopJob" >}}

#### Force to stop job

{{< rest_api_method context="jobs/forceStopJob" >}}

#### Cancel job

{{< rest_api_method context="jobs/cancelJob" >}}

#### Resume job

{{< rest_api_method context="jobs/resumeJob" >}}




