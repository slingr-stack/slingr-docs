---
title: "User interface overview"
lead: "Brief explanation of how the UI is generated. Enumeration of different types of views."
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


Slingr provides different features to make the creation of the UI as fast as possible. The
goal is that developers don't need to spend a lot of time in small details and boilerplate
code to create an appealing UI.

In most low-code platforms it is still needed to build the UI by placing widgets in a form
manually, taking care of layout and linking of the UI with the data and operations. This
might be a step forward compared to raw HTML, CSS and Javascript, but still requires a
lot of time and rework, especially when there are changes in the app model.

To simplify the creation of the UI Slingr provides bigger building blocks called "views". These
views offer different ways of rendering information that are useful for different purposes. For
example there are grid views to show records in a listing and there are workflow views to show
records as cards in a dashboard. Each view has different parameters that allow to customize
them for different situations.

These views will try to get a much information as possible from the app model so you don't
need to duplicate work. For example views will automatically recognize the structure of entities
in order to build forms, or use default display options for fields.

The UI of the app is organized in the following way:

- **Header**: this is the at the top and shows the app name and logo (which is configurable). In the builder it can also include a browser of entities, actions, listeners, among other things.
- **Main menu**:  this is the main menu of the app, where users will find the different sections of
  your app. When they click on one of the items, a view will be displayed on the main content area.
- **Secondary menu**: allows to add items associated to views of the apps that will be rendered in the main content
  area.
- **User menu**: this menu contains some system operations like `My profile` or `Logout`, but
  also allows to add items associated to views of the apps that will be rendered in the main content
  area.  
- **Main content**: this is where app views are rendered.

Left and top menu can be configured through the [Navigation]({{site.baseurl}}/app-development-ui-navigation.html) 
section in app builder, while header and some other global settings can be configured in 
[UI settings]({{site.baseurl}}/app-development-environment-ui-settings.html) section.

These are the available types of views:

- [Grid views]({{site.baseurl}}/app-development-ui-grid-views.html)
- [Workflow views]({{site.baseurl}}/app-development-ui-cards-views.html)
- [Record views]({{site.baseurl}}/app-development-ui-record-views.html)
- [Action views]({{site.baseurl}}/app-development-ui-action-views.html)
- [Custom views]({{site.baseurl}}/app-development-ui-custom-views.html)


