---
title: "Workflow views"
lead: "Detailed explanation of settings available for workflow views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 47
---
Workflow views facilitate the display of entity records in a board-style layout, organized by columns. This organizational structure proves particularly beneficial for scenarios involving workflows. For instance, you could employ a tasks entity, and within the workflow view, you could establish columns such as **`To do`**, **`In progress`**, and **`Done`**. Records are allocated to respective columns based on their status. Users possess the capability to shift cards across columns as they progress through tasks, arrange cards within columns to indicate priority, and more.

Workflow views offer the following functionality:
- Creation of new records
- Access to record details
- Editing of records
- Execution of actions

These capabilities parallel those of grid views. The fundamental distinction lies in the visual representation of records. In a workflow view, records appear as cards within a board, as opposed to a traditional list format.

To facilitate the transition of records from one column to another, transitions must be defined. Transitions hinge on an associated action, executed upon the movement of a record.

Finally, customization options extend to card rendering. Developers can configure the appearance of cards by modifying the title, content, and tags.

## **Entity**

This specifies the entity to which the view is linked. Only records belonging to this entity will be listed within the grid view.

## **Label**

This represents the human-readable name of the view. You can use spaces, special characters, and a mixture of uppercase and lowercase letters.

The label will be displayed at the top of the grid view, so choose something comprehensible to users.

## **Name**

The internal name of the view. This name must exclude special characters and spaces.

Commonly, this view name is utilized in scripts and the REST API. Altering it may impact your application and necessitate manual adjustments.

## **Columns**

Columns form the structural foundation of workflow views. Primarily, columns mirror different states that records can assume, although they can also be based on alternate criteria.

### Label

This label designates the column's title, displayed at the top of the column in the user interface.

### Sort field

This indicates the default sorting field for the column.

### Sort type

Specifies the sorting direction.

### Width

This signifies the column's width, which can be specified in pixels or as a percentage. When using a percentage, the reference point is the width of the main content area. If pixel values are employed and the width exceeds the available space, horizontal scrolling will be enabled to navigate through other columns.

### Filters

Filters enable the specification of criteria for which records will be displayed in the column. Consequently, only records matching the expressions defined within the filters will appear in the column. For instance, if the column pertains to **`To do`**, a filter might be placed on records with a **`state`** field equivalent to **`toDo`** (or any other applicable filter condition).

For comprehensive details and configuration instructions regarding filters, consult the [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) documentation.

### Page Size

This designates the maximum number of records to be initially fetched and when users scroll through the list.

### Allow to rank records

Enabling this option enables sorting of records through drag-and-drop within the column. To use this feature, the entity must possess a field of type [Rank]({{<ref "/dev-reference/field-types/miscellaneous_types/rank.md">}}).

The following settings must be configured when this option is enabled:

- **`Rank Field`**: The rank field utilized for sorting records in the column.
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

## **Transitions**

Transitions outline the process by which cards can be relocated from one column to another. Without a defined transition for card movement between columns, such movements cannot be facilitated within the user interface.

The following settings pertain to transitions:

- **`Label`**: This serves as a label for identifying the transition.
- **`Source Column`**: Indicates the column from which cards will be dragged.
- **`Target Column`**: Specifies the column to which cards will be dropped.
- **`Action`**: This pertains to the action executed upon card drop. If the action encompasses parameters, a modal will prompt the user to complete the form and confirm the action. In cases where the action lacks a confirmation requirement, it will automatically execute, bypassing the confirmation flag.

It's crucial to note that the action bears the responsibility of altering the record in a manner that situates it in the new column. For example, if the transition enables the transfer of a record from the **`To do`** column to the **`In progress`** column, the action must modify the task's state from **`toDo`** to **`inProgress`**. Failure to update the record within the action, for any reason, will result in the record being returned to its original column.

## **Card settings**

Card settings dictate the visual presentation of cards, encompassing elements such as headers, content, and tags.

### Header

The header is located at the top of the card. It should be concise (commensurate with the column's configured width) and provide sufficient information for users to identify the record.

Two methods exist for defining the header:

- **`Field`**: Selection of a field within the entity, with the field's value serving as the header.
- **`Script`**: In instances where a more intricate header, combining different fields, is necessary, a script can be employed. The script's context is as follows:

    ##### Parameters

    | Name   | Type                | Description |
    |--------|---------------------|-------------|
    | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) |The record that the card is representing.|

    ##### Returns

    **`string`** - Plain text that will be used as the header.

    ##### Samples

    ``` javascript
    // builds the header using the task number and summary 
    return record.field('number').val() + '. ' + record.field('summary').val();
    ```
    <br>

### Summary

The summary is displayed within the card's body. While it should offer more comprehensive details about the record, an effort should be made to maintain brevity, ideally limiting the content to three lines or fewer. In cases where content exceeds this limit, vertical scrolling will be enabled within the card's body.

Two approaches exist for defining the summary:

