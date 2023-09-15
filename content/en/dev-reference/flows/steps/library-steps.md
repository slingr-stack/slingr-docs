---
title: "Library steps"
lead: "Describes how to use the library steps."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "steps"
toc: true
weight: 90
---

## **Definition categories**

### Description

Flow Steps Libraries empower you to define your custom steps and seamlessly integrate them into your workflows. It's imperative to specify inputs, outputs, and the script that a step will execute. Once defined, this library becomes a reusable asset accessible across various parts of your application.

### Category

In contrast to predefined steps, you have the flexibility to configure the category of your step library.

### Category examples

**`By Business Logic`:** Group a set of steps tailored to a specific business entity or process.

**`By Generic Functionalities`:** Create steps with frequently used operations that streamline the development of your workflows.

<figure>
  <img src="/slingrDoc/images/vendor/flows/libraries_steps_flow_editor.png" alt="Libraries step image">
  <figcaption>In the Flow Editor, we have the libraries divided by the configured categories</figcaption>
</figure>

## **Inputs and Outputs**

### Description

Flow Step Libraries enable you to define your custom steps and seamlessly integrate them into your workflows. To create a step, it's necessary to specify inputs, outputs, and the script that the step will execute. Once configured, this library becomes a reusable asset that can be conveniently utilized in various parts of your application.

### Inputs

Inputs are versatile and optionally configurable. Each input can be customized extensively, from defining its data type to establishing general rules. This empowers users to employ expressions and scripts to tailor the behavior of the library step within the Flow Editor.

<figure>
  <img src="/slingrDoc/images/vendor/flows/libraries_inputs.png" alt="Libraries inputs step image">
  <figcaption>In the Flow Editor, we have the libraries divided by the configured categories</figcaption>
</figure>

### Outputs

Outputs are also optional and each output has its Type.

## **Advantages**

**Why Use Step Libraries?**

##### Reusability

Step Libraries offer a powerful mechanism for code reuse. You write a step once, and it becomes available for use in any flow within your application. This eliminates redundant effort and promotes efficiency.

##### Custom Business Logic

Not all business logic fits neatly into standard pre-defined steps. Step Libraries empower you to tackle complex scenarios by allowing you to insert custom JavaScript code. This flexibility ensures that you can handle a wide range of situations according to your specific needs.

##### Facilitating Collaboration

Step Libraries can facilitate new dynamics between citizen developers and traditional developers. When an entity used within a Step Library is updated, the library may need manual updates to accommodate changes. This collaborative approach ensures that both citizen developers and traditional developers can work together effectively to maintain and enhance the functionality of your application.

## **Refactoring**

When you make changes to a Step Library, it's crucial for developers to be aware of the potential impacts due to the following rules:

##### Code Modifications

If the code within a Step Library is altered, all Flows utilizing this step will automatically adopt the new behavior. Therefore, any changes to the code will propagate across relevant Flows.

##### Input Modifications

Modifying the inputs of a Step Library will inevitably result in changes to how the Step is used within your flows. It's important to note that altering Step library inputs will necessitate updates in all the places where this Step is used.

##### Entity Updates

When an entity utilized within a Step Library undergoes changes or updates, the Step Library will require manual adjustments to accommodate these modifications. This ensures that the Step Library remains synchronized with the evolving entity.

## **Example**

1. **`Step Library Definition`**: To begin, we define our Business Logic step. In this example, it accepts a list as input and returns a list after applying a specific process to each element.

![libraries_on_flow_editor](/slingrDoc/images/vendor/flows/script_code_sample.png)

2. **`Enhancing Workflow`**: Following the definition of the Business Logic step, we navigate to the Flow Editor and realize that we need to process multiple lists. To simplify this operation, we decide to add a Library Step that streamlines the concatenation of these lists.

![Enhacing workflow](/slingrDoc/images/vendor/flows/libraries_flow_incomplete.png)

3. **`Ready for Use`**: With the new Step Library in place, we return to the Flow Editor, where the newly defined steps are now readily available for use.

![Ready for Use](/slingrDoc/images/vendor/flows/libraries_steps_flow_editor.png)

4. **`Data Collection`**: In our sample scenario, we gather the data to be processed using Set Var steps. Once all the data lists are collected, the Concat List step effectively merges these values, preparing them for processing by the Business Logic Step.

![Data Collection](/slingrDoc/images/vendor/flows/libraries_on_flow_editor.png)
