---
title: "Menu"
description: ""
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "widgets"
toc: true
weight: 105
---

This type of widget represents a **Menu block** that can be useful for grouping actions to execute.

{{< notes type="note" >}}
 This widget can only be configured in **[Flex record views]({{<ref "/dev-reference/user-interface/flex-views/flex-record-views">}})**
{{< /notes >}}

## **Settings**

The available settings are described as below:

### Name

This is the internal widget name, used as for database storage within entities.

The name must not contain special characters or spaces; only letters and numbers are allowed.

### Alignment

This defines the positioning of the menu.

- **`Left`**
- **`Center`**
- **`Menu`**

### Visible

Indicates the visibility of the widget, can be configured with the following options:

- **`Always`**: The widget is perpetually accessible.
- **`Script`**: When the script returns **`true`**, the widget becomes accessible; otherwise, it remains inaccessible. Here's the script's context:

    ---

    ##### Parameters

    |Name|Type|Description|
    |---|---|---|
    |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This record is linked to the ongoing operation.

    ##### Returns

    **`boolean`** - You should return **`true`**  if there is access to the widget, **`false`** otherwise.

    ##### Samples

    ```js
    // if 'numberOfExmployees' is bigger than 10, then this field is visible
    return record.field('numberOfEmployees').val() > 10;
    ```
    <br>
    
    ---

- **`Expression`**: The widget becomes accessible if the expression evaluates to `true`. More information is available in the [Expressions documentation]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}).
- **`Never`**: The widget will never be accessible.

### Menu

This options enables to set entity related [actions]({{<ref "/dev-reference/data-model-and-logic/actions">}}) to the alert. The available settings are:

- **`All`**: Includes all the actions present in the entity.
- **`Custom`**: Custom set of actions and groups defined by the developer.
- **`None`**: No actions will be shown.
