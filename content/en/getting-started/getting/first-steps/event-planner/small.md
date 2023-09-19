---
title: "Small change (optional)"
lead: "Removing permissions for Admin users."
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
One use that we could make with the field we have just created is to keep a correct track of all the events in the app. Currently, the Admin user of the app can delete events, which might be suitable in some cases, but let's suppose that you want to manage it only with the "Cancel" status for better metrics in the future. We need to remove the permission for deleting an event from the Admin users.

### Remove deleting permissions for Admins

Let's proceed with the following steps:

👉 Click on the node `Model > Entities > Events > Permissions`.

👉 You should see a table with the permissions that the two default groups have on the entity `"Events"`.

👉 As you can see, only admins can delete events in our app. Maybe that's what you want, and it's a great way to manage it. However, now that we have our field ``"Status"`` we are going to utilize that. So, let's prevent Admin from deleting events.

👉 On the column ``"Can delete"``, make sure that both groups are set to `"Never"`.

👉 Click on `"Save"`.

![Alt Text](/images/vendor/event-planner/small-improvements/ww_event_planner_permissions.png)

---

**Great news!** 

With these small improvements, many potential problems in the future can be avoided. Let's proceed with pushing the changes to the app.

### Impersonate an Admin

Once you have made the necessary changes, head over to the runtime tab and refresh the screen. You might be eager to verify if the modifications were implemented correctly.

Please be aware that you are currently logged in as a developer user, granting you extensive permissions, including the ability to delete events. Exercise caution.

To observe the changes, let's switch groups and emulate an Admin user.

👉 In the main header, click on the button with your name, a dropdown will be shown, click on ``"Switch groups"``. 

👉 A popup will appear, select only the ``Admin Group``, and click on Switch.

![Alt Text](/images/vendor/event-planner/small-improvements/ww_event_planner_switch_group_action.png)

👉 Now, go to All events and check that the option to delete an event is no longer available when you select an event. This should also be the case in the read-only view.

![Alt Text](/images/vendor/event-planner/small-improvements/ww_event_planner_list_no_delete.png)

![Alt Text](/images/vendor/event-planner/small-improvements/ww_event_planner_readonly_no_delete.png)

---

🥳

**Congratulations on completing the tutorial!**

Great job, wasn't it?

Looking forward to seeing you in the next tutorial!