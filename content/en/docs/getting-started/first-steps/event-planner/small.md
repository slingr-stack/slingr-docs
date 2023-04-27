---
title: "Small improvement (Optional)"
lead: "Removing deleting permissions to Admin users."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "event-planner"
weight: 60
toc: true
---
In this section, we will be implementing a small improvement to our app. We will prevent Admin users from deleting events and instead manage events only with the status Cancel. This will help us in better tracking and metrics in the future.

To do this, follow these steps:
- Click on the node `Model > Entities > Events > Permissions`.
- You will see a table with the permissions for both default groups on the entity `Events`.
- Set the column `Can delete` to `Never` for both groups.
- Click on `Save`.

![Alt Text](/images/vendor/event-planner/small-improvements/ww_event_planner_permissions.png)

Once you have made these changes, push them to the runtime. Keep in mind that as a developer user, you will still be able to delete events. To see the changes, switch to the Admin group by clicking on your name in the main header and selecting `Switch groups`. Then, select only the Admin group and click on `Switch`.

![Alt Text](/images/vendor/event-planner/small-improvements/ww_event_planner_switch_group_action.png)

Now, go to All events and check that the option to delete an event is no longer available when you select an event. This should also be the case in the read-only view.

![Alt Text](/images/vendor/event-planner/small-improvements/ww_event_planner_list_no_delete.png)

![Alt Text](/images/vendor/event-planner/small-improvements/ww_event_planner_readonly_no_delete.png)

Congratulations on completing this small improvement for your app!
