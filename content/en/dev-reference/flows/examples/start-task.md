---
title: "Start task"
lead: "Start task sample flow."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "context"
toc: true
weight: 130
---

## **Summary**

This example is an action that changes the status of a task in progress.

![Start task sample flow](https://pmslingr.github.io/slingrDoc/images/vendor/flows/start_task.png)

## **Step: start**

##### Inputs

No configuration required.

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action
</div>

## **Step: update record**

##### Inputs

Label|Value|Description
---|---|---
record|Status Set IN PROGRESS|Updates the state of the task record and store the changes.

##### Outputs

Name|Type|Description
---|---|---
updatedTask|record|The updated task is put in the context.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>updatedTask</b>: Record
</div>

## **Step: end**

##### Inputs

Label|Type|Description
---|---|---
Return result|boolean|If true it will return the final result of the flow.

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>updatedTask</b>: Record
</div>