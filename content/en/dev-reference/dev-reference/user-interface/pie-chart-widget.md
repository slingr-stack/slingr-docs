---
title: "Pie chart widget"
lead: "Detailed explanation of settings available for pie chart widget views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

Pie and doughnut charts are probably the most commonly used charts. They are divided into segments, 
the arc of each segment shows the proportional value of each piece of data.

They are excellent at showing the relational proportions between data.

## Label

This is a human-readable name of the view. You can use spaces, special characters and
mix upper case and lower case letters.

This label will be displayed at the top of the table widget view, so make sure you use something
users will understand.

## Name

This is the internal name of the view. It cannot hold special characters or spaces.

Usually you will use the name of the view in scripts and the REST API, so changing it
might affect your app and you will need to make some manual adjustments.

## Slices calculation

Define type of slice calculation, it can be `Automatic` or `Manual`. In case of `Àutomatic` each 
slice is an aggregation based on grouping data set defined. In case of `Manual` each slice 
is defined manually by developers.


## Description

This is a human-readable description of the widget. You can use spaces, special characters and
mix upper case and lower case letters. You can internationalize it.

This description will be displayed in top of added widget in your dashboard.

## Allow Refresh

This is to Show/Hide refresh button. We can perform this action in order to update this widget 
information. Is true by default.

## Filtering settings

These settings indicate how the listing should behave.

### Sort field

This is the default sorting field for the listing.

Users might be able to change the default sorting if that's enabled in any of the columns.

### Sort type

Indicates the direction of the sorting. 

Users might be able to change the default sorting if that's enabled in any of the columns.

### Filter type

Can be expression or script. In case to select expression should set record filters. In other case should return
the script.

### Record filters

Defines which records will be listed. Only records matching the given expression will be listed
in the table widget view.

### Script

Return query parameter or queryMap. The query map object used to filter records. 
Check the [Query language]({{site.baseurl}}/app-development-query-language.html) documentation for the query map version.

### Size

The maximum number of records to fetch when the view is loaded and when clicking in `More` to fetch
more records.

## Chart settings

### Show as doughnut

Pie chart is rendered as doughnut.

## Automatic slices configuration

In this kind of pie each slice is an aggregation based on grouping data set defined. The color
of slices are automatically calculated.

### Entity

This is the entity that automatic chart slice will point to. Only records of this entity will be listed
in the pie chart view.

### Slice group

This is the entity filed used to group data and after that each group is used to aggregating 
final value to the slice. 

### Label

This is the human-readable name of the field.

### Name

This is the internal name of the field. The name cannot contain special characters or spaces. 
Only letters and numbers.

### Type

The type of the field indicates what can be stored in that field as well as how the field
will be rendered. Each type has its own rules and display options.

To know which types are available and their features, please check the 
[Types]({{site.baseurl}}/app-development-types-overview.html) documentation.

### Multiplicity

Indicates if the field can hold one or many values. For example you might have a field
called `emails` that can hold many email addresses in case the user has more than one.

### Calculated

Define the type to calculate value. There are two ways of calculating a value:

- `Script`: in this case you can provide a script to calculate the value. This is the context of the script:
  {{< js_script_context context="dynamicWidgetSliceCalculatedValue">}}

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


## Manual chart configuration

In this kind of chart each slice is added for the developer. In each one should be configure:

### Entity

This is the entity that manual chart slice will point to. Only records of this entity will be listed
in the pie slice chart view.

### Label

This is the human-readable name of the field.

### Name

This is the internal name of the field. The name cannot contain special characters or spaces. 
Only letters and numbers.

### Type

The type of the field indicates what can be stored in that field as well as how the field
will be rendered. Each type has its own rules and display options.

To know which types are available and their features, please check the 
[Types]({{site.baseurl}}/app-development-types-overview.html) documentation.

### Multiplicity

Indicates if the field can hold one or many values. For example you might have a field
called `emails` that can hold many email addresses in case the user has more than one.

### Calculated

Define the type to calculate value. There are two ways of calculating a value:

- `Script`: in this case you can provide a script to calculate the value. This is the context of the script:
  {{< js_script_context context="calculatedValueScript">}}

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

### Slice styling settings

#### Settings mode

It can be simple or advanced. In case of simple mode just need set slice color and other settings are calculated or 
set by default. For advanced the developer should define each value.

#### Color

This is the slice color. It should be hexadecimal color code.

