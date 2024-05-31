---
title: "sys.context"
description: "Describes utilities in the Javascript API to get information about the context of execution."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 62
---

## **sys.context**

This package provides methods to retrieve information about the execution context of the script, such as the current user or the call stack.

### getCurrentUserRecord()

Returns a [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) object containing the current user in the ongoing execution context. If there is no user defined in the current execution context, this method will return **`null`**.

##### Returns

**[`sys.data.record`]({{<ref "/dev-reference/scripting/sys-data.md">}})**  - The user in the current execution context, or **`null`** if not set.

##### Samples

``` javascript
// prints the current user information for the current user
var currentUser = sys.context.getCurrentUserRecord();
log('current user record: ' + JSON.stringify(sys.utils.text.recordToString(currentUser)));
```
<br>

### getCurrentUserId()

Returns the id of the current user in session. If there is no user set in the current context of execution, this method will return **null**.

##### Returns

**`string`**  - The current user id.

##### Samples

``` javascript
// prints the extended user information for the current user
var currentUserId = sys.context.getCurrentUserId();
log('current user id: ' + currentUserId);
```
<br>

### getCurrentIp()

Retrieves the IP address of the current request. If the script is running in a context without an associated request, this method will return **`null`**.

##### Returns

**`string`**  - The IP address of the current request.

##### Samples

``` javascript
// logs the current request IP
var ip = sys.context.getCurrentIp();
log('IP: '+ip);
```
<br>

### setCurrentUserRecord(user)

Sets the current user in the context of execution using a [`sys.data.Record`]({{<ref "/dev-reference/scripting/sys-data.md">}}) object.

Please note that if you don't manually restore the current user in the execution context, it will be automatically restored after the script snippet is executed.

##### Parameters

Name|Type|Required|Description
---|---|---|---
user| [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})| yes | The user to set as the current one in the context of execution.

##### Samples

``` javascript
// sets the current user and then logs the email of the current user
var test1 = sys.data.findOne('sys.users', {email: 'test1.docs@slingr.io'});
sys.context.setCurrentUserRecord(test1);
var currentUser = sys.context.getCurrentUserRecord();
log('current user: '+currentUser.field('email').val());
```
<br>


### setCurrentUserRecordById(userId)

Sets the current user in the context of execution using a user ID.

Please bear in mind that if you don't manually restore the current user in the execution context, it will be automatically restored after the script snippet is executed.

##### Parameters

Name|Type|Required|Description
---|---|---|---
userId| string | yes | The ID of the user to set as the current one in the context of execution.

##### Samples

``` javascript
// sets the current user and then logs the email of the current user
var test1 = sys.data.findOne('sys.users', {email: 'test1.docs@slingr.io'});
sys.context.setCurrentUserRecordById(test1.id());
var currentUser = sys.context.getCurrentUserRecord();
log('current user: '+currentUser.field('email').val());
```
<br>

### setCurrentUserRecordByEmail(userEmail)

Sets the current user in the context of execution using a user email.

Please bear in mind that if you don't manually restore the current user in the execution context, it will be automatically restored after the script snippet is executed.

##### Parameters

Name|Type|Required|Description
---|---|---|---
userEmail| string| yes | The email of the user to set as the current one in the context of execution.

##### Samples

``` javascript
// sets the current user and then logs the email of the current user
sys.context.setCurrentUserRecordByEmail('test1.docs@slingr.io');
var currentUser = sys.context.getCurrentUserRecord();
log('current user: '+currentUser.field('email').val());
```
<br>

### root()

Returns an object that provides utilities to determine the root context. To comprehend the functioning of contexts, please refer to the ["Context"]({{<ref "/dev-reference/scripting/overview.md#context">}}) section.

The root context represents the highest level in the call stack. For instance, if you execute an action through the REST API, and within that action's script a record is created, during the record creation, the current context would be the record's creation context. However, the root context in this scenario would be the execution of the action itself, as it's the operation that initiated the request.

The method is utilized as follows:

``` javascript
if (sys.context.root().entity('companies').create().check()) {
   // we are in the context of the creation of a record in the 'companies' entity
   ...
} else {
   ...
}
```
<br>

So, the typical sequence begins with **`sys.context.root()`**, followed by a sequence of methods that define the context. At the end of this sequence, there's a call to **`check()`**, which assesses whether the context is the root context.

Here are the available methods for context checking:

``` javascript
sys.context.root().entity('entityName').create().check()
sys.context.root().entity('entityName').update().check()
sys.context.root().entity('entityName').delete().check()
sys.context.root().entity('entityName').import().check()
sys.context.root().entity('entityName').action('actionName').check()
sys.context.root().listener('listenerName').check()
sys.context.root().users().create().check()
sys.context.root().users().update().check()
sys.context.root().users().delete().check()
sys.context.root().users().import().check()
```
<br>

Certain contexts permit the addition of supplementary information to enhance precision regarding the executing context:

``` javascript
sys.context.root().entity('entityName').create().check()
sys.context.root().entity('entityName').update().with({recordId: id}).check()
sys.context.root().entity('entityName').delete().with({recordId: id}).check()
sys.context.root().entity('entityName').import().with({fileName: 'file.csv'}).check()
sys.context.root().entity('entityName').action('actionName').with({recordId: id}).check()
sys.context.root().users().create().with({email: 'email@test.com'}).check()
sys.context.root().users().update().with({email: 'email@test.com'}).check()
sys.context.root().users().update().with({id: '56cf0945ee42cf00064c105e'}).check()
sys.context.root().users().delete().with({email: 'email@test.com'}).check()
sys.context.root().users().delete().with({id: '56cf0945ee42cf00064c105e'}).check()
sys.context.root().users().import().with({fileName: 'file.csv'}).check()
```
<br>

##### Returns

**`object`** - An object that can be used to define the context to check; see description.

##### Samples

``` javascript
// checks that the script isn't running in the context of an import
if (!sys.context.root().entity('companies').import().check()) {
  // do something here
}
```
<br>

### any()

Returns an object that provides utilities for context evaluation across the call stack. To comprehend the functionality of contexts, please refer to the ["Context"]({{<ref "/dev-reference/scripting/overview.md#context">}}) section.

This method is essentially identical to **`root()`**, but instead of solely checking the root context, the **`check()`** method will yield **`true`** if any context within the call stack matches. For instance, if you execute an action via the REST API, and within that action's script a record is created, during the record's creation, the current context would pertain to the record creation. By employing **`any()`** for context checking, as opposed to **`root()`**, assessing the context for both the action and the record creation would yield **`true`**:

``` javascript
sys.context.any().entity('companies').action('createAnotherRecord').check(); // returns true
sys.context.any().entity('companies').create().check(); // returns true
```
<br>

Please refer to the documentation of [`root()`](#👉-root) for more comprehensive information on defining a context and verifying it.

##### Returns

**`object`** - An object that can be utilized to define the context to be checked. Please see the description above for details.

##### Samples

``` javascript
// checks we are in the context of the creation of a record, no matter if it is the root or not
if (sys.context.().entity('companies').create().check()) {
  // do something here
}
```
<br>
