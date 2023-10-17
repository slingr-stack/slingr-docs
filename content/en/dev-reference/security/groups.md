---
title: "Groups"
description: "Detailed description of groups and how they allow to define permissions."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 39
---

Groups enable the definition of permissions and security regulations for users. Permissions can be tailored for entities and views, while security rules can be configured to manage user aspects like passwords, IP whitelisting, and user management.

A user can be a member of multiple groups simultaneously, but only one group serves as the primary designation. The primary group significantly influences which security rules apply to the user.

When you create a new group, it doesn't automatically come with any pre-set permissions.

Groups are also employed in OAuth Scopes. Before removing a group, ensure it is not currently used in an OAuth Scope. For more information, consult the [OAuth Support]({{<ref "/dev-reference/security/oauth.md">}}) documentation.

Next, we will delve into the configuration settings for a group.

## **Label**

This represents the human-readable name of the group. You can utilize spaces, special characters, and a mix of upper and lower case letters.

The label is used for referencing the group within the user interface. Generally, changing the label of a group doesn't necessitate code modifications. However, if you've employed it in scripts or via the REST API, manual updates might be required.

## **Name**

This denotes the internal name of the group. It must exclude special characters or spaces.

Typically, the group name is utilized in scripts and the REST API. Changing it could potentially impact your app, demanding certain manual adjustments.

## **Entity permissions**

Each entity is associated with a set of permissions, dictating permissible actions, as well as the accessibility of fields and actions.

When a new entity is introduced, it doesn't come with any default permissions assigned to any group.

Let's now explore the permissions applicable to entities.

### Can create

Indicates if users can generate new records for the entity.

Creation options include:

- **`Always`**: Users can create records within the entity regardless of field values (as long as they adhere to validation rules).
- **`Condition`**: Users can solely create records that meet a specified condition. For example, a user might only create tickets assigned to themselves. Refer to [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) for defining conditions.
- **`Never`**: Users are prohibited from creating records within this entity.

### Can access

Indicates whether users can retrieve records from the entity. Access permissions take precedence over other permissions. For instance, if you possess editing permissions for a record but lack access permissions, editing becomes unfeasible. The same principle applies to deletion, history tracking, and exporting.

Access options encompass:

- **`Always`**: Users have access to all records within the entity.
- **`Condition`**: Users can solely access records meeting a given condition. For instance, a user might access only tickets assigned to them. Refer to [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) for condition definition.
- **`Never`**: Users lack access to records within this entity.

### Can edit

Indicates whether users can modify records within the entity. Users must also have access permissions for a record to be editable.

Editing options encompass:

- **`Always`**: Users can edit any record within the entity.
- **`Condition`**: Users can solely edit records that meet a specified condition. For instance, a user might edit solely those tickets assigned to them. Refer to [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) for condition definition.
- **`Never`**: Users lack permission to edit records within this entity.

### History access

Indicates whether users can view historical logs of records within the entity. Access permissions for the record must also be present to view its history.

History access options include:

- **`Always`**: Users can view historical logs of all records within the entity.
- **`Condition`**: Users can solely view history logs of records meeting a specified condition. For instance, a user might view history logs of tickets assigned to them. Refer to [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) for condition definition.
- **`Never`**: Users lack access to history logs of records within this entity.

### Can import

Indicates whether users can import records via a CSV file. User must also have creation permissions; otherwise, record creation would fail.

### Can export

Indicates whether users can export records to a CSV file. Export is only possible for records the user possesses access to.

### Field permissions

Field permissions can be specified for each field. Options encompass:

- **`Parent`**: Field permissions replicate those of the parent field. This solely applies to fields nested within other fields and is the default setting.
- **`Read/Write`**: Users within this group can both read from and write to this field.
- **`Read Only`**: Users within this group can solely read this field. Any attempts to alter the value during updates are silently discarded.
- **`None`**: Users within this group have neither read nor write permissions for this field. The field is entirely concealed from the UI and REST API.
- **`Advanced`**: This allows for separate read or write access configurations, optionally dependent on record data via expressions, filters, or scripts. This mirrors the functionality of [Read/Write Access]({{<ref "/dev-reference/data-model-and-logic/fields.md">}}) for fields.

