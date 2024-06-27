---
title: "Flex action views"
description: "Detailed explanation of settings available for flex action views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "flex-views"
toc: true
weight: 50
---


To enable the execution of an action from the UI, it's necessary to define a corresponding view for it. Altought a default view is set when the action is created, it's possible to create a flex action view. This flex view is self managed, meaning new parameters will not be automatically added as you modify your actions, but developers will be able to design complex action views using the [View Designer]({{<ref "/dev-reference/user-interface/flex-views/view-designer/overview">}}). 

{{< notes type="note" >}}
 Since this type of views are not created by default, in order to use them is necessary to **Set as default** the view from the listing, once is created.
{{< /notes >}}

Each action view is equipped with the following settings:

## **Label**

A user-friendly name for the action view. This name is displayed to users as the action's identifier. Uniqueness is not necessary.

## **Name**

An exclusive name for the action view. It should not include spaces or special characters.

## **Default view**

Indicates whether this is the default view for the action. Default views are used, for example, in grid views when you choose to display all available actions or when executing an action in a record view. In such cases, only the default view for each action is listed, as showing all views for each action within the same context would be impractical.


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

## **Layout**

This represents the user defined layout of widgets to be displayed in the view.
For further details, consult the documentation on [View Designer]({{<ref "/dev-reference/user-interface/flex-views/view-designer/overview">}}).

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

