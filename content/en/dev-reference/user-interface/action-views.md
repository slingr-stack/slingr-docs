---
title: "Action views"
description: "Detailed explanation of settings available for action views."
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

To enable the execution of an action from the UI, it's necessary to define a corresponding view for it. Simplifying this process, when an action is created, a default view is also generated. This default view is fully managed, meaning new parameters will be automatically added and removed as you modify your actions. In many cases, you can simply disregard action views and utilize the default view.

Nevertheless, it's possible to create multiple views for a single action, each configured based on different requirements within different UI components. For instance, in a grid view, you might want to prompt for user confirmation before executing an action when multiple records can be selected. In a read-only view, you might skip the confirmation step to expedite the process.

Each action view is equipped with the following settings:

## **Label**

A user-friendly name for the action view. This name is displayed to users as the action's identifier. Uniqueness is not necessary.

## **Name**

An exclusive name for the action view. It should not include spaces or special characters.

## **Default view**

Indicates whether this is the default view for the action. Default views are employed, for example, in grid views when you choose to display all available actions. In such cases, only the default view for each action is listed, as showing all views for each action within the same context would be impractical.

## **Managed**

When this flag is set, new parameters are automatically incorporated into the view, and the parameter order aligns with that of the action.

## **Confirmation prompt**

When enabled, this prompts the user to confirm their intention before executing the action. This is particularly relevant when no parameters are defined in the view.

## **Display success message**

This flag, enabled by default, triggers the display of a success message following the successful execution of the action. Disabling it omits this message.

## **Style**

This pertains to the visual style of the action when presented as a button in the UI.

## **Icon**

This specifies the icon to represent the action when displayed in the UI.

## **Confirmation button**

A user-friendly label for the action confirmation button. This label replaces the default **`Action label`**.

## **Cancel button**

A user-friendly label for the cancel button. This label replaces the default **`Cancel`**.

## **Help message**

A human-readable explanation of the action's behavior. This message is displayed at the top of the action modal.

## **Parameters**

This encompasses the list of parameters shown in the view. You can sort, remove unnecessary ones, and more.

In this context, you have the flexibility to override default display options. For more details, consult the documentation on [General Display Options]({{<ref "/dev-reference/data-model-and-logic/fields.md#general-display-options">}}).

## **Events**

### Before show

The before show script is evaluated prior to action execution. In the UI, it is triggered before presenting the user with the action popup. This enables adjustments to parameters based on specific conditions.

When multiple records are selected, the script is evaluated only once. You can determine the records affected by using the **`query`** parameter in the script.


  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})| The record on which the action will be executed. <br> This variable is exclusively accessible if the action type is set to **`"One record"`** or if you are applying the action to multiple records.|
  | query |  [sys.data.Query]({{<ref "/dev-reference/scripting/sys-data.md">}}) | A query object containing filters to locate all records affected by this action. This is applicable only for the **`"Many records"`** action type. |
  | action |  [sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}}) | This provides access to the parameters of the action. Changes made here will be reflected in the UI when the action is executed from the user interface.|

  ##### Samples

  ``` javascript
  // sets the default value as the email of the current user
  action.field('sendTo').val(sys.context.getCurrentUser().email());
  ```
  <br>

### On action change

The **On Action Change** script is executed whenever a view parameter changes its value. This enables making adjustments to the parameters based on specific conditions.

You can identify the parameter that triggered the event by utilizing the **`modifiedParameter`** parameter within the script.

  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})| The record on which the action will be executed. <br> This variable is exclusively accessible if the action type is set to **`"One record"`** or if you are applying the action to multiple records.|
  | action |  [sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}}) | This provides access to the parameters of the action. Changes made here will be reflected in the UI when the action is executed from the user interface.|
  | modifiedParameter | string | A string with the name of the field that fires the event. |

  ##### Samples

  ``` javascript
  // sets the value as the email of the current user only if the field 'sendTo' has changed and is empty
  if (modifiedParameter == 'sendTo' && action.field('sendTo').isEmpty()) {
    action.field('sendTo').val(sys.context.getCurrentUser().email());
  }
  ```
  <br>

### After action executed


The *After Action Executed* script is executed immediately after the user confirms the execution of the action (or when they trigger the action, if the **`Ask for confirmation`** flag is not enabled). It's important to note that this only occurs when the action is executed from the UI using this specific view.

In situations where multiple records are selected, the script is evaluated only once. You can determine the affected records by utilizing the **`query`** parameter within the script.

Furthermore, if the action is executed in the background, a **`job`** object becomes available, referencing the job responsible for executing the action over the record(s).


  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})| The record on which the action will be executed. <br> This variable is exclusively accessible if the action type is set to **`"One record"`** or if you are applying the action to multiple records.|
  | query |  [sys.data.Query]({{<ref "/dev-reference/scripting/sys-data.md">}}) | A query object containing filters to locate all records affected by this action. This is applicable only for the **`"Many records"`** action type. |
  | action |  [sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}}) | This provides access to the parameters of the action. Changes made here will be reflected in the UI when the action is executed from the user interface.|
  | job | [sys.jobs.Job]({{<ref "/dev-reference/scripting/sys-jobs.md">}}) | This is the job object, exclusively accessible when the action is executed in the background. <br> Keep in mind that the **`After Action Executed`** script is run immediately after triggering the action from the UI. At this point, the associated job might still be pending or running.|

  ##### Samples

  ``` javascript
  // after action is executed redirect to read only view of given record
  var record = sys.data.findOne(query);
  sys.ui.sendMessage({
      scope: 'global',
      name: 'navigate',
      view: '590ce2e38a2....',
      recordId: record.id()
    });
  ```
  <br>

