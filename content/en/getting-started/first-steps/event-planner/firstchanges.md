---
title: "First changes to out app"
lead: "Creating a new field in the existing 'Events' entity"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "event-planner"
weight: 20
toc: true
---


![Alt Text](/images/vendor/event-planner/first-changes/ww_event_planner_open_builder.png)


![Alt Text](/images/vendor/1.gif)


![Alt Text](/images/vendor/event-planner/first-changes/ww_event_planner_builder_nodes.png)


![Alt Text](/images/vendor/event-planner/first-changes/ww_event_planner_builder_nodes_arrow.png)






![Alt Text](/images/vendor/event-planner/first-changes/ww_event_planner_status_form.png)


![Alt Text](/images/vendor/event-planner/first-changes/ww_event_planner_status_default_value.png)


![Alt Text](/images/vendor/event-planner/first-changes/ww_event_planner_push_changes.png)


In this section, we will learn how to add a new field to the Events entity in the Slingr Event Planner app. This will allow us to improve the metrics of the events in the app.

### Opening the Builder

To get started, open the Slingr Developer Portal and navigate to the Event Planner app. Click on the app card to open it, then click on the wrench icon to open the builder in a new tab.

### Adding a new field to the Events entity

Once you have opened the builder, you should see a navigation panel on the left side of the screen. This panel contains a tree with different nodes, each representing a different aspect of the app. To add a new field to the Events entity, follow these steps:

1. Right-click on the node `Model > Entities > Events > Fields`.
2. Select `New Field` from the dropdown menu.
3. Fill in the form with the following details:
   - Label: `Status`
   - Name: `status`
   - Type: `Choice`
   - Values: 
     - `Active`
     - `Done`
     - `Cancelled`
4. Click `Create and Edit`.
5. Set the default value to `Active`.
6. Click `Save`.

### Pushing changes to the runtime

Once you have added the new field, you need to push the changes to the runtime so that they can take effect. To do this, click on the hamburger icon in the builder header, then select `Push changes` from the dropdown menu. In the popup that appears, review the changes you have made and click `Push changes`.

That's it! You have now successfully added a new field to the Events entity in the Slingr Event Planner app.
