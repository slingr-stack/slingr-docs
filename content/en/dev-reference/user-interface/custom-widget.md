---
title: "Custom widget"
description: "Detailed explanation of settings available for custom widget views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 58
---

This widget allows rendering a custom view inside a dashboard view.

## **Label**

This is a human-readable name for the view. You can use spaces, special characters, and a mixture of upper and lower case letters.

This label will appear at the top of the widget view, so ensure you use language that users will understand.

## **Name**

This is the internal name of the view. It cannot contain special characters or spaces.

You will usually utilize the view's name in scripts and the REST API. Changing it may impact your app, necessitating manual adjustments.

## **Description**

This is a human-readable description of the widget. You can use spaces, special characters, and a mixture of upper and lower case letters. Internationalization is possible.

This description will be visible at the top of the added widget in your dashboard.

## **Allow refresh**

This option determines whether the refresh button is displayed or hidden. This button facilitates the update of widget information. It's enabled by default.

## **View settings**

### Custom view

Render a custom view inside the widget.

### Show title

Display the widget's title at the top of the container.

## **Permissions**

Permissions determine which groups can access this view.
  
While permissions for a view can be configured directly within the view definition, it mirrors the capabilities available in group configuration. The objective is to facilitate easy permission configuration for all existing groups.

Upon the creation of a new view, if a group holds permissions for the entity associated with that view, the view will inherently be granted permission for use by that group.

For a comprehensive understanding of permissions, refer to the [Groups]({{<ref "/dev-reference/security/groups.md">}}) documentation.


