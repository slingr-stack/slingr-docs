---
title: "Actions in action"
description: "Watch how the new actions work."
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

In this section, we will explore how the actions implemented in the previous section work. To get started, follow these steps:

👉 Go to the ``"All Events"`` view.

👉 Click on a record to view its details. You should see the read-only view.

👉 In the header, you will notice a new button labeled "More." Click on it to proceed.

![Alt Text](/images/vendor/event-planner/action-in-actions/ww_event_planner_cancel_event_action_runtime.png)

👉 Both actions should now be visible, but please note that you will only see them if the status of the event is "Active."

### Execute "Cancel event" action

👉 Locate and click on the ``"Cancel Event"`` action. A confirmation popup will appear. Click on ``"Cancel Event"`` again to confirm the action.

![Alt Text](/images/vendor/event-planner/action-in-actions/ww_event_planner_cancel_event_action_runtime.png)

👉 Once the action has completed, the status of the event should be `Cancel`, and the actions should no longer be visible. It should look something like this:

![Alt Text](/images/vendor/event-planner/action-in-actions/ww_event_planner_event_cancelled.png)

---

### Execute "End event" action

👉 Now let's select another active event to execute the other action. In the read-only view of the other event, click on `Actions`, and then on `End Event`.

![Alt Text](/images/vendor/event-planner/action-in-actions/ww_event_planner_end_event_action_runtime.png)

---

👉 A confirmation popup will appear, click on `End Event`. When the action completes, the status of the event should be `Done`. It should look something like this:

![Alt Text](/images/vendor/event-planner/action-in-actions/ww_event_planner_event_ended.png)

---

**That's it! We have finished this small tutorial.**

The purpose of this tutorial was to guide you through your first steps with Slingr. If you're interested, there's an additional section where we make a small improvement to our app.

Feel free to join me in the next section: [Small Improvement (Optional)](/getting-started/getting/first-steps/event-planner/small/).

