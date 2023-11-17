---
title: "Apps REST API"
description: "General documentation for the automatic generated REST API for Slingr apps. Security and authentication. Data manipulation."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 141
---

The Slingr API provides a versatile means of interacting with your app's data, executing actions, checking job statuses, reviewing logs, and more, all via a straightforward REST interface. Essentially, anything that can be accomplished through the app's user interface can also be achieved using these web services.

The Slingr API adheres to REST principles, although there may be some variations. Our primary data format is JSON.

To access the Slingr API, you can make requests to the following endpoint:

```
https://<appName>.slingrs.io/<env>/runtime/api
``` 
<br>

Where:
- **`<appName>`** is the name of your app.
- **`<env>`** is the name of the environment, such as **`dev`** or **`prod`**.

Please note that **`HTTPS`** must always be used. Attempting to access our API via HTTP will result in an error.

All API requests should include the following headers:

``` markdown
    - Content-Type: application/json
    - Accept: application/json
    - token: <token_received_after_login>
```
<br>

## **General error codes**

Here is a list of common HTTP status codes used in the Slingr API along with their descriptions:

| HTTP Status Code | Description |
| --- | --- |
| 200 | **`OK`:** The request was successful, and there are no errors. |
| 400 | **`Bad Request:`** The request is invalid. This can occur due to validation errors in the data you are sending or because the requested operation is not valid. |
| 401 | **`Unauthorized:`** You are not authorized to access this resource. You need to log in or the provided authentication token is not valid. |
| 403 | **`Forbidden:`** You have valid credentials, but you are attempting to access data or perform an operation for which you do not have the necessary permissions. |
| 404 | **`Not Found:`** The resource you are trying to access does not exist. |
| 409 | **`Conflict:`** This error occurs in the case of an optimistic locking exception. It happens when two users attempt to update the same record simultaneously, and the second user to make the update receives this error. |
| 500 | **`Internal Server Error:`** An unexpected internal error has occurred. If you encounter this error, please contact our support team as it indicates an issue on our end. |
| 503 | **`Service Unavailable:`** This error is returned when the application is undergoing maintenance and is temporarily unavailable. |

For specific details on errors related to each API method, please refer to the documentation for that specific method.

## **Authentication**

Before you can make requests to the Slingr API, you must log in and obtain a valid token. Follow the steps below to acquire and utilize the token.

To obtain a token, make a POST request to the following URL:

```
POST /auth/login
```
<br>

This method has no additional parameters, and the request body should have the following structure:

```js
{
  "email": "user@test.com",
  "password": "abcdefgh"
}
```
<br>

The response will resemble the following:

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
<br>

It will include the following fields:

| Field Name       | Description                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| **`app`**            | The code of the app to which the token belongs.                                                           |
| **`adminUserEmail`** | This field is used when impersonating another user. Refer to the following section for more details.    |
| **`ip`**             | The IP address from which the user logged in.                                                               |
| **`userEmail`**      | The email address of the user you have logged in with.                                                      |
| **`userName`**       | The full name of the user you have logged in with.                                                          |
| **`userId`**         | The unique identifier of the user you have logged in with.                                                  |
| **`token`**          | The most critical field, containing the token necessary for subsequent API requests. Keep in mind that this token may expire, so ensure your integration can handle token expiration. |

<br>

Once you have acquired the token, include it in the header of every API request as follows:

```
GET /data/companies
> Accept: application/json
> token: eLJjYSjLUPLlIEe8lfJUOmzsVNvSRpOv
```
<br>

Be aware that tokens have a limited lifespan, typically expiring after 8 hours of inactivity. However, they may expire sooner due to maintenance or other internal tasks. If your token expires, you will receive a **`401`** error, indicating that you need to log in again.

Please ensure the security and confidentiality of your access token, as it provides authentication to your Slingr account.

### Impersonating other users

Developer users or users with the appropriate permissions, such as the "manage groups" flag, have the capability to impersonate other users for various purposes. To perform user impersonation when logging in, you should include the following structure in the request body:

```js
{
  "email": "manager@test.com",
  "password": "manager_password",
  "emailImpersonatedUser": "employee@test.com"
}
```
<br>

- **`username`**: Your own username for authentication.
- **`password`**: Your own password for authentication.
- **`emailImpersonatedUser`**: The email address of the user you wish to impersonate.

When you provide the **`emailImpersonatedUser`** field in the request body, you will log in as the specified user with their permissions and privileges. This feature is particularly valuable for testing and administrative purposes, allowing authorized users to perform actions on behalf of different users.

Ensure that user impersonation is used responsibly and only by users with the necessary permissions to prevent any unauthorized actions within the system.

The token response will include fields that reflect the impersonation scenario. Here's an example of what the response might look like:

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
<br>

### Possible errors

When making login requests to the API, you may encounter the following error codes and their corresponding HTTP status codes along with their descriptions:

| Error Code                  | HTTP Status Code | Description |
| --------------------------- | ---------------- | ----------- |
| **`unauthorized`**          | **`401`**        | This error is thrown when the provided credentials are invalid. It can occur when either the user email does not exist or the password does not match. |
| **`notFound`**              | **`404`**        | Indicates that the user you are trying to impersonate does not exist. |
| **`forbidden`**             | **`403`**        | If the credentials are valid but you are not allowed to log in. This can happen due to various reasons, such as IP restrictions or attempting to impersonate a user without sufficient permissions. |
| **`badRequest`**            | **`400`**        | Denotes a malformed request. For instance, this error occurs when the mandatory fields such as **`email`** and **`password`** are not provided in the request. |
| **`applicationUnavailable`**| **`503`**        | If the application is currently suspended or undergoing maintenance. Developer users may still have the capability to log in despite this condition. |

These error codes provide specific information about the issues encountered during the login process and can help troubleshoot any authentication problems effectively.

## **App data**

For each entity within the app, a set of methods is automatically generated. For instance, if there is an entity named **`companies`**, the following methods will be available:

```
GET /data/companies
GET /data/companies/{id}
PUT /data/companies/{id}
POST /data/companies
DELETE /data/companies/{ids}
```
<br>

These fundamental operations are available for every entity and enable you to perform common CRUD (Create, Read, Update, Delete) operations on your app's data.

The structure of the data returned or manipulated by these methods is determined by the fields defined within each entity. For example, when fetching a company record, the response will resemble the following:

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

- **`Record fields`**: Record fields are fields defined within each entity of your app. The format and characteristics of these fields depend on the data type assigned to them during entity creation. The types can include text, numbers, dates, and more. For specific details about the types and their format, please refer to the [types documentation]().

- **`System fields`**: System fields are inherent to every record in your app and are automatically included. They provide essential information about the record and are crucial for various functionalities. The system fields include:

- **id**: This is the unique identifier for each record. It is used to distinguish one record from another.
- **label**: The label field contains the record's label, which is generated based on the instance label expression defined within the entity. This label is often used for display purposes and makes it easier to identify records.
- **version**: The version field represents the record's version and is primarily used for optimistic locking. Optimistic locking ensures that record updates are synchronized and avoids conflicts when multiple users attempt to modify the same record simultaneously.

Understanding both record fields and system fields is essential for effectively working with your app's data and ensuring the integrity and consistency of your records.
You can incorporate this revised information into your documentation to provide a clear distinction between record fields and system fields and their respective roles in your app's data.

### Basic operations

#### Read one record

``` js
GET /data/{entityName}/{id}
```
<br>

> Reads one record by ID

##### Request

``` js
GET /data/{entityName}/{id}
> Accept: application/json
> token: token
```
<br>


| Parameter   | Required | Default | Description |
| ----------- | -------- | ------- | ----------- |
| **`entityName`**            | Yes      | -       | The name of the entity to which the record belongs. |
| **`id`**                    | Yes      | -       | The unique identifier (ID) of the record you want to fetch.|
| **`_fields`**               | No       | all     | By default, all fields of the record will be fetched. If you want to specify which fields to retrieve, you can pass this parameter. You can list multiple fields separated by commas, for example: <br><br> <pre><code>_fields=name,type.</code></pre><br> Note that system fields (e.g., **`id`**, **`version`**, etc.) will always be returned. |
| **`_format`**               | No       | native  | Specifies the format in which to fetch the fields. There are two options: <br> - **`native`**: Returns the raw values of each field. <br> - **`plainText`**: Returns the values of the fields converted using the display option of each field.                    |
| **`_relationshipsToFetch`** | No       | -       | A comma-separated list of relationship fields to be fetched within the record. For instance, if an entity has relationship fields named **`company`** and **`region`**, you can fetch those referenced records like this: <br><br> <pre><code>_relationshipsToFetch=company,region. </code></pre><br>|

##### Response

The JSON representation of the record is returned. More info about the format can be found here.

``` js
GET /data/{entityName}/{id}
< Content-Type: application/json
{
  "id": "57fd2d65e4b0ce322b0c8665",
  "version": 1,
  "label": "label",
  "fieldA": "value",
  "fieldB": "value"
  "fieldC": "value"
}
```
<br>

##### Posible errors

Error code|HTTP status code|Description
---|---|---
forbidden|403|Provided token does not have permissions to access this record.
notFound|404|Either entity or record ID does not exist.

##### Samples

``` js
fetches one company record

GET /data/companies/57fd2d65e4b0ce322b0c8665
> Accept: application/json
> token: token



GET /data/companies/57fd2d65e4b0ce322b0c8665
< Content-Type: application/json

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
<br>


#### List records

``` js
GET /data/{entityName}
```
<br>

> Reads many records from one entity. You can specify filters and other options in the URL.

More information about queries can be found in [Query language]({{<ref "/dev-reference/queries/query-language.md">}}).

##### Request

``` js
GET /data/{entityName}
> Accept: application/json
> token: token
```
<br>


| Parameter   | Required  | Description |
| ----------- | --------  | ----------- |
| **`entityName`**            | Yes   |Name of the entity the record belongs to.|
| **`id`**                    | No    | You can find information about other parameters in [Query language]({{<ref "/dev-reference/queries/query-language.md">}}).|

##### Response

A list of records in JSON representation will be returned.

``` js
GET /data/{entityName}
< Content-Type: application/json

{
  "total": 10,
  "offset": "57fd2d65e4b0ce322b0c8565",
  "items": [
    {
      "id": "57fd2d65e4b0ce322b0c8665",
      "version": 1,
      "label": "label",
      "fieldA": "value",
      "fieldB": "value"
    },
    {
      "id": "57fd2d65e4b0ce322b0c8565",
      "version": 1,
      "label": "label",
      "fieldA": "value",
      "fieldB": "value"
    }
  ]
}
```
<br>

Path|Description
---|---
total|The total number of records matched. If there are more than the records returned, you should use pagination to fetch more records. 
offset|The offset to pass to get more records.
items|This is the list of records fetched.

##### Posible errors

Error code|HTTP status code|Description
---|---|---
badRequest|400|Query is not valid.
forbidden|403|Provided token does not have permissions to access this entity or some of the fields you are querying by.
notFound|404| Entity name does not exist.

##### Samples

``` js
// fetches fields name and type of two companies in pending status

GET /data/companies?state=pending&_fields=name,type&_size=2
> Accept: application/json
> token: token



GET /data/companies?state=pending&_fields=name,type&_size=2
< Content-Type: application/json

{
  "total": 135,
  "offset": "57fd2d65e4b0ce322b0c8565",
  "items": [
    {
      "id": "57fd2d65e4b0ce322b0c8665",
      "version": 379,
      "label": "Browsezoom",
      "name": "Browsezoom",
      "type": "a"
    },
    {
      "id": "57fd2d65e4b0ce322b0c8565",
      "version": 375,
      "label": "Blogpad",
      "name": "Blogpad",
      "type": "b"
    }
  ]
}
```
<br>



#### Create record

``` js
POST /data/{entityName}
```
<br>

> Creates a new record for the given entity.

Data is sent in the body and should be valid according to the entity structure and fields rules.

##### Request

The body of this request should be a record in JSON format based on the entity structure.

All fields you are sending have to be present in the entity definition and values have to match the format required by the type. Also, there might be validation rules you have to take into account.

``` js
POST /data/{entityName}
> Content-Type: application/json
> Accept: application/json
> token: token

{
  "fieldA": "value",
  "fieldB": "value"
  "fieldC": 10,
  "nestedFields": [
    {
      "innerA": "value",
      "innerB": "value"
    },
    {
      "innerA": "value",
      "innerB": "value"
    }
  ]
}
```
<br>

| Parameter   | Required  | Description |
| ----------- | -------- | ------- |
| **`entityName`**            | Yes      | Name of the entity the record will be added to.|

##### Response

The response is the same as if you do a **`GET /data/companies/{id}`**, which means that you will be able to get the ID and label of the created record, as well as other calculated/default fields the entity might have.

``` js
POST /data/{entityName}
< Content-Type: application/json

{
  "id": "588775f63b063a0007604f4c",
  "version": 0,
  "label": "label",
  "fieldA": "value",
  "fieldB": "value"
  "fieldC": 10,
  "nestedFields": [
    {
      "id": "588775f63b063a0007604f4c",
      "label": "label",
      "innerA": "value",
      "innerB": "value"
    },
    {
      "id": "588775f63b063a0007604f8a",
      "label": "label",
      "innerA": "value",
      "innerB": "value"
    }
  ],
  "calculatedField": "value"
}
```
<br>

##### Posible errors

Error code|HTTP status code|Description
---|---|---
validationErrors|400|If there are validations errors, the response will look like this:<br><pre><code>{ &#13; "code": "validationErrors",&#13; "message": "There are validation errors", &#13; "errors": [ &#13; { &#13;     "field": "name", &#13;     "fieldLabel": "Name", &#13;     "code": "required", &#13;     "message": "This field is required", &#13;     "additionalInfo": null &#13; }, &#13; { &#13;      "field": "state", &#13;      "fieldLabel": "State", &#13;      "code": "invalid", &#13;      "message": "Not a valid choice", &#13;      "additionalInfo": { &#13;           "rejectedValue": "sdfsdfsd" &#13;      } &#13; }]&#13;}</pre></code><br>In this case you will get details information about the field having issues, the error code and a human readable description of the error. Additional information might be added depending on the type of error, for example the rejected value.
forbidden|403|Provided token does not have permissions to create records on this entity.
notFound|404|If entity name does not exist.

##### Samples

``` js
// creates a new company

