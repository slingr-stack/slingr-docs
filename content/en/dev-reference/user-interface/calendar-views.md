---
title: "Calendar views"
lead: "Detailed explanation of settings available for calendar views."
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

Calendar views allow to show records of an entity in a calendar where each record represent an event that can
be editable by clicking on the record. By default you will see the current month but you can navigate through
different months and you can also change the view to see weeks and days.

From calendar views it is also possible to create new records, see details of each record, edit them
and execute actions, similar to what you can do in grid and card views. The main difference is that instead
of showing records in a list or organized as cards in columns, they are displayed as events in a calendar.

Finally it is possible to configure how events will be rendered by customizing the title and the color.

## Entity

This is the entity the view will point to. Only records of this entity will be listed
in the calendar view.

## Label

This is a human-readable name of the view. You can use spaces, special characters and
mix upper case and lower case letters.

## Name

This is the internal name of the view. It cannot hold special characters or spaces.

Usually you will use the name of the view in scripts and the REST API, so changing it
might affect your app and you will need to make some manual adjustments.

## Calendar settings

### Allow events edition

This flag indicate if an event duration can be edited from the calendar view.

### Record filters

Filters allow to specify which records will be shown as events on the calendar, so only records matching
the expressions specified in the filters will be part of the view. For example if the
calendar is for show events in a `To do` status, you probably will put a filter on records where field
`state` is equals to `toDo` (or whatever the filter needs to be).

Please check the [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html) 
documentation for more information and how to configure these filters.

### Automatic refresh

Mark this view to be refreshed automatically when a record event occurs.

## Record settings

Here you can find the record events configuration. This configuration will be applied to each rendered record on the view.

### From field

Allows to select the `From field` from the entity to be used to locate the event start o the view. This field is required.

### To field

Allows to select the `To field` from the entity to be used to locate the event end o the view. This field is required.

### All day record field

Allows to select a field from the entity that represent if this record is a `All day event`. This field can only be `boolean`.

### Title

Select the title event type. It can be `Field` or `Script`.

### Field

Allows to select the `Title` from the entity to be used as event label on the view. This field is available and required
only if `Title` has the value `Field`.

### Script

Allows to manually set the event label on the view by providing a script that needs to return a `String`. This field is available and required
only if `Title` has the value `Script`. This is the context of the script:
{{< js_script_context context="calendarViewTitleScript">}}

### Highlight default color

Set the record color for each event.

### Main menu

This option controls the actions that can be executed from the view header. 

The available options are:

- `All`: Every action view available in the entity will be shown in the event context menu.
- `Some`: A custom selection of actions will be available. A new selector will appear called `Available actions`,
  which can be used to select which actions will be listed (you select the views of the actions here).
- `Custom menu`: This option allows the developer to customize how actions are rendered. Actions can be grouped in groups. At root level groups will be rendered as dropdown buttons while nested groups will be nested dropdowns.
There are some options available to configure the behaviour of buttons in the runtime. 
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

### Record menu

This option controls the actions that can be executed from each event. They will be displayed in the context
menu that belongs to each event.

The available options are:

- `All`: Every action view available in the entity will be shown in the event context menu.
- `Some`: A custom selection of actions will be available. A new selector will appear called `Available actions`,
  which can be used to select which actions will be listed (you select the views of the actions here).
- `System Actions Only`: Only system actions like `CRUD`, `Import`, `Refresh`, etc. will be displayed
- `None`: No actions will be available.

In all cases permissions and preconditions of actions will be verified, so some actions might be hidden if the
user doesn't have permissions or preconditions aren't met.

### Record highlight

Here we can configure different record colors that allows to differentiate record in the calendar. This can be done if
the record met the defined precondition. In other case, record will have the [highlight default color]({{site.baseurl}}/app-development-ui-calendar-views.html#highlight-default-color).

#### Color

The color to be applied to the event.

#### Color activation type

Allows to select how the color precondition will be expressed. Possible values are `Expression` and `Script`.

#### Filter

Only records matching the expressions specified in the filter will use the selected color. Please check the
[Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html) documentation for more information and how
to configure these filters. This configuration is available and required only if `Color activation type` is set to `Expression`.

#### Script

Allows to manually choose if the color has to be applied to the event by providing a script that needs to return a `Boolean`.
 This configuration is available and required only if `Color activation type` is set to `Script`. This is the context of the script:
{{< js_script_context context="colorActivationScript">}}

## CRUD actions

From calendar views it is possible to create, read, update and delete records. In this section you will be able
to configure how these actions can be done.

If the entity has children entities, it is possible to configure the different views for each kind of 
entity. So for example if you have entity A and then entities A1 and A2, if you create a record view for A, 
it allows to configure the view for entities A1 and A2. 

In this way, if you create a calendar view for entity A you will see records from A1 and A2. Depending on the type 
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

### Read

#### Allow to see details

This action is used to open a record from the listing. If enabled, users will be able to click on the record
in the listing to see details and they will see the action `View` in the action column (if enabled).

You will be able to configure the record view to see details by clicking on `Configure view`. Please take a 
look at the documentation of [Record views]({{site.baseurl}}/app-development-ui-record-views.html).

#### Open in modal

If this flag is set, the view to see details of records will be displayed in a modal instead of replacing the
listing as the main content.

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

## Filters

### Global filters

If the flag `Allow global filters` is enabled, the UI will allow the user to filter cards in the board
by the fields indicated in `Global filter fields`.

#### Override label

If `Allow global filters` is enabled, on `Global filter fields` there is a flag `Override Label` that
allow to override the filter label (default one is the field label)

### Quick filters
Quick filters let you further filter the collection of cards easily by clicking/unclicking buttons.

## Permissions

Permissions allow to define which groups can access this view.
  
Permissions for a view can be handled right in the view definition, but it is just
a different view of what you can configure in groups. It is oriented so you can easily
configure permissions on the view for all existing groups.

When a new view is created, if a group has permissions to the entity associated to that view, then the view 
receives permission to be used for that group.

For more information about permissions please refer to [Groups]({{site.baseurl}}/app-development-security-groups.html).
