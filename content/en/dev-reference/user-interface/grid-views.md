---
title: "Grid views"
lead: "Detailed explanation of settings available for grid views."
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


Grid views allow to show records of an entity in a list. This list allows sorting, pagination,
filtering and other features.

Records listed can be opened, edited and deleted. It is possible to create new records from
there as well.

Finally grid views can also have subgrid for parent-children relationships.

## Entity

This is the entity the view will point to. Only records of this entity will be listed
in the grid view.

## Label

This is a human-readable name of the view. You can use spaces, special characters and
mix upper case and lower case letters.

This label will be displayed at the top of the grid view, so make sure you use something
users will understand.

## Name

This is the internal name of the view. It cannot hold special characters or spaces.

Usually you will use the name of the view in scripts and the REST API, so changing it
might affect your app and you will need to make some manual adjustments.

## List settings

### Behavior

These settings indicate how the listing should behave.

#### Sort field

This is the default sorting field for the listing.

Users might be able to change the default sorting if that's enabled in any of the columns.

#### Sort type

Indicates the direction of the sorting. 

Users might be able to change the default sorting if that's enabled in any of the columns.

#### Page size

The maximum number of records to fetch when the view is loaded and when clicking in `More` to fetch
more records.

#### Infinite scroll

Get more records automatically when user scroll down. 


When enable this option the page size is fixed in 100 records and the `More` button is not visible.

#### Show filters

When this flag is set, filter controls are shown below the header of each column so users can
filter records in the listing.

#### Fixed header

When this flag is set, grid header will be fixed and users will be able to see it when scrolling down.

#### Main menu

This option controls the actions that can be executed from the view header.

The available options are:

- `All`: Every action view available in the entity will be shown in the event context menu.
- `Some`: A custom selection of actions will be available. A new selector will appear called `Available actions`,
  which can be used to select which actions will be listed (you select the views of the actions here).
- `Custom menu`: This option allows the developer to customize how actions are rendered. Actions can be grouped in groups. At root level groups will be rendered as dropdown buttons while nested groups will be nested dropdowns.
  There are some options available to configure the behaviour of buttons in the runtime:
  - `Label`: Only for `Groups`. Groups can have a label.
  - `Default options`: If this flag is false it will allow to override some configuration of the actions views.
    - `Only icon`: Only for elements at root level. Buttons can be rendered only with the icon.
    - `Icon`: This overrides the predefined icon of the action. If empty, it won't override the icon
    - `Style`: This overrides the predefined style of the action. If empty, it won't override the style.
    - `Label of action`: This overrides the label of the action. If empty, it won't override the label.
- `System Actions Only`: Only system actions like `CRUD`, `Import`, `Refresh`, etc. will be displayed.
- `None`: No actions will be available.

In all cases permissions and preconditions of actions will be verified, so some actions might be hidden if the
user doesn't have permissions or preconditions aren't met.

#### Record menu

