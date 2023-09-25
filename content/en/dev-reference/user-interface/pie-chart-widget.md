---
title: "Pie chart widget"
description: "Detailed explanation of settings available for pie chart widget views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

Pie and doughnut charts are among the most commonly used chart types. They are divided into segments, with each segment's arc representing the proportional value of a specific data point.

These charts excel at illustrating the relative proportions between data points.

## **Label**

This is a human-readable name for the view. You can use spaces, special characters, and a mixture of upper and lower case letters.

This label will appear at the top of the widget view, so ensure you use language that users will understand.

## **Name**

This is the internal name of the view. It cannot contain special characters or spaces.

You will usually utilize the view's name in scripts and the REST API. Changing it may impact your app, necessitating manual adjustments.

## **Description**

This is a human-readable description of the widget. You can use spaces, special characters, and a mixture of upper and lower case letters. Internationalization is possible.

This description will be visible at the top of the added widget in your dashboard.

## **Slices calculation**

Define the type of slice calculation; it can be either **`Automatic`** or **`Manual`**. When set to **`Automatic`**, each 
slice is generated through aggregation based on the defined data grouping. In contrast, with the **`Manual`** option, developers manually define each individual slice.

## **Allow refresh**

This option determines whether the refresh button is displayed or hidden. This button facilitates the update of widget information. It's enabled by default.

## **Filtering settings**

These settings determine how the listing functions.

### Sort field

This sets the default sorting field for the listing.

Users may be able to modify the default sorting if that feature is enabled in any of the columns.

### Sort type

This indicates the sorting direction.

Users may be able to adjust the default sorting direction if it's enabled in any of the columns.

### Filter type

It can be either an expression or a script. If "expression" is selected, record filters should be configured. Otherwise, a script should be provided.

### Record filters

This specifies which records will be displayed in the list. Only records that match the given expression will appear
in the table widget view.

### Script

Returns a query parameter or queryMap. The query map object is used to filter records.
For information on the query map version, refer to the [Query Language]({{<ref "/dev-reference/queries/query-language.md">}}) documentation.

### Size

This sets the maximum number of records to fetch when the view is initially loaded and when clicking "More" to retrieve additional records.

## **Chart settings**

### Show as doughnut

When selected, the pie chart is rendered as a doughnut.

## **Automatic slices configuration**

In this type of pie chart, each slice is generated through aggregation based on the defined data grouping. The colors of the slices are calculated automatically.

### Entity

This indicates the entity to which the automatic chart slice will refer. Only records from this entity will be listed in the pie chart view.

### Slice group

This refers to the entity field used for data grouping. Each group formed through this field is subsequently utilized for aggregating the final values to form the slices.

### Label

This represents the human-readable name of the field.

### Name

This serves as the internal name of the field. The name cannot include special characters or spaces. Only letters and numbers are allowed.

### Type

The field's type specifies what can be stored in the field and how the field will be displayed. Each type has its own rules and display options.

To discover available types and their features, please consult the [Types]({{<ref "/dev-reference/field-types/overview.md">}}) documentation.

### Multiplicity

This indicates whether the field can hold one or multiple values. For instance, you might have a field called **`emails`** that can accommodate multiple email addresses if the user has more than one.

### Calculated

Define the method for calculating values. There are two approaches to value calculation:

- **`Script`**: In this scenario, you can supply a script to perform the value calculation. The script operates within the following context:

  ##### Returns

  **`string`** - you should return a string value as result

  ##### Samples

  ``` javascript
  // displays a label based on the status of the contract
  var contract = sys.data.findOne('contracts', {number: '001'});
  if (contract.field('status').val() === 'deployed') {
      return 'Active';
  }
  return 'Inactive';
  ```
  <br>
