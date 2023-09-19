---
title: "Download file"
lead: "Download file sample flow."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "context"
toc: true
weight: 135
---


## **Summary**

In this example, we showcase an action designed to delete a company. 

![Download file sample flow](https://pmslingr.github.io/slingrDoc/images/vendor/flows/downloadFile_samples.png)

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

## **Step: Execute verify user action**

##### Inputs

Label|Type|Value
---|---|---
Action|entityAction|context.record

##### Outputs

Name|Type|Description
---|---|---
taskId|text|put in context == false

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action
</div>

## **Step: Go to download view**

##### Inputs

Label|Type
---|---
Parameters|query

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action
</div>

## **Step: Download file**

##### Inputs

Label|Type|Value
---|---|---
File Id|text|myFileId

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action
</div>

## **Step: Show execute verify user action error message**

##### Inputs

Label|Type|Value
---|---| ---
Target|choice|caller
Title|text|Error executing verify user action
Message|text|An error occurred while execute verify user action, please try again.
Type|choice|Error
Keep visible|boolean|false

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action
</div>

## **Step: Show download file error message**

##### Inputs

Label|Type|Value
---|---| ---
Target|choice|caller
Title|text|Error downloading file
Message|text|An error occurred while execute verify user action, please try again.
Type|choice|Error
Keep visible|boolean|false

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action
</div>

## **Step: end**

Label|Type|Description
---|---|---
Return result|boolean|If true it will return the final result of the flow.

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action 
</div>
