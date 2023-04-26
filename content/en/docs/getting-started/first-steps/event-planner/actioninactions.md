---
title: "Actions in action"
lead: "Seeing how our actions work."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "event-planner"
weight: 50
toc: true
---

In this section, we are going to see how the actions we implemented in the previous section work. To do so, let's go to the all events page, and click on a record. You should see the read-only view but this time the header has a new button called `Actions`, click on it and you should be able to see both actions. Remember that you will only see them if the status of the event is `Active`. Click on `Cancel Event`. A confirmation popup should appear. Click on `Cancel Event`. 

![Alt Text](/images/vendor/event-planner/action-in-actions/ww_event_planner_cancel_event_action_runtime.png)
Once the action has finished the status of the event should be `Cancel` and the actions should not appear. Something like this:

![Alt Text](/images/vendor/event-planner/action-in-actions/ww_event_planner_event_cancelled.png)
Now let's go to another active event to execute the other action. In the read-only view of the other event, click on `Actions`, and then on `End Event`.

![Alt Text](/images/vendor/event-planner/action-in-actions/ww_event_planner_end_event_action_runtime.png)


The confirm popup will be shown, click on `End Event`. When the action finishes the status of the event should be `Done`. Something like this:

![Alt Text](/images/vendor/event-planner/action-in-actions/ww_event_planner_event_ended.png)
That is it! We have finished this small tutorial. The idea of this tutorial was to guide you with your first steps with Slingr. If you want, there is an extra section where we do a small improvement to our app. Hope you join me in the next section.
