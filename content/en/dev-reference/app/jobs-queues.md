---
title: "Jobs queues"
description: "Configuration of job queues"
date: 2025-04-20T13:59:39+01:00
lastmod: 2025-04-20T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 16
---

All background jobs are executed in queues. By default, there are some queues defined in the system:

- *system*: this is for system background jobs. We recommend not to make changes here except that you know what you are doing.
- *mix*: this is for background jobs with a medium load. Actions and listeners go by default into this queue.
- *light*: this is for background jobs with a light load, which means more can be executed concurrently.
- *heavy*: this is for background jobs with a heavy load, which means just a few can be executed concurrently. Things like data refactorings are done here.

You can define additional queues based on your app's needs. For example, let's suppose you have a listener that is executed in the background and many of them are created in short period of time. This situation can saturate the queue and make the app unresponsive in some cases. To prevent that, you can create a separate queue to process those jobs.

Another use case if you have jobs that consume a lot of resources, in which cases you want to limit how many can be executed at the same time. In this case you can create a separate queue with a low limit of max threads.

Here are the settings you can control for each queue:

- *Name*: this is the name of the queue. It must be unique. You cannot change the name of system queues.
- *Min number of threads*: this is the number of threads that will be initialized when the app is started.
- *Max number of threads*: this is the limit of threads that will be executed concurrently.
- *Sleep time*: how often we will check for new jobs.

{{< notes type="tip">}}
Keep in mind that when you have jobs that are executed over many records (like an action executed in many records) the system might create "chunks" and split the work across different threads. So, even when you see just one job running there might be several threads busy.
{{< /notes >}}
