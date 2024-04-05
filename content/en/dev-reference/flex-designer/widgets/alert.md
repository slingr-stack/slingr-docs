---
title: "Alert"
description: ""
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "widgets"
toc: true
weight: 83
---

This type of widget represents a **Alert block** that can be useful for showing users a highlighted block. Can be configured along with actions.

## **Settings**

The available settings are described as below:

### Title

This represents the human-readable widget name. It's what appears in the heading section of the alert when is displayed.

### Body

This is the body content of the alert.

{{< notes type="note">}}
To enhance the user experience, refrain from composing lengthy texts in the body.
{{< /notes >}}

### Name

This is the internal widget name, used as for database storage within entities.

The name must not contain special characters or spaces; only letters and numbers are allowed.

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


### Style

The emphasis color of the alert.

- Primary
- Secondary
- Success
- Warning
- Danger

### Dismissible

This option enables the user to close the alert when it's shown.
- **Default value**: `false`

### Menu

This options enables to set entity related [actions]({{<ref "/dev-reference/data-model-and-logic/actions">}}) to the alert. The available settings are:

- **`All`**: Includes all the actions present in the entity.
- **`Custom`**: Custom set of actions and groups defined by the developer.
- **`None`**: No actions will be shown.
