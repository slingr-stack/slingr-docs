---
title: "Dynamic table"
description: ""
date: 2024-10-15T00:00:00+01:00
lastmod: 2024-10-15T00:00:00+01:00
draft: false
images: []
menu:
  docs:
    parent: "widgets"
toc: true
weight: 103
---

This widget allows you to build a **dynamic table** from a script. The platform handles rendering the table, so developers can focus on logic rather than table styling or positioning complexities.

{{< notes type="note" >}}
This widget can only be configured in **[Flex record views]({{<ref "/dev-reference/user-interface/flex-views/flex-record-views">}})**
{{< /notes >}}

## **Settings**

The available settings are described as below:

### Label

This represents the human-readable widget name.

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

### Rotate table

To rotate the table (swap rows and columns), set the **Rotate table** flag to `true`. This is `false` by default.

### Filtering

Filters per column. They are disabled by default. To enable them, you need to activate the Enable filters flag.

### Sorting

The Sorting feature allows table columns to be sorted either in ascending or descending order. This feature is enabled through the header object, where you can specify which columns are sortable.

### Pagination

Pagination is disabled by default. To enable it, activate the Enable pagination flag.

- Without Pagination: The table displays all records continuously.
- With Pagination: Methods available:
  - Per-page pagination: Content is split into pages. The page size (number of items per page) must be defined, and users can navigate through pages using a paginator.
  - Progressive pagination: Comming soon.

{{< notes type="note" >}}
Keep in mind that if pagination is not enabled and many records are displayed, the table may take longer to render.
{{< /notes >}}

### Sticky header

To make the table header sticky during scrolling, set the **Sticky header** flag to `true`. The default is `false`.

### Sticky columns

Set the number of columns to be sticky. By default, no columns are sticky.

### Table height

The table's height can be set using the following options:

- **Automatic** (default): The table expands to fill available vertical space.
- **Fixed**: A fixed height is set in pixels, and the content will scroll if it exceeds this height. Note that the specified pixel height applies only to the table's body, not the entire widget. The overall widget height may vary depending on additional configurations, such as enabled pagination.

### Script

The table's structure is dynamically generated through a script, which calculates the rows and columns and returns an object that defines the table's content. This object must include the table's header, body, and, in certain cases, additional information. Below are the details.

#### Parameters

The script will receive a parameter called `options`, which includes:

- filters
- sorting
- pagination

```json
{
  "filters": {
    <column_name>: <value>
  },
  "sorting": {
    "column": <column_name>,
    "direction": "asc" | "desc"
  },
  "pagination": {
    "size": <page_size>,
    "offset": <offset>
  }
}
```

#### Header

The table's header defines the column titles. It is an array where each element represents a row in the header, and each row contains an array of header objects. Each header object includes the following properties:

| Property     | Description                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **name**     | The unique identifier used internally to reference the header column.                                                                                                    |
| **label**    | The text displayed as the title of the header column.                                                                                                                    |
| **value**    | _(Optional)_ This property allows HTML content to be displayed in the header cell, taking precedence over the `label`.                                                   |
| **css**      | CSS styles to be applied to the header column for customization.                                                                                                         |
| **sortable** | _(Optional)_ A boolean that indicates whether the column can be sorted by user interaction. If set to `true`, users can click the header to sort the corresponding data. |

#### Body

The body of the table contains the actual data. It is represented as an array of objects, where each object corresponds to a row in the table. Each object contains key-value pairs mapping header names to data values.

- Basic row structure:

  ```json
  { "header1": "value1", "header2": "value2", ..., "headerN": "valueN" }
  ```

- More complex row structure (with CSS):

  ```json
  {
    "header1": { "value": "value1", "css": "font-weight: bold;" },
    "header2": { "value": "value2", "css": "color: red;" },
    ...
  }
  ```

- Full row structure (with unique ID):
  ```json
  {
    "id": "<row_id>",
    "cells": {
      "header1": { "value": "value1", "css": "font-weight: bold;" },
      "header2": { "value": "value2", "css": "color: red;" },
      ...
    }
  }
  ```
  This structure allows each cell to be fully customized using CSS and HTML content where needed.

#### Additional information

If pagination is enabled, the object should also include the following pagination details:

```json
{
  "pagination": {
    "totalRecords": totalRecords
  }
}
```

### Example

The following example demonstrates how to define a dynamic table with headers and body rows. Each column has a header defined with attributes such as `name`, `label`, and `css`. The body rows contain the actual data, which can be simple values or objects with specific settings like inline CSS.

```javascript
return {
  header: [
    {
      name: "id",
      label: "ID",
      css: "font-weight: bold; text-align: center",
      sortable: true,
    },
    {
      name: "name",
      label: "Name",
      css: "font-weight: bold; text-align: center",
      sortable: true,
    },
    { name: "age", label: "Age", css: "font-weight: bold; text-align: center" },
    {
      name: "country",
      label: "Country",
      css: "font-weight: bold; text-align: center",
    },
    {
      name: "email",
      label: "Email",
      css: "font-weight: bold; text-align: center",
    },
    {
      name: "phone",
      label: "Phone",
      css: "font-weight: bold; text-align: center",
    },
    {
      name: "status",
      label: "Status",
      css: "font-weight: bold; text-align: center",
    },
    {
      name: "signup_date",
      label: "Signup Date",
      css: "font-weight: bold; text-align: center",
    },
  ],
  body: [
    {
      id: "uniqueID",
      cells: {
        id: "1",
        name: "Alice",
        age: {
          value: "<small>30</small>",
          css: {
            "font-weight": "bold",
            "text-align": "right",
          },
        },
        country: "USA",
        email: "alice@example.com",
        phone: "+12345678901",
        status: "Active",
        signup_date: "2022-05-13",
      },
    },
    {
      id: "uniqueID2",
      cells: {
        id: "2",
        name: "Bob",
        age: { value: "40", css: "text-align: right" },
        country: "USA",
        email: "bob@example.com",
        phone: "+12345678902",
        status: "Inactive",
        signup_date: "2021-08-23",
      },
    },
    {
      id: "3",
      cells: {
        id: "3",
        name: "Charlie",
        age: {
          value: "<slingr-icon name='book'></slingr-icon>",
          css: "text-align: right",
        },
        country: "UK",
        email: "charlie@example.com",
        phone: "+12345678903",
        status: "Active",
        signup_date: "2023-01-11",
      },
    },
  ],
};
```

{{< notes type="note" >}}
This is an example using mock data. Filtering, sorting, and pagination will not work unless you manually implement the necessary algorithms.
{{< /notes >}}

#### Explanation:

- **Header**: Each header column is defined with a `name`, `label`, and optional `css` for styling. Some columns also have the `sortable` property, indicating that they can be sorted by the user.
- **Body**: Contains data for each row, where cells can include plain values or more complex objects with styling.

This structure is useful for dynamically generating a table layout with various features, such as sorting or custom cell styling.
