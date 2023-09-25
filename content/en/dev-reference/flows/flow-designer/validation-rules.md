---
title: "Validation rules"
description: "Description of the flow designer's validation rules."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 82
---
Certain rules must be adhered to in order to successfully save a flow. If any of these rules are not followed after clicking the **`Apply`** or **`Save`** button, a validation error notification will appear, and the changes won't be saved.

## **Rules**

- The flow **`name`** must be unique within the app.
- Each step **`name`** must be unique within the flow.
- Both a **`Start`** step and at least one **`End`** step are mandatory.
- The **`Start`** step should be unique.
- Inputs must pass their respective validation rules.
- Outputs must pass their respective validation rules.
- There should be no steps without any connections except for the **`Context step`** and expanded versions of **`subflows`**.
- Outside of group containers, every step, except for **`Start`** and **`End`** steps, should serve as the source and target of at least one connection.
- Inside of group containers, only one step should not be the target of any connection. This step will be the initial step in the flow execution within the group.


