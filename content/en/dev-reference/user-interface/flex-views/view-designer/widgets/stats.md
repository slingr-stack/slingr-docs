---
title: "Stats"
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

This type of widget represents a **Stats block** that can be useful for create custom UI blocks.

{{< notes type="note" >}}
 This widget can only be configured in **[Flex record views]({{<ref "/dev-reference/user-interface/flex-views/flex-record-views">}})**
{{< /notes >}}

## **Settings**

The available settings are described as below:

### Label

A human-readable label for the widget, which will be displayed as the title or identifier of the widget.

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

### Background style

Specifies the contextual class for styling of the widget. Default value is: default. This setting can be overwritten in the script.

### Value style

Specifies the contextual class for styling the main value displayed by the widget. Default value is: primary. This setting can be overwritten in the script.

### Icon

Specifies the icon to be used in the widget, it refers to an icon class name from our icon library. By default no icon is displayed. This setting can be overwritten in the script.

## Icon style

If the icon is set then this setting allows to specify the contextual class for styling the icon. Default value is: default. This setting can be overwritten in the script.

## Footnote

Additional text or notes displayed at the bottom of the widget, providing supplementary information. HTML can be used for this or even the components provided by the [HTML API]({{<ref "/dev-reference/user-interface/html-api/overview">}}). This setting can be overwritten in the script.

## Script

Script
Path to a JavaScript function that calculates or fetches the data to be displayed in the widget. This enables the widget to display relevant and context-specific information, adjusting its appearance and content dynamically based on the calculated values and conditions.

This script can return either a simple value or a structure. If a structure is returned, it can override the default attributes of the widget, including:
- **`value`**
- **`valueStyle`**
- **`icon`**
- **`iconStyle`**
- **`footNote`**
