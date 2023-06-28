---
title: "App resources"
lead: "Describes the app resources panel."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 3
---

## Navigation Tree 

On the left side of the app builder you will find a panel with the navigation tree. This tree is going to be the main way of navigating across all the metadata, and it's formed by nodes, folders and sub-nodes that represents all the different resources of your app.
{{< notes type="tip">}}
Keyboard shortcut <b>alt + left arrow</b> will expand or collapse the left panel with the app resources.{{< /notes >}}

## Interacting with the navigation tree
Except of the root nodes, clicking on any other node in the tree will render a view in the central panel of the builder with the details and properties belonging to that specific resource. New nodes in the tree will be created, updated or deleted automatically after creating any new resource from the central panel or after updating/deleting an already existing one.

{{< notes type="important">}}
There are some resources that can <b>not</b> be deleted.
{{< /notes >}}

## Basic structure
The navigation tree has five root nodes that group all the rest of the resources: 

- [App]({{<ref "/dev-reference/app/settings.md">}})
- [Environment settings]({{<ref "/dev-reference/environment-settings/environment-var.md">}})
- [Model]({{<ref "/dev-reference/data-model-and-logic/entities.md">}})
- [Security]({{<ref "/dev-reference/security/overview.md">}})
- [User Interface]({{<ref "/dev-reference/user-interface/overview.md">}})

Each one of those nodes are explained in detailed in a particular section of this documentation.