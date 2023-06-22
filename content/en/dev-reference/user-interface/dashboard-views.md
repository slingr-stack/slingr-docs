---
title: "Dashboard views"
lead: "Detailed explanation of settings available for dashboard views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 53
---


Dashboard view allow to host widget views ordering them in row and columns as a grid system. That widgets can be appears 
in more than a dashboard. The following list is the available widgets:

- [Indicator widget]({{site.baseurl}}/app-development-widget-indicator-views.html).
- [Table widget]({{site.baseurl}}/app-development-widget-table-views.html).
- [Line chart widget]({{site.baseurl}}/app-development-widget-line-chart-views.html).
- [Bar chart widget]({{site.baseurl}}/app-development-widget-bar-chart-views.html).
- [Pie chart widget]({{site.baseurl}}/app-development-widget-pie-chart-views.html).
- [Custom view widget]({{site.baseurl}}/app-development-widget-custom-views.html).
  
## Label

This is a human-readable name of the view. You can use spaces, special characters and
mix upper case and lower case letters.

This label will be displayed at the top of the dashboard view, so make sure you use something
users will understand.

## Name

This is the internal name of the view. It cannot hold special characters or spaces.

Usually you will use the name of the view in scripts and the REST API, so changing it
might affect your app and you will need to make some manual adjustments.

## Description

This is a human-readable legend that describe the dashboard.

## On Event

This event is triggered after refresh the dashboard. This receive information about where was fired the refresh, it can
be when user click refresh button on sending UI messages.

{{< js_script_context context="dashboardViewOnEventScript">}}


## Refresh using UI Message

It is possible refresh the dashboard view sending UI messages. All its containers are going to be refresh.

### Example

In following example you can refresh the dashboard view called `salesDashboard`:

```javascript
sys.ui.sendMessage({
  scope: 'view',
  name: 'refresh',
  views: ['salesDashboard']
});
``` 

If you want refresh just one container you can send the parameter `widgetContainers` with array of names of containers to 
be updated. 

```javascript
sys.ui.sendMessage({
  scope: 'view',
  name: 'refresh',
  views: ['salesDashboard'],
  widgetContainers: ['sales', 'salesPerDepartment']
});
``` 

## Layouts

This is defined in order to contain widgets inside rows and columns as a grid system. Build layouts of all shapes and 
sizes thanks to a twelve column system as Bootstrap.

Dashboard view contain a root layout in witch you can add rows and that rows are wrappers for columns or widgets. 
Also columns can wrap new rows or contain widgets. At that way you can make a tree structure to contain widgets.

Each row and column has following properties:

### Label

This is a human-readable name node. You can use spaces, special characters and mix upper case and lower case letters.

### Name

This is the internal name of the view. It cannot hold special characters or spaces.

### Widget

You can select one of created widget view.

### Type

This display if it is a column or a row.

#### Column Size

In case that columns the user can select it size as twelve column system as Bootstrap depending the devise size. That size 
can be large, medium or small.

### On Event

This event is triggered after refresh the given widget. This receive information about where was fired the refresh, it can
be when user click refresh button on sending UI messages.

{{< js_script_context context="dashboardViewOnEventScript">}}

### Refresh using UI Message

It is possible refresh each dashboard container sending a UI messages. The container is going to react to this message 
and refresh its content using the default settings of its widget. Also you can extend the functionality like adding 
filters just sending additional information. Check allowed UI message configuration in each kind of widget. 

In following example you can refresh the container `salesProgress` in the dashboard called `salesDashboard`:

```javascript
sys.ui.sendMessage({
  scope: 'view',
  name: 'refresh',
  views: ['salesDashboard'],
  widgetContainers: ['salesProgress']
});
```

## Permissions

Permissions allow to define which groups can access this view.
  
Permissions for a view can be handled right in the view definition, but it is just
a different view of what you can configure in groups. It is oriented so you can easily
configure permissions on the view for all existing groups.

For more information about permissions please refer to [Groups]({{site.baseurl}}/app-development-security-groups.html).


