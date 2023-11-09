---
title: "Grid views"
description: "Detailed explanation of settings available for grid views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 46
---

Grid views facilitate the display of records from an entity in a list format. This list offers capabilities such as sorting, pagination, filtering, and more.

Within the list, users can open, edit, and delete listed records. Additionally, new records can be created directly from this view.

Furthermore, grid views can incorporate subgrids for parent-child relationships.

## **Entity**

This specifies the entity to which the view is linked. Only records belonging to this entity will be listed within the grid view.

## **Label**

This represents the human-readable name of the view. You can use spaces, special characters, and a mixture of uppercase and lowercase letters.

The label will be displayed at the top of the grid view, so choose something comprehensible to users.

## **Name**

The internal name of the view. This name must exclude special characters and spaces.

Commonly, this view name is utilized in scripts and the REST API. Altering it may impact your application and necessitate manual adjustments.

## **List settings**

### Behavior

These settings determine the behavior of the listing.

### Sort field

This defines the default sorting field for the listing.

Users may be able to modify the default sorting if enabled in any of the columns.

### Sort type

Specifies the sorting direction.

Users may be able to change the default sorting if enabled in any of the columns.

### Page size

This signifies the maximum number of records fetched when the view is loaded or when users click on **`More`** to fetch additional records.

### Infinite scroll

Enables automatic retrieval of more records as users scroll down.

When this option is activated, the page size is fixed at 100 records, and the **`More`** button is concealed.

### Show filters

When enabled, filter controls are displayed beneath the header of each column, enabling users to filter records in the listing.

### Fixed header

Activating this option locks the grid header, allowing users to retain visibility while scrolling downward.

### Main menu

This setting governs the actions executable from the view header.

Available options include:

- **`All`**: All view-related actions in the entity will appear in the context menu.
- **`Some`**: A custom selection of actions is presented. A new selector, **`Available actions`**, emerges, allowing you to pick which actions will be listed (you can select the actions' views here).
- **`Custom Menu`**: Developers can customize action rendering. Actions can be grouped. Top-level groups will be rendered as dropdown buttons, while nested groups will be nested dropdowns. Various configuration options for button behavior during runtime are available, such as **`Label`**, **`Default options`** (which allows overriding of predefined configuration), **`Only icon`**, **`Icon`**, **`Style`**, and **`Label of action`**.
- **`System Actions Only`**: Only system actions like **`CRUD`**, **`Import`**, and **`Refresh`** will be displayed.
- **`None`**: No actions will be available.

In all scenarios, action permissions and preconditions will be verified. Some actions may remain hidden if the user lacks the requisite permissions or preconditions are unmet.

### Record menu

This option regulates the actions executable from the listing itself. They appear when users click the **`Actions`** button on the secondary menu of the listing or in the actions column when [Display Record Menu Column](#show-actions-column) is enabled.

Available options include:

- **`All`**: Every action in the entity is displayed under the **`Actions`** button on the secondary menu or in the actions column. Note that the default view of each action is used in this scenario.
- **`Some`**: A custom selection of actions is available. A new selector, **`Available actions`**, allows you to pick which actions will be listed (you can select the actions' views here).
- **`System Actions Only`**: Only system actions like **`CRUD`**, **`Import`**, and **`Refresh`** will be displayed.
- **`None`**: No actions will be available.

In all cases, action permissions and preconditions will be verified. Some actions may remain hidden if the user lacks the requisite permissions or preconditions are unmet.

### Display record menu column

When enabled, the last column of the listing serves as an actions column. It features a dropdown button that includes CRUD actions (edit, view, and delete), along with actions configured in the grid view. This permits quick execution of an action for a specific record without the need for prior selection.

### Allow to rank records

Enabling this option enables sorting of records through drag-and-drop within the listing (utilizing arrows on the left of each row). To use this feature, the entity must possess a field of type [Rank]({{<ref "/dev-reference/field-types/miscellaneous_types/rank.md">}}).

The following settings must be configured when this option is enabled:

- **`Rank Field`**: The rank field utilized for sorting records in the list.
- **`Rank Type`**: Specifies how ranking will be performed. **`Auto`** defers the decision to the platform, permitting records to be moved to any position. Select **`Manual`** to have more control and use a script to define ranking rules. This is beneficial for imposing restrictions or special rules. For example, if issues have dependencies, tasks with dependencies on other tasks cannot be above those dependent tasks. If **`Manual`** is selected, a script must be provided for context:
  
  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) |This pertains to the record that is undergoing movement. Typically, you will update the rank field within this record using the methods available in the wrapper methods. <br> It's important to remember that after updating the rank field, you must save the record. Failing to save the record will result in the rank not being updated, and the record will not be repositioned.|
  | recordBefore | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) | This refers to the record that precedes the intended position for the record being moved. It might be **`null`** in instances where the record is being moved to the first position, as there would be no preceding record.|
  | recordAfter | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) | This denotes the record following the intended position for the record being moved. It could be **`null`** when moving the record to the last position, as there would be no succeeding record.|

  ##### Samples

  ``` javascript
  // rank records in a way that urgent ones are always at the top
  var fieldName = 'rank';
  var moved = false;
  if (!recordBefore && recordAfter) { // the record is moved to the top
    if (!recordAfter.field('urgent').val() || record.field('urgent').val()) {
      record.field(fieldName).rankBefore(recordAfter.field(fieldName));
      moved = true;
    }
  } else if (recordBefore && !recordAfter) { // the record is moved to the bottom
    if (recordBefore.field('urgent').val() || !record.field('urgent').val()) {
      record.field(fieldName).rankAfter(recordBefore.field(fieldName));
      moved = true;
    }
  } else if (recordBefore && recordAfter) { // the record is placed between two other records
    if ((!recordAfter.field('urgent').val() || record.field('urgent').val()) &&
        (recordBefore.field('urgent').val() || !record.field('urgent').val())) {
      record.field(fieldName).rankBetween(recordBefore.field(fieldName), recordAfter.field(fieldName));
      moved = true;
    }
  }
  // IMPORTANT!!! You need to save the record to make the new rank value permanent
  if (moved) {
    sys.data.save(record);
  }
  ```
  <br>

  ---

