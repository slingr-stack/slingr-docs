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

## **Navigation tree**

On the left side of the app builder, you'll discover a panel housing the navigation tree. This tree serves as the primary means of navigating through all your app's metadata. It consists of nodes, folders, and sub-nodes that represent the various resources within your app.

{{< notes type="tip">}}
Quickly expand or collapse the left panel with app resources using the keyboard shortcut <b>Alt + Left Arrow</b>.
{{< /notes >}}

## **Interacting with the navigation tree**

With the exception of root nodes, clicking on any node in the tree will display a view in the builder's central panel. This view contains the details and properties associated with that specific resource. Whenever you create a new resource from the central panel or update/delete an existing one, the navigation tree will automatically create, update, or delete corresponding nodes.

{{< notes type="important">}}
Keep in mind that certain resources cannot be deleted.
{{< /notes >}}

## **Basic structure**

The navigation tree boasts five root nodes that serve as containers for all other resources:

- [App]({{<ref "/dev-reference/app/settings.md">}})
- [Environment Settings]({{<ref "/dev-reference/environment-settings/environment-var.md">}})
- [Model]({{<ref "/dev-reference/data-model-and-logic/entities.md">}})
- [Security]({{<ref "/dev-reference/security/overview.md">}})
- [User Interface]({{<ref "/dev-reference/user-interface/overview.md">}})

Each of these nodes is comprehensively explained in a dedicated section of this documentation.
