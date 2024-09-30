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

This method retrieve system metrics, including memory (native and heap) and CPU usage.

##### Returns

**`object`**  - A key-value JSON structure with the information of memory, heap memory and CPU metrics. This is the returned structure:
```
{
  "memory": {    // Represents the overall memory usage of the app.
    "totalMemory": 16000000000, // Total physical memory available in bytes
    "usedMemory": 9000000000,   // Memory currently in use by the app in bytes
    "freeMemory": 7000000000    // Memory available for use in bytes
  },
  "heapMemory": {   //  Represents memory used by the Java Virtual Machine (JVM) for dynamic memory allocation.
    "totalHeapMemory": 4000000000, // Total heap memory allocated for the JVM in bytes
    "usedHeapMemory": 2500000000,   // Heap memory currently in use by the JVM in bytes
    "freeHeapMemory": 1500000000     // Heap memory available for allocation in bytes
  },
  "cpu": {   //  Represents CPU-related metrics for the app and the JVM process.
    "processCpuLoad": 25.0,        // CPU load percentage used by the JVM process
    "systemCpuLoad": 65.0,         // Overall CPU load percentage of the system
    "systemCpuUsage": 1.5          // Average CPU usage over a specific time frame
  }
}
```

##### Sample
Logging CPU and memory usage metrics information

``` javascript
let appMetrics = sys.monitoring.getAppMetrics();
log('App Metrics: ' + JSON.stringify(appMetrics));
// access CPU and memory metrics
let cpuLoad = appMetrics.cpu.processCpuLoad;
log('CPU load: ' + cpuLoad);
let totalMemory = appMetrics.memory.totalMemory;
log('Total memory: ' + totalMemory);
let usedMemory = appMetrics.memory.usedMemory;
log('Used memory: ' + usedMemory);
let usedMemoryPercentage = (usedMemory / totalMemory) * 100;
log('Used memory %: ' + usedMemoryPercentage);
```