- **`Aggregate`**: In this case, you can calculate a value based on an aggregate query involving other records. For
  instance, consider having an entity named **`departments`** and another named **`employees`** with a field named **`salary`**. To calculate the average salary for each department, you could add a field where the calculation involves aggregating data from the **`employees`** entity. This would be done for records with the **`department`** field pointing to the corresponding department record, and performing an average calculation on the **`salary`** field. This aggregation will be
  automatically updated whenever a salary changes or an employee is added or removed from the department.
  When the calculation is **`Aggregate`**, you can choose from the following options:
  - **`Aggregate entity`**: This refers to the entity containing the records that need to be aggregated. In the aforementioned example, it would be the **`employees`** entity.
  - **`Expression`**: This expression defines the criteria that records in the **`Aggregate entity`** must meet to be included
    in the aggregation. In the above example, the expression was based on a field where the **`Current record`** was equal
    to the **`department`** field. This ensures that only employees from the current department are included in the aggregation.
  - **`Aggregate operation`**: This operation specifies the calculation to be performed. It could be:
    - **`Count`**: This counts the number of records matching the expression.
    - **`Sum`**: This sums the values in the **`Aggregate field`** (see below) for the records matching the expression.
    - **`Avg`**: This calculates the average of the values in the **`Aggregate field`** (see below) for the records 
      matching the expression.
  - **`Aggregate field`**: If the **`Aggregate operation`** is anything other than **`Count`**, a field must be selected
    for the operation to be applied. In the example above, the chosen field is **`salary`**.

## **Manual chart configuration**

In this type of chart, each slice must be added by the developer. For each slice, the following should be configured:

### Entity

This specifies the entity to which the manual chart slice will refer. Only records from this entity will be listed in the pie slice chart view.

### Label

This is the human-readable name of the field.

### Name

This serves as the internal name of the field. The name cannot include special characters or spaces.  Only letters and numbers are allowed.

### Type

The field's type indicates what can be stored in the field and how the field will be displayed. Each type comes with its own rules and display options.

To explore the available types and their features, please refer to the [Types]({{<ref "/dev-reference/field-types/overview.md">}}) documentation.

### Multiplicity

This indicates whether the field can hold one or multiple values. For instance, you might have a field
called **`emails`** that can accommodate multiple email addresses if the user has more than one.

### Calculated

Define the method for calculating values. There are two approaches to value calculation:

- **`Script`**: In this scenario, you can supply a script to perform the value calculation. The script operates within the following context:

  ##### Returns

  **`string`** - you should return a string value as result

  ##### Samples

  ``` javascript
  // displays a label based on the status of the contract
  var contract = sys.data.findOne('contracts', {number: '001'});
  if (contract.field('status').val() === 'deployed') {
      return 'Active';
  }
  return 'Inactive';
  ```
  <br>
- **`Aggregate`**: In this case, you can calculate a value based on an aggregate query involving other records. For
  instance, consider having an entity named **`departments`** and another named **`employees`** with a field named **`salary`**. To calculate the average salary for each department, you could add a field where the calculation involves aggregating data from the **`employees`** entity. This would be done for records with the **`department`** field pointing to the corresponding department record, and performing an average calculation on the **`salary`** field. This aggregation will be
  automatically updated whenever a salary changes or an employee is added or removed from the department.
  When the calculation is **`Aggregate`**, you can choose from the following options:
  - **`Aggregate entity`**: This refers to the entity containing the records that need to be aggregated. In the aforementioned example, it would be the **`employees`** entity.
  - **`Expression`**: This expression defines the criteria that records in the **`Aggregate entity`** must meet to be included
    in the aggregation. In the above example, the expression was based on a field where the **`Current record`** was equal
    to the **`department`** field. This ensures that only employees from the current department are included in the aggregation.
  - **`Aggregate operation`**: This operation specifies the calculation to be performed. It could be:
    - **`Count`**: This counts the number of records matching the expression.
    - **`Sum`**: This sums the values in the **`Aggregate field`** (see below) for the records matching the expression.
    - **`Avg`**: This calculates the average of the values in the **`Aggregate field`** (see below) for the records 
      matching the expression.
  - **`Aggregate field`**: If the **`Aggregate operation`** is anything other than **`Count`**, a field must be selected
    for the operation to be applied. In the example above, the chosen field is **`salary`**.


### Slice styling settings

#### Settings mode

It can be simple or advanced. In case of simple mode just need set slice color and other settings are calculated or set by default. For advanced the developer should define each value.

#### Color

This is the slice color. It should be hexadecimal color code.

#### Border color

The border line fill color. It should be hexadecimal color code.

#### Hover background color

Background color when hovered.

#### Hover border color

Background color when hovered.

#### Border align

When **`center`** is set, the borders of arcs next to each other will overlap. When **`inner`** is set, it is guaranteed that all the borders are not overlap.

#### Border width

The line width (in pixels). From 0 to 5.

#### Hover border width

The border line width (in pixels) when hovered. From 0 to 5.

## **Example: automatic calculation of slices**

### Use case

This type of graph allows data representation in such a way that you immediately understand that you are seeing parts of a whole. As an example you may need to view the number of articles summarized by content type.

