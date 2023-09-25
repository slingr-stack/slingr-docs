---
title: "Dashboard views"
description: "Detailed explanation of settings available for dashboard views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 52
---

Dashboard views allow you to host various widget views, organizing them in rows and columns similar to a grid system. These widgets can appear in multiple dashboards. The available widgets include:

- [Indicator widget]({{<ref "/dev-reference/user-interface/indicator-widget.md">}}).
- [Table widget]({{<ref "/dev-reference/user-interface/table-widget.md">}}).
- [Line chart widget]({{<ref "/dev-reference/user-interface/line-chart-widget.md">}}).
- [Bar chart widget]({{<ref "/dev-reference/user-interface/bar-chart-widget.md">}}).
- [Pie chart widget]({{<ref "/dev-reference/user-interface/pie-chart-widget.md">}}).
- [Custom widget]({{<ref "/dev-reference/user-interface/custom-widget.md">}}).

## **Label**

This is a human-readable name of the view. You can use spaces, special characters, and mix upper case and lower case letters. This label will be displayed at the top of the dashboard view, so make sure you use something users will understand.

## **Name**

This is the internal name of the view. It cannot contain special characters or spaces. Usually, you will use the name of the view in scripts and the REST API. Changing it might affect your app, and you may need to make manual adjustments.

## **Description**

This is a human-readable description that explains the purpose of the dashboard.

## **On event**

This event is triggered after refreshing the dashboard. It receives information about where the refresh was initiated, whether it's from a user clicking the refresh button or via sending UI messages.

  ##### Parameters

  Name|Type|Description
  ---|---|---
  event|object|This event object contains information about where the refresh was triggered. It can occur when a user clicks the refresh button in the UI or when UI messages are sent from the other side.

  ##### Samples

  ``` javascript
  // register external messages
  sys.logs.info(JSON.stringify(event));
  if(event.sourceType == 'UI_MESSAGE') {
    // register action
  }
  ```
  <br>

## **Refresh using UI Message**

You can refresh the dashboard view by sending UI messages. This action will refresh all its containers.

### Example

In the following example, you can refresh the dashboard view called **`salesDashboard`**:

```javascript
sys.ui.sendMessage({
  scope: 'view',
  name: 'refresh',
  views: ['salesDashboard']
});
``` 
<br>

If you want to refresh just one container, you can send the parameter **`widgetContainers`** as an array of container names to be updated.

```javascript
sys.ui.sendMessage({
  scope: 'view',
  name: 'refresh',
  views: ['salesDashboard'],
  widgetContainers: ['sales', 'salesPerDepartment']
});
``` 
<br>

## **Layouts**

Layouts are designed to contain widgets within rows and columns, following a grid system. You can build layouts of various shapes and sizes, utilizing a twelve-column system similar to Bootstrap.

A dashboard view contains a root layout in which you can add rows, and these rows serve as wrappers for columns or widgets. Columns, in turn, can wrap new rows or contain widgets. This hierarchical structure allows you to create a tree-like arrangement to organize your widgets effectively.

Each row and column has the following properties:

### Label

This is a human-readable name for the node. You can use spaces, special characters, and a mix of uppercase and lowercase letters.

### Name

This is the internal name of the view. It cannot contain special characters or spaces.

### Widget

You can select one of the created widget views to be placed within the row or column.

### Type

This indicates whether it is a column or a row.

#### Column size

For columns, users can select their size within the twelve-column system, similar to Bootstrap's grid system. Sizes can be designated as large, medium, or small, depending on the device size.

### On event

This event is triggered after refreshing the specified widget. It receives information about where the refresh was initiated, which could be triggered by the user clicking the refresh button or sending UI messages.

  ##### Parameters

  Name|Type|Description
  ---|---|---
  event|object|This event object contains information about where was the refresh fired, it can be when user click the refresh button of the UI or when send UI messages from other side.

  ##### Samples

  ``` javascript
  // register external messages
  sys.logs.info(JSON.stringify(event));
  if(event.sourceType == 'UI_MESSAGE') {
    // register action
  }
  ```
  <br>

### Refresh using UI Message

You can refresh each dashboard container by sending UI messages. The container will respond to this message and refresh its content using the default settings of its widget. Additionally, you can enhance this functionality by including additional information, such as filters, in the message. Please refer to the allowed UI message configurations in each type of widget for more details.

In the following example, you can see how to refresh the container named **`salesProgress`** within the dashboard named **`salesDashboard`**:

```javascript
sys.ui.sendMessage({
  scope: 'view',
  name: 'refresh',
  views: ['salesDashboard'],
  widgetContainers: ['salesProgress']
});
```

## **Permissions**

Permissions determine which groups can access this view.
  
While permissions for a view can be configured directly within the view definition, it mirrors the capabilities available in group configuration. The objective is to facilitate easy permission configuration for all existing groups.

Upon the creation of a new view, if a group holds permissions for the entity associated with that view, the view will inherently be granted permission for use by that group.

For a comprehensive understanding of permissions, refer to the [Groups]({{<ref "/dev-reference/security/groups.md">}}) documentation.


