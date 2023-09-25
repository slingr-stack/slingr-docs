---
title: "Overview"
description: "Brief explanation of how the UI is generated. Enumeration of different types of views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 44
---

Slingr streamlines the UI creation process by offering a range of features designed to expedite development. The ultimate goal is to empower developers to craft compelling UIs without getting bogged down in intricate details and boilerplate code.

Unlike many low-code platforms where developers still need to manually assemble UI elements within a form, carefully manage layout, and establish connections between the UI and data/operations, Slingr takes a different approach. While this approach might represent progress beyond raw HTML, CSS, and JavaScript, it often demands considerable time and effort, particularly when the app model undergoes changes.

To simplify UI creation, Slingr introduces substantial building blocks called "views". These views present diverse methods for presenting information, each tailored to distinct use cases. For instance, grid views are available for listing records, and workflow views are suitable for displaying records as cards within a dashboard. Each view offers a variety of parameters that can be adjusted to suit different scenarios.

These views are designed to extract as much information as possible from the app model, reducing the need for redundant tasks. For example, views can automatically decipher entity structures to construct forms or apply default display settings to fields.

The app's UI is structured as follows:

- **`Header`**: This section resides at the top, displaying the app name and logo (customizable). In the builder, it can also incorporate a browser for entities, actions, listeners, and more.
- **`Main menu`**: The app's primary menu contains the different sections of your application. Selecting an item triggers the display of a corresponding view in the main content area.
- **`Secondary menu`**: This menu accommodates items linked to app views that are rendered in the main content area.
- **`User menu`**: In addition to containing system operations such as **`My profile`** or **`Logout`**, this menu permits the inclusion of items associated with app views rendered in the main content area.
- **`Main content`**: This region is where app views are showcased.

Configuration options for the left and top menus are accessible through the [Navigation]({{<ref "/dev-reference/user-interface/navigation.md">}}) section in the app builder. Conversely, adjustments to the header and certain other global settings can be made within the [UI settings]({{<ref "/dev-reference/environment-settings/ui-settings.md">}}) section.

Here are the available types of views:

- [Grid views]({{<ref "/dev-reference/user-interface/grid-views.md">}})
- [Workflow views]({{<ref "/dev-reference/user-interface/workflow-views.md">}})
- [Record views]({{<ref "/dev-reference/user-interface/record-views.md">}})
- [Action views]({{<ref "/dev-reference/user-interface/action-views.md">}})
- [Custom views]({{<ref "/dev-reference/user-interface/custom-views.md">}})