POST /data/companies
> Content-Type: application/json
> Accept: application/json
> token: token

{
  "name": "Test 1",
  "state": "pending",
  "type": "a",
  "numberOfEmployees": 95,
  "isCustomer": false,
  "contactInformation": {
    "phoneNumber": "1-702-845-9380",
    "email": "jwoodsrq@spotify.com"
  },
  "addresses": [
    {
      "addressLine": "4 Magdeline Place",
      "zipCode": "89145",
      "city": "Las Vegas",
      "state": "NV"
    }
  ],
  "homepage": "http://www.browsezoom.com",
  "taxId": "350-KWM",
  "rating": "2.8",
  "notes": "test notes",
  "lastMeeting": 1429623180000
}


POST /data/companies
< Content-Type: application/json

{
  "id": "588775f63b063a0007604f4c",
  "version": 0,
  "label": "Test 1",
  "name": "Test 1",
  "state": "pending",
  "type": "a",
  "numberOfEmployees": 95,
  "isCustomer": false,
  "contactInformation": {
    "phoneNumber": "1-702-845-9380",
    "email": "jwoodsrq@spotify.com",
    "id": "588775f63b063a0007604f4a",
    "label": "Contact Information"
  },
  "addresses": [
    {
      "addressLine": "4 Magdeline Place",
      "zipCode": "89145",
      "city": "Las Vegas",
      "state": "NV",
      "id": "588775f63b063a0007604f4b",
      "label": "NV - 89145"
    }
  ],
  "homepage": "http://www.browsezoom.com",
  "taxId": "350-KWM",
  "rating": "2.8",
  "notes": "test notes",
  "lastMeeting": 1429623180000,
  "lastUpdate": 1485272566096
}
```
<br>

#### Update record

``` js
PUT /data/{entityName}/{id}
```
<br>

> Updates a record data.

Data is sent in the body and should be valid according to the entity structure and fields rules.

##### Request

To update a record via the API, you should provide a JSON-formatted record in the request body. The fields you include in this JSON body must align with the structure defined in the entity. Additionally, the values must conform to the format required by the data type assigned to each field. Be aware that there might be validation rules enforced by the entity that you need to adhere to.

Key points to consider when sending an update request:

- You can specify only the fields you wish to update. Fields that are not included in the JSON request body won't be modified. If you want to clear a field's value, set it to **`null`** explicitly.

- An essential field to mention is **`version`**, which signifies the version of the record you are updating. This field is crucial for managing concurrency issues, especially when two users attempt to update the same record simultaneously. (Refer to the optimistic locking section below for further details.) If you do not provide the **`version`** field, your update will always overwrite existing data, regardless of other user modifications.

Please make sure to structure your update requests accordingly, taking into account the entity's schema, data type requirements, and any validation rules in place.

``` js
PUT /data/{entityName}/{id}
> Content-Type: application/json
> Accept: application/json
> token: token

{
  "version": 1,
  "fieldA": "newValue",
  "fieldB": "newValue",
  "nestedFields": [
    {
      "id": "588775f63b063a0007604f4c",
      "innerA": "newValue"
    },
    {
      "id": "588775f63b063a0007604f8a",
      "innerB": "newValue"
    }
  ]
}
```
<br>

| Parameter   | Required  | Description |
| ----------- | -------- | ----------- |
| **`entityName`**            | yes      | Name of the entity the record will be added to.|
| **`id`**| yes| The ID of the record to update. If you provide the ID on the body it will be discarded and the ID sent in the URL parameter will be used.

##### Response

The response is the same as if you do a **`GET /data/companies/{id}`**, which means that you will be able to get the ID and label of the created record, as well as other calculated/default fields the entity might have.

``` js
PUT /data/{entityName}/{id}
< Content-Type: application/json

{
  "id": "588775f63b063a0007604ab2",
  "version": 0,
  "label": "label",
  "fieldA": "newValue",
  "fieldB": "newValue"
  "fieldC": 10,
  "nestedFields": [
    {
      "id": "588775f63b063a0007604f4c",
      "label": "label",
      "innerA": "newValue",
      "innerB": "value"
    },
    {
      "id": "588775f63b063a0007604f8a",
      "label": "label",
      "innerA": "value",
      "innerB": "newValue"
    }
  ],
  "calculatedField": "value"
}
```
<br>

##### Posible errors

Error code|HTTP status code|Description
---|---|---
validationErrors|400|If there are validations errors, the response will look like this:<br><pre><code>{ &#13; "code": "validationErrors",&#13; "message": "There are validation errors", &#13; "errors": [ &#13; { &#13;     "field": "name", &#13;     "fieldLabel": "Name", &#13;     "code": "required", &#13;     "message": "This field is required", &#13;     "additionalInfo": null &#13; }, &#13; { &#13;      "field": "state", &#13;      "fieldLabel": "State", &#13;      "code": "invalid", &#13;      "message": "Not a valid choice", &#13;      "additionalInfo": { &#13;           "rejectedValue": "sdfsdfsd" &#13;      } &#13; }]&#13;}</pre></code><br>In this case you will get details information about the field having issues, the error code and a human readable description of the error. Additional information might be added depending on the type of error, for example the rejected value.
forbidden|403|Provided token does not have permissions to create records on this entity.
notFound|404|If entity name does not exist.
optimisticLocking|409|If another user modified the data in the middle. This can be determined only if you provide the version field.

##### Samples

``` js
// updates a few fields in a company record

PUT /data/companies/588775f63b063a0007604f4c
> Content-Type: application/json
> Accept: application/json
> token: token

{
  "version": 1,
  "state": "active",
  "type": "b",
  "numberOfEmployees": 100
}


PUT /data/companies/588775f63b063a0007604f4c
< Content-Type: application/json

{
  "id": "588775f63b063a0007604f4c",
  "version": 2,
  "label": "Test 1",
  "name": "Test 1",
  "state": "active",
  "type": "b",
  "numberOfEmployees": 100,
  "isCustomer": false,
  "contactInformation": {
    "phoneNumber": "1-702-845-9380",
    "email": "jwoodsrq@spotify.com",
    "id": "588775f63b063a0007604f4a",
    "label": "Contact Information"
  },
  "addresses": [
    {
      "addressLine": "4 Magdeline Place",
      "zipCode": "89145",
      "city": "Las Vegas",
      "state": "NV",
      "id": "588775f63b063a0007604f4b",
      "label": "NV - 89145"
    }
  ],
  "homepage": "http://www.browsezoom.com",
  "taxId": "350-KWM",
  "rating": "2.8",
  "notes": "test notes",
  "lastMeeting": 1429623180000,
  "lastUpdate": 1485288240000
}
```
<br>


#### Delete one record

``` js
DELETE /data/{entityName}/{id}
```
<br>

> Deletes a record from the database. You won’t be able to recover the deleted record (except that you have enabled history for that entity).

##### Request

``` js
DELETE /data/{entityName}/{id}
> Accept: application/json
> token: token
```
<br>

| Parameter   | Required  | Description |
| ----------- | -------- | ----------- |
| **`entityName`**            | yes      | Name of the entity the record belongs to.|
| **`id`**| yes| ID of the record to delete.
| **`_async`** | no | This parameter indicates whether the deletion should be executed in the background, which is necessary if the execution is expected to take more than 30 seconds. When you set this parameter to **`true`**, the response from this method will provide a reference to the job responsible for executing the deletion.


##### Response

The response will vary based on the **`async`** parameter. There are two possible responses:

- **`Record`**: If the **`async`** parameter is set to **`false`**, this method will return the deleted record.

- **`Job Reference`**: If the **`async`** parameter is set to **`true`**, the method will return a reference to the job responsible for executing the deletion process. Once the job is completed, you can retrieve the process's response from the job's results.

##### Posible errors

Error code|HTTP status code|Description
---|---|---
forbidden|403|Provided token does not have permissions to delete this record.
notFound|404|Either entity or record ID does not exist.

##### Samples

``` js
// deletes one company

DELETE /data/companies/588775f63b063a0007604f4c
> Accept: application/json
> token: token



DELETE /data/companies/588775f63b063a0007604f4c
< Content-Type: application/json

{
  "id": "588775f63b063a0007604f4c",
  "version": 10,
  "label": "Test 1",
  "name": "Test 1",
  "state": "active",
  "type": "b",
  "numberOfEmployees": 100,
  "isCustomer": false,
  "contactInformation": {
    "phoneNumber": "1-702-845-9380",
    "email": "jwoodsrq@spotify.com",
    "id": "588775f63b063a0007604f4a",
    "label": "Contact Information"
  },
  "addresses": [
    {
      "addressLine": "4 Magdeline Place",
      "zipCode": "89145",
      "city": "Las Vegas",
      "state": "NV",
      "id": "588775f63b063a0007604f4b",
      "label": "NV - 89145"
    }
  ],
  "homepage": "http://www.browsezoom.com",
  "taxId": "350-KWM",
  "rating": "2.8",
  "notes": "test notes",
  "lastMeeting": 1429623180000,
  "lastUpdate": 1485288240000
}
```
<br>

``` js
// deletes one company in the background

DELETE /data/companies/588775f63b063a0007604f4c?_async=true
> Accept: application/json
> token: token


DELETE /data/companies/588775f63b063a0007604f4c?_async=true
< Content-Type: application/json

{
  "jobLink": "/api/status/jobs/5887b6f23b063a0007604fa8",
  "jobId": "5887b6f23b063a0007604fa8"
}
```
<br>

#### Delete many records

``` js
DELETE /data/{entityName}/{ids}
```
<br>

> This method allows you to delete multiple records from the database. It's important to note that once records are deleted, they cannot be recovered unless you have enabled history tracking for the respective entity.

Upon initiating this method, a job will be created to handle the record deletions in the background. While the method itself returns immediately, you can monitor the status of the job to determine when it completes.

##### Request

``` js
DELETE /data/{entityName}/{ids}
> Accept: application/json
> token: token
```
<br>

| Parameter   | Required  | Description |
| ----------- | -------- | ----------- |
| **`entityName`**            | yes      | Name of the entity the records belongs to.|
| **`id`**| yes| IDs of the records to delete separated by commas.
| **`_async`** | no | This parameter indicates whether the deletion should be executed in the background. This is necessary if either the execution is expected to take more than 30 seconds or if you intend to delete more than 1,000 records.<br> When you set this parameter to **`true`**, the method's response will provide a reference to the job responsible for executing the deletion.

##### Response

The response varies depending on the value of the **`_async`** parameter. There are two possible responses:

**1. Map with Records (if `_async` is `false`):**  
   If the **`_async`** parameter is set to `false`, the result will be a map. Each record's ID will serve as the key, and the corresponding value will be a map containing fields for the status and response (which represents the deleted record in JSON format). In case of an error, the value will contain an **`errorMessage`**.

**2. Job Reference (if `_async` is `true`):**  
   When the **`_async`** parameter is set to **`true`**, the method returns a reference to the job responsible for executing the deletion process. Once the job is completed, you can find the response of the process within the job's results.

##### Posible errors

Error code|HTTP status code|Description
---|---|---
forbidden|403|Provided token does not have permissions to delete records on this entity.
notFound|404|If the entity name does not exist.

##### Samples

``` js
// deletes two companies

DELETE /data/companies/57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565
> Accept: application/json
> token: token



DELETE /data/companies/57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565
< Content-Type: application/json

{
  "57fd2d65e4b0ce322b0c8665": {
    "status": "ok",
    "response": {
      "id": "57fd2d65e4b0ce322b0c8665",
      "version": 381,
      "label": "Browsezoom",
      "entity": {
        "id": "57fce228e4b0f6600fdfb836",
        "name": "Companies"
      },
      "name": "Browsezoom",
      "state": "pending",
      "type": "a",
      "numberOfEmployees": 95,
      "isCustomer": false,
      "contactInformation": {
        "id": "58837fdd3b063a0007603547",
        "label": "Contact Information"
        "phoneNumber": "1-702-845-9380",
        "email": "jwoodsrq@spotify.com"
      },
      "addresses": [
        {
          "id": "57fd45aee4b0ce322b0c86aa",
          "label": "NV - 89145",
          "addressLine": "4 Magdeline Place",
          "zipCode": "89145",
          "city": "Las Vegas",
          "state": "NV"
        }
      ],
      "homepage": "http://www.browsezoom.com",
      "taxId": "350-KWM",
      "rating": "2.8",
      "notes": "modified notes",
      "lastMeeting": 1429623180000,
      "lastUpdate": 1485292080000
    }
  },
  "57fd2d65e4b0ce322b0c8565": {
    "status": "ok",
    "response": {
      "id": "57fd2d65e4b0ce322b0c8565",
      "version": 377,
      "label": "Blogpad",
      "name": "Blogpad",
      "state": "pending",
      "type": "b",
      "numberOfEmployees": 534,
      "isCustomer": false,
      "contactInformation": {
        "id": "581224c8e4b0285870237cc5",
        "label": "Contact Information",
        "phoneNumber": "1-405-298-5885",
        "email": "molsonre@rakuten.co.jp"
      },
      "addresses": [
        {
          "id": "57fd45aee4b0ce322b0c86ac",
          "label": "OK - 73157",
          "addressLine": "4 Crownhardt Plaza",
          "zipCode": "73157",
          "city": "Oklahoma City",
          "state": "OK"
        }
      ],
      "homepage": "http://www.blogpad.com",
      "taxId": "123-ABC",
      "rating": "3.3",
      "notes": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
      "lastMeeting": 1422111300000,
      "lastUpdate": 1485292500000
    }
  }
}
```
<br>

``` js
// deletes two companies in the background

