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


In this section, we will add actions to our events to change their status without having to enter the edit view. 

To begin, let’s create an action to cancel events using a feature called Flows. This action will only appear if the current status of the event is Active. Follow these steps:

1. Right-click on the node Model > Entities > Events > Actions and select New Action from the dropdown menu.
2. Fill in the form with the following details:
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

3. The flow designer will open. The squares on the left are called steps and each step has different functionality that can be connected to build a flow. Use the flow designer to change the status of the record by following these steps:
   - Create an Update Record step and connect it with the start step.
   - On the right, fill the form with the following details:
       - Record: record
       - Data: Status > Set > Cancel
       - Store Changes: true
   - Create an End step and connect it with the Update Record step.

![Alt Text](/images/vendor/event-planner/creating-actions/ww_event_planner_update_record_step.png)

![Alt Text](/images/vendor/event-planner/creating-actions/cc.png)

4. Click on Create.

Once we execute this action, we can set the status of an event to Cancel without having to enter the edit view. 

Next, we will create another action to pass an event from Active to Done using the Javascript API offered by Slingr. Follow these steps:

1. Right-click on the node Model > Entities > Events > Actions and select New Action from the dropdown menu.
2. Fill in the form with the following details:
   - Label: End Event
   - Name: endEvent
   - Type: One Record
   - Visible: Always
   - Preconditions: Expression
   - Expression: Value > Status > Equals > Active
   - Actions type: Script
   - Script:
      ```
      record.field("status").val("done");
      sys.data.save(record);
      ```

![Alt Text](/images/vendor/event-planner/creating-actions/ccc.png)

![Alt Text](/images/vendor/event-planner/creating-actions/cccc.png)

3. Click on Create.

That's it! We have implemented our actions. After pushing the changes, go to the runtime and proceed to the next section, Actions in Action, to see the results.
