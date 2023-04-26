---
title: "First changes to out app"
lead: "Creating a field into an existing entity."
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
In this section, we are going to be taking our first steps with the builder. If you are in the developer portal, you should see an app card like this one:

![Alt Text](/images/vendor/event-planner/first-changes/ww_event_planner_open_builder.png)


Click on the button on the right (The one with the wrench) to open the builder in a new tab. 
In this section, we are going to add a new field to the events. This can be used to improve metrics of the events for example.
Okay, let's get to work. If you are in the builder you should be seeing something like this:

![Alt Text](/images/vendor/event-planner/first-changes/ww_event_planner_builder_nodes.png)


On the left you are going to see a tab called “App navigation” with a tree inside, every item here is what we called “Node” (Marked in red in the image above), clicking on these is going to allow you to navigate throw the different pages of the builder. Some nodes have extra functionalities using the right-click option, you are going to be able to distinguish them cause when you hover them an arrow is going to appear like this:

![Alt Text](/images/vendor/event-planner/first-changes/ww_event_planner_builder_nodes_arrow.png)



Great! Now that we know how to navigate throw the builder, let's go and add our new field to the events entity. To do so, follow these steps:
  - Right-click on the node `Model > Entities > Events > Fields`, and a dropdown menu will be shown, click `New Field`.
  - Fill in the form with:  
      - `Label`: Status
      - `Name`: status
      - `Type`: Choice
      - `Values`: 
        - Active
        - Done
        - Cancel

![Alt Text](/images/vendor/event-planner/first-changes/ww_event_planner_status_form.png)

  - Click on `Create and Edit`.
  - Set the `default value` to `Active`.

![Alt Text](/images/vendor/event-planner/first-changes/ww_event_planner_status_default_value.png)

  - Click on `Save`.

Awesome! We made a small improvement to our app. Now let's go and push the changes so we can see them on the runtime. 
On the header of the builder click the button next to your name (The hamburger button), a dropdown will be shown, and click on `Push changes`.

![Alt Text](/images/vendor/event-planner/first-changes/ww_event_planner_push_changes.png)

A popup will appear, where you can see the changes you have made, click on `Push changes`.
Awesome! We have finished with the builder for now. In the next section, we are going to see our changes in action. 