DELETE /data/companies/588775f63b063a0007604f4c,588775f63b063a0007604f8b?_async=true
> Accept: application/json
> token: token



DELETE /data/companies/588775f63b063a0007604f4c,588775f63b063a0007604f8b?_async=true
< Content-Type: application/json

{
  "jobLink": "/api/status/jobs/5887b6f23b063a0007604fa8",
  "jobId": "5887b6f23b063a0007604fa8"
}
```
<br>


#### Delete records over query

``` js
DELETE /data/{entityName}
```
<br>

> This method is used to delete all records that match a specified query. It's important to note that once records are deleted, they cannot be recovered unless you have enabled history tracking for the corresponding entity.

Upon initiating this method, a job will be generated to handle the deletion of the records in the background. While the method itself returns promptly, you have the option to monitor the job's status to determine when the deletion process is complete.

##### Request

``` js
DELETE /data/{entityName}
> Accept: application/json
> token: token
```
<br>

| Parameter   | Required  | Default | Description
| ----------- | -------- | ------ | --- 
| **`entityName`**            | yes      | -| Name of the entity records belongs to.|
| **`queryParameters`**| no| - |These are the query parameters. See Query language for more information.
| **`_async`** | no | - | This parameter indicates whether the deletion should be executed in the background, which is necessary if the execution is expected to take more than 30 seconds or you want to delete more than 1,000 records. When you set this parameter to **`true`**, the response from this method will provide a reference to the job responsible for executing the deletion.
| **`_lowPriority`** | no | - | Sets job as low priority will make the deletion only happen when there are no many jobs running.
| **`_triggerEvents`**| no |true | - | If **`false`** events of deletion won’t be triggered.
| **`_cascatdeOperations`** | no | true | - | If **`false`** cascade update to update relationship fields or aggregate fields won’t be executed.

##### Response

The response varies depending on the value of the **`_async`** parameter. There are two possible responses:

**1. Map with Records (if `_async` is `false`):**  
   If the **`_async`** parameter is set to **`false`**, the result will be a map. Each record's ID will serve as the key, and the corresponding value will be a map containing fields for the status and response (which represents the deleted record in JSON format). In case of an error, the value will contain an **`errorMessage`**.

**2. Job Reference (if `_async` is `true`):**  
   When the **`_async`** parameter is set to **`true`**, the method returns a reference to the job responsible for executing the deletion process. Once the job is completed, you can find the response of the process within the job's results.

##### Posible errors

Error code|HTTP status code|Description
---|---|---
forbidden|403|Provided token does not have permissions to delete records on this entity.
notFound|404|If the entity name does not exist.

##### Samples

``` js
// deletes companies with type 'a'

DELETE /data/companies?type=a
> Accept: application/json
> token: token



DELETE /data/companies?type=a
< Content-Type: application/json

{
  "57fd2d65e4b0ce322b0c8665": {
    "status": "ok",
    "response": {
      "id": "57fd2d65e4b0ce322b0c8665",
      "version": 381,
      "label": "Browsezoom",
      "entity": {
        "id": "57fce228e4b0f6600fdfb836",
        "name": "Companies"
      },
      "name": "Browsezoom",
      "state": "pending",
      "type": "a",
      "numberOfEmployees": 95,
      "isCustomer": false,
      "contactInformation": {
        "id": "58837fdd3b063a0007603547",
        "label": "Contact Information"
        "phoneNumber": "1-702-845-9380",
        "email": "jwoodsrq@spotify.com"
      },
      "addresses": [
        {
          "id": "57fd45aee4b0ce322b0c86aa",
          "label": "NV - 89145",
          "addressLine": "4 Magdeline Place",
          "zipCode": "89145",
          "city": "Las Vegas",
          "state": "NV"
        }
      ],
      "homepage": "http://www.browsezoom.com",
      "taxId": "350-KWM",
      "rating": "2.8",
      "notes": "modified notes",
      "lastMeeting": 1429623180000,
      "lastUpdate": 1485292080000
    }
  }
}
```
<br>

``` js
deletes companies with type 'a' in the background

DELETE /data/companies?_async=true&type=a
> Accept: application/json
> token: token

DELETE /data/companies?_async=true&type=a
< Content-Type: application/json

{
  "jobLink": "/api/status/jobs/5887b6f23b063a0007604fa8",
  "jobId": "5887b6f23b063a0007604fa8"
}
```
<br>

#### Optimistic locking

Optimistic locking is a feature designed to prevent inadvertent overwriting of changes made by other users to a record. It accomplishes this by utilizing a record version, represented as a numerical value that increments each time a record undergoes modification.

When updating a record, if you include the **`version`** field within the request body and this version does not match the record's current version on the server, the operation will result in a 409 error. This mechanism effectively safeguards against unintentional overwrites of changes made by other users.

If the **`version`** field is omitted from the request, no version control will be applied, potentially leading to the unintentional overwriting of changes made by others. Consequently, it is strongly recommended to always include the **`version`** field when updating records.

### Aggregate queries

``` js
PUT /data/{entityName}/aggregate
```
<br>

> You can perform aggregation operations like count, sum or average.

For detailed documentation please check [Aggregate queries]({{<ref "/dev-reference/queries/aggregate-queries.md">}}).

##### Request

The request’s body contains the chain of operations to execute over the entity records. For more information please check documentation for [Aggregate queries]({{<ref "/dev-reference/queries/aggregate-queries.md">}}).

``` js
PUT /data/{entityName}/aggregate
> Content-Type: application/json
> Accept: application/json
> token: token

[
  {"operation1": "settings"},
  {"operation2": "settings"},
  {"operationN": "settings"}
]
```
<br>

| Parameter   | Required  | Description |
| ----------- | -------- | ------- |
| **`entityName`**            | Yes      |Name of the entity the record belongs to. |

##### Response

The result of the aggregation is returned. The format is specific to the aggregation done, so please check the documentation for [Aggregate queries]({{<ref "/dev-reference/queries/aggregate-queries.md">}}).

##### Posible errors

Error code|HTTP status code|Description
---|---|---
badRequest|400|Aggregation query is not valid.
forbidden|403|You are trying to aggregate data you don’t have permissions to read. This applies at the entity level, record level and field level.

##### Samples

``` js
// counts the number of skills per company

PUT /data/contacts/aggregate
> Content-Type: application/json
> Accept: application/json
> token: token

[
  {"project": "company,numberOfSkills"},
  {"group": {"by": "company", "totalSkills": "sum(numberOfSkills)"}}
]


PUT /data/contacts/aggregate
< Content-Type: application/json

{
  "total": 6,
  "items": [
    {
      "company": "Trudoo",
      "totalSkills": 1
    },
    {
      "company": "Riffwire",
      "totalSkills": 3
    },
    {
      "company": "Snaptags",
      "totalSkills": 2
    },
    {
      "company": "Edgeify",
      "totalSkills": 0
    },
    {
      "company": "Flipopia",
      "totalSkills": 3
    },
    {
      "company": "Rooxo",
      "totalSkills": 4
    }
  }
]
```
<br>

### Actions

#### Execute action over one record

``` js
PUT /data/{entityName}/{id}/{actionName}
```
<br>

> Execute an action over one record.

##### Request

When the action includes parameters, you can send these parameters within the request body. The format should follow the same structure as when creating or updating records. However, in this context, instead of fields, you should provide the parameters relevant to the action.

In cases where the action does not require any parameters, you can simply leave the request body empty.

``` js
PUT /data/{entityName}/{id}/{actionName}
> Content-Type: application/json
> Accept: application/json
> token: token

{
  "param1": "value",
  "param2": value
}
```
<br>

| Parameter   | Required  | Description |
| ----------- | -------- | ----------- |
| **`entityName`**            | yes      | Name of the entity the record belongs to.|
| **`id`**| yes| ID of the record to execute the action on.
|**`actionName`** | yes | The name of the action that has to be executed.
| **`_async`** | no | This parameter indicates whether the deletion should be executed in the background, which is necessary if the execution is expected to take more than 30 seconds. When you set this parameter to **`true`**, the response from this method will provide a reference to the job responsible for executing the deletion.<br>This parameter will override the default configured in the action.

##### Response

The response varies based on the action type and the **`_async`** parameter. There are three possible response scenarios:

**1. Record Response (if `_async` is `false` and the action type is 'One record'):**  
   When **`_async`** is set to **`false`** and the action does not return a custom response, this method will return the updated record. This scenario is applicable only to actions of type 'One record.'

**2. Custom Action's Response (if `_async` is `false` and the action returns a custom response):**  
   When **`_async`** is **`false`**, and the action returns a custom response, that specific response will be returned. Note that actions of type 'Many records' should always provide a custom response. If they do not return anything, an empty response will be generated.

**3. Job Reference (if `_async` is `true`):**  
   In cases where **`_async`** is set to **`true`**, the method will return a reference to the job responsible for executing the action. Once the action is completed, you can locate the response of the action within the job's results.

Below, you can find examples illustrating each of these response types.

##### Posible errors

Error code|HTTP status code|Description
---|---|---
badRequest|400|If request is not allowed. For example, pre-conditions in the actions are not met.
forbidden|403|You don’t have permissions to execute the action or you don’t have permissions for the record.
notFound|404|Either entity or record ID does not exist.

##### Samples

``` js
// executes a simple action over a company record, no custom response

PUT /data/companies/57fd2d65e4b0ce322b0c8665/logSomething
> Content-Type: application/json
> Accept: application/json
> token: token

{
    "param1": "a",
    "param2": "b"
}


PUT /data/companies/57fd2d65e4b0ce322b0c8665/logSomething
< Content-Type: application/json

{
  "id": "57fd2d65e4b0ce322b0c8665",
  "version": 381,
  "label": "Browsezoom",
  "name": "Browsezoom",
  "state": "pending",
  "type": "a",
  "numberOfEmployees": 95,
  "isCustomer": false,
  "contactInformation": {
    "id": "58837fdd3b063a0007603547",
    "label": "Contact Information",
    "phoneNumber": "1-702-845-9380",
    "email": "jwoodsrq@spotify.com",
  },
  "addresses": [
    {
      "id": "57fd45aee4b0ce322b0c86aa",
      "label": "NV - 89145",
      "addressLine": "4 Magdeline Place",
      "zipCode": "89145",
      "city": "Las Vegas",
      "state": "NV"
    }
  ],
  "homepage": "http://www.browsezoom.com",
  "taxId": "350-KWM",
  "rating": "2.8",
  "notes": "modified notes",
  "lastMeeting": 1429623180000,
  "lastUpdate": 1485292080000
}
```
<br>

``` js
// executes a simple action over a company record in the background, no custom response

PUT /data/companies/57fd2d65e4b0ce322b0c8665/logSomething?_async=true
> Content-Type: application/json
> Accept: application/json
> token: token

{
    "param1": "a",
    "param2": "b"
}


PUT /data/companies/57fd2d65e4b0ce322b0c8665/logSomething?_async=true
< Content-Type: application/json

{
  "jobLink": "/api/status/jobs/588f3e65b45fc9000bc1baa7",
  "jobId": "588f3e65b45fc9000bc1baa7"
}
```
<br>

```js
// executes an action that works with many records and returns a custom response

PUT /data/companies/57fd2d65e4b0ce322b0c8665/countEmployees
> Content-Type: application/json
> Accept: application/json
> token: token



PUT /data/companies/57fd2d65e4b0ce322b0c8665/countEmployees
< Content-Type: application/json

{
    "numberOfEmployees": 95
}
```
<br>


#### Execute action over many records

``` js
PUT /data/{entityName}/{ids}/{actionName}
```
<br>

> Execute an action over many records. The action will be executed in each record one by one if the action is of type **`One record`**.

##### Request

When the action includes parameters, you can send these parameters within the request body. The format should follow the same structure as when creating or updating records. However, in this context, instead of fields, you should provide the parameters relevant to the action.

In cases where the action does not require any parameters, you can simply leave the request body empty.

``` js
PUT /data/{entityName}/{ids}/{actionName}
> Content-Type: application/json
> Accept: application/json
> token: token

{
  "param1": "value",
  "param2": value
}
```
<br>

| Parameter   | Required  | Description |
| ----------- | -------- | ----------- |
| **`entityName`**            | yes      | Name of the entity the record belongs to.|
| **`ids`**| yes| IDs of the records to execute the action on separated by commas.
|**`actionName`** | yes | The name of the action that has to be executed.
| **`_async`** | no | This parameter indicates whether the deletion should be executed in the background, which is necessary if the execution is expected to take more than 30 seconds or if it is applied over more than 1,000 records. When you set this parameter to **`true`**, the response from this method will provide a reference to the job responsible for executing the deletion.<br>This parameter will override the default configured in the action.

##### Response

The response varies based on the action type and the **`_async`** parameter. There are three possible response scenarios:

**1. Map with Records (if `_async` is `false` and the action type is 'One record'):**  
   When **`_async`** is set to **`false`**, and the action does not return a custom response, the result will be a map. Each record's ID serves as the key, and the corresponding value includes fields for the status and response (representing the record as JSON) or an errorMessage in case of an error. This applies specifically to actions of type 'One record.'

**2. Custom Action's Responses (if `_async` is `false` and the action returns a custom response):**  
   When **`_async`** is **`false`**, and the action returns a custom response, a map is returned with each record's ID (for each record) serving as a key. Each key is associated with a map containing the status ("ok" or "error") and a response field containing the custom response. Note that actions of type 'Many records' should always provide a custom response. If they do not return anything, an empty response will be generated.

**3. Job Reference (if `_async` is `true`):**  
   In cases where **`_async`** is set to **`true`**, the method will return a reference to the job responsible for executing the action. Once the action is completed, you can find the response of the action within the results of the job.

Below, you can find examples illustrating each of these response types.

##### Posible errors

Error code|HTTP status code|Description
---|---|---
forbidden|403|You don’t have permissions to execute the action.
notFound|404|If the entity name does not exist.

##### Samples

``` js
// executes a simple action over two company records, no custom response

