---
title: "Flows Context"
lead: "You can inject variables from the context stack into the step inputs."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "flows"
toc: true
---
## Summary

You can inject variables in the steps' inputs as a result from other steps. This is done through the use of the Context. There are several cases that demonstrate the utility of the Context. For example, when you want to update a record using data that was output by a previous create-record step. You can also log error results using a try-catch step, or create a record using data from action parameters.

## Context Stack

### Adding items to the Context Stack

Some steps can output their results into the Flows' execution context. For example, the createRecord step outputs the created record, which can be added to the context stack by selecting "put in context". The context stack may also contain default items depending on where the Flow is executed from. For instance, if it is executed from an action, the action's parameters can be seen in the context stack.

### Using items from the Context in Inputs

By default, an input is meant to accept a fixed value. However, some inputs can accept a value from the context. In these cases, you can select a value from the context based on its scope.

## Scope

Each item in the context stack has its own scope. Context items are only available when editing a step that comes after the step that outputs the context item. For example, you cannot select context items from steps that are outside the execution flow of the step that outputs to the context. Similarly, you cannot select an output from a step that precedes the step that outputs to the context.

## Example

![Context stack example](/images/vendor/flows/context_stack_example.png)
*In the updateRecord step, inside a tryCatch step, it is not possible to access the output of findData because it is not in the execution flow of findData. However, it can access the output of the super step: tryCatchError.*

