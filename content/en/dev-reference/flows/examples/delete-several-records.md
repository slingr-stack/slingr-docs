---
title: "Delete several records"
lead: "Delete several records sample flow."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "context"
toc: true
weight: 134
---

## **Summary**

In this example, we illustrate an action that attempts to delete all companies located in Colorado. In the event that an error is encountered during the deletion of any company, the action diligently logs the error for further analysis. This example showcases a robust workflow for systematically managing the deletion of companies, with error handling to ensure smooth operation.

![Delete several records]({{site.baseurl}}/images/vendor/flows/delete_companies_in_colorado.png)

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

## **Step: Find companies**

##### Inputs

Label|Value|Description
---|---|---
Companies|All|Finds all the companies

##### Outputs

Name|Type|Description
---|---|---
companies|resultSet|Puts the company in the context.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>companies</b>: ResultSet <br>
</div>

## **Step: Delete all Colorado companies**

##### Inputs

No configuration required.

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>companies</b>: ResultSet <br>
</div>

## **Step: For each**

##### Inputs

Label|Type|Description
---|---|---
Companies|resultSet|Iterates the companies.

##### Outputs

Name|Type|Description
---|---|---
company|record|	Puts the iterated company in the context.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>companies</b>: ResultSet <br>
  - <b>company</b>: record <br>
</div>

## **Step: If CO**

##### Inputs

Label|Type|Value|Description
---|---|---|---
Condition|condition|context.company.field('address.state').val() === 'CO';|Filter companies from Colorado.

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>companies</b>: ResultSet <br>
  - <b>company</b>: record <br>
</div>

## **Step: Delete company**

##### Inputs

Label|Type|Value
---|---|---
Record|record|company

##### Outputs

Name|Type|Description
---|---|---
deletedRecord|record|Deletes the company and does not put it in the context.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>companies</b>: ResultSet <br>
  - <b>company</b>: record <br>
</div>

## **Step: Log error**

##### Inputs

Label|Value|Description
---|---|---
Message|Error while deleting company|Logs a message too inform that the delete of the company faild.

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>companies</b>: ResultSet <br>
  - <b>company</b>: record <br>
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
  - <b>action</b>: Action <br>
  - <b>companies</b>: ResultSet <br>
  - <b>company</b>: record <br>
</div>
