---
title: "sys.events"
description: "Describes event utilities in the Javascript API."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 65
---

## **sys.events**

The **`sys.events`** package encompasses methods intended for the administration of custom events.

###  triggerEvent(event,data)

This method initiates a custom event within the application, which can be captured by any listener set up to monitor a **`CUSTOM_EVENT`** with a name matching the **`event`** parameter.

##### Parameters

Name|Type|Required|Description
---|---|---|---
event|string|yes|The name of dispatched custom event.
data|object|no|Map of properties that will be sent as data of event.

##### Samples

``` javascript
// trigger `newNote` event with id of record
sys.events.triggerEvent('newNote', {noteId: record.id()});
```
<br>

### registerCallback(key, callback, data, options)

This method registers a callback along with its associated data and optional settings into the app’s storage. The first parameter of the callback will be the callback data when the callback was registered. Other params are dynamic and are sent on when calling `executeCallback`

##### Parameters

| Name     | Type     | Required | Description                                                                 |
|----------|----------|----------|-----------------------------------------------------------------------------|
| key      | string   | yes      | A unique identifier under which the callback data will be stored.          |
| callback | function | yes      | The main callback function to register.                                    |
| data     | object   | yes      | An object containing any associated data. May include nested functions.    |
| options  | object   | no       | Optional parameters to configure the storage. The available options are: <br> - **`ttl`**: Indicates the time to live for that key, expressed in milliseconds.                  |

##### Returns

- **string**: The key of the stored callback.

##### Samples

```javascript
// Register a callback that logs user data later
sys.events.registerCallback(
  'userLogger',
  function(callbackData,user) {
    sys.logs.info('User logged in: '+ user.name);
    sys.logs.info('Company: '+ callbackData.company);
  },
  {company:"ACME"},
  {ttl: 60000}
);
```
<br>

### executeCallback(key, ...args)

This method retrieves and executes a previously registered callback from app storage using the provided `key`. Any additional arguments passed will be forwarded to the callback. After execution, the callback is removed from storage.

##### Parameters

| Name     | Type   | Required | Description                                                              |
|----------|--------|----------|--------------------------------------------------------------------------|
| key      | string | yes      | The key used to retrieve the callback data from storage.                 |
| ...args  | any    | no       | Arguments to be passed to the restored callback function.                |

##### Returns

- **any**: The return value from the executed callback function.

##### Samples

```javascript
// Execute the previously stored 'userLogger' callback
sys.events.executeCallback('userLogger', {name: 'Alice'});
```
<br>