---
title: "Update tax rates"
lead: "Update tax rates sample flow."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "context"
toc: true
weight: 131
---

## **Summary**

In this example, we demonstrate an action that dynamically updates the tax rate percentage based on the customer's location. When the customer's location is Colorado, the tax rate is set to 5%, while for customers in Arizona, the tax rate is adjusted to 6.5%. This showcases how you can use contextual information to make real-time adjustments and tailor processes to specific conditions.

![Update tax rates](https://pmorales.github.io/slingrDoc/images/vendor/flows/updateTaxRate_sample.png)

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

## **Step: If CO**

##### Inputs

Label|Type|Value
---|---|---
Condition|Condition|record.field('customer.address.state').val() === 'CO'

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action 
</div>

## **Step: If AZ**

##### Inputs

Label|Type|Value
---|---|---
Condition|Condition|record.field('customer.address.state').val() === 'AZ'

##### Outputs

No configuration required.

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action 
</div>

## **Step: Update tax rate Colorado**

##### Inputs

Label|Type|Value
---|---|---
Record|record|context.record
Tax Rates|percentage|0.05

##### Outputs

Label|Type|Description
---|---|---
updatedRecord|record|put in context == false

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action 
</div>

## **Step: Update tax rate Arizona**

##### Inputs

Label|Type|Value
---|---|---
Record|record|context.record
Tax Rates|percentage|0.05

##### Outputs

Label|Type|Description
---|---|---
updatedRecord|record|put in context == false

##### Context

<div class="contextExamples"> 
  - <b>record</b>: Record <br>
  - <b>oldRecord</b>: Record <br>
  - <b>action</b>: Action 
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
  - <b>action</b>: Action 
</div>