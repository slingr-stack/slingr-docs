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

In this section, we will explore how the actions we implemented in the previous section work. Let's navigate to the All Events page and select a record. You should see a read-only view with a new `Actions` button in the header. Click on it to see both actions. Remember that the actions are only visible if the status of the event is `Active`. Click on `Cancel Event`. A confirmation popup will appear. Click on `Cancel Event`.

![Alt Text](/images/vendor/event-planner/action-in-actions/ww_event_planner_cancel_event_action_runtime.png)

Once the action has completed, the status of the event should be `Cancel`, and the actions should no longer be visible. It should look something like this:

![Alt Text](/images/vendor/event-planner/action-in-actions/ww_event_planner_event_cancelled.png)

Now let's select another active event to execute the other action. In the read-only view of the other event, click on `Actions`, and then on `End Event`.

![Alt Text](/images/vendor/event-planner/action-in-actions/ww_event_planner_end_event_action_runtime.png)

A confirmation popup will appear, click on `End Event`. When the action completes, the status of the event should be `Done`. It should look something like this:

![Alt Text](/images/vendor/event-planner/action-in-actions/ww_event_planner_event_ended.png)

That's it! We have completed this small tutorial. The purpose of this tutorial was to guide you through your first steps with Slingr. If you're interested, there is an extra section where we make a small improvement to our app. Hope you join me in the next section.
