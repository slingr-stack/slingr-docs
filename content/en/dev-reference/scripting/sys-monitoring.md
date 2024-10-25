---
title: "sys.monitoring"
description: "Describes utilities in the Javascript API to manage app monitoring."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 74
---

## **sys.monitoring**

The **`sys.monitoring`** package provides methods for making it easier to monitor application performance and resource usage.

###  getMetrics()

This method retrieve system metrics, including memory (native and heap) and CPU usage for each instance of the application.

##### Returns

**`array`**  - An array of objects with key-value JSON structures containing information on memory, heap memory, and CPU metrics.
This is the returned structure:
```
[
  {
    "instanceId": "test-dr-deployment-vax8-54585cbfb6-jngd7",
    "memory": {
      "usedMemory": 872607744,
      "totalMemory": 2147483648,
      "freeMemory": 1274875904
    },
    "heapMemory": {
      "totalHeapMemory": 404750336,
      "usedHeapMemory": 329141584,
      "freeHeapMemory": 75608752
    },
    "cpu": {
      "processCpuLoad": 72.2137798833964,
      "systemCpuLoad": 72.21346706388304,
      "systemCpuUsage": 10.6
    }
  }
]
```


**Attributes description**
- **instanceId**: uniquely identifies each instance of the app runtime.
- **memory**: represents the overall memory usage of the app.
  - **totalMemory**: total physical memory available in bytes
  - **usedMemory**: memory currently in use by the app in bytes
  - **freeMemory**: memory available for use in bytes
- **heapMemory**: represents memory used by the Java Virtual Machine for dynamic memory allocation.
  - **totalHeapMemory**: total heap memory allocated for the JVM in bytes
  - **usedHeapMemory**: heap memory currently in use by the JVM in bytes
  - **freeHeapMemory**: heap memory available for allocation in bytes
- **cpu**: represents CPU-related metrics for the app and the JVM process.
  - **processCpuLoad**: CPU load percentage used by the JVM process
  - **systemCpuLoad**: overall CPU load percentage of the system
  - **systemCpuUsage**: average CPU usage over the last 1 second


##### Sample
Logging CPU and memory usage metrics information

``` javascript
let appMetrics = sys.monitoring.getMetrics();
appMetrics.forEach(function (instanceMetric) {
  log('App Metrics: ' + JSON.stringify(instanceMetric));
  // access app runtime instance id
  let instanceId = instanceMetric.instanceId;
  log('Instance ID: ' + instanceId);
  // access CPU and memory metrics
  let cpuLoad = instanceMetric.cpu.processCpuLoad;
  log('CPU load: ' + cpuLoad);
  let totalMemory = instanceMetric.memory.totalMemory;
  log('Total memory: ' + totalMemory);
  let usedMemory = instanceMetric.memory.usedMemory;
  log('Used memory: ' + usedMemory);
  let usedMemoryPercentage = (usedMemory / totalMemory) * 100;
  log('Used memory %: ' + usedMemoryPercentage);
});
```

