---
title: "Logs and alerts settings"
lead: "App-Level Logs and Alerts"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 19
---

These are crucial app-wide settings accessible through the app builder under **`Environment Settings > Logs and Alerts`**.

## **Logs size**

The **`Logs Size`** setting allows you to determine the maximum space occupied by the logs collection in memory. It's important to note that this is an inherent attribute of the database engine and generally exceeds the actual size utilized within the database.

## **Enable cold logs**

This toggle, **`Enable Cold Logs`**, empowers you to archive historical app logs into files. You can establish a **`Storage Period`** that signifies how long files should be retained in storage. This time frame can be indicated in terms of months or years.

## **Alerts configuration**

The alerts feature is designed to send notifications to developers whenever specific events occur during app execution. For instance, if an error is logged, the responsible developer can receive an email containing information about the error.

To activate alerts, enable the **`Enable Alerts`** flag. Subsequently, other configuration options will become accessible:

- **`Level`**: Alerts are based on the app's logs, enabling you to specify which types of logs trigger alerts. You have two options:
  - **Only Errors**: Alerts will be dispatched exclusively for logs with the **`ERROR`** level.
  - **Errors and Warnings**: Alerts will be dispatched for logs with either the **`ERROR`** or **`WARN`** levels.
- **`Report Threshold`**: This determines the maximum alert frequency the app will generate. Particularly useful when dealing with recurring errors that you don't want to inundate developers with.
- **`Users to Notify`**: Designates the developers who will receive the alerts.
- **`Emails to Notify`**: In scenarios where notifications need to be sent to individuals who aren't app users, you can provide email addresses. Alerts will be sent to these addresses as well.