#### Border color

The border line fill color. It should be hexadecimal color code.

#### Hover background color

Background color when hovered.

#### Hover border color

Background color when hovered.

#### Border align

When `center` is set, the borders of arcs next to each other will overlap. When `inner` is set, 
it is guaranteed that all the borders are not overlap.

#### Border width

The line width (in pixels). From 0 to 5.

#### Hover Border width

The border line width (in pixels) when hovered. From 0 to 5.

## Example for automatic calculation of slices

### Use case

This type of graph allows data representation in such a way that you immediately understand that you are seeing parts 
of a whole. As an example you may need to view the number of articles summarized by content type.

### Precondition

You need to have an entity that contains articles. Each article can be of a single `Type` and have a `name`.

As an example, the types of articles are: Sports, Culture, Technology, Society, Others.

### Create pie chart using automatic calculation of slices

Following steps describe how to create 

- Step 1: In order to create the widget from root layout of given dashboard in columns or row you go to `Assign widget`.
- Step 2: You can assign an existent widget or create a new one. In this case we want to create a new one.
- Step 3: Complete the label and name for the new widget and set `Pie chart` in widget type and `Automatic` on `Slices calculation`.
- Step 4: In **Automatic slices configuration** select the entity that contains the article. Then you have to select as `Slice group`
the field called `Type`. Complete label and name for the slice.
- Step 5: Slice type will be an Integer since we want to summarize the amount of records.
- Step 6: The operation we need for this case is `Count`. 
- Step 7: Save changes and push it.

## Example for manual calculation of slices

### Use case

This type of graph allows data representation in such a way that you immediately understand that you are seeing parts 
of a whole. As an example you may need to view the number of articles summarized by content type Technology VS the rest of 
the content (Sports, Culture, Society and Others).

### Precondition

You need to have an entity that contains articles. Each article can be of a single `Type` and have a `name`.

As an example, the types of articles are: Sports, Culture, Technology, Society, Others.

### Create pie chart using automatic calculation of slices

Following steps describe how to create 

- Step 1: In order to create the widget from root layout of given dashboard in columns or row you go to `Assign widget`.
- Step 2: You can assign an existent widget or create a new one. In this case we want to create a new one.
- Step 3: Complete the label and name for the new widget and set `Pie chart` in widget type and `Manual` on `Slices calculation` and save it.
- Step 4: Go to **Slices** menu option under the view and click on `Create`.
- Step 5: Fill model settings with the entity `Content` and set a `Label` and a `Name`. For `Type` we have to select Integer.
- Step 6: Once we have selected the `Type` we can set `Calculation type` as `Aggregate` and set a filter to take into account the records 
that have the type of `Technology`. On `Operation` we select `Count`.
- Step 7: On `Slice stiling settings` we select a color for the slice and save the configuration.
- Step 8: We create a new slice by clicking on `Create`.
- Step 9: Fill model settings with the entity `Content` and set a `Label` and a `Name`. For `Type` we have to select Integer.
- Step 10:  Once we have selected the `Type` we can set `Calculation type` as `Aggregate` and set a filter to take into account the records 
were type is not equals to `Technology`. On `Operation` we select `Count`.
- Step 11: On `Slice stiling settings` we select a color for the slice and save the configuration.
- Step 7: Save changes and push it.

## UI Message

Widgets can react to UI message. The common case is when need refresh the data or apply filters.

### Refresh and filter

It is possible send a message to refresh the widget using its default settings. This messages are sending to dashboard 
container and propagated to each widget. 

Additionally you can send a filter parameter in order to be applied to the query used to get the data. This query can be 
a [query]({{site.baseurl}}/app-development-js-api-data.html#sys.data.Query) object or a query map. In case to use a query 
object the filter just is applied if the entity is same to the entity set in the widget. Check the 
[Query language]({{site.baseurl}}/app-development-query-language.html) for more information.  

In order to apply filters is necessary set the `widgetContainer` with a list of objects in witch each one describes the 
container `name` and the `filter` to be applied on each widget. Additionally you can send `title` to update the widget 
title. 

For this kind chart in witch each series can be defined from a different entity the `filter` parameter is an array of 
objects in witch each one describes the series `name` and the `filter` to be applied just for that series. 

#### Example

In following example you can refresh and apply a filter sending the filter parameter to given widget container. 
As you can see in the example each series define its own query independently and it is applied to specific entity. 

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

