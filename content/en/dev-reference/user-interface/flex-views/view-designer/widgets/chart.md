---
title: "Chart"
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

This type of widget represents a **Chart block** that can be useful for create custom UI blocks.

{{< notes type="note" >}}
 This widget can only be configured in **[Flex record views]({{<ref "/dev-reference/user-interface/flex-views/flex-record-views">}})**
{{< /notes >}}

## **Settings**

The available settings are described as below:

### Label

A human-readable label for the widget.

### Name

A unique identifier for the widget, often used in scripts or styles to reference this specific widget.

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

### Height

The specific property related to the chart's height. These are the possible values for the height property:
- **`Automatic:`** the chart will expand to fill the available vertical space. This is the default value.
- **`Fixed:`** the chart height will be fixed. It is required to specify the height in pixels if this type is selected.
- **`Scroll:`** the chart will scroll if the content exceeds the available height.  It is required to specify the maximum height in pixels if this type is selected.

## Script

Path to a JavaScript function that dynamically builds the chart to be displayed in the widget. So that the process of writing the script for this type of widget will have the following feature: **Chart snippets**.

Developers can click on a button labeled Chart snippets associated with the chart widget instance. This button can be located right next to the Show docs button. This action opens a modal dialog where developers can select the type of chart they want to generate code. Options might include bar charts, line charts, pie charts, etc. Based on the developer's selection, the modal dynamically generates sample JavaScript code snippets. These snippets are pre-configured to create the selected type of chart using Chart.js. Finally, developers can easily review the generated code, copy and paste the snippet to the script setting.


