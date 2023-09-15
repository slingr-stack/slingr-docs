---
title: "App explorer"
lead: "Describes the app explorer panel."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 5
---

## **App explorer panel**

Located on the right side of the app builder, the App Explorer panel provides quick access to different aspects of your app's metadata. The panel consists of four tabs:

- **`Structure`** (default selection)
- **`Find`**
- **`Usages`**
- **`Help`**

{{< notes type="tip">}}
Use the keyboard shortcut **alt + right arrow** to expand or collapse the right panel with the App Explorer.
{{< /notes >}}

### Structure tab

When the Structure tab is active, an interactive tree resembling the [navigation tree]({{<ref "/dev-reference/metadata-management/metadata-editor/app-resources.md">}}) on the left panel is displayed. This tree is a simplified version of the navigation tree, primarily focusing on resources within the **Model** node and an additional **User Interface** node. It provides a cleaner view of your app's metadata structure.

Clicking on nodes within the explorer tree will populate a table in the lower section with essential information and settings related to the selected node.

{{< notes type="tip">}}
Use this feature to quickly review fields or properties of a particular resource while keeping the form of another resource open. The table also includes links to the view of each resource, allowing seamless navigation.
{{< /notes >}}

### Find tab

With the Find tab active, a **`search box`** appears below the tabs. This search box enables you to search for specific text within your app's metadata. The search scans for matches in **`name`**, **`label`**, or **`text`** within entities, fields, actions, listeners, views, libraries, and legacy services. After a search, a list of matching results with clear paths will be presented. Clicking on an item redirects you to the view of that resource.

{{< notes type="tip">}}
Use this feature when your app's metadata has grown extensively, and you need to locate a particular resource without recalling its position in the navigation tree.
{{< /notes >}}

### Usages tab

For the Usages tab, you can activate it by using the **`Find Usages`** action from the [central panel]({{<ref "/dev-reference/metadata-management/metadata-editor/metadata-edition.md#central-panel-view">}}) header. This tab displays a list of all instances where the current resource is utilized. Clicking on an item within the list redirects you to the resource where the current resource is being used.

{{< notes type="tip">}}
Use this feature when your app's complexity makes it challenging to track all the places where a particular resource is employed.
{{< /notes >}}

### Help tab

With the Help tab active, an embedded view of the documentation section relevant to the selected resource in the navigation tree is presented. This view automatically updates as you change the selected resource in the central panel.

{{< notes type="tip">}}
Utilize this feature to conveniently consult documentation without switching between tabs whenever you require information.
{{< /notes >}}
