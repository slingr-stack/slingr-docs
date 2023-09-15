---
title: "Group container steps"
lead: "Description of group containers steps"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 81
---

Some steps in the flow designer also function as **`group containers`**. These group containers have the capability to hold nested steps within them. You can easily identify group container steps by dragging them from the palette and dropping them onto the canvas. Once dropped onto the canvas, you will notice that these steps are wider and taller than regular steps. They also display a "Dropped steps here" message in the center.

You can drag and drop other steps from the palette as well as the canvas into a group container step. Once a step is dropped into a group container, it becomes a part of that group, and a **`linked icon`** will appear on both the parent and child steps. This creates a sub-context, and the flow execution will proceed with the steps inside the group container before moving on to the next step connected to the group container. This means that you can place multiple steps inside a container and connect them with each other. The first step to be executed within a group container will be the one that has not been the target of any connection. Therefore, it's important to ensure that only one step inside a group container is not the target of a connection.

![Adding to a Group Container](/images/vendor/flows/add_to_group_container.gif)

{{< notes type="tip">}}
Group container steps can be resized to make them larger or smaller as needed. To do this, drag their edges from the bottom or right sides.
{{< /notes >}}

{{< notes type="note">}}
Group containers can be nested at multiple levels.
{{< /notes >}}

{{< notes type="note">}}
Group container steps will display a dashed outline border when a step is being dragged on top of them.
{{< /notes >}}

{{< notes type="important">}}
Steps in a container group **`can only`** be connected to other steps within the same group.
{{< /notes >}}

{{< notes type="warning">}}
Once a step is dropped inside a group container step, you won't be able to drag that step out of the group and drop it onto the canvas. You are only allowed to move it from one group to another one. If you accidentally placed a step inside a group, you can press the **`reset`** button to revert changes to the last saved state.
{{< /notes >}}




