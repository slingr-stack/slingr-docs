---
title: "Flex record views"
description: "Detailed explanation of settings available for flex record views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "flex-views"
toc: true
weight: 50
---

Flex record views enable you to display the content of a record with a custom layout. You can specify which fields are shown, override default display options, select the set of available actions and create complex layouts following row/column standard.

## **Label**

This represents a human-readable name for the view. You can utilize spaces, special characters, and a mixture of upper and lower case letters.

This label will appear at the top of the grid view, so ensure you choose something that users will readily comprehend.

## **Name**

This serves as the internal name of the view. It must exclude special characters and spaces.

Typically, you'll employ the view name in scripts and the REST API. Changing it might impact your app, necessitating manual adjustments.

## **Entity**

This designates the entity that the view will be associated with. Only records from this entity can be displayed within the view.

## **Type**

The type specifies the purpose of the flex record view. The available options are:

#### Read only 

In this scenario, the view won't include editable fields (they will be restricted to read-only). Nonetheless, this type of record view is the only one that supports executing actions on the record (actions like edit or create views cannot be executed). 

Consequently, when this feature is enabled, the "Main menu" option becomes accessible, offering these choices:
  - **`All`**: All action views available in the entity will be presented in the context menu.
  - **`Some`**: A personalized selection of actions will be available. A new selector, "Available actions," will emerge. This selector can be used to pick the actions that will be listed (you choose the action views here).
  - **`Custom menu`**: Developers can customize how actions are displayed using this option. Actions can be organized into groups. At the root level, groups will be showcased as dropdown buttons, while nested groups will form nested dropdowns. Several options are available to configure button behavior during runtime:
    - **`Label`**: Applicable to **`Groups`** only. Groups can include a label.
    - **`Default options`**: If this flag is set to false, it permits overriding certain action view configurations.
      - **`Only icon`**: Applicable to root-level elements. Buttons can be displayed solely with an icon.
      - **`Icon`**: Overrides the predefined icon for the action. If left empty, the icon won't be overridden.
      - **`Style`**: Overrides the predefined style of the action. If left empty, the style won't be overridden.
      - **`Label of action`**: Overrides the action's label. If left empty, the label won't be overridden.
  - **`System Actions Only`**: Only system actions such as **`CRUD`**, **`Import`**, **`Refresh`**, etc., will be presented.
  - **`None`**: No actions will be available.

#### Create

This view allows the creation of a new record. In this case, fields can be editable (you can also have read-only fields), and buttons to create the record or cancel the creation process will be available. 

#### Edit

Permits the modification of an existing record. You can have both editable and read-only fields, and buttons to save or cancel the changes will be provided.

## **Show refresh button**

Displays a **`Refresh`** button, which enables refreshing record data without needing to reload the entire page.

This flag is enabled by default.

## **Automatic refresh**

When enabled, a dynamic listener will be established to facilitate the automatic refreshing of this view for all users whenever a record belonging to the entity associated with this view is updated—whether the event is initiated by a user or a script. This configuration option will be accessible only if the parent collection view (grid or card) hasn't already enabled this feature or if there is no parent view.

## **Layout**

This represents the user defined layout of widgets to be displayed in the view.

For further details, consult the documentation on [View Designer]({{<ref "/dev-reference/user-interface/flex-views/view-designer/overview">}}).

## **Events**

Events permit customization of the UI's behavior.

These events only apply to the view. Consequently, they are triggered only when interacting with the app through the UI and not via the REST API.

### Before show

This event is triggered before presenting the record to the user. For instance, you could effect changes to the record or log that the user accessed the record before its display.

  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})| This is the record that will be shown in the view. Any modifications you make here will be reflected in the UI. You don't need to explicitly save these changes; they will be applied instantly. However, if you choose to save these changes, they will become permanent.|

  ##### Samples

  ``` javascript
  // suggests a new value for a field
  sys.logs.info('attempt to set a task as urgent');
  record.field('urgent').val(true);
  record.field('assignee').val(sys.context.getCurrentUser());
  ```
  <br>

### After create

This event is triggered after a user successfully creates a record. This can be valuable in scenarios where it's necessary to navigate to another view or display a custom message.
  
  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})| This is the record that will be shown in the view. Any modifications you make here will be reflected in the UI. You don't need to explicitly save these changes; they will be applied instantly. However, if you choose to save these changes, they will become permanent.|

  ##### Samples

  ``` javascript
  // logs message and navigate to other view
  sys.logs.info('Record '+record.field('name').val()+' created successfully');
  sys.ui.sendMessage({
        scope: 'global',
        name: 'navigate',
        view: 'dashboard'
  });
  ```
  <br>

### On record change

This event is triggered whenever a field's value changes. For instance, you could apply alterations to a record field based on the value of another field.

  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})| This is the record that will be displayed in the view. You can make changes to it and they will be applied in the UI. You don’t need to save those changes. If you do, those changes will be made permanent.|
  | modifiedField | string | This is the field path that fires the record refresh in the view. |

  ##### Samples

  ``` javascript
  // suggests a new value for a field
  if (!record.field('myLabel').isEmpty() && record.field('name').isEmpty()) {
    record.field('name').val(record.field('myLabel').val());
    sys.logs.info('Since name is empty and myLabel is not, we will set the value using the one from myLabel field: ' + record.field('myLabel'));
  }
  ```
  <br>

### After save

This event is triggered after a user successfully saves a record. For instance, this event can be utilized to navigate to a different view or display a message.  

##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})| Updated record from the view.|

  ##### Samples

  ``` javascript
  // logs message and navigate to the dashboard view
  sys.logs.info('Record '+record.field('name').val()+' saved successfully');
  sys.ui.sendMessage({
        scope: 'global',
        name: 'navigate',
        view: 'dashboard'
  });
  ```
  <br>

## **Permissions**

Permissions allow you to define which groups can access this view.
  
Permissions for a view can be managed directly within the view definition. However, this approach is just an alternate way of configuring permissions compared to using groups. It is designed to provide an easy means of configuring permissions for the view across all existing groups.

When a new view is created, if a group has permissions to access the entity associated with that view, the view automatically inherits permission for use within that group.

For detailed information about permissions, please consult the [Groups]({{<ref "/dev-reference/security/groups.md">}}) documentation.