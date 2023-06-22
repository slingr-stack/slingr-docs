---
title: "Action views"
lead: "Detailed explanation of settings available for action views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 50
---

In order to be able to execute an action from the UI it is needed to define a view for it. To
make this simpler, when an action is created a default view will be created as well. This default
view will be completely managed, which means that new parameters will be added and removed as you
change your actions, so in many cases you can just ignore action views.

However it is possible to define many views for one action based on different settings you
need in other parts of the UI. For example in a grid view you might want to request confirmation
before executing the action as users can select many record while in the read-only view you just
skip action confirmation to make it faster.

Each view has the following settings:

## Label

A human-friendly name for the action view. This is what users will see as the name
of the action. Doesn't need to be unique.

## Name

A unique name for the action view. It cannot contain spaces or special characters.

## Is default view

Indicates if this is the default view for the action. Default views will be used for example
in grid views when you select the option to show all actions. In this case only the default view
for each action will be listed (doesn't make much sense to show all the views of each action
in the same place).

## Managed

If this flag is set, new parameters will be automatically added to the view and order will be
kept between parameters in the action and the view.

## Ask for confirmation

If this flag is set, the user will be asked for confirmation before being able to execute the action.
This makes sense when there aren't parameters defined in the view.

## Show success message

Display success message after the successful action execution. Is true by default but if it 
disabled this message is avoided.

## Style

This is the style for the action when showing it as a button in the UI.

## Icon

This is the icon for the action when showing it in the UI.

## Confirmation button

A human-friendly label for the action confirmation button. This message replaces default label: `Action label`.

## Cancel button

This is a human-friendly text for cancel button. This message replaces the default label: `Cancel`.

## Help message

This is a human-readable help message about the behavior of the action action does. The label will be displayed at the 
top of the action modal.

## Parameters

This is the list of parameters that will be displayed on the view. It is possible to sort them,
remove the ones you don't need, etc.

Here it is possible to override default display options. You can check the documentation of
[General display options]({{site.baseurl}}/app-development-model-fields.html#general-display-options)
for more information.

## Events

### Before show

The before show script will be evaluated before the action is executed. In the UI it is executed
before showing the popup to the user, so it is possible to make some changes to the parameters
based on some special conditions.

If many records are selected, the script is evaluated only once. You can check which
records will be affected by using the `query` parameter in the script.

{{< js_script_context context="actionInitScript">}}

### On action change

The on action change script will be evaluated each time that an view parameter change its value. So it is possible
to make some changes to the parameters based on some special conditions.

You can check which parameter has fired the event using the `modifiedParameter` parameter in the script.

{{< js_script_context context="onActionChangeScript">}}

### After action executed

The after action executed script is evaluated right after the user confirms the action execution
(or just when they trigger the action if the flag `Ask for confirmation` is not set). Keep in
mind that this is only done when the action is executed from the UI using this specific view.

If many records are selected, the script is evaluated only once. You can check which
records will be affected by using the `query` parameter in the script.

Additionally if the action is sent to the background, a `job` object will be available that
references the job in charge of executing the action over the record(s).

{{< js_script_context context="actionAfterExecutedScript">}}

