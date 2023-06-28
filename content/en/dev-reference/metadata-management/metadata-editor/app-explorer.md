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
## General description
On the right side of the app builder you will find a panel with the App Explorer. When expanded, you will see a view with four tabs: 

- Structure (default selection)
- Find
- Usages
- Help

{{< notes type="tip">}}
Keyboard shortcut <b>alt + right arrow</b> will expand or collapse the right panel with the app explorer."
{{< /notes >}}

### Structure
When this tab is active, you will see an interactive tree very similar to the [navigation tree]({{<ref "/dev-reference/metadata-management/metadata-editor/app-resources.md">}}) on the left panel. This is the **explorer tree**, and it's a cutted down version of the navigation tree. Root nodes here are mostly the nodes inside the **Model** node of the navigation tree with the addition to a **User Interface** node. You can use this tree to have a cleaner look at how the metadata in your app is structured.
Clicking on the inner nodes of the exploration tree will render on the bottom section a table with **some** basic information and settings about that particular node.


{{< notes type="tip">}}
You can use this feature when you need to quick check some fields or properties of a particular resource while staying with the form of another resource opened. In this table you also have a link to redirect you to the view of that resource in case you need to.
{{< /notes >}}


### Find
When this tab is active, you will see a **search box** right below the tabs. You can use this input box to search text inside the metadata on your app. The search will look for **name**, **label** or **text** inside scripts of entities, fields, actions, listeners, views, libraries, and endpoints. After performing a search, a list with all the matches results will be displayed with a very easily understandable path. Clicking on any item will redirect you to the view of that particular resource.


{{< notes type="tip">}}
You can use this feature when your app has grown too much and you don't remember where a certain resource was in the navigation tree.
{{< /notes >}}

### Usages
in order to use this tab, you have to press the `find usages` action from the [central panel]({{<ref "/dev-reference/metadata-management/metadata-editor/metadata-edition.md#central-panel-view">}}) header and it will display a list of all the different places where the current resource has been used. Clicking on any of those items will redirect you to the resource where the current resource it's being used.

{{< notes type="tip">}}
You can use this feature when your app has grown too much and you are not sure in what other places that particular resource is being used
{{< /notes >}}

### Help
When this tab is active, you will see an embedded view with the section of the documentation related to the resource selected in the navigation tree. The section shown will change automatically whenever you change the resource selected in the central panel.

{{< notes type="tip">}}
This feature might come handy to avoid the hassle of having to change between tabs whenever you need to consult the documentation.
{{< /notes >}}
