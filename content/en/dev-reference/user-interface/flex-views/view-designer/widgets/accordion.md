---
title: "Accordion"
description: ""
date: 2025-01-31T11:23:15+01:00
lastmod: 2025-01-31T11:23:15+01:00
draft: false
images: []
menu:
  docs:
    parent: "widgets"
toc: true
weight: 100
---

This type of widget represents a **Accordion block** that can be useful like a block to order and configure a sub-layout inside the view.

{{< notes type="note" >}}
This widget can only be configured in **[Flex record views]({{<ref "/dev-reference/user-interface/flex-views/flex-record-views">}})**
{{< /notes >}}

## **Settings**

The available settings are described as below:

### Label

This represents the human-readable widget label. It's what appears in the heading section of the accordion when is displayed.

### Name

This is the internal widget name, used as for database storage within entities.

The name must not contain special characters or spaces; only letters and numbers are allowed.

### Visible

Indicates the visibility of the widget, can be configured with the following options:

- **`Always`**: The widget is perpetually accessible.
- **`Script`**: When the script returns **`true`**, the widget becomes accessible; otherwise, it remains inaccessible. Here's the script's context:

  ***

  ##### Parameters

  | Name   | Type                                                                              | Description                                     |
  | ------ | --------------------------------------------------------------------------------- | ----------------------------------------------- |
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) | This record is linked to the ongoing operation. |

  ##### Returns

  **`boolean`** - You should return **`true`** if there is access to the widget, **`false`** otherwise.

  ##### Samples

  ```js
  // if 'numberOfExmployees' is bigger than 10, then this field is visible
  return record.field("numberOfEmployees").val() > 10;
  ```

    <br>

  ***

- **`Expression`**: The widget becomes accessible if the expression evaluates to `true`. More information is available in the [Expressions documentation]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}).
- **`Never`**: The widget will never be accessible.

#### Layout/Sections

The layout sections are configured adding sections through the add button so it'll add the section with a row and column inside. The user will configure widgets, like configuring a normal row and column, building a sub-layout inside the global layout of the view. Below this section, you will see an example with pictures of how to build the layout and configure the accordion.

Like the accordion, sections can be configure. These have the following settings

### Label

This represents the human-readable widget label. It's what appears in the heading section of the accordion when is displayed.

### Name

This is the internal widget name, used as for database storage within entities.

The name must not contain special characters or spaces; only letters and numbers are allowed.

### Visible

Indicates the visibility of the widget, can be configured with the following options:

- **`Always`**: The widget is perpetually accessible.
- **`Script`**: When the script returns **`true`**, the widget becomes accessible; otherwise, it remains inaccessible. Here's the script's context:

  ***

  ##### Parameters

  | Name   | Type                                                                              | Description                                     |
  | ------ | --------------------------------------------------------------------------------- | ----------------------------------------------- |
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) | This record is linked to the ongoing operation. |

  ##### Returns

  **`boolean`** - You should return **`true`** if there is access to the widget, **`false`** otherwise.

  ##### Samples

  ```js
  // if 'numberOfExmployees' is bigger than 10, then this field is visible
  return record.field("numberOfEmployees").val() > 10;
  ```

    <br>

  ***

- **`Expression`**: The widget becomes accessible if the expression evaluates to `true`. More information is available in the [Expressions documentation]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}).
- **`Never`**: The widget will never be accessible.

### Expanded

Indicates if the section is expanded or not by default, can be configured with the following options:

- **`Always`**: The widget is perpetually accessible.
- **`Script`**: When the script returns **`true`**, the widget becomes accessible; otherwise, it remains inaccessible. Here's the script's context:

  ***

  ##### Parameters

  | Name   | Type                                                                              | Description                                     |
  | ------ | --------------------------------------------------------------------------------- | ----------------------------------------------- |
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) | This record is linked to the ongoing operation. |

  ##### Returns

  **`boolean`** - You should return **`true`** if there is access to the widget, **`false`** otherwise.

  ##### Samples

  ```js
  // if 'numberOfExmployees' is bigger than 10, then this field is visible
  return record.field("numberOfEmployees").val() > 10;
  ```

    <br>

### Example

All the settings except the layout can be configured clicked on the accordion container or on the configure widget button. You will see a view like this
![Accordion settings example](./images/vendor/flex-designer/widgets/AccordionSettingsExample.png)
<br>

The section also has the settings
![Accordion section settings example](./images/vendor/flex-designer/widgets/AccordionSectionSettingsExample.png)
<br>

The layout will be configured adding sections by the add button and then with drag and drop the row/columns/widgets inside the accordion section block how to can see in the next picture.
![Accordion layout example](./images/vendor/flex-designer/widgets/AccordionLayoutExample.png)
