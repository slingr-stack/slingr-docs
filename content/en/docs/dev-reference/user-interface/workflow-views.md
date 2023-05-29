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
---

Workflow views allow to show records of an entity in a board organized by columns, which makes it
very useful for cases where you have workflows. For example you could have a tasks entity and
in the workflow view you could have columns for states `To do`, `In progress`, and `Done`. Records
will be placed in the different columns based on the state and users will be able to move cards
from one column to another as they work on them, sort them in the column to establish priorities,
etc.

From workflow views it is also possible to create new records, see details of each record, edit them
and execute actions, similar to what you can do in grid views. The main difference is that instead
of showing records in a list they are displayed as cards in a board.

To move records from one column to another transitions have to be defined. Transitions will use
an action that will be executed when record is moved.

Finally it is possible to configure how cards will be rendered by customizing the title, content
and tags.

## Label

This is a human-readable name of the view. You can use spaces, special characters and
mix upper case and lower case letters.

This label will be displayed at the top of the workflow view, so make sure you use something
users will understand.

## Name

This is the internal name of the view. It cannot hold special characters or spaces.

Usually you will use the name of the view in scripts and the REST API, so changing it
might affect your app and you will need to make some manual adjustments.

## Entity

This is the entity the view will point to. Only records of this entity will be listed
in the workflow view.

## Columns

Columns are how workflow views are organized. Usually columns represent the different states
that records can have, but could be any other criteria.

### Label

This is the label of the column and will be displayed at the top of it in the UI.

### Sort field

This is the default sorting field for the column.

### Sort type

Indicates the direction of the sorting. 

### Width

This is the width of the column that can be specified in pixels or percentage. When using
percentage, the reference is the width of the main content area. If you use pixels and
the width is more than the available space, it will be possible to scroll horizontally to
see other columns.

### Filters

Filters allow to specify which records will be shown on the column, so only records matching
the expressions specified in the filters will be in the column. For example if the
column is `To do`, you probably will put a filter on records where field `state` is 
equals to `toDo` (or whatever the filter needs to be).

Please check the [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html) 
documentation for more information and how to configure these filters.

### Page size

This is the maximum number of records to fetch initially and when the user scrolls down
the list.

### Allow to rank records

Inside the column it is possible to rank records, moving them up and down. To enable this
feature this flag has to be set and the entity must have a field of type 
[Rank]({{site.baseurl}}/app-development-type-rank.html).

These settings must be configured when this option is enabled:

- `Rank field`: this is the rank field used to sort records in the column.
- `Rank type`: indicates how the rank will be done. `Auto` leaves this to the platform,
  which basically allows to move records to any position. If you need more control you
  could set the `Manual` option and use a script to define how rank should happen, which
  could be useful if you need to define restrictions or special rules. For example, if
  issues have some dependencies defined, you might check that tasks with dependencies on
  other tasks cannot be above those other tasks.
  When you select `Manual` you will need to provide a script. This is the context of the
  script:
  {{< js_script_context context="rankManualScript">}}

## Transitions

Transitions indicate how cards can be moved from one column to another. If there is no transition
defined to move cards from one column to another, this movement won't be possible in the UI.

These are the settings for transitions

- `Label`: this is a label to identify the transition.
- `Source column`: the column where cards will be dragged from.
- `Target column`: the column where cards will be dropped to.
- `Action`: this is the action to execute when the card is dropped. If the action has parameters,
  a modal will ask the user to complete the form and confirm the action. Otherwise the action will
  be executed automatically, ignoring the flag to ask for confirmation.
  One important thing to keep in mind is that the action is responsible to change the record in
  a way that it will be placed in the new column. For example if the transition moves allows to
  move the record from the column `To do` to the column `In progress`, the action should change
  the state of the tasks from `toDo` to `inProgress`. If the action for any reason (it could be
  a restriction) doesn't update the record, it will be put back in the column where it was.

## Card settings

Card settings determine how the cards will be rendered, like header, content and tags.

### Header

The header is shown at the top of the card. It should be short (according to the width configured
in columns) and provide enough information to let users identify the record.

There are two ways to define the header:

- `Field`: a field in the entity is selected and the value of that field will be used as
  the header.
