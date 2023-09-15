---
title: "Update several records"
lead: "Update several records sample flow."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "context"
toc: true
weight: 132
---

## **Summary**

In this example, we present an action that performs a comprehensive search for all companies located in Arizona. For each company found, it updates the rating value to 5, logs the updated company details, and saves the changes to the database. In the event of an error occurring during the company update process, the error is also diligently logged for future reference. This example illustrates how to efficiently manage and update multiple records within a specific context while handling potential errors gracefully.

![Update several records](/images/vendor/flows/updateRatingArizonaCompanies.png)

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

## **Step: Find companies of Arizona**

##### Inputs

Label|Value|Description
---|---|---
Companies|State equals Arizona|Find companies of Arizona

##### Outputs

Name|Type|Description
---|---|---
arizonaCompanies|resultSet|The founded companies are put in the context.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>arizonaCompanies</b>: ResultSet
</div>

## **Step: For Each**

##### Inputs

Label|Description
---|---
arizonaCompanies|Iterates the companies.

##### Outputs

Name|Type|Description
---|---|---
arizonaCompany|record|Puts the iterated company in the context.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>arizonaCompanies</b>: ResultSet <br>
  - <b>arizonaCompany</b>: Record
</div>

## **Step: Update Rating**

##### Inputs

Label|Value|Description
---|---|---
arizonaCompany|Rating Set 5|The rating of the company is set to 5.

##### Outputs

Name|Type|Description
---|---|---
updatedCompany|record|The edited company is put in the context.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>arizonaCompanies</b>: ResultSet <br>
  - <b>arizonaCompany</b>: Record <br>
  - <b>updatedCompany</b>: Record
</div>

## **Step: Log success message**

##### Inputs

Label|Value|Description
---|---|---
message|Successfully updated company|Logs a message too inform that the company was updated successfully.

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>arizonaCompanies</b>: ResultSet <br>
  - <b>arizonaCompany</b>: Record <br>
  - <b>updatedCompany</b>: Record
</div>

## **Step: Log error message**

##### Inputs

Label|Value|Description
---|---|---
message|Error while updating company|Logs a message too inform that the update of the company failed.

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>arizonaCompanies</b>: ResultSet <br>
  - <b>arizonaCompany</b>: Record <br>
  - <b>updatedCompany</b>: Record
</div>

## **Step: Save company**

##### Inputs

Label|Description
---|---
updatedCompany| The record instance to be saved into the database after applying changes.

##### Outputs

Name|Type|Description
---|---|---
savedCompany|record|The saved company is put in the context.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action <br>
  - <b>arizonaCompanies</b>: ResultSet <br>
  - <b>arizonaCompany</b>: Record <br>
  - <b>updatedCompany</b>: Record <br>
  - <b>savedCompany</b>: Record <br>
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
  - <b>arizonaCompanies</b>: ResultSet <br>
  - <b>arizonaCompany</b>: Record <br>
  - <b>updatedCompany</b>: Record <br>
  - <b>savedCompany</b>: Record <br>
</div>