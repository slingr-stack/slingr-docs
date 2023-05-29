---
title: "Indicator widget"
lead: "Detailed explanation of settings available for indicator widget views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

Indicator widget allow display one important value. The result will be the indicative value of the equity of 
the business and a strong indication.

## Label

This is a human-readable name of the view. You can use spaces, special characters and
mix upper case and lower case letters.

This label will be displayed at the top of the table widget view, so make sure you use something
users will understand.

## Name

This is the internal name of the view. It cannot hold special characters or spaces.

Usually you will use the name of the view in scripts and the REST API, so changing it
might affect your app and you will need to make some manual adjustments.

## Description

This is a human-readable description of the widget. You can use spaces, special characters and
mix upper case and lower case letters. You can internationalize it.

This description will be displayed in top of added widget in your dashboard.

## Allow Refresh

This is to Show/Hide refresh button. We can perform this action in order to update this widget 
information. Is false by default.

## Value Calculation

### Calculated

Define the type to calculate value. There are two ways of calculating a value:

- `Script`: in this case you can provide a script to calculate the value. This is the context of the script:
  {% include js_script_context.html context=site.data.script_contexts.indicatorWidgetCalculatedValue indent=2 %}
- `Aggregate`: in this case you can calculate a value based on an aggregate query on other records. For
  example you have a an entity `departments` and then `employees` with a field named `salary`. If you
  want to have the average salary for each department you could add a field where the calculation is an
  aggregation over the entity `employees` for records with the field `department` pointing to the record
  of the field being calculated and doing an average over the field `salary`. This aggregation will be
  updated automatically whenever a salary changes or an employee is added or removed from the department.
  So when the calculation is `Aggregate` you are able to select the following options:
  - `Aggregate entity`: the entity that contains the records that have to be aggregate. In the example
    above it would be the `employees` entity.
  - `Expression`: this is the expression that records in the `Aggregate entity` have to match to be included
    in the aggregation. In the example above the expression was by field, where `Current record` was equals
    to the `department` field. This way only employees for the current department are going to be included
    in the aggregation.
  - `Aggregate operation`: this is the operation that will be performed. It could be:
    - `Count`: it just counts the number of records matching the expression.
    - `Sum`: it sums the values in the `Aggregate field` (see below) of the records matching the expression.
    - `Avg`: it performs an average of the values in the `Aggregate field` (see below) of the records 
      matching the expression.
  - `Aggregate field`: if the `Aggregate operation` is different than `Count` then a field needs to be selected
    to apply the operation on it. In the sample above the field is `salary`.

## Content settings

### Icon

Icon to be displayed in indicator.

### Color

This is the indicator color to icon and value. It should be hexadecimal color code.

## Permissions

Permissions allow to define which groups can access this view.
  
Permissions for a view can be handled right in the view definition, but it is just
a different view of what you can configure in groups. It is oriented so you can easily
configure permissions on the view for all existing groups.

When a new view is created, if a group has permissions to the entity associated to that view, then the view 
receives permission to be used for that group.

For more information about permissions please refer to [Groups]({{site.baseurl}}/app-development-security-groups.html).

