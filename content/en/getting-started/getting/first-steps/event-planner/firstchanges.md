---
title: "First changes"
lead: "Summary: Creating a new field in the existing 'Events' entity"
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

In this section, we are going to take our first steps with the builder. If you are in the developer portal, you should see an app card similar to the one shown in the image:

### Open the builder

👉 Click on the button on the right (the one with the wrench icon 🔧 ) to open the builder in a new tab. 

![Card](/images/vendor/event-planner/first-changes/ww_event_planner_open_builder.png)

---

In this section, we are going to add a new field to the events. This can be used to improve metrics related to the events, for example. Alright, let's get to work. 

👉 If you are in the builder, you should be seeing something like this:

![Builder](/images/vendor/event-planner/first-changes/ww_event_planner_builder_nodes.png)

---

### Go to "App navigation" tree

On the left, you will see a tab called "App navigation" with a tree inside. Each item here is referred to as a "Node" (Marked in red in the image above). Clicking on these nodes will allow you to navigate through the different pages of the builder. Some nodes have extra functionalities accessible through the right-click option. You will be able to distinguish them because when you hover over them, an arrow will appear like this:

![Nav-tree](/images/vendor/event-planner/first-changes/ww_event_planner_builder_nodes_arrow.png)

---

### Create the field

Great! Now that we know how to navigate through the builder, let's go ahead and add our new field to the events entity. To do so, follow these steps:

👉 Right-click on the node ``Model > Entities > Events > Fields``, and a dropdown menu will be shown.

👉 Click on "New Field".

👉 Fill in the form with the following details:

    Label: Status
    Name: status
    Type: Choice
    Values:
          1. Active
          2. Done
          3. Cancel

---

![status-form](/images/vendor/event-planner/first-changes/ww_event_planner_status_form.png)

---
### Save and Edit the field.

👉 Click on ``Create and Edit``.

👉 Set the default value to ``Active``.

👉 Click on ``Save``.

![create-edit-save](/images/vendor/event-planner/first-changes/ww_event_planner_status_default_value.png)

---
### Push Changes

**Awesome!** We've made a small improvement to our app. To see the changes reflected in the runtime, follow these steps:

👉 On the header of the builder, click the button next to your name (The hamburger button).

👉 A dropdown menu will be shown. Click on "Push Changes."

👉 A popup will appear, displaying the changes you have made. Review them, and if everything looks good, click on "Push Changes."

![Alt Text](/images/vendor/event-planner/first-changes/ww_event_planner_push_changes.png)

---

🥳

**Fantastic!** 

We have finished with the builder for now. In the next section, we will see our changes in action.

Let's move on to the next section: **"First Look at Our New App."**