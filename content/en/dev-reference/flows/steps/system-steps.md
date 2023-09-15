---
title: "System steps"
lead: "Discover system steps"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "steps"
toc: true
weight: 86
---

## **Start step**

##### General Info

Category | Description | Rules
--- | --- | ---
**`System`** | Initiates the flow. | - A single start step is mandatory.

##### Inputs

No configuration required.

##### Outputs

No configuration required.

##### Sample

<figure>
  <img src="{{site.baseurl}}/images/vendor/flows/logger.png" alt="Start step">
  <figcaption>The flow begins with the logger step, which logs a message, and concludes with the end step.</figcaption>
</figure>

## **End step**

##### General Info

Category | Description | Rules
--- | --- | ---
**`System`** | Marks the end of the flow. Optional, and can return a result. | - At least one end step is required.

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
Return result | boolean | no | Always | When **`true`**, it returns the final result of the flow.
Result | object | no | **`config.returnResult`** | The final result to be returned by the flow.

##### Outputs

No configuration required.

##### Sample

<figure>
  <img src="{{site.baseurl}}/images/vendor/flows/logger.png" alt="Image of end step.">
  <figcaption>The flow begins with the logger step, logs a message, and concludes with the end step.</figcaption>
</figure>


## **Logger step**

##### General Info

Category | Description |
--- | --- |
**`System`** | Logs application events. |

##### Inputs

Label | Type | Required | Default | Visibility | Description
--- | --- | --- | --- | --- | ---
level | choice | yes | Info | Always | Log importance level.<br> Possible values: **`Info`**, **`Warning`**, **`Error`**, **`Debug`**
Message | text | yes | - | Always | Message to be logged, supports dynamic arguments for formatting.
Arguments | text | no | - | Always | Arguments for the format string. Zero or more allowed.

##### Outputs

Name | Type | Description
--- | --- | ---
result | string | The name of the next element in the list.

##### Sample

<figure>
  <img src="{{site.baseurl}}/images/vendor/flows/logger.png" alt="Image of end step.">
  <figcaption>The flow begins with the logger step, logs a message, and concludes with the end step.</figcaption>
</figure>

## **Script step**

##### General Info

Category | Description |
--- | --- |
**`System`** | Executes custom code. |

##### Inputs

Label | Type | Required | Visibility | Description
--- | --- | --- | --- | ---
code | script | yes | Always | Custom code to execute.

##### Outputs

Name | Type | Description
--- | --- | ---
result | object | The final result of the script execution.

##### Sample

<figure>
  <img src="{{site.baseurl}}/images/vendor/flows/script.png" alt="Script image">
  <figcaption>The flow begins with the set script step, which executes custom code, and concludes with the end step. In case of an error during execution, the error will be logged, and the execution will terminate.</figcaption>
</figure>

## **Set var step**

##### General Info

Category | Description |
--- | --- |
**`System`** | Defines a new variable in the current execution context. |

##### Inputs

Label | Type | Required | Default | Visibility | Description
--- | --- | --- | --- | --- | ---
Name | text | yes | - | Always | -
Value Type | choice | yes | Fixed | Always | Possible values: **`Fixed`**, **`Script`**, **`Expression`**|
Script Value | script | config.valueType is SCRIPT | - | config.valueType is SCRIPT | - |
Fixed Value | text | config.valueType is FIXED | - | config.valueType is FIXED | - |
Expression Type | choice | config.valueType is EXPRESSION | - | config.valueType is EXPRESSION | Possible values:<br>**`Current User`**,<br>**`Field Value`**|
Context Item | object | config.expressionType.name is FIELD_VALUE | - | config.expressionType.name is FIELD_VALUE | - |
Field | entityField | config.expressionType.name is FIELD_VALUE | - | config.expressionType.name is FIELD_VALUE | - |

##### Outputs

Name | Type | Description
--- | --- | ---
resultVariable | record/field | The variable created.

##### Sample

<figure>
  <img src="{{site.baseurl}}/images/vendor/flows/set_var.png" alt="Set var image">
  <figcaption>The flow begins with the set var step, which defines a new variable in the context, and concludes with the end step.</figcaption>
</figure>

