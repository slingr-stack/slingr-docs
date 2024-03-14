---
title: "Calendar views"
description: "Detailed explanation of settings available for calendar views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 48
---

Calendar views enable you to display records from an entity on a calendar, where each record represents an editable event. By default, the current month is displayed, but you can navigate through different months and switch between various views to see weeks and days.

From within calendar views, you can perform actions such as creating new records, viewing details of individual records, editing records, and executing actions—similar to the functionalities available in grid and card views. The key distinction is that instead of presenting records as a list or arranging them as cards in columns, they are presented as events on a calendar.

Furthermore, you have the capability to configure the appearance of events by customizing their titles and colors.

## **Entity**

This specifies the entity to which the view is linked. Only records belonging to this entity will be listed within the grid view.

## **Label**

This represents the human-readable name of the view. You can use spaces, special characters, and a mixture of uppercase and lowercase letters.

The label will be displayed at the top of the grid view, so choose something comprehensible to users.

## **Name**

The internal name of the view. This name must exclude special characters and spaces.

Commonly, this view name is utilized in scripts and the REST API. Altering it may impact your application and necessitate manual adjustments.

## **Calendar settings**

### Allow event editing

This flag indicates whether the duration of an event can be edited from the calendar view.

### Record filters

Filters allow you to specify which records will be displayed as events on the calendar. Only records that match the expressions specified in the filters will be included in the view. For instance, if the calendar is intended to show events in a **`To do`** status, you would likely apply a filter to include records where the **`state`** field equals **`toDo`** (or any relevant criteria).

Please refer to the [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) documentation for detailed information on configuring these filters.

### Automatic refresh

Mark this option to enable automatic refreshing of the view when a record event occurs.

## **Record settings**

Here you can configure the record events. This configuration will be applied to each displayed record in the view.

### From field

Select the **`From field`** from the entity to be used for determining the event start on the view. This field is mandatory.

### To field

Select the **`To field`** from the entity to be used for determining the event end on the view. This field is mandatory.

### All day record field

Select a field from the entity that indicates whether this record represents an **`All day event`**. This field can only be of **`boolean`** type.

### Title

Choose the event title type. It can be either **`Field`** or **`Script`**.

### Field

Select the **`Title`** from the entity to be used as the event label on the view. This field is available and required
only if **`Title`** is set to **`Field`**.

### Script

Manually set the event label on the view by providing a script that must return a **`String`** value. This field is available and required
only if **`Title`** is set to **`Script`**. The script operates in the following context:

  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record where the event title is being calculated.|

  ##### Returns

  **`string`** - You should return a **`string`** to be used as event title.

  ##### Samples

  ``` javascript
  // builds the title using last name and description
  return record.field('lastName').val() + ': ' + record.field('description').val();
  ```
  <br>

### Highlight default color

Define the record color for each event.

### Main menu

This option controls the actions that can be executed from the view header.

The available options are:

- **`All`**: Show all available actions for the entity in the event context menu.
- **`Some`**: Allow a custom selection of actions. A new selector called **`Available actions`** will appear. This can be used to choose which actions to list (you select the action views here).
- **`Custom Menu`**: Developers can customize how actions are displayed. Actions can be grouped, with root-level groups shown as dropdown buttons and nested groups as nested dropdowns. There are additional options to configure button behavior at runtime.
  - **`Label`**: For **`Groups`** only. Groups can have labels.
  - **`Default Options`**: If false, it allows the override of certain action view configurations.
    - **`Only Icon`**: For root-level elements only. Buttons can be displayed with only the icon.
    - **`Icon`**: Overrides the predefined icon of the action. If empty, the icon won't be overridden.
    - **`Style`**: Overrides the predefined style of the action. If empty, the style won't be overridden.
    - **`Label of Action`**: Overrides the label of the action. If empty, the label won't be overridden.
- **`System Actions Only`**: Display only system actions like **`CRUD`**, **`Import`**, **`Refresh`**, etc.
- **`None`**: No actions will be available.

In all cases, permissions and preconditions of actions will be checked. Some actions might be hidden if the
user lacks permissions or if preconditions aren't met.

### Record menu

This option controls the actions that can be executed from each event. These actions will be shown in the context
menu belonging to each event.

The available options are:

- **`All`**: Show all available entity actions in the event context menu.
- **`Some`**: Allow a custom selection of actions. A new selector called **`Available actions`** will appear. This can be used to choose which actions to list (you select the action views here).
- **`System Actions Only`**: Display only system actions like **`CRUD`**, **`Import`**, **`Refresh`**, etc.
- **`None`**: No actions will be available.