PUT /data/companies/57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565/logSomething
> Content-Type: application/json
> Accept: application/json
> token: token

{
    "param1": "a",
    "param2": "b"
}


PUT /data/companies/57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565/logSomething
< Content-Type: application/json

{
  "57fd2d65e4b0ce322b0c8665": {
    "status": "ok",
    "response": {
      "id": "57fd2d65e4b0ce322b0c8665",
      "version": 381,
      "label": "Browsezoom",
      "entity": {
        "id": "57fce228e4b0f6600fdfb836",
        "name": "Companies"
      },
      "name": "Browsezoom",
      "state": "pending",
      "type": "a",
      "numberOfEmployees": 95,
      "isCustomer": false,
      "contactInformation": {
        "id": "58837fdd3b063a0007603547",
        "label": "Contact Information"
        "phoneNumber": "1-702-845-9380",
        "email": "jwoodsrq@spotify.com"
      },
      "addresses": [
        {
          "id": "57fd45aee4b0ce322b0c86aa",
          "label": "NV - 89145",
          "addressLine": "4 Magdeline Place",
          "zipCode": "89145",
          "city": "Las Vegas",
          "state": "NV"
        }
      ],
      "homepage": "http://www.browsezoom.com",
      "taxId": "350-KWM",
      "rating": "2.8",
      "notes": "modified notes",
      "lastMeeting": 1429623180000,
      "lastUpdate": 1485292080000
    }
  },
  "57fd2d65e4b0ce322b0c8565": {
    "status": "ok",
    "response": {
      "id": "57fd2d65e4b0ce322b0c8565",
      "version": 377,
      "label": "Blogpad",
      "name": "Blogpad",
      "state": "pending",
      "type": "b",
      "numberOfEmployees": 534,
      "isCustomer": false,
      "contactInformation": {
        "id": "581224c8e4b0285870237cc5",
        "label": "Contact Information",
        "phoneNumber": "1-405-298-5885",
        "email": "molsonre@rakuten.co.jp"
      },
      "addresses": [
        {
          "id": "57fd45aee4b0ce322b0c86ac",
          "label": "OK - 73157",
          "addressLine": "4 Crownhardt Plaza",
          "zipCode": "73157",
          "city": "Oklahoma City",
          "state": "OK"
        }
      ],
      "homepage": "http://www.blogpad.com",
      "taxId": "123-ABC",
      "rating": "3.3",
      "notes": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
      "lastMeeting": 1422111300000,
      "lastUpdate": 1485292500000
    }
  }
}
```
<br>

``` js
// executes a simple action over two company records with custom response

PUT /data/companies/57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565/customResponse
> Content-Type: application/json
> Accept: application/json
> token: token



PUT /data/companies/57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565/customResponse
< Content-Type: application/json

{
  "57fd2d65e4b0ce322b0c8665": {
      "status": "ok",
      "response": "This is a custom response"
  },
  "57fd2d65e4b0ce322b0c8565": {
      "status": "ok",
      "response": "This is a custom response"
  }
}
```
<br>

```js
// executes a simple action over two company records in the background

PUT /data/companies/57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565/logSomething?_async=true
> Content-Type: application/json
> Accept: application/json
> token: token

{
    "param1": "a",
    "param2": "b"
}


PUT /data/companies/57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565/logSomething?_async=true
< Content-Type: application/json

{
  "jobLink": "/api/status/jobs/588f45e2b45fc9000bc1bd1f",
  "jobId": "588f45e2b45fc9000bc1bd1f"
}
```
<br>

``` js
// executes an action that works with many records over two records and returns a custom response

PUT /data/companies/57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565/countEmployees
> Content-Type: application/json
> Accept: application/json
> token: token

PUT /data/companies/57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565/countEmployees
< Content-Type: application/json

{
    "numberOfEmployees": 629
}
```
<br>


#### Execute action over query

``` js
PUT /data/{entityName}/{actionName}
```
<br>

> Execute an action over records matched by a query.

##### Request

When the action includes parameters, you can send these parameters within the request body. The format should follow the same structure as when creating or updating records. However, in this context, instead of fields, you should provide the parameters relevant to the action.

In cases where the action does not require any parameters, you can simply leave the request body empty.

``` js
PUT /data/{entityName}/{actionName}
> Content-Type: application/json
> Accept: application/json
> token: token

{
  "param1": "value",
  "param2": value
}
```
<br>

| Parameter   | Required  | Description |
| ----------- | -------- | ----------- |
| **`entityName`**            | yes      | Name of the entity the records belongs to.|
| **`id`**| yes| ID of the records to execute the action on.
|**`actionName`** | yes | The name of the action that has to be executed.
| **`_async`** | no | This parameter indicates whether the deletion should be executed in the background, which is necessary if the execution is expected to take more than 30 seconds or if it is applied over more than 1,000 records. When you set this parameter to **`true`**, the response from this method will provide a reference to the job responsible for executing the deletion.<br>This parameter will override the default configured in the action.
| queryParameters | no | These are the query parameters. See [Query language]({{<ref "/dev-reference/queries/query-language.md">}}) for more information.

##### Response

The response varies based on the action type and the **`_async`** parameter. There are three possible response scenarios:

**1. Map with Records (if `_async` is `false` and the action type is 'One record'):**  
   When **`_async`** is set to **`false`**, and the action does not return a custom response, the result will be a map. Each record's ID serves as the key, and the corresponding value includes fields for the status and response (representing the record as JSON) or an errorMessage in case of an error. This applies specifically to actions of type 'One record.'

**2. Custom Action's Responses (if `_async` is `false` and the action returns a custom response):**  
   When **`_async`** is **`false`**, and the action returns a custom response, a map is returned with each record's ID (for each record) serving as a key. Each key is associated with a map containing the status ("ok" or "error") and a response field containing the custom response. Note that actions of type 'Many records' should always provide a custom response. If they do not return anything, an empty response will be generated.

**3. Job Reference (if `_async` is `true`):**  
   In cases where **`_async`** is set to **`true`**, the method will return a reference to the job responsible for executing the action. Once the action is completed, you can find the response of the action within the results of the job.

Below, you can find examples illustrating each of these response types.

##### Posible errors

Error code|HTTP status code|Description
---|---|---
forbidden|403|You don’t have permissions to execute the action.
notFound|404|If the entity name does not exist.

##### Samples

``` js
// executes a simple action over two company records, no custom response

PUT /data/companies/logSomething?id=57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565
> Content-Type: application/json
> Accept: application/json
> token: token

{
    "param1": "a",
    "param2": "b"
}


PUT /data/companies/logSomething?id=57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565
< Content-Type: application/json

{
  "57fd2d65e4b0ce322b0c8665": {
    "status": "ok",
    "response": {
      "id": "57fd2d65e4b0ce322b0c8665",
      "version": 381,
      "label": "Browsezoom",
      "entity": {
        "id": "57fce228e4b0f6600fdfb836",
        "name": "Companies"
      },
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
      "lastUpdate": 1485292080000
    }
  },
  "57fd2d65e4b0ce322b0c8565": {
    "status": "ok",
    "response": {
      "id": "57fd2d65e4b0ce322b0c8565",
      "version": 377,
      "label": "Blogpad",
      "name": "Blogpad",
      "state": "pending",
      "type": "b",
      "numberOfEmployees": 534,
      "isCustomer": false,
      "contactInformation": {
        "phoneNumber": "1-405-298-5885",
        "email": "molsonre@rakuten.co.jp",
        "id": "581224c8e4b0285870237cc5",
        "label": "Contact Information"
      },
      "addresses": [
        {
          "addressLine": "4 Crownhardt Plaza",
          "zipCode": "73157",
          "city": "Oklahoma City",
          "state": "OK",
          "id": "57fd45aee4b0ce322b0c86ac",
          "label": "OK - 73157"
        }
      ],
      "homepage": "http://www.blogpad.com",
      "taxId": "123-ABC",
      "rating": "3.3",
      "notes": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
      "lastMeeting": 1422111300000,
      "lastUpdate": 1485292500000
    }
  }
}
```
<br>

``` js
// executes a simple action over two company records with custom response

PUT /data/companies/customResponse?id=57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565
> Content-Type: application/json
> Accept: application/json
> token: token

PUT /data/companies/customResponse?id=57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565
< Content-Type: application/json

{
  "57fd2d65e4b0ce322b0c8665": {
      "status": "ok",
      "response": "This is a custom response"
  },
  "57fd2d65e4b0ce322b0c8565": {
      "status": "ok",
      "response": "This is a custom response"
  }
}
```
<br>

```js
// executes a simple action over two company records in the background

PUT /data/companies/logSomething?_async=true&id=57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565
> Content-Type: application/json
> Accept: application/json
> token: token

{
    "param1": "a",
    "param2": "b"
}


PUT /data/companies/logSomething?_async=true&id=57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565
< Content-Type: application/json

{
  "jobLink": "/api/status/jobs/588f45e2b45fc9000bc1bd1f",
  "jobId": "588f45e2b45fc9000bc1bd1f"
}
```
<br>

``` js
// executes an action that works with many records over two records and returns a custom response

PUT /data/companies/countEmployees?id=57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565
> Content-Type: application/json
> Accept: application/json
> token: token

PUT /data/companies/countEmployees?id=57fd2d65e4b0ce322b0c8665,57fd2d65e4b0ce322b0c8565
< Content-Type: application/json

{
    "numberOfEmployees": 629
}
```
<br>

### Import records

``` js
POST /data/{entityName}/import
```
<br>

> Imports records from a CSV file.

##### Request

This feature allows you to import records from a CSV file into your system. When preparing the CSV file, please adhere to the following rules:

**Headers:**  
Headers in the CSV file should correspond to the field paths you wish to import. For instance, a field named "name" located at the root of the entity should have "name" as its header. For nested fields, use the full path, such as "address.state." When dealing with multi-valued fields, specify the index, like "phoneNumbers[0]" or "phoneNumbers[1]."

**Data Format:**  
The data format in the CSV file should match the type of each field being imported. Refer to the documentation for each field type to ensure you are using the correct format.

**Template Creation:**  
To create a CSV file template, you can often export existing records using field names instead of labels as a starting point.

**Record Handling:**  
- Records will be created if they do not already exist in the system.
- If records already exist, they will be updated. To determine if a record exists, a unique field must be included in the CSV file's headers. If multiple unique fields are present, the first one encountered will be used.

**Importing into Related Entities:**  
It is also possible to import records into related entities. For example, if you have a "contacts" entity with a relationship called "company" pointing to the "companies" entity, your CSV file headers can reflect this relationship structure: 

``` 
company.name,company.type,firstName,lastName,email
```
<br>

Your CSV file includes headers like "company.name" and "company.type" referring to fields within the "companies" entity. In this scenario:

- The import process will attempt to match an existing company based on the "name" field (assuming "name" is a unique field) and update its "type" field if a match is found.

- If no match is found, a new record will be created in the "companies" entity, and it will be associated with the record in the "contacts" entity. This enables you to create records in multiple entities with just a single import.

The entire import process occurs within the context of a background job, ensuring efficient handling of the data.

``` js
POST /data/{entityName}/import
> Content-Type: multipart/form-data
> Accept: application/json
> token: token
```
<br>

| Parameter                  | Required | Default | Description |
| -------------------------- | -------- | ------- | ----------- |
| **`entityName`**           | Yes      | -       | Specifies the name of the entity to which the record belongs. |
| **`file`**                 | Yes      | -       | Indicates the multi-part CSV file to be imported. |
| **`lowPriority`**          | No       | -       | When set, the import process is scheduled to execute when there are fewer concurrent jobs running. This is particularly useful for large imports to prevent delays in other job executions. |
| **`updateCalculatedFields`** | No    | True    | Allows you to expedite large imports by skipping the recalculation of calculated fields. However, this may result in calculated fields having outdated values, which can be recalculated later. (Note: This option is intended for developers.) |
| **`updateRelationships`**   | No       | True    | Controls whether an import updating a record's label triggers a cascade update in related records. Disabling this feature can improve performance for large imports. (Note: This option is intended for developers.) |
| **`performValidations`**    | No       | True    | By setting this to false, you can skip type-based validations during import. Structural and data format validations remain active, ensuring data integrity. For example, an integer field may skip max and min value validations but still require a numeric value. (Note: This option is intended for developers.) |
| **`filterByAccessRules`**   | No       | True    | Determines whether fields should be filtered based on access rules. Disabling this feature results in importing all fields regardless of their accessibility, potentially enhancing import performance. (Note: This option is intended for developers.) |
| **`performSecurityChecks`** | No       | True    | When set to false, security permissions are bypassed during import. This can improve performance or mitigate certain issues during the import process. (Note: This option is intended for developers.) |
| **`triggerEvents`**         | No       | True    | Governs the execution of event listeners associated with record creation or updates. If disabled (set to false), these listeners will not be triggered. (Note: This option is intended for developers.) |
| **`setDefaultValues`**      | No       | True    | Controls whether default values are calculated for fields during import. Disabling this feature can enhance performance during large imports. (Note: This option is intended for developers.) |
| **`supportTransientFields`** | No     | True    | Decides whether transient fields are managed as transient during import. Disabling this feature may improve performance in large imports. (Note: This option is intended for developers.) |
| **`cascadeOperations`**     | No      | True    | Specifies whether importing or updating records can trigger various cascade operations, such as copying fields or aggregating data. Setting this to false prevents these operations. (Note: This option is intended for developers.) |
| **`skipRecordsWithInvalidFields`** | No | True | Determines the treatment of records with invalid fields (validation errors). If set to false, records will be created or updated with errors that must be corrected later. (Note: This option is intended for developers.) |

##### Response

A reference to the job in charge of perform the import.

``` js
POST /data/{entityName}/import
< Content-Type: application/json

{
  "jobLink": "/api/status/jobs/588f8357b45fc9000bc1bd2a",
  "jobId": "588f8357b45fc9000bc1bd2a"
}
```
<br>

##### Posible errors

Error code|HTTP status code|Description
---|---|---
forbidden|403|You don’t have permissions to import records on this entity.
notFound|404|The entity name does not exist.

##### Samples

``` js
// imports a few companies from a CSV file