### Record highlight

The "Record Highlight" option allows you to specify which records should be visually highlighted using colors. This is particularly helpful when you want users to quickly notice certain records. For instance, in a task listing, you might want to emphasize urgent tasks by assigning them a distinctive red color.

Multiple highlight rules can be defined. For each rule, a color must be chosen, and an expression must be provided. All records that match the expression will be displayed using the selected color.

For more details on expressions, please refer to the [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) documentation.

Alternatively, you have the option to use a script instead of an expression:

  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) |This represents the record that will undergo evaluation to determine if it should be highlighted.|

  ##### Returns

  **`boolean`** - You should return **`true`** if the record should be highlighted, and **`false`** if it should not be highlighted.

  ##### Samples

  ``` javascript
  // the task will be highlighted if it is urgent
  return record.field('urgent').val() == true;
  ```
  <br>

### Lookup field

The lookup field influences the construction of the record's URL. By default, the ID is utilized, resulting in the following URL structure:

```
https://<app>.slingrs.io/<env>/runtime/#views/<viewId>/readOnly/<recordId>
```
<br>

When a lookup field is chosen, the **`recordId`** is substituted with the value of the lookup field. For instance, if the **`name`** field is selected as the lookup field, and the value of the opened record is **`test1`**, the resulting URL would be:

```
https://<app>.slingrs.io/<env>/runtime/#views/<viewId>/readOnly/test1
```
<br>

The lookup field must have the unique flag set.

### Automatic refresh

Enabling this option creates a dynamic listener that ensures the view refreshes automatically for all users when a record belonging to the entity this view points to is created, updated, or deleted. This applies whether the event is triggered by a user or a script. Enabling this feature for a card view also enables it for its corresponding CRUD read-only view.

## **Filtering settings**

### Record filters

This section defines the criteria for listing records. Only records that match the provided expression will appear in the grid view.

### Global search

For entities with global search enabled, you can enable the **`Enable global search`** flag to allow users to utilize this feature.

## **Columns**

This section allows you to add or remove fields as columns in the listing's table. These columns will initially utilize the default display options of the associated fields, but you can override these options. Refer to the documentation on [General Display Options]({{<ref "/dev-reference/data-model-and-logic/fields.md#general-display-options">}}) for more details.

Columns offer additional options beyond those available for fields:

- **`Automatic Width`**: Determines if the column's width should adapt automatically based on available space and content, or if it should have a fixed width, either in pixels or as a percentage.
- **`Allow Title Wrapping`**: By default, titles won't wrap unless this flag is enabled, which can be useful for fields with lengthy labels (you can also override the field's label in display options).
- **`Allow Sorting`**: Indicates whether sorting arrows will be present for this column. This flag is set by default for fields with the indexable flag activated.

## **CRUD actions**

Grid views support creating, reading, updating, and deleting records. This section allows you to configure these actions.

If the entity has child entities, you can configure different views for each entity type. For instance, if you have entity A and its children entities A1 and A2, creating a record view for A lets you configure views for A1 and A2. As a result, when you create a grid view for entity A, you'll see records from A1 and A2. The displayed record view depends on the type of record you open.

### Create

####  Allow to create

