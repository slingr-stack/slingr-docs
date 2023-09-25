---
title: "Overview"
description: "This section offers an overview of how flows can streamline tasks that would typically be accomplished with scripts, offering a more straightforward approach."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 77
---

## **Introduction**

Flow is a visual programming language tool that utilizes graphical blocks (steps) for creating algorithms.

To describe the logic of a flow, you are required to perform a drag-and-drop action of steps and connect them together. In essence, a Flow is a sequence of predefined and configurable steps that can be employed to execute a wide array of business rules in various parts of an application.

## **Flow settings**

The table below outlines the general properties of flows:

| Label        | Type                        | Description                                                  |
| ------------ | --------------------------- | ------------------------------------------------------------ |
| Label        |  string                     | This is a human-readable name of the flow. You can use spaces, special characters, and mix upper case and lower case letters. |
| Name         |  string                     | This is the internal name of the flow. It cannot contain special characters or spaces. |
| Description  |  string                     | This is the description of the flow.                         |
| Debug        |  boolean                    | If enabled, it will print the generated code in logs.        |

## **General rules**

The following list outlines the rules that must be adhered to in all flows:

- The flow name must be unique within the app.
- Each step name must be unique within the flow.
- Both start and end steps are mandatory.
- The start step should be unique.
- Inputs must adhere to their own validation rules.
- Outputs must adhere to their own validation rules.
- Steps, with the exception of the context step and expanded versions of subflows, must have at least one connection.
- Every step, except for start and end steps, should serve as the source or target of at least one connection.
- Item selection from the context should align with its scope.

## **Considerations**

This section provides essential considerations to keep in mind when working with flows:

- Currently, input values can only consist of fixed values or references to variables available in the context.
- Condition expressions are expressed as scripts.

## **Quick start**

The flow editor comprises [available steps]({{<ref "/dev-reference/flows/steps/categories.md">}}), which can be dragged and interconnected to construct the flow.

Each step serves a distinct function and may include input parameters, generating output data that becomes part of the flow's context for reuse by other steps.

Steps are interconnected by drawing connections from the green rectangle of the source step to the destination step. Some steps feature a red square, indicating the flow to follow in case of an error during step execution.

![Flow Example](/images/vendor/flows/quickstart_sample.png)

In the example above, the flow initiates with the start step, followed by the find data step searching for all companies. For each of the companies discovered in the previous step, the update record step is executed, and the corresponding log step is triggered, whether the operation succeeds or not. The flow concludes with the end step.