POST /data/companies/import
> Content-Type: multipart/form-data
> Accept: application/json
> token: token

name,type
test1,a
test2,b
test3,c


POST /data/companies/import
< Content-Type: application/json

{
  "jobLink": "/api/status/jobs/588f3e65b45fc9000bc1baa7",
  "jobId": "588f3e65b45fc9000bc1baa7"
}
```
<br>

### Export records

``` js
PUT /data/{entityName}/export
```
<br>

> This feature allows you to export records to a CSV file. You have the flexibility to apply filters to determine which records to export using a query and select specific fields to include in the export.

To specify which fields should be included in the CSV file, you can use the **`_fields`** parameter. Its usage is similar to queries, but with a few distinctions:

- You can include related fields, which are fields located in the entities pointed to by relationship fields. For instance, if you have a relationship field named "company" that references the "companies" entity, you can specify "company.type" to be included in the CSV file. If you only specify "company," only the label will be exported.

- If you leave the **`_fields`** parameter empty, all fields will be included in the export, except for related fields.

- System fields such as **`"id," "label," and "version"`** are not included in the export.

This flexibility allows you to tailor your CSV exports to your specific needs.

##### Request

``` js
PUT /data/{entityName}/export
> Content-Type: application/json
> Accept: application/json
> token: token
```
<br>

| Parameter                  | Required  | Description |
| -------------------------- | --------- | ----------- |
| **`entityName`**           | Yes       | Name of the entity the record belongs to.| 
| **`_useFieldNames`**       | No        | This flag modifies how headers are generated. If it is set to true it will use the name instead of the label to build the headers. Otherwise the label will be used, which is the default.
| **`queryParameters`**      | No        | These are the query parameters. See [Query language]({{<ref "/dev-reference/queries/query-language.md">}}) for more information.

##### Response

A reference to the job in charge of perform the import. To actually fetch the file you need to check when the job is finished and look into the results of the job, where you’ll find something like this:

``` js
{
  ...
  "hasErrors": false,
  "results": {
    "fileLink": "https://docs.slingrs.io/dev/runtime/api/files/588f864eb45fc9000bc1bd5c",
    "fileId": "588f864eb45fc9000bc1bd5c",
    "recordsExported": 283
  },
  "status": "FINISHED"
}
```
<br>

The field **`results.fileLink`** contains the URL to download the file. You need to pass the token in the headers when fetching the file or the token needs to be set in cookies.

``` js
PUT /data/{entityName}/export
< Content-Type: application/json

{
  "jobLink": "/api/status/jobs/588f8357b45fc9000bc1bd2a",
  "jobId": "588f8357b45fc9000bc1bd2a"
}
```
<br>

##### Posible errors

Error code|HTTP status code|Description
---|---|---
badRequest|400| If you are trying to export more than 1,000,000 records or if query is invalid.
forbidden|403|You don’t have permissions to export records on this entity.
notFound|404|The entity name does not exist.

##### Samples

``` js
// exports companies with type 'b', with a maxium of 50 records

PUT /data/companies/export?type=b&_size=50
> Content-Type: application/json
> Accept: application/json
> token: token



PUT /data/companies/export?type=b&_size=50
< Content-Type: application/json

{
  "jobLink": "/api/status/jobs/588f3e65b45fc9000bc1baa7",
  "jobId": "588f3e65b45fc9000bc1baa7"
}
```
<br>

``` js
// exports companies with type 'b', with a maxium of 50 records but only the fields name, address->state and mainContact->email.

PUT /data/companies/export?type=b&_size=50&_fields=name,address.state,mainContact.email
> Content-Type: application/json
> Accept: application/json
> token: token


PUT /data/companies/export?type=b&_size=50&_fields=name,address.state,mainContact.email
< Content-Type: application/json

{
  "jobLink": "/api/status/jobs/588f3e65b45fc9000bc1baa8",
  "jobId": "588f3e65b45fc9000bc1baa8"
}
```
<br>

### History

#### History for one record

``` js
GET /data/{entityName}/{id}/history
```
<br>

> Returns the history of a record. The entity needs to have history logs enabled.

##### Request

``` js
GET /data/{entityName}/{id}/history
> Accept: application/json
> token: token
```
<br>

| Parameter                  | Required  | Description |
| -------------------------- | --------- | ----------- |
| **`entityName`**           | Yes       | Name of the entity the record belongs to.| 
| **`id`**                   | Yes       | The ID of the record to get its history.| 
| **`_size`**                | No        | The number of history records to fetch. Always the latests logs will be retrieved.| 
| **`_offset`**              | No        | Specifies an ID of a history log to start fetching logs from. This is to allow pagination.| 

##### Response

The list of history logs for that record, sorted from the newest to the oldest ones.

``` js
GET /data/{entityName}/{id}/history
< Content-Type: application/json

{
  "total": 2,
  "offset": "588f8b99b45fc9000bc1bfc5",
  "items": [
    {
      "id": "588f8ba7b45fc9000bc1bfce",
      "entityId": "57fce228e4b0f6600fdfb836",
      "entityName": "companies",
      "entityVersion": 57,
      "recordId": "588f8b99b45fc9000bc1bfc4",
      "recordName": "test1",
      "user": "dgaviola@slingr.io",
      "timestamp": 1485802407010,
      "ip": "::ffff:10.240.0.15",
      "eventType": "USER_RECORD_CHANGED",
      "eventCategory": "USER",
      "contextPath": "entities.companies.update",
      "recordDeleted": null,
      "deletionDate": null,
      "oldRecord": {
        "type": {
          "json": "a",
          "text": "{type:a}"
        },
        "addresses": {
          "json": null,
          "text": "{}"
        }
      },
      "newRecord": {
        "type": {
          "json": "b",
          "text": "{type:b}"
        },
        "addresses": {
          "json": null,
          "text": "{}"
        }
      }
    },
    {
      "id": "588f8b99b45fc9000bc1bfc5",
      "entityId": "57fce228e4b0f6600fdfb836",
      "entityName": "companies",
      "entityVersion": 57,
      "recordId": "588f8b99b45fc9000bc1bfc4",
      "recordName": "test1",
      "user": "dgaviola@slingr.io",
      "timestamp": 1485802393836,
      "ip": "::ffff:10.240.0.11",
      "eventType": "USER_RECORD_CREATED",
      "eventCategory": "USER",
      "contextPath": "entities.companies.create",
      "recordDeleted": null,
      "deletionDate": null,
      "oldRecord": {},
      "newRecord": {
        "name": "test1",
        "state": "active",
        "type": "a",
        "numberOfEmployees": null,
        "isCustomer": false,
        "contactInformation": {
          "phoneNumber": null,
          "email": null,
          "id": "588f8b99b45fc9000bc1bfc3",
          "label": "Contact Information"
        },
        "homepage": null,
        "taxId": null,
        "rating": null,
        "notes": null,
        "lastMeeting": null,
        "lastUpdate": 1485802380000
      }
    }
  ]
}
```
<br>

| Path | Description |
| -------------------|-------------------------------------------------- |
| **`total`**            | Total number of history logs for the record.                                                                     |
| **`offset`**           | ID of the latest history log; include it as the **`_offset`** parameter for pagination to retrieve subsequent records. |
| **`items`**            | History logs with various fields; explanations for some key fields are provided below.                          |
| **`items[].eventCategory`** | Category of the event, with possible values: **`'USER'`** (change made by a user), **`'SCRIPT'`** (change made by a script), **`'SYSTEM'`** (system changes like cascade updates). |
| **`items[].eventType`**      | Type of event, depending on the category; options include:<br> - **`'USER_RECORD_CREATED'`**,<br> - **`'USER_RECORD_CHANGED'`**,<br> -  **`'USER_RECORD_DELETED'`**, <br> - **`'USER_ACTION_PERFORMED'`**, <br> - **`'SCRIPT_RECORD_CREATED'`**, <br> - **`'SCRIPT_RECORD_CHANGED'`**, <br> - **`'SCRIPT_RECORD_DELETED'`**, <br> - **`'SCRIPT_ACTION_PERFORMED'`**, <br> - **`'SYSTEM_CASCADE_UPDATE'`**, and <br> - **`'SYSTEM_REFACTORING'`**. |
| **`items[].contextPath`**   | Path describing where the change occurred; for example, it specifies which script made the change if it was a script. |
| **`items[].recordDeleted`** | Indicates if the record has been deleted (true or false). |
| **`items[].deletionDate`**  | Date when the record was deleted. |
| **`items[].oldRecord`**     | Contains the old values of modified fields in both JSON format and a more human-readable format. |
| **`items[].newRecord`**     | Contains the new values of modified fields in both JSON format and a more human-readable format. |

##### Posible errors

| Error code    | HTTP Status Code | Description
|---------------| -----------------|---
| badRequest  | 400             | Invalid record ID provided. |
| forbidden   | 403             | Insufficient permissions to view the history of records for the entity.|
|  notFound   | 404             | Entity name does not exist. Note that this error may not be returned if the record ID does not exist, as it could refer to a deleted record. |

##### Samples

``` js
// gets the history of a company record

GET /data/companies/588f8b99b45fc9000bc1bfc4/history
> Accept: application/json
> token: token



GET /data/companies/588f8b99b45fc9000bc1bfc4/history
< Content-Type: application/json

{
  "total": 2,
  "offset": "588f8b99b45fc9000bc1bfc5",
  "items": [
    {
      "id": "588f8ba7b45fc9000bc1bfce",
      "entityId": "57fce228e4b0f6600fdfb836",
      "entityName": "companies",
      "entityVersion": 57,
      "recordId": "588f8b99b45fc9000bc1bfc4",
      "recordName": "test1",
      "user": "dgaviola@slingr.io",
      "timestamp": 1485802407010,
      "ip": "::ffff:10.240.0.15",
      "eventType": "USER_RECORD_CHANGED",
      "eventCategory": "USER",
      "contextPath": "entities.companies.update",
      "recordDeleted": null,
      "deletionDate": null,
      "oldRecord": {
        "type": {
          "json": "a",
          "text": "{type:a}"
        },
        "addresses": {
          "json": null,
          "text": "{}"
        }
      },
      "newRecord": {
        "type": {
          "json": "b",
          "text": "{type:b}"
        },
        "addresses": {
          "json": null,
          "text": "{}"
        }
      }
    },
    {
      "id": "588f8b99b45fc9000bc1bfc5",
      "entityId": "57fce228e4b0f6600fdfb836",
      "entityName": "companies",
      "entityVersion": 57,
      "recordId": "588f8b99b45fc9000bc1bfc4",
      "recordName": "test1",
      "user": "dgaviola@slingr.io",
      "timestamp": 1485802393836,
      "ip": "::ffff:10.240.0.11",
      "eventType": "USER_RECORD_CREATED",
      "eventCategory": "USER",
      "contextPath": "entities.companies.create",
      "recordDeleted": null,
      "deletionDate": null,
      "oldRecord": {},
      "newRecord": {
        "name": "test1",
        "state": "active",
        "type": "a",
        "numberOfEmployees": null,
        "isCustomer": false,
        "contactInformation": {
          "phoneNumber": null,
          "email": null,
          "id": "588f8b99b45fc9000bc1bfc3",
          "nestedFieldLabel": "Contact Information",
          "id": "588f8b99b45fc9000bc1bfc3",
          "label": "Contact Information"
        },
        "homepage": null,
        "taxId": null,
        "rating": null,
        "notes": null,
        "lastMeeting": null,
        "lastUpdate": 1485802380000
      }
    }
  ]
}
```
<br>

#### History in entity

``` js
GET /data/{entityName}/history
```
<br>

> Returns the history logs for all records in an entity, which needs to have history logs enabled.

##### Request

``` js
GET /data/{entityName}/history
> Accept: application/json
> token: token
```
<br>

| Parameter                  | Required  | Description |
| -------------------------- | --------- | ----------- |
| **`entityName`**           | Yes       | Name of the entity the record belongs to.| 
| **`eventTypes`**           | No        |Allows to filter by some specific type of events. You can select many separating them by commas. Possible values are: <br> - **`'USER_RECORD_CREATED'`**,<br> - **`'USER_RECORD_CHANGED'`**,<br> -  **`'USER_RECORD_DELETED'`**, <br> - **`'USER_ACTION_PERFORMED'`**, <br> - **`'SCRIPT_RECORD_CREATED'`**, <br> - **`'SCRIPT_RECORD_CHANGED'`**, <br> - **`'SCRIPT_RECORD_DELETED'`**, <br> - **`'SCRIPT_ACTION_PERFORMED'`**, <br> - **`'SYSTEM_CASCADE_UPDATE'`**, and <br> - **`'SYSTEM_REFACTORING'`**. |
| **`to`**                   | No        | Allows to filter logs by timestamp. This is the maximum date and you should pass the number of milliseconds since Epoch.
| **`from`**                 | No        | Allows to filter logs by timestamp. This is the minimum date and you should pass the number of milliseconds since Epoch.
| **`_size`**                | No        | The number of history records to fetch. Always the latests logs will be retrieved.
| **`_offset`**              | No        | Specifies an ID of a history log to start fetching logs from. This is to allow pagination.


##### Response

The list of history logs for that record, sorted from the newest to the oldest ones.

``` js
GET /data/{entityName}/history
< Content-Type: application/json