This action is used to generate new records within the entity. When enabled, a button for creating new records will appear in the listing. For entities associated with this view's entity that have child entities, a button dropdown displaying available options will be shown.

You can configure the record view for creating a new record by clicking **`Configure View`**. For more details, refer to the [Record Views Documentation]({{<ref "/dev-reference/user-interface/record-views.md">}}).

####  Open in modal

Enabling this flag displays the new record creation view in a modal instead of replacing the listing as the main content.

####  Show next button

When this option is enabled, apart from the **`Cancel`** and **`Save`** buttons, a **`Next`** button will appear when creating a new record. This button saves the record and immediately shows the form for creating another new record. This feature proves useful for rapid creation of multiple records.

####  Selected view

This setting allows you to select the view for the create CRUD action. Available options for selection include create-type record views of the current entity or custom views. If you opt for a **`Custom View`**, a JSON context with information will be conveyed through a **`message event`**. To utilize this information in the custom view, add an event listener in the custom view's main file. Additionally, when the **`Create`** action button is pressed, a message event is triggered to inform the custom view. The custom view can listen for this event and perform an action. This **`add`** event is also triggered after executing other custom actions.

**Sample of a listener set in a custom view in order to obtain some context information**

```
    window.addEventListener('message', function (event) {
    //We wait for a message from the platform to let us know the Create Button has been pressed
        if (event.data.eventType) {
          if (event.data.eventType === 'add') {
    //This is a method we should implement to save the new data and then comunicate it back to the platform
             self.createRecord();
          }
    // Logs the context. This happened once the custom view is fully rendered
       }else if(event.data.context){
         var context = event.data.context;
         var entity = event.data.context.entity;
         sys.logs.info("CONTEXT: " + JSON.stringify(context));
       }
    });
```
<br>

Once you're listening for the **`add`** event, you can proceed to implement specific functionalities. Custom views offer a utility method for creating new records and subsequently notifying the platform. Additional details on this can be found in the **`Custom View`** section.

**Sample of an implementation of a createRecord() method**

```
     self.createRecord = function () {
        console.log('creating new record from REST API');
     //Custom view method to create a record and inform back to the platform
        sys.ui.createRecord(entity.name, newRecord, function (recordCreated) {
            console.log("ON SUCCESS RECORD: " + JSON.stringify(recordCreated));
        }, function (error) {
            console.log("ON ERROR :" + JSON.stringify(error));
        })
    };
```

####  Redirect to list after create

<div>This setting allows you to be able after creating a record in the create view you will be redirected to the list view. This parameter introduces an option that allows users to define another behavior after creating a new record.</div>

### Read

#### Allow to see details

Enabling this action permits users to open a record from the listing. When enabled, users can click on a record within the listing to view its details. Additionally, the **`View`** action will be visible in the action column (if enabled).

You can configure the record view to display details by clicking **`Configure View`**. For more information, refer to the [Record Views Documentation]({{<ref "/dev-reference/user-interface/record-views.md">}}).

#### Open in modal

If this flag is set, the view for seeing details of records will be presented in a modal, instead of replacing the listing as the main content.

#### Selected view

This setting enables you to choose the view for the read-only CRUD action. Available options for selection include read-only record views of the current entity or custom views. If you opt for a **`Custom View`**, a JSON context with information will be conveyed through a **`message event`**. To utilize this information in the custom view, add an event listener in the custom view's main file. Furthermore, when the **`Refresh`** action button is pressed, a message event is triggered to inform the custom view. The custom view can listen for this event and perform an action. This refresh event is also triggered after executing other custom actions.

**Sample of a listener set in a custom view in order to obtain some context information** 

```
// Logs the context and the event type

    window.addEventListener('message', function (event) {
       if(event.data.eventType){
         var eventType = event.data.eventType;
         sys.logs.info("EVENT: " + JSON.stringify(eventType));
       }else if(event.data.context){
         var context = event.data.context;
         sys.logs.info("CONTEXT: " + JSON.stringify(context));
       }
    });
```
<br>

### Update

#### Allow to edit

Enabling this action enables users to edit a record from the listing. When enabled, users will observe an **`Edit`** button in the read view of the record (the read action must be enabled), and they will also see the **`Edit`** action in the action column (if enabled).

You can configure the record view for editing by clicking **`Configure View`**. Refer to the [Record Views Documentation]({{<ref "/dev-reference/user-interface/record-views.md">}}) for detailed information.

#### Open in modal

If this flag is set, the view for editing records will be displayed in a modal, instead of replacing the listing as the main content.

It's important to note that if the read view isn't configured to be shown in a modal, it won't appear as a modal when accessing the edit view from the read view. This setting solely applies when clicking the **`Edit`** option in the action column of the listing.

#### Selected view

