---
title: "Other tools"
description: "Provides an overview of various tools accessible within the app monitor."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 153
---

In the App Monitor, you have access to a set of valuable tools that assist you in efficiently managing your app environment. These tools offer insights and control over various aspects of your application's runtime.

## **App explorer**

The App Explorer provides a view of your app's metadata in its current runtime state. It's important to note that this metadata might differ from what you see in the App Builder if you haven't pushed all your changes. In production environments, the App Explorer is the sole method for exploring metadata, as there is no App Builder instance available.

## **Storage**

The **`Storage`** section in the App Monitor allows you to interact with the temporary [key-value storage engine]({{<ref "/dev-reference/scripting/sys-storage.md">}}) of your app. Here's what you can do:

- **`View Existing Key-Value Pairs`**: Inspect the key-value pairs currently stored in the storage engine.

- **`Edit Value of an Existing Key`**: Modify the value associated with an existing key.

- **`Create New Key-Value Pairs`**: Add new key-value pairs to the storage engine.

- **`Clear Storage`**: Remove all key-value pairs from the storage engine, providing a clean slate for your app's temporary data.

## **Users management**

In the `Users` section of the App Monitor, you gain the capability to manage users within your app environment. For comprehensive details on user management, please refer to our [Users Management documentation]({{<ref "/dev-reference/security/users.md">}}).

## **Console**

The Console is a powerful tool for executing scripts directly within your app's runtime. This functionality is particularly useful for maintenance tasks, such as mass updates to records in response to unexpected events. Rather than manually updating records one by one, you can write a script to make the necessary changes and execute it from the console.

When you execute a script in the console, a job is created to execute it. All logs generated during the job's execution are displayed in the console output. You can add logs to the job using methods like[sys.jobs.logInfo()]({{<ref "/dev-reference/scripting/sys-jobs.md#loginfomessage">}}) or [sys.jobs.logError()]({{<ref "/dev-reference/scripting/sys-jobs.md#logerrormessage">}}). There's also a convenient shortcut for logging when executing scripts in the console, which is **`log()`**:

``` js
for (var i = 0; i < 10; i++) {
  log('i: '+i);
}
```
<br>

Please note that logs generated using [sys.jobs.logInfo()]({{<ref "/dev-reference/scripting/sys-jobs.md#loginfomessage">}}) or [sys.jobs.logError()]({{<ref "/dev-reference/scripting/sys-jobs.md#logerrormessage">}}) will appear in the app logs, not in the console output.

## **REST API**

In the **`REST API`** section of the App Monitor, you can access essential information about the REST API calls made to your app over time:

- **`Number of Calls`**: Displays the total number of API calls made to your app.

- **`Average Response Time`**: Represents the average response time for API calls. If you observe a consistent increase in this value, it might be an indicator that you need to either scale up your app by adding more instances or increase the resource allocation to your existing instances.

- **`Minimum Response Time`**: Indicates the shortest response time observed for API calls to your app.

- **`Maximum Response Time`**: Highlights the longest response time recorded for API calls to your app.