- **`Field`**: Selection of a field within the entity, with the field's value serving as the summary.
- **`Script`**: In instances where a more intricate summary, involving the combination of different fields, is necessary, a script can be employed. The script's context is as follows:

    ##### Parameters

    | Name   | Type                | Description |
    |--------|---------------------|-------------|
    | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) |The record that the card is representing.|

    ##### Returns

    **`string`** - HTML code that will be rendered in the body of the card. Keep in mind that HTML tags allowed are the same as for [HTML type]({{<ref "/dev-reference/field-types/text/html.md">}}).

    ##### Samples

    ``` javascript
    // builds the summary using different fields 
    var summary = '';
    if (record.field('description').isEmpty()) {
      summary += 'No description';
    } else {
      summary += record.field('description').val();
    }
    if (!record.field('attachments').isEmpty()) {
      summary += 'Attachments'
      summary += '';
      record.field('attachments').each(function(attachment) {
        var url = sys.app.getUrl()+'/api/files/'+attachment.id();
        summary += ''+attachment.name()+''
      });
      summary += '';
    }
    return summary;
    ```
    <br>

### Tags groups

Tags are situated at the base of the card, comprised of a label and a color. They serve as a means to swiftly highlight aspects within the card. For instance, urgent tasks could be designated with a red tag labeled 'urgent,' allowing users to promptly identify them.

#### Label

This label designates the tags group, providing a means of signifying the significance of the tag group.

#### Filter

This filter specifies which records may possess this tag. However, the presence of this filter does not necessarily guarantee that records will bear the tag. Additional considerations might stem from the label script or the absence of content within the label field.

For comprehensive information and guidance on configuring filters, consult the [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) documentation.

#### Color

This denotes the color employed for the tag. These colors are aligned with the theme.

#### Tags

The subsequent options are available for tags:

- **`Fixed Text`**: A single tag with the provided text.
- **`Field`**: The value of the designated field serves as the tag label. If the field is multi-valued, a tag will be added for each value. Should the field be empty, no tags will be appended.
- **`Script`**: This option allows the definition of tags using a script. Essentially, the script should return either a string (a single tag) or a list of strings (multiple tags).

    ##### Parameters

    | Name   | Type                | Description |
    |--------|---------------------|-------------|
    | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) |The record that the card is representing.|

    ##### Returns

    **`string|string[]`** - This is the text to show in the tag. If the script returns a string, it will considered one tag. If the script returns an array of strings, many tags will be added.

    ##### Samples

    ``` javascript
    // adds the company state as tag 
    return record.field('company').fetch().field('state').val();
    ```
    <br>

#### Record Highlight

This option empowers you to designate records that should stand out through the application of colors. This proves invaluable when seeking to draw users' swift attention to specific aspects. For instance, in a task listing, urgent tasks could be highlighted in red, facilitating rapid identification.

Multiple highlight rules can be established. For each rule, a color must be selected, and an associated expression must be defined. Any records that satisfy the expression will be presented with the chosen color.

For comprehensive details and guidance on expressions, refer to the [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) documentation.

Alternatively, a script can be employed in place of an expression:

  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) |The record that the card is representing and that will be evaluated to see if it has to be highlighted.|

  ##### Returns

  **`boolean`** - You should return **`true`** if the record has to be highlighted, **`false`** otherwise.

  ##### Samples

  ``` javascript
  // the task will be highlighted if it is urgent 
  return record.field('urgent').val() == true;
  ```
  <br>

### Main menu

This option governs the actions that can be executed from the view header.

The available options are:

- **`All`**: All available action views associated with the entity will be displayed in the context menu.
- **`Some`**: A customized selection of actions will be accessible. This introduces a new selector called **`Available actions`**,
  which is employed to choose which actions will be listed (the corresponding views of these actions are selected here).
- **`Custom menu`**: This option provides developers with the ability to customize how actions are presented. Actions can be grouped into logical categories. Top-level groups will appear as dropdown buttons, while nested groups will form nested dropdowns.
  Several runtime behavior configurations for buttons are available:
  - **`Label`**: Solely applicable to **`Groups`**. Groups can be assigned a label.
  - **`Default options`**: If disabled, certain configuration aspects of the action views can be overridden.
    - **`Only icon`**: Relevant to top-level elements. Buttons can be displayed with only icons.
    - **`Icon`**: Overrides the predefined icon associated with the action. If left empty, the icon is not overridden.
    - **`Style`**: Overrides the predefined style associated with the action. If left empty, the style is not overridden.
    - **`Label of action`**: Overrides the label of the action. If left empty, the label is not overridden.
- **`System Actions Only`**: Only system actions such as **`CRUD`**, **`Import`**, **`Refresh`**, etc., will be shown.
- **`None`**: No actions will be available.

In all cases, permissions and preconditions of actions will be verified, potentially resulting in the hiding of certain actions if the
user lacks the requisite permissions or preconditions are not met.

### Record menu

