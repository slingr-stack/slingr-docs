---
title: "Records views"
lead: "Detailed explanation of settings available for record views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

Record views allow to show the content of a record. It is possible to decide
which fields will be displayed, override default display options, indicate
which actions can be executed, etc.

## Label

This is a human-readable name of the view. You can use spaces, special characters and
mix upper case and lower case letters.

This label will be displayed at the top of the grid view, so make sure you use something
users will understand.

## Name

This is the internal name of the view. It cannot hold special characters or spaces.

Usually you will use the name of the view in scripts and the REST API, so changing it
might affect your app and you will need to make some manual adjustments.

## Entity

This is the entity the view will point to. Only records in this entity can be displayed
by the view.

## Type

The type indicates what the record view will be used for. Options are:

- `Read only`: in this case the view won't have any editable field (fields will be forced
  to be read only). However this type of record view is the only one that supports the
  execution of actions on the record (you cannot execute actions of edit or create views).
  This way, when this feature is enabled the option `Main menu` becomes available and
  you have these options:
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
- `Create`: allows to create a new record. In this case fields can be editable (you could 
  also have read only fields) and there will be buttons to create the record or cancel it.
- `Edit`: allows to edit an existing record. You can have editable fields as well as read
  only fields, and there will be buttons to save or cancel changes.
  
## Managed

If this feature is enabled, when a field is added to the entity the view points to, it will
be automatically added to the view as well.

This flag is set by default as it is very convenient to speed up development as you don't need
to worry that much about views and focus on the model.

If you disable this feature you will need to take care of adding new fields. Deleting or 
updating fields in the entity will still propagate changes to the view, but new fields need to
be handled manually.

## Show refresh button

Shows a `Refresh` button that allows to refresh record data without having to reload the entire page.

This flag is set by default.

## Automatic refresh

When this flag is enabled a dynamic listener will be created to allow to refresh automatically this view for all users
if a record that belong to the entity that this view is pointing is updated. No mather if the event is being fired by
a user or a script. This configuration option will be available only if the parent collection (grid or card) view
doesn't have already enabled this feature or there is no parent view.

## Alert for unsaved changes

When this flag is enabled, the user will see a message each time that tries to leave the form once he make a change
on some field. The only way to leave the form with unsaved changes without seeing the warning is by using the `cancel`
button. The message allows to continue with the record edition or discard the changes and continue with navigation.
This works for `create` and `edit` views and is enabled by default.

## Form layout

Allow define how labels and fields are rendered on the form. It can be `Horizontal` in which case the label is rendered 
at left side of the input field or can be `Vertical` in which case the label is rendered at the top of the field. 

## Fields

This is the list of fields that will be displayed on the view. It is possible to sort them,
remove the ones you don't need, etc.

Here it is possible to override default display options. You can check the documentation of
[General display options]({{site.baseurl}}/app-development-model-fields.html#general-display-options)
for more information.

## Events

Events allow to customize the behavior of the UI.

These events only applied to the view, which means they are only triggered when using the
app from the UI and not from the REST API.

### Before show

This event is triggered before showing the record to the user. For example you could make
some changes to the record before showing the record or log that the user opened the
record.

{{< js_script_context context="recordViewBeforeShowScript">}}

### After create

This event is triggered after a record is created successfully by the user. This might useful in situations like it is
required to navigate to other view or display a custom message.
  
{{< js_script_context context="recordViewAfterCreateScript">}}

### On record change

This event is triggered every time that a field change it's value. For example you could make
some changes to a record field depending on the value that another field has.

{{< js_script_context context="recordViewOnRecordChangeScript">}}

### After save

This event is triggered after a record is saved successfully by the user. For example, this event can be used to navigate
to a different view or to display a message.  

{{< js_script_context context="recordViewAfterSaveScript">}}

## Permissions

Permissions allow to define which groups can access this view.
  
Permissions for a view can be handled right in the view definition, but it is just
a different view of what you can configure in groups. It is oriented so you can easily
configure permissions on the view for all existing groups.

When a new view is created, if a group has permissions to the entity associated to that view, then the view 
receives permission to be used for that group.

For more information about permissions please refer to [Groups]({{site.baseurl}}/app-development-security-groups.html).

