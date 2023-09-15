---
title: "Testing actions on runtime"
lead: "Summary: Testing actions previously implemented."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "task-mananger"
weight: 110
toc: true
---
In this section, we will examine the functionality of the actions we implemented in the previous section.

## Discover the actions

As you can observe in the grid view, a new column called "Actions" has been added. You can execute these actions from the "Actions" column or from the following locations:

### From "All tasks" view actions column

![Actions Column]({{site.baseurl}}/images/vendor/task-mananger/testing-actions/t.png)

### From "All tasks" view main menu

![All tasks main menu actions]({{site.baseurl}}/images/vendor/task-mananger/testing-actions/tt.png)

### From task record view main menu

![Task record main menu actions]({{site.baseurl}}/images/vendor/task-mananger/testing-actions/ttt.png)

Great! Our actions are now running. Please verify that the preconditions are working as expected. Additionally, ensure that in the **`edit view`**, the status cannot be changed. If you encounter any issues, refer back to the previous section to see if there is something you might have missed.

That’s it for this section. In the next one, we will create a new type of view that complements our current implementation. For more information, proceed to the next section: **"Creating a workflow view."**