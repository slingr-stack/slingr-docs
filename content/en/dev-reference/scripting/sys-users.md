---
title: "sys.users"
description: "Describes utilities in the Javascript API to manage users."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 73
---

## **sys.users**

The **`sys.users`** package comprises various utilities for managing system user records.

###  activate(user)

This method changes the status of the user to active. If the user was already active, no action will be taken.

##### Parameters

Name|Type|Required|Description
---|---|---|---
user|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|yes| The user to activate.

##### Returns

[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) - The activated user object.

##### Exceptions

**badRequest**

If **`user`** is not a valid object

**notFound**

If no user is found in the database for the given user object.

##### Samples

``` javascript
// creates a user, deactivate, activate and deletes it
var user = sys.data.createRecord('sys.users');
user.field('firstName').val('User1');
user.field('lastName').val('Test');
user.field('email').val('user1@test.com');
user.field('sendWelcomeEmail').val(false);
sys.users.addGroup(user, 'Group1', true);
// if we want to save the user's password we need to add
user.field('authentication.passwordExpired').val(false);
user.field('authentication.generatePassword').val(false);
// otherwise those fields values will be TRUE by default, and the API will skip the password fields
var userPassword = '1234567890'
user.field('authentication.password').val(userPassword);
user.field('authentication.passwordConfirmation').val(userPassword);
user.field('authentication.newPassword').val(userPassword);
// now we save the user and it will be created in the app at this point
user = sys.data.save(user);
log('user id: '+user.id());
// deactivate user
user = sys.users.deactivate(user);
log('user status: '+user.status());
// activate user
user = sys.users.activate(user);
log('user status: '+user.status());
// finally remove the user
sys.data.remove(user);
```
<br>

###  deactivate(user)

This method changes the status of the user to inactive. If the user was already inactive, no action will be taken.

##### Parameters

Name|Type|Required|Description
---|---|---|---
user|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|yes| The user to deactivate.

##### Returns

[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) - The deactivated user object.

##### Exceptions

**badRequest**

If **`user`** is not a valid object

**notFound**

If no user is found in the database for the given user object.

##### Samples

``` javascript
// creates a user, deactivates and deletes it
var user = sys.data.createRecord();
user.field('firstName').val('User1');
user.field('lastName').val('Test');
user.field('email').val('user1@test.com');
user.field('sendWelcomeEmail').val(false);
sys.users.addGroup(user, 'Group1', true);
// now we save the user and it will be created in the app at this point
user = sys.data.save(user);
log('user id: '+user.id());
// deactivate user
user = sys.users.deactivate(user);
log('user status: '+user.status());
// finally remove the user
sys.data.remove(user);
```
<br>

###  resetPassword(user, options)

This method resets the password of a specific user. If the user is blocked, this action will also reactivate the user.

##### Parameters

Name|Type|Required|Description
---|---|---|---
user|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|yes| The user to reset password.
options|object|no| The available option is: <br> - **`notifyUser`**: A flag to indicate whether the user should be notified by email.

##### Returns

**`object`** 

``` javascript
  userId: '...',
  userEmail: '...',
  resetCode: '...',
  link: '...'
```
<br>

Where **`userId`** and **`userEmail`** are fields associated with the affected user in the operation.

**`resetCode`** is the automatically generated code used for password reset, and **`link`** represents the URL where the user needs to configure their password settings.

##### Samples

``` javascript
// reset password for user and notified about it by email
var user = sys.data.findOne('sys.users', 'user@company.com');
var result = sys.users.resetPassword(user, {notify: true});
log('Reset password result: ' + JSON.stringify(result));
```
<br>

###  updatePassword(user, options)

This method updates the password of a specific user. If the user is blocked, this action will also reactivate the user.

##### Parameters

Name|Type|Required|Description
---|---|---|---
user|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|yes| The user to reset password.
options|object|no| These options allow to configure operation. The available option is: <br> - **`notifyUser`**: A flag to indicate whether the user should be notified by email. <br> - **`currentPassword`**: flag to indicate the current password.<br> - **`newPassword`**: flag to specify the new password.

##### Returns

**`object`** 

``` javascript
{
  userId: '...',
  userEmail: '...'
}
```
<br>

Where **`userId`** and **`userEmail`** are fields associated with the affected user in the operation.

##### Samples

``` javascript
// update password for user and notified about it by email
var user = sys.data.findOne('sys.users', {email: 'your_email@example.com'});
var options = {
  notifyUser: true,
  currentPassword: "CurrentPassword456",
  newPassword: "OldPassword123"
};
var result = sys.users.updatePassword(user, options);
log('Update password result: ' + JSON.stringify(result));
```
<br>


###  addIdentityProvider(userId, identityProviderIdOrName, externalId)

Enables an identity provider for the specified user. If the identity provider was previously enabled for that user, the external ID will be updated.

##### Parameters

Name|Type|Required|Description
---|---|---|---
userId|string|yes| The ID of the user to enable the identity provider.
identityProviderIdOrName|string|yes| The ID or name of the identity provider to enable.
externalId|string|no|The ID of the user in the identity provider. It is optional.

##### Returns

[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) - The updated user object.

##### Exceptions

**badRequest**

If **`user`** or **`identityProviderIdOrName`** are not valid.

**notFound**

If no user is found in the database for the given user ID or no identity provider with the given ID or name.

##### Samples

