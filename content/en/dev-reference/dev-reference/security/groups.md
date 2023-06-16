---
title: "Groups"
lead: "Detailed description of groups and how they allow to define permissions."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

Groups allow to define permissions and security rules for users. Permissions can be
configured for entities and views, and security rules can be set for users regarding
password, IPs whitelist, management of other users, etc.

A user can belong to many groups at the same time, but only one will be the primary
group. This primary group will have implications to determine which security rules
are applied to the user.

When a new group is created, no permissions are created by default.

Groups are also used in OAuth Scopes, before deleting a group please check if it is being used in a OAuth Scope ([OAuth Support]({{site.baseurl}}/app-development-security-oauth.html)).

Next we will describe the settings for a group.

## Label

This is a human-readable name of the group. You can use spaces, special characters and
mix upper case and lower case letters.

The label will be used to reference the group in the UI. Changing the label of a group
usually doesn't involve changes in the code, however if you used it in scripts or through
the REST API you might need to update those manually.

## Name

This is the internal name of the group. It cannot hold special characters or spaces.

Usually you will use the name of the group in scripts and the REST API, so changing it
might affect your app and you will need to make some manual adjustments.

## Entity permissions

Each entity has a set of permissions indicating what operations can be done as well as which
fields and actions can be accessed.

When a new entity is added, no permissions are added to any group by default.

Next you will see which permissions are allowed for entities.

### Can create

Indicates if users can create new records for the entity.

These are the options for creation:

- `Always`: users can create any record in the entity no matter which are the values of the fields (as long as
  they pass validation rules).
- `Condition`: users can only create records meeting the specified condition. For example
  a user might only to create tickets that assigned to themselves. Please check
  [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html) to see how 
  conditions can be defined.
- `Never`: the user won't be able to create records in this entity.

### Can access

Indicates if users can read records from the entity. Access permissions have precedence
over other permissions. For example if you have permissions to edit a record but you don't
have permissions to access it, you won't be able to edit it either. Same applies for delete,
history and export.

These are the options for access:

- `Always`: users can access any record in the entity.
- `Condition`: users can only access records meeting the specified condition. For example
  a user might only access tickets that are assigned to themselves. Please check
  [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html) to see how 
  conditions can be defined.
- `Never`: the user won't have access to any record in this entity.

### Can edit

Indicates if users can edit records from the entity. In order to be able to edit a record
the user must also have access permissions to it.

These are the options for edit:

- `Always`: users can edit any record in the entity.
- `Condition`: users can only edit records meeting the specified condition. For example
  a user might only edit tickets that are assigned to themselves. Please check
  [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html) to see how 
  conditions can be defined.
- `Never`: the user won't have edit permissions to any record in this entity.

### History access

Indicates if users can see the history logs of records from the entity. In order to be able
to see the history of a record the user must also have access permissions to it.

These are the options for edit:

- `Always`: users can see history logs of any record in the entity.
- `Condition`: users can only see history logs of records meeting the specified condition. 
  For example a user might only see history logs of tickets that are assigned to themselves. 
  Please check [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html) to see 
  how conditions can be defined.
- `Never`: the user won't have access to see history logs of any record in this entity.

### Can import

Indicates if users can import records using a CSV file. The user must also have create
permissions, otherwise creation of records will fail.

### Can export

Indicates if users can export records to a CSV file. Only records the user has access to can be
exported.

### Field permissions

Here it is possible to indicate permissions for each field. Options are:

- `Parent`: permissions of the parent field will be taken. This is only available for fields inside nested fields and 
  it is the default.
- `Read/Write`: users of this group will be able to read and write this field.
- `Read Only`: users of this group will only be able to read this field. If they try to change the value in an
  update, the value will be silently discarded.
- `None`: users of this group won't be able to either read or write this field. The UI and REST API won't show
  this field at all.
- `Advanced`: allows to configure read or write access separately and optionally based on record data
  through expressions filters or scripts (in the same way as you can do with 
  [Read/Write Access]({{site.baseurl}}/app-development-model-fields.html#readwrite-access) in field).

When a new field is added to an entity, if a group has update access to the entity (`Can Create` or `Can Edit` are 
set to `Always` or `Condition`), the field is given read-write permission for that group by default. If there is only 
read access to the entity (`Can Access` is set to `Always` or `Condition`), read-only access is given to the field in 
that group. Otherwise no permissions are set automatically.
  
### Action permissions

Actions permissions are configured in the same way an advanced configuration for a field. This means that configuration
can be based on record configuration. Action permission has the following options:
                                                        
- `Always`: the action is always executable.
- `Script`: if the script returns `true` the action will be executable, otherwise it won't be executed.
  This is the context of the script:
  {{< js_script_context context="readWriteAccessScript">}}


- `Expression`: the action will be executable if the expression evaluates to `true`. You can find more
  information in the documentation for [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html).
- `Never`: the action will never be executable. This makes sense only when you uncheck the flag 

When a new action is added to an entity, if the group has permissions to all the actions in that 
entity, then that action is also given the Allowed permission.

It is also possible to define permissions for action parameters, which follow the same settings
as [Field permissions](#field-permissions).

When a new parameter is added to an action, if a group has permissions to the action, read-write 
permission is automatically assigned to that parameter in the group.

## View permissions

Indicate the views users will be able to see and use. In order to work properly, the user should
also have access to the entity. For that reason, when you add a view but there aren't permissions
defined for the entity, those will be added automatically.

When a new view is created, if a group has permissions to the entity associated to that view (for 
grid/record/card views), then the view receives permission to be used for that group.

## Security settings

### Secure access

#### Allowed IPs

It is possible to define a whitelist of IPs users can use to login. If they try to login or use
the app from another IP an error will be thrown.

If users belong to more than one group and those groups define more valid IPs, any of the IPs
will be valid.

### Password rules

These password rules define which are the requirements of a valid password. Only rules defined in
the primary group of the user will be taken into account.

#### Require upper case

If this flag is set, password must have an upper case character.

#### Require lower case

If this flag is set, password must have an lower case character.

#### Require number

If this flag is set, password must have a number.

#### Require symbol

If this flag is set, password must have a special character.

#### Require minimum length

If this flag is set, you will be able to define the minimum length required for
a valid password.

### Password policies

Only policies defined in the primary group of the user will be taken into account.

#### Password expiration

Indicates how often password must be updated. If this value is set to `Never` user
will never be required to reset their passwords (which is the default).

#### Maximum login attempts

How many failed logins in a row are allowed for a user. If that limit is exceeded,
the user will be blocked.

## Impersonate users

Indicates if users will be able to impersonate other users. If that's enabled, they will
be able to perform operation on other users like edits, reset password, unblock, etc.
This applies to the REST API and to the UI, where you will see a new menu item in the
secondary menu called `Impersonate users`.

