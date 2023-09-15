---
title: "Dashboard"
lead: "A brief explanation of the app monitor dashboard"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 147
---

In the App Monitor's dashboard, you can quickly assess the status of your app. By default, it displays activity from the last hour, but you have the flexibility to adjust the time frame to cover a longer period.

Here, you'll find the following key metrics:

- **`API Calls`**: This metric reflects the number of API calls made, serving as an essential indicator to identify any anomalies. A sudden drop or spike in API calls may indicate issues that require attention.

- **`Response Time`**: This metric provides insight into your app's response time to API calls. If this value consistently increases and remains high, it may signal the need to scale your app by adding more instances to maintain an acceptable response time.

- **`Jobs Queue`**: This metric measures the time jobs have spent waiting for execution. An increasing and consistently high value here may suggest the need to scale your app by adding more instances to process jobs efficiently.

- **`Database`**: This metric offers a quick overview of the total database storage utilized. It's particularly valuable if you're approaching your storage limit and considering an upgrade.

- **`Errors`**: This metric indicates the number of errors detected in the logs during the specified time frame.

- **`Active Users`**: Here, you can find the count of active users within your app during the specified time period.

- **`Storage`**: This metric shows the number of keys stored in your app's storage.

- **`Integrations`**: In this section, you can assess the status of each of your legacy services, along with the number of events and functions processed and discarded. If you observe no activity in your legacy services, it may indicate underlying issues that require investigation.


