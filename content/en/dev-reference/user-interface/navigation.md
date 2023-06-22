---
title: "Navigation"
lead: "Explanation of navigation options in Slingr apps."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 45
---

Navigation refers at how users will be able to find the different views in your
app.

Slingr allows two main ways of navigation:

- **Main menu**: this menu is located at the left of the app. Depending on the size of
  the device it might be hidden or not. You can add menu items at the root of left
  menu or you can use menu groups to add one level of nesting.
- **Secondary menu**: this menu is located on the top-right area of the app. Here you will be able to
  add menu items (it doesn't support menu groups) that will be placed left to the User menu.
- **User menu**: this menu is located on the top-right corner of the app. It is the menu
    used by other system actions like `My profile` or `Logout`. Here you will be able to
    add menu items (it doesn't support menu groups) that will be placed above the `Logout`
    action.

Then some components will provide some additional features to navigate through the
app (like relationship fields that allow to jump to other records), but those are
explained on each component.

## Menu item

Menu items point to a view in the app. When they are clicked the view will be rendered
in the main content area.

Menu items have the following settings:

- `View`: this is the view the menu item points to.
- `Label`: the label to show in the menu. By default it will be the same as the label
  of the view.
- `Icon`: this is the icon. You can leave this empty if you don't want any icon.
- `Expression`: Allows to add filtering expressions that will be added to the selected
  view. This is useful to avoid to create different collection views for the same entity
  when the difference between each view is just an expression that filter the data. Please
  check the documentation for [Expressions]({{site.baseurl}}/app-development-metadata-management-metadata-common-tools-expressions.html)
  to know how to configure the filter.

In the case of record views you will be asked to enter a script to select the record
to show in the view:

{{< js_script_context context="recordViewMenuItemScript">}}

## Dynamic menu item

Dynamic menu items contain a script that returns a list of menu entries. Each entry will be added to
the menu in the position of the dynamic menu entry.

Dynamic menu items have the following settings:

- `Label`: the label to identify this menu item.
- `Script`: this script has to return an array of menu items. It can use the app data to determine
  which entries will be available and how they are defined, which means which views they point to, label, icon,
  or additional options like filters.
  {{< js_script_context context="dynamicMenuEntryScript">}}


## Menu group

Menu groups can hold menu items. This way you can group items that are related under one
label in the menu.

Menu groups have the following settings:

- `Label`: the label to show in the menu.
- `Icon`: this is the icon. You can leave this empty if you don't want any icon.

This only works for the main menu. 

