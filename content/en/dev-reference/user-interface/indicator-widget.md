---
title: "Indicator widget"
description: "Detailed explanation of settings available for indicator widget views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 59
---

An indicator widget is designed to showcase a single crucial value. In this context, the displayed value represents a significant measure of the business's equity, providing a robust and prominent indication.

## **Label**

This is a human-readable name for the view. You can use spaces, special characters, and a mixture of upper and lower case letters.

This label will appear at the top of the widget view, so ensure you use language that users will understand.

## **Name**

This is the internal name of the view. It cannot contain special characters or spaces.

You will usually utilize the view's name in scripts and the REST API. Changing it may impact your app, necessitating manual adjustments.

## **Description**

This is a human-readable description of the widget. You can use spaces, special characters, and a mixture of upper and lower case letters. Internationalization is possible.

This description will be visible at the top of the added widget in your dashboard.

## **Allow refresh**

This option determines whether the refresh button is displayed or hidden. This button facilitates the update of widget information. It's enabled by default.

## **Value calculation**

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

## **Content settings**

### Icon

Select an icon to be displayed in the indicator.

### Color

Choose the indicator color for the icon and value. It should be a hexadecimal color code.

## **Permissions**

Permissions determine which groups can access this view.
  
While permissions for a view can be configured directly within the view definition, it mirrors the capabilities available in group configuration. The objective is to facilitate easy permission configuration for all existing groups.

Upon the creation of a new view, if a group holds permissions for the entity associated with that view, the view will inherently be granted permission for use by that group.

For a comprehensive understanding of permissions, refer to the [Groups]({{<ref "/dev-reference/security/groups.md">}}) documentation.