{
  "total": 3,
  "offset": "588f8ba7b45fc9000bc1bfce",
  "items": [
    {
      "id": "588f9757b45fc9000bc1bfe1",
      "entityId": "57fce228e4b0f6600fdfb836",
      "entityName": "companies",
      "entityVersion": 57,
      "recordId": "588f9757b45fc9000bc1bfe0",
      "recordName": "test2",
      "user": "dgaviola@slingr.io",
      "timestamp": 1485805399966,
      "ip": "::ffff:10.240.0.11",
      "eventType": "USER_RECORD_CREATED",
      "eventCategory": "USER",
      "contextPath": "entities.companies.create",
      "recordDeleted": null,
      "deletionDate": null,
      "oldRecord": {},
      "newRecord": {
        "name": "test2",
        "state": "active",
        "type": "c",
        "color": "#e1e1e1",
        "numberOfEmployees": null,
        "isCustomer": false,
        "contactInformation": {
          "phoneNumber": null,
          "email": null,
          "id": "588f9757b45fc9000bc1bfdf",
          "nestedFieldLabel": "Contact Information",
          "id": "588f9757b45fc9000bc1bfdf",
          "label": "Contact Information"
        },
        "homepage": null,
        "taxId": null,
        "rating": null,
        "notes": null,
        "lastMeeting": null,
        "lastUpdate": 1485805380000
      }
    },
    {
      "id": "588f8ba7b45fc9000bc1bfce",
      "entityId": "57fce228e4b0f6600fdfb836",
      "entityName": "companies",
      "entityVersion": 57,
      "recordId": "588f8b99b45fc9000bc1bfc4",
      "recordName": "test1",
      "user": "dgaviola@slingr.io",
      "timestamp": 1485802407010,
      "ip": "::ffff:10.240.0.15",
      "eventType": "USER_RECORD_CHANGED",
      "eventCategory": "USER",
      "contextPath": "entities.companies.update",
      "recordDeleted": null,
      "deletionDate": null,
      "oldRecord": {
        "type": {
          "json": "a",
          "text": "{type:a}"
        },
        "addresses": {
          "json": null,
          "text": "{}"
        }
      },
      "newRecord": {
        "type": {
          "json": "b",
          "text": "{type:b}"
        },
        "addresses": {
          "json": null,
          "text": "{}"
        }
      }
    }
  ]
}
```
<br>

| Path | Description |
| -------------------|-------------------------------------------------- |
| **`total`**            | Total number of history logs for the record.                                                                     |
| **`offset`**           | ID of the latest history log; include it as the **`_offset`** parameter for pagination to retrieve subsequent records. |
| **`items`**            | History logs. |

##### Posible errors

| Error code    | HTTP Status Code | Description
|---------------| -----------------|---
| badRequest  | 400             | Invalid query provided. |
| forbidden   | 403             | Insufficient permissions to view the history of records for the entity.|
|  notFound   | 404             | Entity name does not exist. |

##### Samples

``` js
// gets the last two history logs in entity 'companies'

GET /data/companies/history?_size=2
> Accept: application/json
> token: token



GET /data/companies/history?_size=2
< Content-Type: application/json

{
  "total": 3,
  "offset": "588f8ba7b45fc9000bc1bfce",
  "items": [
    {
      "id": "588f9757b45fc9000bc1bfe1",
      "entityId": "57fce228e4b0f6600fdfb836",
      "entityName": "companies",
      "entityVersion": 57,
      "recordId": "588f9757b45fc9000bc1bfe0",
      "recordName": "test2",
      "user": "dgaviola@slingr.io",
      "timestamp": 1485805399966,
      "ip": "::ffff:10.240.0.11",
      "eventType": "USER_RECORD_CREATED",
      "eventCategory": "USER",
      "contextPath": "entities.companies.create",
      "recordDeleted": null,
      "deletionDate": null,
      "oldRecord": {},
      "newRecord": {
        "name": "test2",
        "state": "active",
        "type": "c",
        "color": "#e1e1e1",
        "numberOfEmployees": null,
        "isCustomer": false,
        "contactInformation": {
          "phoneNumber": null,
          "email": null,
          "id": "588f9757b45fc9000bc1bfdf",
          "nestedFieldLabel": "Contact Information",
          "id": "588f9757b45fc9000bc1bfdf",
          "label": "Contact Information"
        },
        "homepage": null,
        "taxId": null,
        "rating": null,
        "notes": null,
        "lastMeeting": null,
        "lastUpdate": 1485805380000
      }
    },
    {
      "id": "588f8ba7b45fc9000bc1bfce",
      "entityId": "57fce228e4b0f6600fdfb836",
      "entityName": "companies",
      "entityVersion": 57,
      "recordId": "588f8b99b45fc9000bc1bfc4",
      "recordName": "test1",
      "user": "dgaviola@slingr.io",
      "timestamp": 1485802407010,
      "ip": "::ffff:10.240.0.15",
      "eventType": "USER_RECORD_CHANGED",
      "eventCategory": "USER",
      "contextPath": "entities.companies.update",
      "recordDeleted": null,
      "deletionDate": null,
      "oldRecord": {
        "type": {
          "json": "a",
          "text": "{type:a}"
        },
        "addresses": {
          "json": null,
          "text": "{}"
        }
      },
      "newRecord": {
        "type": {
          "json": "b",
          "text": "{type:b}"
        },
        "addresses": {
          "json": null,
          "text": "{}"
        }
      }
    }
  ]
}
```
<br>


### Files handling

Slingr apps offer the capability to store various types of files that can later be downloaded, shared, or linked to fields within records.

When you need to reference a file within a record using a file field, it's a typical practice to upload the file first. Once you obtain the unique ID of the uploaded file, you can then set it as the value of the corresponding file field in your record.

It's important to note that if a file is not referenced by any record, it will be automatically deleted after a few hours. Therefore, it's advisable to upload files only if you intend to link them to records within your app. Uploading files that are not used within your app is unnecessary and may result in their deletion.

#### Uploading files

``` js
POST /files
```
<br>

> This function allows you to upload a file to your app. The uploaded file will be stored temporarily until it is referenced by a record. If no record references the file within 12 hours, it will be automatically removed.

##### Request

To upload a file, you must use a multi-part request. This method supports the uploading of files in any format.

``` js
POST /files
> Content-Type: multipart/form-data
> Accept: application/json
> token: token
```
<br>

##### Response

The metadata of the uploaded file.

``` js
POST /files
< Content-Type: application/json

{
  "fileId": "588f9f1eb45fc9000bc1c010",
  "fileLink": "/files/588f9f1eb45fc9000bc1c010"
}
```
<br>

Path|Description
---|---
fileId|The ID of the file. You can use this ID to reference the file from file fields in records.

##### Samples

``` js
// uploads a file

POST /files
> Content-Type: multipart/form-data
> Accept: application/json
> token: token

test file in multi-part


POST /files
< Content-Type: application/json

{
  "fileId": "588f9f1eb45fc9000bc1c010",
  "fileLink": "/files/588f9f1eb45fc9000bc1c010"
}
```
<br>

#### Downloading files

``` js
GET /files/{id}
```
<br>

> Downloads a file. This service is only available for developer and system users.

##### Request

``` js
GET /files/{id}
> token: 
> : token
```
<br>

Parameter|Required|Description
---|---|---
**`id`**|yes|The ID of the file to download.

##### Response

Returns the file to download.

``` js
GET /files/{id}
> Content-Type: application/force-download
> Content-Disposition: attachment; filename=file.ext

//the content of the file
```
<br>

##### Possible errors

Error code | HTTP Status Code| Description
---|---|---
notFound|404|The file does not exist.

##### Samples

``` js
// fetches a file

GET /files/588f9f1eb45fc9000bc1c010
> token: 
> : token

GET /files/588f9f1eb45fc9000bc1c010
> Content-Type: application/force-download
> Content-Disposition: attachment; filename=file.ext

// this is the content of the file
```
<br>

#### Downloading record files

``` js
GET /data/{entityName}/{recordId}/files/{fileId}
```
<br>

> Downloads a file that belongs to a specific record. User permissions check is performed.

##### Request

``` js
GET /data/{entityName}/{recordId}/files/{fileId}
> Accept: application/json
> token: token
```
<br>

Parameter|Required|Description
---|---|---
**`recordId`**|yes|The ID of the record to fetch the file.
**`fileId`**|yes|The ID of the file to be retrieved.

##### Response

Returns the record file to download.

``` js
GET /data/{entityName}/{recordId}/files/{fileId}
> Content-Type: application/force-download
> Content-Disposition: attachment; filename=file.ext

// the content of the file
```
<br>

##### Possible errors

Error code | HTTP Status Code| Description
---|---|---
notFound|404|The entity or record or file can no be found.
forbidden|403|Provided token does not have permissions to access specified file.

##### Samples

``` js
// fetches a file that belongs to a record

GET /data/companies/57fd2d65e4b0ce322b0c8665/files/588fa383b45fc9000bc1c014
> Accept: application/json
> token: token


GET /data/companies/57fd2d65e4b0ce322b0c8665/files/588fa383b45fc9000bc1c014
> Content-Type: application/force-download
> Content-Disposition: attachment; filename=file.ext

// this is the content of the file
```
<br>


#### Sharing files

``` js
PUT /files/{id}/share
```
<br>

> Shares a file through a public link. The link will be valid for an hour.

##### Request

``` js
PUT /files/{id}/share
> Content-Type: application/json
> Accept: application/json
> token: token
```
<br>

Parameter|Required|Default|Description
---|---|---|---
**`ttl`**|no|3600000|Time to expire in milliseconds.

##### Response

The public link to download the file. This link won’t require any permission.

``` js
PUT /files/{id}/share
< Content-Type: application/json

{
  "sharedFileId": "588fa383b45fc9000bc1c014",
  "sharedFileLink": "/files/shared/588fa383b45fc9000bc1c014"
}
```
<br>

Path|Description
---|---
**`sharedFileId`**|This is the ID of the shared file.
**`sharedFileLink`**|The link to download the file. You should prepend the API endpoint.

##### Samples

``` js
//shares a file which will expire in one minute

PUT /files/588f9f1eb45fc9000bc1c010/share?ttl=60000
> Content-Type: application/json
> Accept: application/json
> token: token

PUT /files/588f9f1eb45fc9000bc1c010/share?ttl=60000
< Content-Type: application/json

{
  "sharedFileId": "588fa383b45fc9000bc1c014",
  "sharedFileLink": "/files/shared/588fa383b45fc9000bc1c014"
}
```
<br>

#### Fetch shared file

#### Sharing files

``` js
GET /files/shared/{id}
```
<br>

> Downloads a shared file.

##### Request

``` js
GET /files/shared/{id}
> Accept: application/json
> token: token

```
<br>

Parameter|Required|Description
---|---|---
**`id`**|yes|The ID of the shared file to download.

##### Response

Returns the shared file to download.

``` js
GET /files/shared/{id}
> Content-Type: application/force-download
> Content-Disposition: attachment; filename=file.ext

//the content of the file
```
<br>

##### Possible errors

Error code | HTTP Status Code | Description
---|---|---
notFound|404| The shared file doesn’t exist.


##### Samples

``` js
//fetches a shared file

GET /files/shared/588fa383b45fc9000bc1c014
> Accept: application/json
> token: token

GET /files/shared/588fa383b45fc9000bc1c014
> Content-Type: application/force-download
> Content-Disposition: attachment; filename=file.ext

//this is the content of the file
```
<br>

## **Monitoring and troubleshooting**

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
<br>

| Path           | Description                                                                                               |
| ---------------| --------------------------------------------------------------------------------------------------------- |
| **`id`**           | ID of the log.       |
| **`type`**         | Type of log, with possible options:<br> - **`'APP'`** (generated by the app runtime), <br> - **`'ENDPOINT'`** (generated by an endpoint),<br> - **`'EXTERNAL`**' (generated by a special call in the REST API to save logs). |
| **`subType`**      | Sub-type of the log based on the type. Currently, only 'APP' type has sub-types:<br> -  **`'LOGIN'`**, <br> - **`'REST_API_RECORD_CREATED'`**,<br> -  **`'REST_API_RECORD_READ'`**,<br> -  **`'REST_API_RECORD_UPDATED'`**,<br> -  **`'REST_API_RECORD_DELETED'`**,<br> -  **`'REST_API_ACTION_EXECUTED'`**,<br> -  **`'SCRIPT'`**,<br> -  **`'EVENT_ARRIVED'`**,<br> -  **`'CONFIG_SCRIPT_ARRIVED'`**,<br> -  **`'FUNCTION_CALLED'`**. |
| **`level`**        | Log level, which could be **`'INFO'`**, **`'WARN'`**, or **`'ERROR'`**.   |
| **`message`**      | The log message.   |
| **`userEmail`**    | Email of the current user when the log was generated; it could be the system user.    |
| **`adminUserEmail`** | If the user is being impersonated, this is the email of the admin user.  |
| **`timestamp`**    | Timestamp when the log was generated, in milliseconds since Epoch. |
| **`ip`**           | IP address associated with the log. |
| **`additionalInfo`** | This field may contain additional information that could be useful when troubleshooting issues. Note that it should not be used for automating processes as its content may change without notice. |

#### Get logs

``` js
GET /status/logs
```
<br>

> Query logs from the app.

Keep in mind that logs rotate and when the maximum size of logs is reached older ones are lost.

##### Request

``` js
GET /status/logs
> Accept: application/json
> token: token
```
<br>

| Parameter    | Required | Default | Description |
| ------------ | -------- | ------- | ----------- |
| **`userEmail`**  | No       |    -     | Allows filtering by user email using partial match.                                                                    |
| **`period`**     | No       |    -     | Allows filtering by a time span, e.g., '3h 30m' for logs in the last 3 hours and 30 minutes. Supports time duration formats and 'today' or 'yesterday'. If specified, 'from' and 'to' parameters are discarded. |
| **`from`**       | No       |    -     | The minimum timestamp in milliseconds since Epoch for filtering logs.                                                  |
| **`to`**         | No       |    -     | The maximum timestamp in milliseconds since Epoch for filtering logs.                                                  |
| **`level`**      | No       |    -     | Specifies the log levels to find, separated by commas.                                                                 |
| **`message`**    | No       |     -    | Allows filtering by partial search of log messages.                                                                     |
| **`_size`**      | No       | `200` | Sets the maximum number of logs to retrieve.                                                                           |
| **`_offset`**    | No       |    -     | Specifies the offset to start retrieving logs. Obtained from previous queries for pagination.                          |


##### Response

A list of logs in JSON format.