### Precondition

You need to have an entity that contains articles. Each article can be of a single **`Type`** and have a **`name`**.

As an example, the types of articles are: Sports, Culture, Technology, Society, Others.

### Creating a pie chart with automatic calculation of slices

The following steps outline how to create this type of chart:

- **`Step 1`**: To create the widget within the root layout of the given dashboard, either in columns or rows, navigate to **`Assign Widget`**.
- **`Step 2`**: You can either assign an existing widget or create a new one. In this case, we're creating a new widget.
- **`Step 3`**: Provide a label and name for the new widget, then select **`Pie Chart`** as the widget type and choose **`Automatic`** for **`Slices Calculation`**.
- **`Step 4`**: Under **Automatic Slices Configuration**, select the entity that contains the relevant data. Next, choose the **`Slice Group`** which, in this case, is the field called **`Type`**. Complete the label and name for the slice.
- **`Step 5`**: The slice type will be an Integer, as we're summarizing the count of records.
- **`Step 6`**: For this use case, the necessary operation is **`Count`**.
- **`Step 7`**: Save the changes and push them.

## **Example: manual calculation of slices**

### Use case

This graph type enables the representation of data in a manner that immediately conveys parts of a whole. As an example, you might need to compare the number of articles categorized as Technology versus articles in other categories (Sports, Culture, Society, Others).

### Prerequisite

You need to have an entity containing articles. Each article should have a single **`Type`** and a **`Name`**.

For instance, the article types could include: Sports, Culture, Technology, Society, Others.

### Creating a pie chart with manual calculation of slices

The following steps illustrate the process:

- **`Step 1`**: To begin, navigate to the root layout of the dashboard (either in columns or rows) and select **`Assign Widget`**.
- **`Step 2`**: You can assign an existing widget or create a new one. In this case, we'll create a new widget.
- **`Step 3`**: Provide a label and name for the new widget. Choose **`Pie Chart`** as the widget type and set **`Manual`** for **`Slices Calculation`**, then save it.
- **`Step 4`**: Under the **Slices** menu option within the view, click on **`Create`**.
- **`Step 5`**: Fill in the model settings, using the entity **`Content`**. Set a **`Label`** and a **`Name`**. Choose the **`Type`** as Integer.
- **`Step 6`**: After selecting the **`Type`**, set the **`Calculation Type`** as **`Aggregate`**. Apply a filter to consider only the records with the type **`Technology`**. For **`Operation`**, select **`Count`**.
- **`Step 7`**: In **`Slice Styling Settings`**, pick a color for the slice, and save the configuration.
- **`Step 8`**: Create a new slice by clicking on **`Create`**.
- **`Step 9`**: Fill in the model settings, using the entity **`Content`**. Set a **`Label`** and a **`Name`**. Choose the **`Type`** as Integer.
- **`Step 10`**: After selecting the **`Type`**, set the **`Calculation Type`** as **`Aggregate`**. Apply a filter to exclude records where the type is not **`Technology`**. For **`Operation`**, select **`Count`**.
- **`Step 11`**: In **`Slice Styling Settings`**, select a color for the slice, and save the configuration.
- **`Step 12`**: Save the changes and push them.

## **UI message**

Widgets can respond to UI messages. A common use case is when data needs refreshing or filters need applying.

### Refresh and filter

You can send a message to refresh the widget with default settings. These messages are sent to the dashboard container and propagated to each widget.

Additionally, you can send a filter parameter to apply it to the query used for data retrieval. The query can be a [query]({{<ref "/dev-reference/scripting/sys-data.md">}}) object or a query map. If using a query object, the filter is applied only when the entity matches that set in the widget. Refer to the [Query Language]({{<ref "/dev-reference/queries/query-language.md">}}) for more information.

To apply filters, set the **`widgetContainer`** with a list of objects, each describing the container **`name`** and the **`filter`** to be applied to each widget. The **`title`** can also be sent to update the widget title.

#### Example

In the following example, you refresh and apply a filter by sending the filter parameter to the given widget container. Note how each series defines its own query and applies it to a specific entity.

```javascript

var query = sys.data.createQuery('content');
query.field('access').equals('PUBLIC');

sys.ui.sendMessage({
  scope: 'view',
  name: 'refresh',
  views: ['dashboard'],
  widgetContainers: [
    {
      name: 'col11',
      filter: [
        {
          name: 'content',
          filter: query
        }
      ]
    }
  ]
});

``` 