In all cases, permissions and preconditions of actions will be checked. Some actions might be hidden if the
user lacks permissions or if preconditions aren't met.

### Record highlight

In this section, you can configure various record colors to distinguish records on the calendar. This differentiation can be based on defined preconditions. If no conditions are met, the record will adopt the [highlight default color](#highlight-default-color).

#### Color

Select the color to be applied to the event.

#### Color activation type

Choose how the color precondition will be expressed. Available options are **`Expression`** and **`Script`**.

#### Filter

Only records matching the expressions specified in the filter will be assigned the selected color. Please refer to the
[Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) documentation for comprehensive guidance on configuring these filters. This setting is available and required only if **`Color activation type`** is set to **`Expression`**.

#### Script

Manually determine whether the color should be applied to the event. Provide a script that returns a **`Boolean`** value. This setting is available and required only if **`Color activation type`** is set to **`Script`**. The script operates within the following context:

  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|The record where the event title is being calculated.|

  ##### Returns

  **`boolean`** - You should return a **`boolean`** to know if the color should be applied.

  ##### Samples

  ``` javascript
  // apply the color only to the records that has a description
  return record.field('description').val() !== '';
  ```
  <br>

## **CRUD actions**

From calendar views, you can perform the create, read, update, and delete actions on records. This section allows you to configure these actions.

If the entity has child entities, you can configure different views for each type of entity. For example, if you have entity A, and entities A1 and A2 are its children, creating a record view for entity A enables configuring the view for entities A1 and A2.

In this manner, if you create a calendar view for entity A, it will display records from A1 and A2. Depending on the record type you open, the corresponding record view will be displayed.

### Create

#### Allow creation

This action is used to create new records in the entity. Enabling this will provide a button to create new records in the listing. If the entity associated with the view has child entities, a button dropdown with available options will be displayed.

You can configure the record view for creating a new record by clicking on **`Configure view`**. Please refer to the documentation on [Record Views]({{<ref "/dev-reference/user-interface/record-views.md">}}).

#### Open in modal

If this flag is set, the view for creating a new record will appear in a modal instead of replacing the
listing as the main content.

#### Show next button

If this option is enabled, while creating a new record, in addition to the **`Cancel`** and **`Save`** buttons, a **`Next`** button will be shown. This button will save the current record and immediately display the form for creating the next record. This is useful when users need to create multiple records rapidly.

### Read

#### Allow viewing details

This action is used to open a record from the listing to view details. Enabling this allows users to click on a record
in the listing to see its details. The **`View`** action will be displayed in the action column (if enabled).

You can configure the record view for viewing details by clicking on **`Configure view`**. Please refer to the documentation on [Record Views]({{<ref "/dev-reference/user-interface/record-views.md">}}).

#### Open in modal

If this flag is set, the view for displaying record details will be shown in a modal instead of replacing the
listing as the main content.

### Update

#### Allow editing

This action is used to edit a record from the listing. Enabling this displays an **`Edit`** button in the
read view of the record (this requires the read action to be enabled), and it also shows the **`Edit`** action in
the action column (if enabled).

You can configure the record view for editing by clicking on **`Configure view`**. Please refer to the documentation on [Record Views]({{<ref "/dev-reference/user-interface/record-views.md">}}).

#### Open in modal

If this flag is set, the view for editing records will be displayed in a modal instead of replacing the
listing as the main content.

Please note that if the read view isn't configured to display as a modal, it won't be displayed in a
modal when accessing the edit view from the read view. This setting only applies when clicking
on the **`Edit`** action in the listing's action column.

## **Filters**

### Global filters

When the **`Allow Global Filters`** flag is enabled, the UI permits users to filter cards on the board by the fields specified in **`Global Filter Fields`**.

#### Override label

When **`Allow Global Filters`** is enabled, within **`Global Filter Fields`**, a flag called **`Override Label`** allows overriding the default filter label (which is the field label).

### Quick Filters

Quick filters enable you to further filter the collection of cards easily by clicking/unclicking buttons.
You can have quick filters separately or groups of quick filters. Groups can be configured in order to select only one button within groups. When you click a button of a group, other group buttons are deselected.


## **Permissions**

Permissions define which groups can access this view.

While permissions for a view can be managed directly in the view definition, they can also be configured within groups. This approach makes it easy to configure permissions for all existing groups specifically on the view.

When a new view is created, if a group has permissions for the entity associated with that view, then the view
inherits permission to be used for that group.

For more detailed information about permissions, please refer to the [Groups]({{<ref "/dev-reference/security/groups.md">}}) documentation.
