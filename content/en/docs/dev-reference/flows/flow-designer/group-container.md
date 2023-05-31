---
title: "Group containers"
lead: "Description of group containers steps"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

Some steps in the flow designer are also **group containers**. This means that they are capable of holding nested steps inside them. You can easily identify group container steps by dragging them from the palette and dropping them into the canvas. Once they have been dropped within the canvas you will notice this type of steps are wider and taller than regular steps, and also have a “Dropped steps here” message in the center. You can drag and drop other steps from the palette as well as the canvas inside a group container step. Once you drop a step into a group, that dropped step is now part of that group and a **linked icon** will appear on both, parent and child steps. This will create a sub context and the flow execution will continue with the steps inside the group container before moving on to the next step connected to the group container. This mean that you can drop several steps inside a container and connect them with each other. The first step to be executed within a group container will be the one that has not been target of any connection. Because of this, it’s important that only one step inside a group container isn’t target of a connection.

![Alt text](/images/vendor/flows/add_to_group_container.gif)


{{< notes type="tip">}}
Group containers steps can be resized to them bigger or smaller as you pleased. To do it so, dragged its edges from the bottom or right sides.
{{< /notes >}}

{{< notes type="note">}}
Group containers can be nested in n levels.
{{< /notes >}}

{{< notes type="note">}}
Group containers steps will display a dashed outline border when a step is being dragged on top of them.
{{< /notes >}}

{{< notes type="important">}}
"Steps in a container group **can only** be connected with other steps within the same group.
{{< /notes >}}

{{< notes type="warning">}}
Once a step is dropped inside a group container step, you won’t be able to drag that step out of the group and drop it into the canvas.It is only allowed to move it from one group to another one. If you accidentally dropped a step into a group, you can press the **reset** button to revert changes to the last time they were saved.
{{< /notes >}}