``` js
GET /status/logs
< Content-Type: application/json

{
  "total": 151
  "items": [
    {
      "id": "58907c10b45fc9000bc1c020",
      "type": "APP",
      "subType": "LOGIN",
      "level": "INFO",
      "message": "POST /login",
      "userEmail": "dgaviola@slingr.io",
      "adminUserEmail": null,
      "timestamp": 1485863952895,
      "ip": null
    },
    {
      "id": "58907c1bb45fc9000bc1c023",
      "type": "APP",
      "subType": null,
      "level": "INFO",
      "message": "GET /api/users/57fce0c3e4b0ce322b0c06b2?appsVersion=true",
      "userEmail": "dgaviola@slingr.io",
      "adminUserEmail": null,
      "timestamp": 1485863963701,
      "ip": "::ffff:10.240.0.11"
    },
    {
      "id": "589085b0b45fc9000bc1c02f",
      "type": "APP",
      "subType": null,
      "level": "INFO",
      "message": "Validation exceptions on record [test]. Error: [file: Content type is required when uploading a file and must be a string]",
      "userEmail": "dgaviola@slingr.io",
      "adminUserEmail": null,
      "timestamp": 1485866416124,
      "ip": null,
      "additionalInfo": {
        "recordLabel": "test",
        "errors": [
          {
            "code": "INVALID",
            "field": "file",
            "message": "Content type is required when uploading a file and must be a string"
          }
        ]
      }
    },
    {
      "id": "589085bdb45fc9000bc1c030",
      "type": "APP",
      "subType": "REST_API_RECORD_UPDATED",
      "level": "INFO",
      "message": "PUT /api/data/files/585aea800d29d300072484a8",
      "userEmail": "dgaviola@slingr.io",
      "adminUserEmail": null,
      "timestamp": 1485866429630,
      "ip": "::ffff:10.240.0.15"
    },
    {
      "id": "589085bfb45fc9000bc1c032",
      "type": "APP",
      "subType": null,
      "level": "INFO",
      "message": "Data record of type [files] with label [test] was changed successfully",
      "userEmail": "dgaviola@slingr.io",
      "adminUserEmail": null,
      "timestamp": 1485866431823,
      "ip": null
    },
  ]
}
```
<br>

| Path      | Description                                       |
| --------- | ------------------------------------------------- |
| **`total`**   | Total number of logs matched by the query.       |
| **`offset`**  | Offset to use when retrieving more logs.          |
| **`items`**   | Logs found. |

##### Possible errors

Error code | HTTP Status Code | Description
---|---|---
forbidden|403| If you try to query logs with a user who is not a developer.

##### Samples

``` js
//finds two logs for yesterday for one specific user

GET /status/logs?period=yesterday&userEmail=test@slingr.io&_size=2
> Accept: application/json
> token: token

GET /status/logs?period=yesterday&userEmail=test@slingr.io&_size=2
< Content-Type: application/json

{
  "items": [
    {
      "id": "58907c10b45fc9000bc1c020",
      "type": "APP",
      "subType": "LOGIN",
      "level": "INFO",
      "message": "POST /login",
      "userEmail": "test@slingr.io",
      "adminUserEmail": null,
      "timestamp": 1485863952895,
      "ip": null
    },
    {
      "id": "58907c19b45fc9000bc1c021",
      "type": "APP",
      "subType": null,
      "level": "INFO",
      "message": "GET /api/users/current",
      "userEmail": "test@slingr.io",
      "adminUserEmail": null,
      "timestamp": 1485863961326,
      "ip": "::ffff:10.240.0.16"
    }
  ],
  "total": 151
}
```
<br>

#### Post logs

``` js
POST /status/logs
```
<br>

> Creates a log. You only need to send the message and the level of log. Other fields will be calculated automatically. An optional **`additionalInfo`** object can be send to add extra fields.

##### Request

``` js
POST /status/logs
> Content-Type: application/json
> Accept: application/json
> token: token

{
  "level": "INFO",
  "message": "This is a test log",
  "additionalInfo": {
    "test": "Additional info property"
  }
}
```
<br>

##### Response

The created log in JSON format.

``` js
POST /status/logs
< Content-Type: application/json

{
  "id": "589085bdb45fc9000bc1c030",
  "type": "EXTERNAL",
  "subType": null,
  "level": "INFO",
  "message": "This is a test log",
  "userEmail": "test@slingr.io",
  "adminUserEmail": null,
  "timestamp": 1485866429630,
  "ip": null,
  "additionalInfo": {
    "test": "Additional info property"
  }
}
```
<br>

##### Possible errors