Upon introducing a new field to an entity, if a group has update access to the entity (**`Can Create`** or **`Can Edit`** is set to **`Always`** or **`Condition`**), the field is automatically assigned read-write permission for that group. If there's solely read access to the entity (**`Can Access`** is set to **`Always`** or **`Condition`**), read-only permission is assigned to the field for that group. No permissions are automatically set otherwise.

### Action permissions

Action permissions are configured similarly to advanced field configurations. This implies that configuration can be influenced by record configuration. Action permissions comprise the following options:

- **`Always`**: The action is always executable.
- **`Script`**: The action becomes executable if the script returns **`true`**; otherwise, it remains inexecutable. The script operates within the context of:
  {{< js_script_context context="readWriteAccessScript">}}
- **`Expression`**: The action is executable if the expression evaluates to **`true`**. Further details about expressions are available in the [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) documentation.
- **`Never`**: The action cannot be executed. This option is meaningful only when the relevant flag is unchecked.

Upon adding a new action to an entity, if the group holds permissions for all actions within that entity, the newly added action is granted permission as well.

It's also feasible to establish permissions for action parameters, following the same criteria as [Field Permissions](#field-permissions). When introducing a new parameter to an action, if a group possesses permissions for the action, read-write permission is automatically extended to the parameter within that group.

## **View permissions**

Specify which views users can see and employ. For proper functioning, the user should also possess access permissions for the relevant entity. Consequently, adding a view automatically results in permissions for the associated entity if none were initially defined.

When you create a new view, if a group holds permissions for the entity linked to that view (applicable to grid, record, and card views), the view is automatically granted permission for that group's usage.

## **Security settings**

### Secure access

#### Allowed IPs

Define a whitelist of IPs from which users can log in. If a user attempts to log in or access the app from an IP outside this whitelist, an error will be generated.

If a user belongs to multiple groups, each defining valid IPs, any of these IPs will be deemed valid.

### Password rules

These rules stipulate the prerequisites for a valid password. Only rules established in the user's primary group are enforced.

#### Require upper case

If enabled, passwords must include an uppercase character.

#### Require lower case

If enabled, passwords must include a lowercase character.

#### Require number

If enabled, passwords must contain a numerical digit.

#### Require symbol

If enabled, passwords must incorporate a special character.

#### Require minimum length

If enabled, the minimum length for a valid password can be specified.

### Password policies

Only policies set in the user's primary group are taken into account.

#### Password expiration

Specifies the frequency at which users are required to change their passwords. Setting this value to **`Never`** means users are never prompted to reset their passwords (which is the default setting).

#### Maximum login attempts

Sets the maximum number of consecutive failed login attempts allowed per user. If this limit is exceeded, the user's access will be blocked.

## **Session policies**
In this section it is possible to user's session settings.

#### Automatic logout time
Specifies the period of time in which the user session will be terminated due to inactivity.

#### Login notifications
If enabled, it will send email notification on user login. It is possible to restrict those notifications through the following flags:
- Notify only when login from new IP.
- Notify only when login from new location.

## **Rest API permissions**
This is to restrict access to certain resources in the app REST API.

#### Allow UI API
If enabled, it will allow requests to access to the UI REST API.

#### Allow data API
If enabled, it will allow requests to access to the data REST API.

#### Allow read files API
If enabled, it will allow requests to read files through the REST API.

#### Allow upload files API
If enabled, it will allow requests to upload files through the REST API.

#### Allow jobs API
If enabled, it will allow requests to access the REST API to manage jobs.

## **Impersonate users**

Determines whether users can impersonate other users. Enabling this feature allows them to execute operations on other users, such as editing, password resets, unblocking, and more. This applies to both the REST API and the UI. The UI gains a new menu item in the secondary menu titled **`Impersonate Users`**.