- `Script`: if you need to mix different fields or have a more complex header, you can use a script
  to define it. This is the context of the script:
  {{< js_script_context context="cardsViewsHeaderScript">}}


### Summary

The summary is rendered in the body of the card. It should provide more details of the record but
you should try to keep it short, probably try not to take more than 3 lines. If the content is too
long, a vertical scroll will be added in the body of the card.

There are two ways to define the summary:

- `Field`: a field in the entity is selected and the value of that field will be used as
  the summary.
- `Script`: if you need to mix different fields or have a more complex summary, you can use a script
  to define it. This is the context of the script:
  {{< js_script_context context="cardsViewsSummaryScript">}}


### Tags groups

Tags are placed at the bottom of the card. They have a label and a color and are useful to quickly highlight
something in the card. For example for urgent tasks you might want to have a red tag saying 'urgent' so users
can quickly see them.

#### Label

This is a label for the tags group. It is just used to identify the meaning of the tag group.

#### Filter

This filter indicates which records can have this tag, which doesn't necessarily mean those records will
have it as there might be other considerations in the label script or if the label field is empty.

Please check the documentation for [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html) 
to know how to configure the filter.
 
#### Color

This is the color used for the tag. These colors are theme-aware.

#### Tags

These are the tags that will be applied. These are the options:

- `Fixed text`: only one tag will be added with the given text.
- `Field`: in this case the value of the text field will be used as the label. If the field is multi-valued,
  a tag will be added to each value. If the field is empty no tag will be added.
- `Script`: here it is possible to define tags using a script. Basically the script should return a string
  (one tag) or a list of strings (many tags).
  {{< js_script_context context="cardsViewsTagScript">}}

#### Record highlight

With this option you can define which records should be highlighted with colors. This is useful when
you want users to quickly see something. For example if there is a listing of tasks and you want users to
quickly see urgent ones, you can define a highlight expression for those fields so they have a red
color.

It is possible to define many highlight rules. For each one a color must be selected and a expression must be
defined. All records matching the expression will use the selected color.

Please check the documentation for [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html).

Alternatively you can use a script instead of an expression:

{{< js_script_context context="cardsViewHighlightScript">}}

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

### Record Menu

This option controls the actions that can be executed from each card. They will be displayed in the context
menu that belongs to each card (the three vertical dots on the upper-right corner of the card).

The available options are:

- `All`: Every action view available in the entity will be shown in the cards' context menu.
- `Some`: A custom selection of actions will be available. A new selector will appear called `Available actions`,
  which can be used to select which actions will be listed (you select the views of the actions here).
- `System Actions Only`: Only system actions like `CRUD`, `Import`, `Refresh`, etc. will be displayed
- `None`: No actions will be available.

In all cases permissions and preconditions of actions will be verified, so some actions might be hidden if the 
user doesn't have permissions or preconditions aren't met.

### Automatic refresh

When this flag is enabled a dynamic listener will be created to allow to refresh automatically this view for all users
if a record that belong to the entity that this view is pointing is created, updated or deleted. No mather if the event is
being fired by a user or a script. Enabling this feature on card view we are also enabling it on his CRUD read only view.

## CRUD actions

From workflow views it is possible to create, read, update and delete records. In this section you will be able
to configure how these actions can be done.

If the entity has children entities, it is possible to configure the different views for each kind of 
entity. So for example if you have entity A and then entities A1 and A2, if you create a record view for A, 
it allows to configure the view for entities A1 and A2. 

In this way, if you create a card view for entity A you will see records from A1 and A2. Depending on the type 
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

### Delete

#### Allow to delete

This action allows to delete records. When enabled you will see a `Delete` button in the listing where
you will be able to delete all selected records. It will also show up in the dropdown of the action
column and in the read view.

## Filters

### Global filters

If the flag `Allow global filters` is enabled, the UI will allow the user to filter cards in the board
by the fields indicated in `Global filter fields`.

#### Override label

If `Allow global filters` is enabled, on `Global filter fields` there is a flag `Override Label` that
allow to override the filter label (default one is the field label)

If the entity has global search enabled, it is possible to allow to use this feature by setting the
flag `Allow global search`.

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

