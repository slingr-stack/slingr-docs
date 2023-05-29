---
title: "Custom widget"
lead: "Detailed explanation of settings available for custom widget views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

This widget allow render a custom view inside a dashboard view.

## Label

This is a human-readable name of the view. You can use spaces, special characters and
mix upper case and lower case letters.

This label will be displayed at the top of the table widget view, so make sure you use something
users will understand.

## Name

This is the internal name of the view. It cannot hold special characters or spaces.

Usually you will use the name of the view in scripts and the REST API, so changing it
might affect your app and you will need to make some manual adjustments.

## Description

This is a human-readable description of the widget. You can use spaces, special characters and
mix upper case and lower case letters. You can internationalize it.

This description will be displayed in top of added widget in your dashboard.

## Allow Refresh

This is to Show/Hide refresh button. We can perform this action in order to update this widget 
information. Is true by default.

## View settings

### Custom view

List existent custom views to be rendered inside the widget.

### Show title

Display the name ot the widget at the top of the container.

## Permissions

Permissions allow to define which groups can access this view.
  
Permissions for a view can be handled right in the view definition, but it is just
a different view of what you can configure in groups. It is oriented so you can easily
configure permissions on the view for all existing groups.

When a new view is created, if a group has permissions to the entity associated to that view, then the view 
receives permission to be used for that group.

For more information about permissions please refer to [Groups]({{site.baseurl}}/app-development-security-groups.html).