``` javascript
// creates a user, adds an identity provider, and deletes it
var user = sys.data.createRecord();
user.field('firstName').val('User1');
user.field('lastName').val('Test');
user.field('email').val('user1@test.com');
user.field('sendWelcomeEmail').val(false);
sys.users.addGroup(user, 'Group1', true);
// now we save the user and it will be created in the app at this point
user = sys.data.save(user);
log('user id: '+user.id());
// add identity provider
user = sys.users.addIdentityProvider(user.id(), 'slack', user.email());
log('identity provider added');
// finally remove the user
sys.data.remove(user);
```
<br>

###  removeIdentityProvider(userId, identityProviderIdOrName)

Disables an identity provider for the specified user. If the identity provider wasn't already enabled for that user, it has no effect.

##### Parameters

Name|Type|Required|Description
---|---|---|---
userId|string|yes| The ID of the user to disable the identity provider.
identityProviderIdOrName|string|yes| The ID or name of the identity provider to disable.

##### Returns

[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) - The updated user object.

##### Exceptions

**badRequest**

If **`user`** or **`identityProviderIdOrName`** are not valid.

**notFound**

If no user is found in the database for the given user ID.

##### Samples

``` javascript
// creates a user, adds an identity provider, removes it, and deletes the user
var user = sys.data.createRecord();
user.field('firstName').val('User1');
user.field('lastName').val('Test');
user.field('email').val('user1@test.com');
user.field('sendWelcomeEmail').val(false);
sys.users.addGroup(user, 'Group1', true);
// now we save the user and it will be created in the app at this point
user = sys.data.save(user);
log('user id: '+user.id());
// add identity provider
user = sys.users.addIdentityProvider(user.id(), 'slack', user.email());
log('identity provider added');
// remove identity provider
user = sys.users.removeIdentityProvider(user.id(), 'slack');
log('identity provider removed');
// finally remove the user
sys.data.remove(user);
```
<br>



###  containsGroup(userRecord, groupIdOrNameOrLabel)

Checks whether the user record is a member of the specified group.

##### Parameters

Name|Type|Required|Description
---|---|---|---
userRecord|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|yes| The user record to check group.
groupIdOrNameOrLabel|string|yes| The ID or name or label of the group to check.

##### Returns

**`boolean`** - **`True`** if the user belongs to the specified group.

##### Samples

``` javascript
// check if the user belongs to the admins group
var user = sys.data.findOne('sys.users', {email: 'user@company.com'});
var isAdmin = sys.users.containsGroup(user, 'admins');
log('Is it admin? ' + isAdmin);
```
<br>

###  isPrimaryGroup(userRecord, groupIdOrNameOrLabel)

Checks if the primary group of the user record is the given group.

##### Parameters

Name|Type|Required|Description
---|---|---|---
userRecord|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|yes| The user record to check group.
groupIdOrNameOrLabel|string|yes| The ID or name or label of the group to check.

##### Returns

**`boolean`** - **`True`** if the specified group is the primary one.

##### Samples

``` javascript
// check if admins group is the primary one
var user = sys.data.findOne('sys.users', {email: 'user@company.com'});
var isPrimary = sys.users.isPrimaryGroup(user, 'admins');
log('Is it primary? ' + isPrimary);
```
<br>

###  getPrimaryGroup(userRecord)

Retrieves the primary group of the user.

##### Parameters

Name|Type|Required|Description
---|---|---|---
userRecord|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|yes| The user record to check group.

##### Returns

**`object`** - An object with the attributes ID, name and label

##### Samples

``` javascript
// check if admins group is the primary one
var user = sys.data.findOne('sys.users', {email: 'user@company.com'});
var primaryGroup = sys.users.getPrimaryGroup(user);
log('Group: ' + JSON.stringify(primaryGroup));
```
<br>

###  addGroup(userRecord, groupIdOrNameOrLabel, primary)

Adds a group to the specified record user.

##### Parameters

Name|Type|Required|Description
---|---|---|---
userRecord|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|yes| The user record to add to a group.
groupIdOrNameOrLabel|string|yes| The ID or name or label of the group to be added.
primary|boolean|no|True if the group to be added is the primary one.

##### Samples

``` javascript
// add admins group as primary.
var user = sys.data.findOne('sys.users', {email: 'user@company.com'});
sys.users.addGroup(user, 'admins', true);
sys.data.save(user);
log('Contains group: ' + sys.users.containsGroup(user, 'admins'));
```
<br>

###  removeGroup(userRecord, groupIdOrNameOrLabel)

Removes the user record from the given group

##### Parameters

Name|Type|Required|Description
---|---|---|---
userRecord|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|yes| The user record to remove group.
groupIdOrNameOrLabel|string|yes| The ID or name or label of the group to be removed.

##### Samples

``` javascript
// remove admins group.
var user = sys.data.findOne('sys.users', {email: 'user@company.com'});
sys.users.removeGroup(user, 'admins');
sys.data.save(user);
log('Contains group: ' + sys.users.containsGroup(user, 'admins'));
```
<br>

###  getEndpointConfiguration(userRecord, endpointName)

This function retrieves the configuration of the specified user endpoint if it exists.

##### Parameters

Name|Type|Required|Description
---|---|---|---
userRecord|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|yes|The user record to to retrieve endpoint configuration.
endpointName|string|yes|The name of the endpoint to retrieve configuration.

##### Samples

``` javascript
// retrieve http endpoint configuration
var user = sys.data.findOne('sys.users', {email: 'user@company.com'});
var config = sys.users.getEndpointConfiguration(user, 'http');
log('Http endpoint configuration: ' + JSON.stringify(config));
```
<br>