This option governs the actions that can be executed from each card. These actions will be displayed in the context
menu associated with each card (identifiable through the three vertical dots in the upper-right corner of the card).

The available options are:

- **`All`**: All available action views associated with the entity will be displayed in the context menu of the cards.
- **`Some`**: A customized selection of actions will be accessible. This introduces a new selector called **`Available actions`**,
  which is employed to choose which actions will be listed (the corresponding views of these actions are selected here).
- **`System Actions Only`**: Only system actions such as **`CRUD`**, **`Import`**, **`Refresh`**, etc., will be displayed.
- **`None`**: No actions will be available.

In all cases, permissions and preconditions of actions will be verified, potentially resulting in the hiding of certain actions if the 
user lacks the requisite permissions or preconditions are not met.

### Automatic refresh

When this flag is enabled, a dynamic listener will be established to enable automatic refreshing of this view for all users
whenever a record belonging to the entity to which this view is directed is created, updated, or deleted. Whether the event is
initiated by a user or a script, this feature remains effective. By enabling this feature on a card view, it is simultaneously enabled on its corresponding CRUD read-only view.

## **CRUD actions**

Workflow views support the creation, reading, updating, and deletion of records. In this section, you can configure these actions.

If the entity encompasses child entities, distinct views can be configured for each type of entity. For instance, if Entity A has entities A1 and A2 as its children, creating a record view for A facilitates the configuration of views for entities A1 and A2.

Consequently, a card view for Entity A will display records from A1 and A2. Depending on the type 
of record opened, the corresponding record view will be displayed.

### Create

#### Allow to create

This action facilitates the creation of new records within the entity. Enabling this option introduces a button that allows the creation of new records within the listing. If the entity associated with the view has child entities, a button dropdown displaying available options will be presented.

The configuration of the record view for creating new records can be accessed by clicking **`Configure View`**. For a comprehensive understanding of record views, consult the [Record Views]({{<ref "/dev-reference/user-interface/record-views.md">}}) documentation.

#### Open in modal

When enabled, this flag ensures that the view for creating a new record is displayed in a modal window rather than replacing the
listing as the primary content.

#### Show next button

Enabling this option introduces a **`Next`** button alongside the **`Cancel`** and **`Save`** buttons when creating a new record. Selecting **`Next`** not only saves the current record but also promptly displays the form to create a new record. This feature streamlines the process of creating multiple records.

### Read

#### Allow to view details

This action enables users to access a detailed view of a record from the listing. Enabling this option permits users to click on a record
within the listing to view additional details. Furthermore, the **`View`** action will be available in the action column (if enabled).

The configuration of the record view for detailed viewing can be accessed by clicking **`Configure View`**. For detailed insights into record views, refer to the [Record Views]({{<ref "/dev-reference/user-interface/record-views.md">}}) documentation.

#### Open in modal

When enabled, this flag ensures that the detailed view of records is displayed in a modal window rather than replacing the
listing as the primary content.

### Update

#### Allow to edit

This action facilitates the editing of records from within the listing. Enabling this option will present an **`Edit`** button within the
detailed view of a record (which requires the read action to be enabled). Additionally, the **`Edit`** action will be available in 
the action column (if enabled).

The configuration of the record view for editing can be accessed by clicking **`Configure View`**. For a comprehensive understanding of record views, consult the [Record Views]({{<ref "/dev-reference/user-interface/record-views.md">}}) documentation.

#### Open in modal

When enabled, this flag ensures that the view for editing records is displayed in a modal window rather than replacing the
listing as the primary content. It's important to note that if the read view is configured to not show in a modal, this setting will not be applied when accessing the edit view from the read view. This setting primarily applies when clicking on **`Edit`** in the action column of the listing.

### Delete

#### Allow to delete

This action empowers users to delete records. When enabled, a **`Delete`** button will be visible within the listing, allowing users to delete selected records. This button will also appear in the action column's dropdown and in the detailed view.

## **Filters**

### Global Filters

If the **`Allow Global Filters`** flag is enabled, users can filter cards on the board based on the fields specified in **`Global Filter Fields`**.

#### Override label

When **`Allow Global Filters`** is enabled, the **`Override Label`** flag is available on **`Global Filter Fields`**, allowing for the customization of the filter label (by default, the label corresponds to the field label).

For entities with enabled global search, it is possible to activate the **`Allow Global Search`** flag.

### Quick filters

Quick filters enable effortless card filtering through the simple act of clicking or unclicking buttons.

For more information, consult [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}).

## **Permissions**

Permissions determine which groups can access this view.
  
While permissions for a view can be configured directly within the view definition, it mirrors the capabilities available in group configuration. The objective is to facilitate easy permission configuration for all existing groups.

Upon the creation of a new view, if a group holds permissions for the entity associated with that view, the view will inherently be granted permission for use by that group.

For a comprehensive understanding of permissions, refer to the [Groups]({{<ref "/dev-reference/security/groups.md">}}) documentation.
