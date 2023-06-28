---
title: "Metadata edition"
lead: "Overview of how metadata can be edited."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 4
---
## General description
After clicking on a single node of the [navigation tree]({{<ref "/dev-reference/metadata-management/metadata-editor/app-resources.md">}}), a view will be rendered in the **central panel** of the app builder. This view, depending on what resources correspond to, can be either a **table** showing information about some sub items, or an editable **form** with several labels and values showing all the different settings linked to that particular resource.

## Central panel view
The first thing you will notice in all of these views is that they all have a **top header** with certain elements. On the left side of this header you will find the **breadcrumb navigation** that will provide you the current context path in the metadata tree, and links to the view of each of the parent nodes. On the right side, you will find a group of buttons for performing several operations related to that particular resource. The most common operations you can find are: `cancel`, `reset`, `delete`, `apply`, `save`, `show history` and `find usages`.

### Action buttons

- **Cancel**: exits the current form and redirect to the parent metadata node.
- **Reset**: reset the form and all its setting's values to the previously saved state.
- **Delete**: deletes the current resource and redirects you to the parent metadata node.
- **Apply**: attempts to save the form and all the current settings of a particular resource. It will not redirect you to any other url afterwards.
- **Save**: attempts to save the form and all the current settings on a particular resource. After saving changes, it will redirect you to the parent's node of that resource.
- **Show History**: this action is located inside the `tools` button. When clicking on this action, a view will be rendered in the central panel with a table showing the history of changes related to the current resource. [You can find more information about this view here]({{<ref "/dev-reference/app/settings.md">}}).
- **Find Usages**: this action is located inside the `tools` button. When clicking on this action, the right panel will show up in the **usages** tab, and it will display a list of all the different places where the current resource has been used. 