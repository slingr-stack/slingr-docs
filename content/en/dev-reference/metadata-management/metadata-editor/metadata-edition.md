---
title: "Metadata edition"
description: "Overview of how metadata can be edited."
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

## **General description**

Upon clicking on a node within the [navigation tree]({{<ref "/dev-reference/metadata-management/metadata-editor/app-resources.md">}}), a corresponding view will appear in the **`central panel`** of the app builder. Depending on the resources associated, this view may either present a **`table`** showcasing details about sub-items or an editable **`form`** featuring labels and values that reflect the various settings tied to the selected resource.

## **Central panel view**

In each of these views, you'll immediately notice a **top header** containing specific elements. On the left side of this header, the **breadcrumb navigation** displays the current context path within the metadata tree, along with links to each parent node's view. On the right side, a set of buttons enables various operations related to the particular resource. Common operations include: **`cancel`**, **`reset`**, **`delete`**, **`apply`**, **`save`**, **`show history`**, and **`find usages`**.

### Action buttons

- **`Cancel`**: Closes the current form and redirects to the parent metadata node.
- **`Reset`**: Restores the form and all associated setting values to the previously saved state.
- **`Delete`**: Removes the current resource and redirects to the parent metadata node.
- **`Apply`**: Attempts to save the form and all current settings of the specific resource. It won't redirect to another URL afterward.
- **`Save`**: Tries to save the form and all current settings of a resource. After saving changes, it will redirect you to the parent node of that resource.
- **`Show History`**: Located within the **`tools`** button. Clicking this action displays a view in the central panel featuring a table that outlines the history of changes connected to the present resource. [Find more information about this view here]({{<ref "/dev-reference/app/settings.md">}}).
- **`Find Usages`**: Within the **`tools`** button, clicking this action reveals the right panel in the **`usages`** tab. It presents a list of all locations where the current resource has been utilized.