Error code | HTTP Status Code | Description
---|---|---
validationErrors|400| If there are validation errors. When this happens you will get the details of the errors in the body:<br><pre><code>{&#13;  "code": "validationErrors", &#13;  "message": "There are validation errors",&#13;  "errors": [&#13;   {&#13;     "field": "message",&#13;     "fieldLabel": null,&#13;     "code": "required",&#13;     "message": "Message cannot be empty",&#13;     "additionalInfo": null&#13;   }&#13;  ]&#13; } </code></pre>
forbidden|403|If you try to create a log with a user who is not a developer.

##### Samples

``` js
//creates a new log

POST /status/logs
> Content-Type: application/json
> Accept: application/json
> token: token

{
  "level": "INFO",
  "message": "This is a test log",
  "additionalInfo": {
    "test": "Additional info property"
  }
}


POST /status/logs
< Content-Type: application/json

{
  "id": "589085bdb45fc9000bc1c030",
  "type": "EXTERNAL",
  "subType": null,
  "level": "INFO",
  "message": "This is a test log",
  "userEmail": "test@slingr.io",
  "adminUserEmail": null,
  "timestamp": 1485866429630,
  "ip": "::ffff:10.240.0.15",
  "additionalInfo": {
    "test": "Additional info property"
  }
}
```
<br>

### Jobs

The API for jobs provides the capability to check various aspects of a job, including its status, progress, logs, and additional information. This helps you gain a comprehensive understanding of the job's current state and execution.

This is the general job structure:

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
<br>

| Field              | Description  |
| ------------------ | ------------ |
| **`id`**              | Unique identifier for the job. |
| **`label`**           | Name of the job, providing a simple description of its purpose. Be aware that this description may change without notice and should not be used for critical decision-making in your code. |
| **`type`**            | The type of job, which can be one of the following supported types: <br> - **`IMPORT_RECORDS`**, <br> - **`EXPORT_RECORDS`**, <br> - **`EXECUTE_ACTION`**, <br> - **`DELETE_RECORDS`**, <br> - **`EXECUTE_LISTENER`**, <br> - **`IMPORT_USERS`**, <br> - **`EXPORT_USERS`**, <br> - **`STOP_APP`**, <br> - **`START_APP`**, <br> - **`DEPLOY_ENDPOINT`**, <br> - **`UNDEPLOY_ENDPOINT`**.<br> Other job types are considered system jobs and should not be relied upon, as they may change or be removed. |
| **`runBy`**           | A map containing the id and fullName of the user who triggered the job. |
| **`parentJob`**       | A map containing the id and label of the parent job. If the job is not a child of another job, this field will be null, indicating it is a root job. |
| **`rootJob`**         | A map containing the id and label of the root job. A root job is one that does not have a parent job. If this field is null, it means the job is a root job. |
| **`createDate`**      | The timestamp in milliseconds when the job was created.                                                        |
| **`startDate`**      | The timestamp when the job execution started. It can be null if the job has not yet started.|
| **`endDate`**        | The timestamp when the job execution finished. It can be null if the job has not finished. |
| **`status`**          | The current status of the job, which can be one of the following:**` PENDING, RUNNING, FINISHED, STOPPING, STOPPED, CANCELED.`** |
| **`hasErrors`**       | If true, indicates that there was at least one error during the job's execution. You should review the logs and results for details. |
| **`progress`**        | A number from 0 to 100 indicating the progress of the job. Note that some jobs may transition directly from 0 to 100 if there is no intermediate progress information. |
| **`recordsCount`**    | If the job involves working with records, this field indicates the number of records involved. |
| **`recordsProcessed`**| If the job involves working with records, this field indicates the number of records that have been processed. |
| **`childrenJobsCount`**| The count of children jobs created during the execution of the job. It starts as 0 and may increase over time as more children jobs are created. |
| **`childrenJobsProcessed`**| The number of children jobs that have finished execution. |
| **`stoppable`**       | If true, the job can be stopped; otherwise, you must wait for its completion (unless it's still pending).|
| **`lowPriority`**     | If true, the job will be executed only when there are few other jobs running. |
| **`data`**            | The content of this field depends on the job and contains additional parameters.<br><br><h6>Start App</h6><table><tr><th>Field</th><th>Description</th></tr><tr><td><strong>pushChanges</strong></td><td>Indicates whether changes will be automatically pushed when starting the application. Set to true if changes will be pushed; otherwise, it's false or empty.</td></tr><tr><td><strong>wakingUp</strong></td><td>Indicates whether the application was in a sleeping state and is now in the process of waking up. Set to true if the app is waking up; otherwise, it's false.</td></tr></table><h6>Import Records</h6><table><tr><th>Field</th><th>Description</th></tr><tr><td><strong>fileName</strong></td><td>The name of the file to be imported.</td></tr><tr><td><strong>entityName</strong></td><td>The name of the entity where records will be imported.</td></tr></table><h6>Export Records</h6><table><tr><th>Field</th><th>Description</th></tr><tr><td><strong>entityName</strong></td><td>The name of the entity from which records will be exported.</td></tr></table><h6>Delete Records</h6><table><tr><th>Field</th><th>Description</th></tr><tr><td><strong>entityName</strong></td><td>The name of the entity from which records will be deleted.</td></tr></table><h6>Execute Action</h6><table><tr><th>Field</th><th>Description</th></tr><tr><td><strong>entityName</strong></td><td>The name of the entity to which the action belongs.</td></tr><tr><td><strong>actionName</strong></td><td>The name of the action to be executed.</td></tr></table><h6>Execute Listener</h6><table><tr><th>Field</th><th>Description</th></tr><tr><td><strong>listenerName</strong></td><td>The name of the listener to execute.</td></tr></table><h6>Import Users</h6><table><tr><th>Field</th><th>Description</th></tr><tr><td><strong>fileName</strong></td><td>The name of the file to be imported.</td></tr><tr><td><strong>notifyUsers</strong></td><td>Indicates whether people will be notified by email when users are created. Set to true if notifications will be sent; otherwise, it's false.</td></tr></table><h6>Deploy Endpoint</h6><table><tr><th>Path</th><th>Description</th></tr><tr><td><strong>endpointName</strong></td><td>The name of the endpoint to deploy.</td></tr></table><h6>Undeploy Endpoint</h6><table><tr><th>Path</th><th>Description</th></tr><tr><td><strong>endpointName</strong></td><td>The name of the endpoint to undeploy.</td></tr></table><br>
| **`results`**         | 	The content of this field depends on the job. Here you will find information about the results of executing the job.<br><br><h6>Import Records</h6><table><tr><th>Path</th><th>Description</th></tr><tr><td><strong>rowsImported</strong></td><td>The number of rows that were imported successfully.</td></tr><tr><td><strong>rowsWithErrors</strong></td><td>The number of rows that couldn't be imported due to errors.</td></tr></table><h6>Export Records</h6><table><tr><th>Path</th><th>Description</th></tr><tr><td><strong>fileLink</strong></td><td>URL to download the CSV file with the exported records. You will need to send the token in the headers to download it.</td></tr><tr><td><strong>fileId</strong></td><td>The ID of the file that was generated.</td></tr><tr><td><strong>recordsExported</strong></td><td>The number of records that were exported.</td></tr></table><h6>Delete Records</h6><br>The result will be a map like this one:<br><pre><code>{&#13;  "results": {&#13;    "id1": {&#13;      "status": "ok",&#13;      "response": "response from action"&#13;    },&#13;    "id2": {&#13;      "status": "error",&#13;      "errorMessage": "error message"&#13;    }&#13;  }&#13;}</code></pre><br> **`status`** will indicate if the delete process was executed successfully over that record (**`ok`**) or if there were errors (**`error`**). The field **`response`** will be available only if the action is configured to return the response in the results; otherwise it won't be there.<br> One important thing to keep in mind is that the maximum number of responses in this map will be 1,000. If you execute the delete process over more than 1,000 records, you might not be able to collect the response for each one.<h6>Execute Action</h6>The results of this job depend on the type of action. If the action is of type One record, the result will be a map like this one:<br><pre><code>{&#13;  "results": {&#13;    "id1": {&#13;      "status": "ok",&#13;      "response": "response from action"&#13;    },&#13;    "id2": {&#13;      "status": "error",&#13;      "errorMessage": "error message"&#13;    }&#13;  }&#13;}</code></pre><br> **`status`** will indicate if the action was executed successfully over that record (**`ok`**) or if there were errors (**`error`**). The field response will be available only if the action is configured to return the response in the results; otherwise it won't be there. The field **`errorMessage`** will be present when there is an error, providing some insight into the problem. <br> One important thing to keep in mind is that the maximum number of responses in this map will be 1,000. If you execute the action over more than 1,000 records, you might not be able to collect the response for each one.<br> If the action is of type **`Many records`**, you will only get a map with fields **`status`** and **`response`**:<br><br><pre><code>{&#13;  "results": {&#13;    "status": "ok",&#13;    "response": "response from action"&#13;  }&#13;}</code></pre><h6>Import Users</h6><table><tr><th>Path</th><th>Description</th></tr><tr><td><strong>fileLink</strong></td><td>URL to download the CSV file with the exported users. You will need to send the token in the headers to download it.</td></tr></table><h6>Export Users</h6><table><tr><th>Path</th><th>Description</th></tr><tr><td><strong>fileLink</strong></td><td>URL to download the CSV file with the exported users. You will need to send the token in the headers to download it.</td></tr><tr><td><strong>fileId</strong></td><td>The ID of the file that was generated.</td></tr><tr><td><strong>usersExported</strong></td><td>The number of users that were exported.</td></tr></table><br>

#### Get one job

``` js
GET /status/jobs/{id}
```
<br>

> Gets one job by ID.

##### Request

``` js
GET /status/jobs/{id}
> Accept: application/json
> token: token
```
<br>

Parameter|Required|Description
---|---|---
**`id`**|yes|The ID of the job.

##### Response

The job in JSON format.

``` js
GET /status/jobs/{id}
< Content-Type: application/json

{
  "id": "588a02c13b063a0007605032",
  "label": "Execute action countEmployees from entity companies",
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
  "lowPriority": false
}
```
<br>

##### Possible errors

Error code | HTTP Status Code | Description
---|---|---
notFound|404| The job doesn’t exist.


##### Samples

``` js
// gets a job by ID

GET /status/jobs/588a02c13b063a0007605032
> Accept: application/json
> token: token

GET /status/jobs/588a02c13b063a0007605032
< Content-Type: application/json

{
  "id": "588a02c13b063a0007605032",
  "label": "Execute action countEmployees from entity companies",
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
  "lowPriority": false
}
```
<br>


#### List jobs

``` js
GET /status/jobs
```
<br>

> Lists jobs in the app.

##### Request

``` js
GET /status/jobs
> Accept: application/json
> token: token
```
<br>

| Parameter    | Required | Default | Description                                                             |
|--------------|----------|---------|-------------------------------------------------------------------------|
| **`type`**     | no       |         | The type of job(s) to filter. Possible values include: **`IMPORT_RECORDS`**, **`EXPORT_RECORDS`**, **`EXECUTE_ACTION`**, **`DELETE_RECORDS`**, **`EXECUTE_LISTENER`**, **`IMPORT_USERS`**, **`EXPORT_USERS`**, **`STOP_APP`**, **`START_APP`**, **`DEPLOY_ENDPOINT`**, **`UNDEPLOY_ENDPOINT`**.<br> Multiple types can be specified, separated by commas. |
| **`status`**   | no       |         | The status of the job(s) to filter. Possible values include: **`PENDING`**, **`RUNNING`**, **`FINISHED`**, **`STOPPING`**, **`STOPPED`**, **`CANCELING`**, **`CANCELED`**.<br> Multiple statuses can be specified, separated by commas. |
| **`hasErrors`**| no      |         | Filter jobs based on whether they have errors. Use "true" to retrieve only jobs with errors or "false" to get jobs without errors. |
| **`startFrom`**| no      |         | Filter jobs by their start date, specifying the initial range limit. Can be used alone or in combination with **`startTo`**. |
| **`startTo`**  | no      |         | Filter jobs by their start date, specifying the final range limit. Can be used alone or in combination with **`startFrom`**. |
| **`endFrom`**  | no      |         | Filter jobs by their end date, specifying the initial range limit. Can be used alone or in combination with **`endTo`**. |
| **`endTo`**    | no      |         | Filter jobs by their end date, specifying the final range limit. Can be used alone or in combination with **`endFrom`**. |
| **`createFrom`**| no     |         | Filter jobs by their creation date, specifying the initial range limit. Can be used alone or in combination with **`createTo`**. |
| **`createTo`**  | no     |         | Filter jobs by their creation date, specifying the final range limit. Can be used alone or in combination with **`createFrom`**. |
| **`_size`**     | no     | 20      | The maximum number of jobs to retrieve in a single query. |
| **`_offset`**   | no     |         | The offset to start retrieving jobs. The query will return the appropriate offset for subsequent requests to retrieve more jobs. |

##### Response

A list of jobs in JSON format.

``` js
GET /status/jobs
< Content-Type: application/json

{
  "total": 54,
  "offset": "5890d8ddb45fc9000bc1c2cf",
  "items": [
    {
      "id": "5890d8deb45fc9000bc1c2d3",
      ...
    },
    {
      "id": "5890d8deb45fc9000bc1c2d1",
      ...
    },
    {
      "id": "5890d8ddb45fc9000bc1c2cf",
      ...
  ]
}
```
<br>

| Path    | Description                                                  |
|---------|--------------------------------------------------------------|
| **`total`**| The total number of jobs matched by the query.              |
| **`offset`**| The offset to use to get more jobs.                         |
| **`items`**| The jobs found. |


##### Samples

``` js
// finds up to three finished jobs

GET /status/jobs?status=FINISHED&_size=3
> Accept: application/json
> token: token


GET /status/jobs?status=FINISHED&_size=3
< Content-Type: application/json

{
  "total": 50,
  "offset": "5890d8ddb45fc9000bc1c2cf",
  "items": [
    {
      "id": "5890d8deb45fc9000bc1c2d3",
      ...
    },
    {
      "id": "5890d8deb45fc9000bc1c2d1",
      ...
    },
    {
      "id": "5890d8ddb45fc9000bc1c2cf",
      ...
  ]
}
```
<br>

#### Get logs of a job

``` js
GET /status/jobs/{id}/logs
```
<br>

> Query logs from a job.

##### Request

``` js
GET /status/jobs/{id}/logs
> Accept: application/json
> token: token
```
<br>

| Parameter   | Required | Default | Description|
|-------------|----------|---------|------------|
| **`period`**  | no       |         | Filter logs by a time span. For example, you can use "3h 30m" to query logs from the last 3 hours and 30 minutes. You can also specify **`"today"`** or **`"yesterday."`**<br> If specified, the "from" and "to" parameters will be ignored. The format is the same as used for time duration fields. |
| **`from`**    | no       |         | The minimum timestamp in milliseconds since Epoch.                                                                                    |
| **`to`**      | no       |         | The maximum timestamp in milliseconds since Epoch.                                                                                    |
| **`level`**   | no       |         | Filter logs by log levels. Multiple levels can be specified, separated by commas. <br> Possible values include **`INFO, WARN, and ERROR`**.       |
| **`message`** | no       |         | Filter logs by searching for a partial message match.                                                                                 |
| **`_size`**   | no       | 200     | The maximum number of log entries to retrieve in a single query.                                                                     |
| **`_offset`** | no       |         | The offset to start retrieving log entries. The query will return the appropriate offset for subsequent requests to retrieve more log entries. |


##### Response

A list of logs in JSON format.

``` js
GET /status/jobs/{id}/logs
< Content-Type: application/json

{
  "total": 3,
  "items": [
    {
      "timestamp": 1485887710544,
      "level": "INFO",
      "message": "Starting processing"
    },
    {
      "timestamp": 1485887710546,
      "level": "INFO",
      "message": "Cleaning up"
    },
    {
      "timestamp": 1485887710704,
      "level": "INFO",
      "message": "Process completed"
    }
  ]
}
```
<br>

| Path    | Description                                                  |
|---------|--------------------------------------------------------------|
| **`total`**| The total number of logs matched by the query.              |
| **`offset`**| The offset to use to get more logs.                         |
| **`items`**| The logs found, each containing three fields:<br> - **`timestamp`**: The timestamp when the log was created. <br> - **`level`**: The level of the log, which could be **`INFO, WARN, or ERROR`**.<br> - **`message`**: The message in the logs.|


##### Possible errors

Error code | HTTP Status Code | Description
---|---|---
notFound|404| The job doesn’t exist.


##### Samples

``` js
// finds logs for one job

GET /status/job/5890d8deb45fc9000bc1c2d3/logs
> Accept: application/json
> token: token



GET /status/job/5890d8deb45fc9000bc1c2d3/logs
< Content-Type: application/json

{
  "total": 3,
  "items": [
    {
      "timestamp": 1485887710544,
      "level": "INFO",
      "message": "Starting processing"
    },
    {
      "timestamp": 1485887710546,
      "level": "INFO",
      "message": "Cleaning up"
    },
    {
      "timestamp": 1485887710704,
      "level": "INFO",
      "message": "Process completed"
    }
  ]
}
```
<br>

#### Stop job

``` js
PUT /status/jobs/{id}/stop
```
<br>

> This action allows you to stop a job. If the job was running, it might take some time to stop gracefully. During this time, the status will be set to **`"STOPPING."`** Once the job has been successfully stopped in a graceful manner, the status will change to **`"STOPPED."`**

It's important to note that jobs that have been stopped can be resumed.

##### Request

``` js
PUT /status/jobs/{id}/stop
> Content-Type: application/json
> Accept: application/json
> token: token
```
<br>

##### Response

The job in JSON format.

``` js
PUT /status/jobs/{id}/stop
< Content-Type: application/json

{
  "id": "588a02c13b063a0007605032",
  ...
  "status": "STOPPING",
  ...
}
```
<br>

##### Possible errors

| Error Code   | HTTP Status Code | Description  |
|--------------|------------------|--------------|
| **`badRequest`**| 404               | Indicates that the job cannot be stopped. This can happen if jobs of this type cannot be stopped or if the job is not a root job. |
| **`forbidden`** | 403               | Signifies that you don't have the necessary permissions to stop this job. If you are not a developer, you can only stop jobs that you initiated. |
| **`notFound`**  | 404               | Indicates that the job was not found. |


##### Samples

``` js
stops a job

PUT /status/jobs/588a02c13b063a0007605032/stop
> Content-Type: application/json
> Accept: application/json
> token: token



PUT /status/jobs/588a02c13b063a0007605032/stop
< Content-Type: application/json

{
  "id": "588a02c13b063a0007605032",
  ...
  "status": "STOPPING",
  ...
}
```
<br>



#### Force to stop job

``` js
PUT /status/jobs/{id}/forceStop
```
<br>

> When attempting to stop a job, the system will first try to stop it gracefully. However, if the job continues to run and you need to forcibly terminate it, you have the option to force stop it, which will immediately terminate the job.

It's important to keep in mind that forcibly stopping a job can lead to the interruption of the processing it was performing, potentially leaving data in an inconsistent or undesirable state. Therefore, it should only be used in exceptional cases where no other option is available.

##### Request

``` js
PUT /status/jobs/{id}/forceStop
> Content-Type: application/json
> Accept: application/json
> token: token
```
<br>

##### Response

The job in JSON format.

``` js
PUT /status/jobs/{id}/forceStop
< Content-Type: application/json

{
  "id": "588a02c13b063a0007605032",
  ...
  "status": "STOPPED",
  ...
}
```
<br>

##### Possible errors

| Error Code   | HTTP Status Code | Description  |
|--------------|------------------|--------------|
| **`badRequest`**| 404               | Indicates that the job cannot be stopped. This may occur if jobs of this type cannot be stopped, if it's not a root job, or if its status is different from **`STOPPING`**.  |
| **`forbidden`** | 403               | Signifies that you don't have the necessary permissions to stop this job. If you are not a developer, you can only stop jobs that you initiated. |
| **`notFound`**  | 404               | Indicates that the job was not found. |


##### Samples

``` js
// force to stop a job

PUT /status/jobs/588a02c13b063a0007605032/forceStop
> Content-Type: application/json
> Accept: application/json
> token: token


PUT /status/jobs/588a02c13b063a0007605032/forceStop
< Content-Type: application/json

{
  "id": "588a02c13b063a0007605032",
  ...
  "status": "STOPPED",
  ...
}
```
<br>

#### Cancel job

``` js
PUT /status/jobs/{id}/cancel
```
<br>

> Cancels a job. Only jobs that are in **`STOPPED`** can be canceled.

It's important to note that jobs that have been canceled can be resumed.

##### Request

``` js
PUT /status/jobs/{id}/cancel
> Content-Type: application/json
> Accept: application/json
> token: token
```
<br>

##### Response

The job in JSON format.

``` js
PUT /status/jobs/{id}/cancel
< Content-Type: application/json

{
  "id": "588a02c13b063a0007605032",
  ...
  "status": "CANCELED",
  ...
}
```
<br>

##### Possible errors

| Error Code   | HTTP Status Code | Description  |
|--------------|------------------|--------------|
| **`badRequest`**| 404               | Indicates that the job cannot be canceled. This could be due to the job being in a bad status or not being a root job. |
| **`forbidden`** | 403               | Signifies that you lack the necessary permissions to cancel this job. If you are not a developer, you can only cancel jobs that you initiated. |
| **`notFound`**  | 404               | Indicates that the job was not found. |

##### Samples

``` js
// cancels a job

PUT /status/jobs/588a02c13b063a0007605032/cancel
> Content-Type: application/json
> Accept: application/json
> token: token


PUT /status/jobs/588a02c13b063a0007605032/cancel
< Content-Type: application/json

{
  "id": "588a02c13b063a0007605032",
  ...
  "status": "CANCELED",
  ...
}
```
<br>


#### Resume job

``` js
PUT /status/jobs/{id}/resume
```
<br>

> Resuming a job that has been stopped will allow it to continue execution from where it left off. However, if the job was not started when it was stopped, its status will be set to **`"PENDING"`** instead of **`"RUNNING."`**


##### Request

``` js
PUT /status/jobs/{id}/resume
> Content-Type: application/json
> Accept: application/json
> token: token
```
<br>

##### Response

The job in JSON format.

``` js
PUT /status/jobs/{id}/resume
< Content-Type: application/json

{
  "id": "588a02c13b063a0007605032",
  ...
  "status": "RUNNING",
  ...
}
```
<br>

##### Possible errors

| Error Code   | HTTP Status Code | Description  |
|--------------|------------------|--------------|
| **`badRequest`**| 404               | Indicates that the job cannot be resumed. This may occur if the job is in a bad status or is not a root job. |
| **`forbidden`** | 403               | Signifies that you lack the necessary permissions to resume this job. If you are not a developer, you can only resume jobs that you initiated. |
| **`notFound`**  | 404               | Indicates that the job was not found. |

##### Samples

``` js
//  resumes a job

PUT /status/jobs/588a02c13b063a0007605032/resume
> Content-Type: application/json
> Accept: application/json
> token: token

PUT /status/jobs/588a02c13b063a0007605032/resume
< Content-Type: application/json

{
  "id": "588a02c13b063a0007605032",
  ...
  "status": "RUNNING",
  ...
}
```
<br>