This option controls the actions that can be executed from the listing itself. They will be displayed when 
clicking on the `Actions` button on the secondary of the listing, or in the actions column when
[Display record menu column](#show-actions-column) is enabled.

The available options are:

- `All`: Every action available in the entity will be shown in under the `Actions` button on the secondary 
  of the listing, or in the actions column. Keep in mind that the default view of each action will be used
  in this case.
- `Some`: A custom selection of actions will be available. A new selector will appear called `Available actions`,
  which can be used to select which actions will be listed (you select the views of the actions here).
- `System Actions Only`: Only system actions like `CRUD`, `Import`, `Refresh`, etc. will be displayed.
- `None`: No actions will be available.

In all cases permissions and preconditions of actions will be verified, so some actions might be hidden if 
user doesn't have permissions or preconditions aren't met.

#### Display record menu column

If enabled, the last column of the listing will be for actions, where a dropdown button will be rendered
with the CRUD actions (edit, view and delete) as well as actions configured in the grid view (see 
[Record menu](#show-actions)). This way it is possible to quickly execute an action for one 
record without having to select it first.

#### Allow to rank records

When this option is enabled, it is possible to sort records by drag and drop in the listing (using the
arrows on the left of each row). In order to use this feature the entity must have a field of type 
[Rank]({{site.baseurl}}/app-development-type-rank.html).

These settings must be configured when this option is enabled:

- `Rank field`: this is the rank field used to sort records in the list.
- `Rank type`: indicates how the rank will be done. `Auto` leaves this to the platform,
  which basically allows to move records to any position. If you need more control you
  could set the `Manual` option and use a script to define how rank should happen, which
  could be useful if you need to define restrictions or special rules. For example, if
  issues have some dependencies defined, you might check that tasks with dependencies on
  other tasks cannot be above those other tasks.
  When you select `Manual` you will need to provide a script. This is the context of the
  script:
  {{< js_script_context context="rankManualScript">}}

#### Record highlight

With this option you can define which records should be highlighted with colors. This is useful when
you want users to quickly see something. For example if there is a listing of tasks and you want users to
quickly see urgent ones, you can define a highlight expression for those fields so they have a red
color.

It is possible to define many highlight rules. For each one a color must be selected and a expression must be
defined. All records matching the expression will use the selected color.

Please check the documentation for [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html).

Alternatively you can use a script instead of an expression:
 
{{< js_script_context context="gridViewHighlightScript">}}

#### Lookup field

The lookup field affects how the URL of the record is built. By default the ID is used, you the URL is built
like this:

```
https://<app>.slingrs.io/<env>/runtime/#views/<viewId>/readOnly/<recordId>
```

When a lookup field is selected, the `recordId` is replaced by the value of the lookup field. For example
if the field `name` is selected as the lookup field and the value for the record that is opened is `test1`,
then the URL would be:

```
https://<app>.slingrs.io/<env>/runtime/#views/<viewId>/readOnly/test1
```

The lookup field must have the unique flag set.

#### Automatic refresh

When this flag is enabled a dynamic listener will be created to allow to refresh automatically this view for all users
if a record that belong to the entity that this view is pointing is created, updated or deleted. No mather if the event is
being fired by a user or a script. Enabling this feature on card view we are also enabling it on his CRUD read only view.

## Filtering settings

### Record filters

Defines which records will be listed. Only records matching the given expression will be listed
in the grid view.

### Global search

If the entity has global search enabled, it is possible to allow to use this feature by setting the
flag `Enable global search`.


## Columns

Here it is possible to add/remove fields as columns to the table in the listing. This columns
will use the default display options of fields, but you can override them. Please check the
documentation of [General display options]({{site.baseurl}}/app-development-model-fields.html#general-display-options)
for more information.

Columns have some additional options apart from the ones available for fields:

- `Automatic width`: indicates if the browser should automatically adjust the width of the
  column based on the available space and content, or if it should have a fixed width, that
  could be in pixels or percentage.
- `Allow to wrap title`: by default the title won't be wrapped except that this flag is enabled,
  which might be useful for fields with long labels (you could also override the label of the
  field in the display options).
- `Allow sorting`: this flag indicates if the sorting arrows will be available on this column.
  This flag is set by default for fields that have the indexable flag set.

## CRUD actions

From grid views it is possible to create, read, update and delete records. In this section you will be able
to configure how these actions can be done.

If the entity has children entities, it is possible to configure the different views for each kind of 
entity. So for example if you have entity A and then entities A1 and A2, if you create a record view for A, 
it allows to configure the view for entities A1 and A2. 

In this way, if you create a grid view for entity A you will see records from A1 and A2. Depending on the type 
of record you open is the record view that will be displayed.

### Create

#### Allow to create

This action is used to create new records in the entity. If enabled, a button to create new records will be
available in the listing. In case the entity associated to the view has children entities a button dropdown
with available options will be displayed.

You will be able to configure the record view to create a new record by clicking on `Configure view`. Please take a 
look at the documentation of [Record views]({{site.baseurl}}/app-development-ui-record-views.html).

#### Open in modal

If this flag is set, the view to create a new record will be displayed in a modal instead of replacing the
listing as the main content.

#### Show Next button

If this option is set, when creating a new record, apart from the `Cancel` and `Save` buttons, you will see
a `Next` button that will save the record and will show the form to create a new record immediately. This is
useful when users need to create many records quickly.

#### Selected view
It allows you to select the view for the create CRUD action. Available options for selection will be create type record views of the current entity, or custom views. if you select a `Custom View`, a context with some information will be passed as json through a `message event`. This event can be listened to by adding an event listener in the main file of the custom view. This way you are going to have the information set to be displayed in the custom view. Additionally `Create` action button will also trigger a message event to inform the custom view about the create button pressed. This way, the custom view could listen to this event and perform an action. This `add` event will also be trigger after executing other custom actions. 

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

Once you listen to the `add` event. We should implement some functionality. Custom views have an util method to create new records and then inform back to the platform. There is more information about it in the `Custom View` section.

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

### Read

#### Allow to see details

This action is used to open a record from the listing. If enabled, users will be able to click on the record
in the listing to see details and they will see the action `View` in the action column (if enabled).

You will be able to configure the record view to see details by clicking on `Configure view`. Please take a 
look at the documentation of [Record views]({{site.baseurl}}/app-development-ui-record-views.html).

#### Open in modal

If this flag is set, the view to see details of records will be displayed in a modal instead of replacing the
listing as the main content.

#### Selected view

It allows you to select the view for the readOnly CRUD action. Available options for selection will be readOnly record views of the current entity, or custom views. if you select a `Custom View`, a context with some information will be passed as json through a `message event`. This event can be listened to by adding an event listener in the main file of the custom view. This way you are going to have the information set to be displayed in the custom view. Additionally, `Refresh` action button will also trigger a message event to inform the custom view about the refresh button pressed. This way, the custom view could listen to this event and perform an action. This refresh event will also be trigger after executing other custom actions. 

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

### Update

#### Allow to edit

This action is used to edit a record from the listing. If enabled, users will see an `Edit` button in the
read view of the record (it is needed to enable the read action) and they will see the action `Edit` in 
the action column (if enabled).

You will be able to configure the record view to edit by clicking on `Configure view`. Please take a 
look at the documentation of [Record views]({{site.baseurl}}/app-development-ui-record-views.html).

#### Open in modal

If this flag is set, the view to edit records will be displayed in a modal instead of replacing the
listing as the main content.

Keep in mind that if the read view is configured to not show as a modal, this won't be shown in a
modal when accessing the edit view from the read view and this setting will only apply when clicking
on `Edit` in the action column of the listing.

#### Selected view
It allows you to select the view for the update CRUD action. Available options for selection will be edit type record views of the current entity, or custom views. If you select a `Custom View`, a context with some information will be passed as json through a `message event`. This event can be listened to by adding an event listener in the main file of the custom view. This way you are going to have the information set to be displayed in the custom view. Additionally `Save` action button will also trigger a message event to inform the custom view about the save button pressed. This way, the custom view could listen to this event and perform an action. This `edit` event will also be trigger after executing other custom actions.

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

Once you listen to the `edit` event. We should implement some functionality. Custom views have an util method to update records and then inform back to the platform. There is more information about it in the `Custom View` section.

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

This action allows to delete records. When enabled you will see a `Delete` button in the listing where
you will be able to delete all selected records. It will also show up in the dropdown of the action
column and in the read view.

## Sub-grids

Sub-grids are useful for one-to-many relationships. For example you have customers and each customer
can have many contacts. In this case you could put contacts as a sub-grid for customers.

When the read view of a record is opened, sub-grids will be displayed below the record.

Sub-grids have the following properties:

- `Title`: this is the title that will be displayed for identify the sub-grid in the UI.
- `Entity`: the entity the sub-grid will point to. It must have a relationship field pointing to the
  entity of the main grid view.
- `Related field`: this is the relationship field that points from the entity of the sub-grid to the
  entity of the main grid view.
- `Condition`: allows to conditionally show the sub-grid. For example you only want to show the orders
  sub-grid when the customer is active.
  Options for conditions are:
  - `None`: the sub-grid will always be displayed.
  - `Expression`: allows to define an expression the record in the main grid view should match in order
    to display the sub-grid.
  - `Script`: allows to write a script to determine if the sub-grid has to be displayed. This is the context:
    {{< js_script_context context="gridViewSubGridConditionScript">}}


The configuration of sub-grids is exactly the same as the main view. There is only one small difference
in behavior when creating a new record, where the field configured in `Related field` will be pre-populated
with the record in the main view.

## Filters

### Global filters

If the flag `Allow global filters` is enabled, the UI will allow the user to filter records in the grid
by the fields indicated in `Global filter fields`.

#### Override label

If `Allow global filters` is enabled, on `Global filter fields` there is a flag `Override Label` that
allow to override the filter label (default one is the field label).

#### Enable global search

If enabled, a search box will be displayed above the listing that allows to filter fields using
the global search feature (finds words in any field of the record).

This option is only available if the entity has global search enabled.

### Quick filters
Quick filters let you further filter the collection of cards easily by clicking/unclicking buttons.

See [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html) for more information.

## Permissions

Permissions allow to define which groups can access this view.
  
Permissions for a view can be handled right in the view definition, but it is just
a different view of what you can configure in groups. It is oriented so you can easily
configure permissions on the view for all existing groups.

When a new view is created, if a group has permissions to the entity associated to that view, then the view 
receives permission to be used for that group.

For more information about permissions please refer to [Groups]({{site.baseurl}}/app-development-security-groups.html).

