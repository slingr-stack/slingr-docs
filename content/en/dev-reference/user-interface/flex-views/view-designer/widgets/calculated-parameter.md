---
title: "Calculated parameter"
description: ""
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "widgets"
toc: true
weight: 101
---

This type of widget represents a [field]({{<ref "/dev-reference/data-model-and-logic/fields">}}), where its value is calculated through a script or an aggregate query, depending on the field type choosen.

{{< notes type="note" >}}
 This widget can only be configured in **[Flex action views]({{<ref "/dev-reference/user-interface/flex-views/flex-action-views">}})**
{{< /notes >}}

## **Settings**

The available settings are described as below:

### Label

This represents the human-readable widget name. It's what appears in the UI when the header is displayed.

### Name

This is the internal widget name, used as for database storage within entities.

The name must not contain special characters or spaces; only letters and numbers are allowed.

### Type

The [type]({{<ref "/dev-reference/field-types/overview">}}) of the field.

### Multiplicity

Determines if it's a single value or can be one or more.

- One
- Many

### Value calculation

The calculated value for this field.

```js
function(record, parentField, action) {
  return "My calculated value"
}
```