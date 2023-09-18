---
title: "Delete company"
lead: "Delete company sample flow."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "context"
toc: true
weight: 133
---

## **Summary**

In this example, we showcase an action designed to delete a company. If the deletion process encounters an error, the action is configured to display an appropriate error message. This example highlights a straightforward but essential feature in managing and handling potential errors during company deletion operations.

![Delete company](images/vendor/flows/delete_company_sample.png)

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

## **Step: Delete company**

##### Inputs

Label|Type|Value
---|---|---
Record|record|context.record

##### Outputs

Name|Type|Description
---|---|---
deleteRecord|record|put in context == false

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action
</div>

## **Step: Show error message**

##### Inputs

Label|Type|Value
---|---|---
Target|choice|Caller
Title|text|Error deleting the company
Message|text|An error occurred while deleting the company, please try again.
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