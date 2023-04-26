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
One use that we could make with the field we have just created is to have a correct track of all the events of the app. Currently, the Admin user of the app can delete events, that may be what you want, but let's supposed that you want to manage it only with the status Cancel, for better metrics in the future. We need to remove the permission of deleting an event from the Admin users. That's what we are going to do in this section.
So let's get to work:
  - Click on the node `Model > Entities > Events > Permissions`.
  - You should see a table with the permissions that the two default groups have on the entity `Events`.
  - As you can see only admins can delete Events in our app. Maybe that's what you want and it's a great way to manage it. But now that we have our field `Status` we are going to use that. So let's prevent Admin from deleting events.
  - On the column `Can delete`, make sure that both groups are set to `Never`.

![Alt Text](/images/vendor/event-planner/small-improvements/ww_event_planner_permissions.png)

  - Click on `Save`.

That is it! It was a small improvement but could solve a lot of problems in the future. Push the changes. Once the changes are done, go to the runtime tab and refresh the screen. 
Maybe you are thinking of going right away to see if the changes were done correctly. Keep in mind that you are probably logged as a developer user and they have permission to do everything so you are still going to be able to delete events. To see the changes let's switch groups to emulate an Admin user. 

In the main header, click on the button with your name, a dropdown will be shown, click on `Switch groups`.

![Alt Text](/images/vendor/event-planner/small-improvements/ww_event_planner_switch_group_action.png)
A popup will appear, select only the Admin Group, and click on `Switch`.

![Alt Text](/images/vendor/event-planner/small-improvements/ww_event_planner_switch_group_modal.png)

Great! Now you have the permissions of an Admin user. Let's go to All events and check that when you select an event, the option to delete it is gone. It should also be gone from the read-only view.

![Alt Text](/images/vendor/event-planner/small-improvements/ww_event_planner_list_no_delete.png)
![Alt Text](/images/vendor/event-planner/small-improvements/ww_event_planner_readonly_no_delete.png)


Awesome! Congratulations if you made it this far. Hope you learned a lot. 