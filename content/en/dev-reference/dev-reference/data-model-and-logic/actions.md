---
title: "Actions"
lead: "Explains what action are and how they can be used to define behavior in entities."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

Actions allow to define behavior of records of the entity apart from the basic operations like
create or delete. For example, in an entity that holds tasks, you could have an action to 
complete it, that will check that all pre-conditions are met, update the status and notify 
people involved in the task.

When an action is defined for an entity, it is accessible from the UI, 
[REST API]({{site.baseurl}}/app-development-apps-rest-api.html#actions) and 
[Javascript API]({{site.baseurl}}/app-development-js-api-data.html).

## Action settings

### Label

This is the human-readable name of the action. This label will be used in the UI.

### Name

This is the internal name of the action and it will be used in the REST and Javascript 
APIs.

The name cannot contain special characters or spaces. Only letters and numbers.

One thing to keep in mind is that changing the name of the action could have some side
effects:

- **REST API**: if external apps were using this action through the REST API, these apps
  will need to be updated as the URL for the action will be different.
- **Scripts**: if there were scripts in the app referencing this action, those scripts 
  need to be updated manually. In the near feature there will be tools to help on these
  cases.

### Type

The type indicates if the action will be executed to each record or if it is executed 
to a group of records at the same time:

- `One record`: these actions are applied to one record at a time. Even when it is possible 
  to select many records through the UI or send many IDs on the REST API, this action will be 
  applied at one record at a time. The action doesn't know how many records are involved, it 
  is only aware of the record the action is being applied.
- `Many records`: these actions take a query as parameter that defines the selection of records. 
  This way the action knows all the records involved and it can do something with all of them at 
  the same time. For example you could have an action to send a summary of many tasks in one email, 
  which is not possible to do with actions that are executed over individual records.
  When the action is for many records the options to restrict to one record and
  preconditions are not available.
- `Global entity`: these actions do not receive any parameter to determine affected records. 
  The action will be available to be selected in all grid views and workflow views (for last one in special section called 
  `Global actions`). For example think of an action named Check payment status that is in the entity `Payments`, so when 
  user executes it, it will execute a script to check the status of all payments that are pending.

### Visible
  
Allow to control the visibility of the actions. If this is set as `Never`, even when the action is in the view, 
the action won't be displayed. This flag is useful so you don't need to go to each views an remove the action manually. 

Keep in mind this is just a UI setting.

Visible has the following options:

- `Always`: the action is always visible. Default option.
- `Expression`: the action will be visible if the expression evaluates to `true`. You can find more
information in the documentation for [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html).
- `Script`: if the script returns `true` the action will be visible, otherwise it will be hidden.
This is the context of the script:


{{< js_script_context context="actionVisibleScript">}}



- `Never`: the action will be hidden. 

### Preconditions

If the action is of type `One record` it will be possible to define preconditions to determine in
which records the action can be applied. For example if you have an entity `tasks` and you have
an action called `complete`, you might want to only allow this action when the field `status` is
equals to `inProgress`.

Preconditions can be defined in two ways:

- `Expression`: the action will be executable on the record if the expression evaluates to `true`.
  Otherwise the action won't be available in the UI or will throw an error when trying to execute
  it from the REST or Javascript API. You can find more information in the documentation for 
  [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html).
- `Script`:  the action will be executable on the record if the scripts returns `true`.
  Otherwise the action won't be available in the UI or will throw an error when trying to execute
  it from the REST or Javascript API.
  This is the context of the script:

{{< js_script_context context="actionPreconditionScript">}}


### Result as response

If the action is of type `One record` or `Global entity` it is possible to indicate if the action should return a custom
response. If that's the case what the action script returns will be returned as the response.

For actions of type `Many records`, what the action script returns is always taken as the response
of the action.

Any value returned by the script and used as response is converted into a valid JSON (if necessary), and 
the `Content-Type` is always `application/json`. If this is not possible, then an error will be triggered.

This setting does not affect in any way the behavior of the UI, and it is only useful when using the
[REST API]({{site.baseurl}}/app-development-apps-rest-api.html#actions), where the returned value will be
response's body of the request.

### Save linked parameters

If the action is of type `One record` it is possible to add linked parameters to the action. If you
want that the record gets automatically updated with values in linked parameters, you should make
sure this flag is set. Otherwise you will be responsible for saving the record in the action script
if you want to make changes permanent.

Keep in mind that if the set this option a record changed event will be triggered before executing
the action script (that's when the record is saved). If you save the record again inside the action
script another record changed event will be triggered (apart from the action performed event, which
is also triggered).

### Execute in background

If this flag is set, when the action is executed it will return immediately with a reference to
a job which will be responsible of executing the action in the background.

For example when you execute the action using the REST API, instead of returning the result of
the action, it will return a reference of the job that will be executed in the background. Then
you should check the status of the job if you need to know when it is completed.

This flag can be override for one specific call through the REST API or Javascript API. Also the
UI might decide to override this flag. For example when more than one record is selected the UI
will always send the action to the background even if this flag isn't set.

If the flag isn't set, the calls to the action will wait until it is completed and will return
the result of executing the action.

Please read more about actions in the [REST API]({{site.baseurl}}/app-development-apps-rest-api.html#actions)
and [Javascript API]({{site.baseurl}}/app-development-js-api-data.html).

### Avoid trigger UI events
If this flag is set, when the action is executed in the background it will skip triggering notifications 
to the UI. This is useful to avoid overhead during execution. A common scenario will be to execute an action
for batch processing in which it is not required to notify end users about data changes.

### Restrict to only one record

If the action is of type `One record` this flag will indicate that you cannot select many records
at the same time and execute the action. This is mainly in cases where there are parameters that
doesn't make sense to send the same value to more than one record.

For example if the action is to update the title of a task, it doesn't make sense to execute it to
more than one record because you will be setting the same title to many tasks.

### Action script

This is the main script of the action. It is evaluated when the action is executed (in the UI
when the action confirms the execution) and here is where the action should perform the work.


{{< js_script_context context="actionValidationScript">}}



### Custom validations

Action custom validations allow to perform more complex validations across all fields in the action and
using other services that are not available in fields rules.

For `ONE_RECORD` action types the record is available on the script context while for `MANY_RECORDS` a Query object
can be used to determine witch records will be affected.

For example you might have an endpoint for an address validation service that you can use to
validate addresses, or you just want to make sure that when one option is set in one field in the record or
in the action, the value of another action field needs to match some specific pattern.

This is the script context:

{{< js_script_context context="nestedFieldsLabelScript">}}


## Parameters

Parameters are fields that will be asked when the action is executed. For example when
executing the action from the UI, a popup will ask the user to enter the values for the
parameters configured in the action (see [action views](#views) for more details on how to configure
the UI of an action).

They can be of three types:

- **Parameter**: these fields do not belong to the entity but to the action itself. They
  have their own configuration and you don't need to store them in the record (however you can copy
  the value to one of the fields in the record in the action script if you need).
- **Linked parameter**: these fields are in defined in the entity and so you cannot change the
  structure and settings they have (only display options in views). If the flag `Saved linked parameters`
  is set, these fields will be updated in the record automatically before executing the action script
  and triggering a record changed event.

Parameters will be accessible in the script of the action through the variable `action`. You can
see that in [Init script](#init-script) and [Action script](#action-script). Entity field parameters 
are also available on the `record` variable.

For more information about how to configure parameters, please check the documentation
of [Fields]({{site.baseurl}}/app-development-model-fields.html).

## Permissions

Permissions indicate which groups provide permissions to execute the action. As in other cases,
permissions are enforced in the UI as well as in the REST API.

When a new action is added to an entity, if the group has permissions to all the actions in that 
entity, then that action is also given the Allowed permission.

Permissions for parameters should be configured inside each parameter or in groups.

When a new parameter is added to an action, if a group has permissions to the action, read-write 
permission is automatically assigned to that parameter in the group.

For more information about permissions please refer to [Groups]({{site.baseurl}}/app-development-security-groups.html).

## Views

In order to be able to execute an action from the UI it is needed to define a view for it. To
make this simpler, when an action is created a default view will be created as well. This default
view will be completely managed, which means that new fields will be added and removed as you
change your actions, so in many cases you can just ignore action views.

However it is possible to define many views for one action based on different settings you
need in other parts of the UI. For example in a grid view you might want to request confirmation
before executing the action as users can select many record while in the read-only view you just
skip action confirmation to make it faster.

Each view has the following settings:

- `Label`: a human-friendly name for the action view. This is what users will see as the name
  of the action. Doesn't need to be unique.
- `Name`: a unique name for the action view. It cannot contain spaces or special characters. 
- `Is default view`: indicates if this is the default view for the action. Default views will
  be used for example in grid views when you select the option to show all actions. In this
  case only the default view for each action will be listed (doesn't make much sense to show
  all the views of each action in the same place).
- `Managed`: if this flag is set, new parameters will be automatically added to the view and
  order will be kept between parameters in the action and the view.
- `Ask for confirmation`: if this flag is set, the user will be asked for confirmation before
  being able to execute the action. This makes sense when there aren't parameters defined in
  the view.
- `Style`: this is the style for the action when showing it as a button in the UI.
- `Icon`: this is the icon for the action when showing it in the UI.

### Events

#### Before show

The before show script will be evaluated before the action is executed. In the UI it is executed
before showing the popup to the user, so it is possible to make some changes to the parameters 
based on some special conditions.

If many records are selected, the script is evaluated only once. You can check which
records will be affected by using the `query` parameter in the script.

{{< js_script_context context="actionInitScript">}}

#### On action change

The on action change script will be evaluated each time that an view parameter change its value. So it is possible
to make some changes to the parameters based on some special conditions.

You can check which parameter has fired the event using the `modifiedParameter` parameter in the script.

{{< js_script_context context="onActionChangeScript">}}

#### After action executed

The after action executed script is evaluated right after the user confirms the action execution
(or just when they trigger the action if the flag `Ask for confirmation` is not set). Keep in
mind that this is only done when the action is executed from the UI using this specific view.

If many records are selected, the script is evaluated only once. You can check which
records will be affected by using the `query` parameter in the script.

Additionally if the action is sent to the background, a `job` object will be available that
references the job in charge of executing the action over the record(s).


{{< js_script_context context="actionAfterExecutedScript">}}

