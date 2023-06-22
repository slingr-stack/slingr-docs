---
title: "Flows overview"
lead: "This section provides an overview on how flows can be used to do the same actions that could be done with scripts but in an easier way."
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

## Introduction

Flow is a visual programming language tool that uses graphical blocks (steps) to develop algorithms.

To describe the logic of a flow it is required to do a drag and drop of steps and connect them together. So a Flow is a 
series of predefined and configurable steps that can be used to execute a wide variety of business rules in different 
parts of an application. 

## Flow Settings

The following table describes the general properties of the flows:

<table class="table">
    <thead>
        <tr class="header">
            <th align="left">Label</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Label</td>
            <td><code class="highlighter-rouge">string</code></td>
            <td>This is a human-readable name of the flow. You can use spaces, special characters and mix upper case and lower case letters.</td>
        </tr>
        <tr>
            <td>Name</td>
            <td><code class="highlighter-rouge">string</code></td>
            <td>This is the internal name of the flow. It cannot hold special characters or spaces.</td>
        </tr>
        <tr>
            <td>Description</td>
            <td><code class="highlighter-rouge">string</code></td>
            <td>This is the description of the flow.</td>
        </tr>
        <tr>
            <td>Debug</td>
            <td><code class="highlighter-rouge">boolean</code></td>
            <td>If enabled, will print the generated code in logs.</td>
        </tr>
    </tbody>
</table>

## General Rules

The following list contains the rules that must be followed in all flows:

- The flow name must be unique in the app.
- Each step name must be unique in the flow.
- Start and end steps are mandatory.
- Start step should be unique.
- Inputs need to pass their own validation rules.
- Outputs need to pass their own validation rules.
- There can not be steps without any connection with the exception of the context step and expanded version of subflows.
- Every step except for start and end steps should be source or target of at least one connection.
- You can only select items from the context according to its scope.


## Considerations
Description of considerations to take into account when working with flows
- Right now the input values can only contain fixed values or references to variables available in the context.
- Condition expressions are expressed as scripts.

## Quick start

The flow editor contains the [available steps](), the steps can be dragged and connected to each other to build the flow.

Each step has a different function, it can have input parameters and generate output data that will be included in the context of the flow to be reused by other steps. 

The steps can be connected to each other by connecting from the green rectangle of the source step to the destination step. Some steps have a red square that indicates the flow to follow in case an error occurs when executing the step.

![](/images/vendor/flows/quickstart_sample.png)

_The flow begins with the start step, then the find data step searches all the companies, for each of the companies found in the previous step, the update record step updates that company and the corresponding log step is executed whether it was successful or not. Finally the flow ends with the step end._