This setting allows you to choose the view for the update CRUD action. Available options for selection include edit-type record views of the current entity or custom views. Opting for a **`Custom View`** sends a JSON context with information through a **`message event`**. To leverage this information in the custom view, add an event listener in the custom view's main file. Moreover, pressing the **`Save`** action button triggers a message event to inform the custom view about the save button being pressed. Consequently, the custom view can listen for this event and execute an action. This **`edit`** event is also triggered after performing other custom actions.

**Sample of a listener set in a custom view in order to obtain some context information**

```
    window.addEventListener('message', function (event) {
    //We wait for a message from the platform to let us know the Save Button has been pressed
        if (event.data.eventType) {
          if (event.data.eventType === 'edit') {
    //This is a method we should implement to save the new data and then comunicate it back to the platform
             self.updateRecord();
          }
    // Logs the context. This happened once the custom view is fully rendered
       }else if(event.data.context){
         var context = event.data.context;
         var entity = event.data.context.entity;
         var contextRecord = event.data.context.record;
         sys.logs.info("CONTEXT: " + JSON.stringify(context));
       }
    });
```
<br>

Once you're listening for the **`edit`** event, you can proceed to implement specific functionalities. Custom views offer a utility method for updating records and subsequently notifying the platform. Additional details on this can be found in the **`Custom View`** section.

**Sample of an implementation of a updateRecord() method**

```
     self.createRecord = function () {
        console.log('creating new record from REST API');
     //Custom view method to create a record and inform back to the platform
        sys.ui.createRecord(entity.name, newRecord, function (recordCreated) {
            console.log("ON SUCCESS RECORD: " + JSON.stringify(recordCreated));
        }, function (error) {
            console.log("ON ERROR :" + JSON.stringify(error));
        })
    };
```

### Delete

#### Allow to delete

Enabling this action allows records to be deleted. When enabled, a **`Delete`** button will be visible in the listing. This button permits the deletion of all selected records. The **`Delete`** option will also appear in the action column dropdown and in the read view.

## **Sub-Grids**

Sub-grids are valuable for representing one-to-many relationships. Consider a scenario where you have customers and each customer can have multiple contacts. In this case, you could include contacts as a sub-grid within the customers' view.

When the read view of a record is opened, sub-grids will be displayed below the main record.

Sub-grids possess the following attributes:

- **`Title`**: This title identifies the sub-grid in the user interface.
- **`Entity`**: This is the entity that the sub-grid points to. It must have a relationship field pointing to the entity of the main grid view.
- **`Related Field`**: This is the relationship field that establishes a connection from the sub-grid's entity to the entity of the main grid view.
- **`Condition`**: This permits conditional display of the sub-grid. For instance, you might want to display the orders sub-grid only when the customer is active. Options for conditions are:
  - **`None`**: The sub-grid will always be displayed.
  - **`Expression`**: This defines an expression that the record in the main grid view must satisfy to display the sub-grid.
  - **`Script`**: This enables you to create a script to determine whether the sub-grid should be displayed. The context for this script is: 

    ##### Parameters

    | Name   | Type                | Description |
    |--------|---------------------|-------------|
    | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) |This is the record in the main grid view.|

    ##### Returns

    **`boolean`** - You should return **`true`** if the sub-grid has to be displayed, **`false`** otherwise.


    ##### Samples

    ``` javascript
    // only show contacts if customer is active 
    return record.field('state').val() == 'active';
    ```
    <br>

The configuration of sub-grids is identical to that of the main view. There's only a small behavioral difference when creating a new record: the field configured in **`Related Field`** will be pre-populated with the record from the main view.

## **Filters**

### Global filters

If the **`Allow Global Filters`** flag is enabled, the user interface allows users to filter records in the grid based on the fields indicated in **`Global Filter Fields`**.

#### Override label

When **`Allow Global Filters`** is enabled, the **`Global Filter Fields`** section includes an **`Override Label`** flag, which allows overriding the default filter label (which is the field label).

#### Enable global search

Enabling this option displays a search box above the listing that facilitates filtering fields using the global search feature. This feature finds words in any field of the record.

This option is only available if the entity has global search enabled.

### Quick filters

Quick filters provide an effortless way to further filter the collection of records by clicking or unclicking buttons. Refer to [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) for additional information.

## **Permissions**

Permissions enable the definition of groups that can access this view.

Permissions for a view can be managed directly in the view definition, although it represents a different perspective of what can be configured in groups. This approach facilitates easy configuration of permissions for all existing groups.

When a new view is created and a group has permissions for the entity associated with that view, the view automatically receives permission for usage by that group.

For more comprehensive information about permissions, please consult the [Groups Documentation]({{<ref "/dev-reference/security/groups.md">}}).
