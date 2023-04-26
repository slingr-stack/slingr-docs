---
title: "Creating actions"
lead: "Learning how to create actions with flows and scripts."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "event-planner"
weight: 40
toc: true
---


In this section we are going to add some actions to our events, the idea is these changes will allow us to change an event status without having to enter into the edit view. Let’s get to work. First, let’s create an action to cancel events, we are going to do it with a feature called Flows. This action should only appear if the current status of the event is Active. Follow these steps:

Right-click on the node Model > Entities > Events > Actions, a dropdown menu will be shown, click New Action.
Fill in the form with:
- Label: Cancel Event
- Name: cancelEvent
- Type: One Record
- Visible: Always
- Preconditions: Expression
- Expression: Value > Status > Equals > Active
- Actions type: Flow
- Click on Open Editor.

![Alt Text](/images/vendor/event-planner/creating-actions/ww_event_planner_cancel_event_action.png)


![Alt Text](/images/vendor/event-planner/creating-actions/ww_event_planner_cancel_event_action_2.png)


![Alt Text](/images/vendor/event-planner/creating-actions/ww_event_planner_flow_editor.png)

This is what we call The flow designer, and the squares on the left are what we called steps, each step has different functionality and you can connect them to build a flow. You can learn more about flows here. We are going to use it to change the status of the record.

- Create an Update record step and connect it with the start step.
- On the right you can configure the step, filled the form with this:
  * Record: record
  * Data: Status > Set > Cancel
  * Store changes: true


![Alt Text](/images/vendor/event-planner/creating-actions/ww_event_planner_update_record_step.png)


- Create an End step and connect it with the Update record step.
End step


![Alt Text](/images/vendor/event-planner/creating-actions/cc.png)


- Click on Create.
Awesome right? When we execute that action we are going to be able to set the status of an event to Cancel without having to enter the edit view. Now the only thing left is to create another event to pass an event from Active to Done. We could do it the same way we have just learned, but this time we are going to use the Javascript API offered by Slingr instead, you can learn more about it here. Follow these steps:

- Right-click on the node Model > Entities > Events > Actions, a dropdown menu will be shown, click New Action.
- Fill in the form with:
  * Label: End Event
  * Name: endEvent
  * Type: One Record
  * Visible: Always
  * Preconditions: Expression
  * Expression: Value > Status > Equals > Active
  * Actions type: Script
  * Script:
  ```
    record.field("status").val("done");
    sys.data.save(record);
  ```


![Alt Text](/images/vendor/event-planner/creating-actions/ccc.png)


![Alt Text](/images/vendor/event-planner/creating-actions/cccc.png)


- Click on Create.
That is it! We have implemented our actions. Let’s push the changes we have done. If you don’t remember how it is done, go back to the section First changes to our app, to refresh it. Once you are finished pushing the changes, go to the runtime, and follow me to the next section Actions in action to take a look at what we have done.
