---
title: "Control steps"
description: "Describes how to use the control steps."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "steps"
toc: true
weight: 87
---

## **List iterator**

##### General info

Category | Description |
--- | --- |
**`Control`** | The List Iterator is a control flow statement designed for iterating through items within a collection, such as result sets or multiple fields. This step facilitates the inclusion of other steps within it. The behavior of this step encapsulates the behavior of the nested steps, enabling structured traversal of the collection.|

##### Inputs

Label | Type | Required  | Visibility | Description
--- | --- | --- | --- | --- 
Iterable list|resultSet / field(many)|yes|Always|The list of elements to be traversed.


##### Outputs

Name | Type | Description
--- | --- | ---
nextElementName|record / field|The name of the next element in the list.

##### Sample

<figure>
  <img src="/images/vendor/flows/foreach_sample.png" alt="For each image">
  <figcaption>The flow initiates, the "foreach" step updates and saves each of the records discovered in the "find data" step, and finally, the execution concludes with the "end" step.</figcaption>
</figure>

## **Condition**

##### General info

Category | Description |
--- | --- |
**`Control`** | The "Condition" step executes the subsequent steps in the path only if the specified condition evaluates to "truthy."|

##### Inputs

Label | Type | Required | Default | Visibility | Description
--- | --- | --- | --- | --- | ---
Condition type|choice|yes| Expression | Always | Type of condition to be checked. Possible values are **`Expression`** and **`Script`**
Expression record|record|**`Condition type`** is **`expression`**|-|**`Condition type`** is **`expression`**|The record instance to be used to check condition.
Expression condition|confition|**`Condition type`** is **`Expression`**. Expression record has been defined|-|Condition type is **`Expression`**. Expression record has been defined|The condition to be valued as true.
Script condition|condition|**`Condition type`** is **`Script`**|-|**`Condition type`** is **`Script`**|The script condition to be evaluated as true.


##### Outputs

No configuration required.

##### Sample

<figure>
  <img src="/images/vendor/flows/if_sample.png" alt="If Sample image">
  <figcaption>The flow starts, the if step evaluates the condition, if the condition is true, runs the script and then the execution finished with the end step.</figcaption>
</figure>

## **Subflow**

##### General info

Category | Description |
--- | --- |
**`Control`** | A subflow is a grouping of steps that are condensed into a single step within the execution path. It can be employed to simplify the visual representation of a flow, or to bundle a set of steps as a reusable component used across various instances.|

##### Inputs

No configuration required.

##### Outputs

No configuration required.

##### Sample

<figure>
  <img src="/images/vendor/flows/subflow_sample.png" alt="Subflow image">
  <figcaption>The flow initiates, and the "subflow" step executes the set of steps specified within the subflow. If an error occurs during the execution of these steps, the error will be recorded, and the execution will be terminated.</figcaption>
</figure>

## **Error handler**

##### General info

Category | Description |
--- | --- |
**`Control`** | The error handler step enables you to define a code block that is examined for errors while it runs. This step also permits the inclusion of other steps within it. The behavior of this step encompasses the behavior of the nested steps, providing error-handling capabilities.|

##### Inputs

No configuration required.

##### Outputs

No configuration required.

##### Sample

<figure>
  <img src="/images/vendor/flows/trycatch_sample.png" alt="Error handler image">
  <figcaption>The flow begins, and the "try-catch" step runs the script. If an error occurs during the execution of the script, the error will be recorded, and the execution will be terminated.</figcaption>
</figure>

## **Loop**

##### General info

Category | Description |
--- | --- |
**`Control`** | This control flow statement enables the repeated execution of steps based on a specified boolean condition. It supports the inclusion of other steps within it, thus allowing for the nesting of steps.|

##### Inputs

Label | Type | Required | Default | Visibility | Description
--- | --- | --- | --- | --- | ---
Condition type|choice|yes| Expression | Always | Type of condition to be checked. Possible values are **`Expression`** and **`Script`**
Expression record|record|**`Condition type`** is **`expression`**|-|**`Condition type`** is **`expression`**|The record instance to be used to check condition.
Expression condition|confition|**`Condition type`** is **`Expression`**. Expression record has been defined|-|Condition type is **`Expression`**. Expression record has been defined|The condition to be valued as true.
Script condition|condition|**`Condition type`** is **`Script`**|-|**`Condition type`** is **`Script`**|The script condition to be evaluated as true.


##### Outputs

No configuration required.

##### Sample

<figure>
  <img src="/images/vendor/flows/while_sample.png" alt="Loop image">
  <figcaption>The flow commences, and the "while" step logs as long as a specified condition remains true. Subsequently, the execution concludes with the "end" step.</figcaption>
</figure>
