---
title: "Line chart widget"
lead: "This section describes settings available for line chart widgets that can be used in dashboard views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 54
---

A line chart is a way of plotting data points on a line. Often, it is used to show trend data, or 
the comparison of two data sets.

There are three types of line chart:

- **Category:** horizontal axis are defined as labels (category) of each value. This kind of chart is defined from one entity.  
- **Linear:** numerical data is defined for each point. The scatter chart type automatically configures a line chart to use 
one of these scales for the x axis. As the name suggests, linear interpolation is used to determine where a value lies on the axis.
- **Time:** a point is defined with the pair date-number. The time scale is used to display dates types. When building its 
ticks, it will automatically calculate the most comfortable unit base on the size of the scale.

## Category
 
Horizontal axis are defined as labels (category) of each value. This kind of chart is defined from one entity.

### Entity

This is the entity the view will point to. Only records of this entity will be listed
in the line chart widget.

### Label

This is a human-readable name of the view. You can use spaces, special characters and
mix upper case and lower case letters.

This label will be displayed at the top of the table widget view, so make sure you use something
users will understand.

### Name

This is the internal name of the view. It cannot hold special characters or spaces.

Usually you will use the name of the view in scripts and the REST API, so changing it
might affect your app and you will need to make some manual adjustments.

### Description

This is a human-readable description of the widget. You can use spaces, special characters and
mix upper case and lower case letters. You can internationalize it.

This description will be displayed in top of added widget in your dashboard.

### Allow Refresh

This is to Show/Hide refresh button. We can perform this action in order to update this widget 
information. Is true by default.

### List settings

#### Dataset

These settings indicate how the listing should behave.

**Sort field:** This is the default sorting field for the listing. Users might be able to change the default sorting 
if that's enabled in any of the columns.

**Sort type:** Indicates the direction of the sorting. Users might be able to change the default sorting if that's enabled in any of the columns.

**Filter type:** Can be expression or script. In case to select expression should set record filters. In other case should return
the script.

**Record filters:** Defines which records will be listed. Only records matching the given expression will be listed
in the table widget view.

**Script:** Return query parameter or queryMap. The query map object used to filter records. 
Check the [Query language]({{site.baseurl}}/app-development-query-language.html) documentation for the query map version.

**Size:** The maximum number of records to fetch when the view is loaded and when clicking in `More` to fetch
more records.


### Horizontal axis settings

#### View type

Represent the field type to be used to generate the horizontal axis values. It can be an entity field or a
calculated field.

#### Entity field

Allows to select an existing entity field. The value will be stored as a reference to metadata, being refactored in 
the same way when changes happen. 

#### Calculated field

The value of this kind of field is generated by script for horizontal axis.

#### Grid lines

If false, do not display grid lines for this axis.

### Vertical axis settings

#### Label

This is a human-readable name to be displayed in vertical axis. You can use spaces, special characters and
mix upper case and lower case letters.

#### Ticks suggested min / max

The suggestedMax and suggestedMin settings only change the data values that are used to scale the axis. 
These are useful for extending the range of the axis while maintaining the auto fit behaviour.

#### Grid lines

If false, do not display grid lines for this axis.

## Series

You can add series base on entity field or a calculated series. 

### Entity field

Allows to select an existing entity field. The value will be stored as a reference to metadata, being refactored in 
the same way when changes happen. The default value will be set only when creating a new record, which means it
won't have any effect when editing an existing record.

### Calculated field

The value of this kind of field is generated by script for vertical axis.

### Line styling settings

**Settings Mode:** It can be simple or advanced. In case of simple mode just need set line color and other settings are calculated or 
set by default. For advanced the developer should define each value.

**Color:** This is the line color. It should be hexadecimal color code.

**Line Tension:** Bezier curve tension of the line. Set to 0 to draw straightlines. Default value is 0.4

**Background Color:** The line fill color. It should be hexadecimal color code.

**Border Width:** The line width (in pixels).

**Border Dash:** Length and spacing of dashes.

**Stepped Line:** The following values are supported for stepped line:

- None
- Before
- Middle
- After

### Point styling settings

**Settings Mode:** It can be simple or advanced. In case of simple mode just need set line color and other settings are calculated or 
set by default. For advanced the developer should define each value.

**Background Color:** The fill color for points. It should be hexadecimal color code.

**Style:** Style of the point. It can by:

- circle
- cross
- crossRot
- dash
- line
- rect
- rectRounded
- rectRot
- star
- triangle

**Radius:** The radius of the point shape.

**Hover Background Color:** Point background color when hovered.

**Border Width:** The width of the point border in pixels.

**Border Color:** The border color for points.

## UI Message

Widgets can react to UI message. The common case is when need refresh the data or apply filters.

### Refresh and filter

It is possible send a message to refresh the widget using its default settings. This messages are sending to dashboard 
container and propagated to each widget. 

Additionally you can send a filter parameter in order to be applied to the query used to get the data. This query can be 
a [query]({{site.baseurl}}/app-development-js-api-data.html#sys.data.Query) object or a query map. In case to use a query 
object the filter just is applied if the entity is same to the entity set in the widget. Check the 
[Query language]({{site.baseurl}}/app-development-query-language.html) for more infomation.  

In order to apply filters is necessary set the `widgetContainer` with a list of objects in witch each one describes the 
container `name` and the `filter` to be applied on each widget. Additionally you can send `title` to update the widget 
title.

#### Example

In following example you can refresh and apply a filter sending the filter parameter to given widget container. 

```javascript
var query = sys.data.createQuery('salesInfoPeriod');
query.field('department').equals('Department A');

sys.ui.sendMessage({
  scope: 'view',
  name: 'refresh',
  views: ['salesDashboard'],
  widgetContainers: [
    {
        name: 'salesPerDepartment',
        filter: query
    }
  ]   
});
``` 

## Example

### Use case

This type of chart is created by connecting a series of data points together with a solid line. An example of data type 
that you can represented in line chart are annual sales rates and monthly rainfall as examples, as it will be clear to 
see the trend in the data over a continuous period of time.

### Precondition

You need have an entity in order to set the information in the line chart. We can have a calculated entity in witch have 
the aggregated information.

By example the entity `salesInLastYear` has the year-month field type called `period`  and integer field type called 
`totalSales`. This example assume that it is a calculated entity and it is updated each month. 

### Create a line chart

Following steps describe how to create 

- Step 1: In order to create the widget from root layout of given dashboard in columns or row you go to `Assign widget`.
- Step 2: You can assign an existent widget or create a new one. In this case we want to create a new one.
- Step 3: Complete the label and name for the new widget and set `Line Chart` in widget type and subtype `category`. Also 
we set the entity `salesInLastYear` described in preconditions and save changes in order to go to widget configurations.
- Step 4: In **Dataset**  config the sorting information, for the example should by `period`. You can see that here you can 
filter the information from `salesInLastYear`.
- Step 5: In **Horizontal axis** we configure the continuous variable that in our example is the `period` field. You can 
override display options for selected field here and show/hide grid lines. Check documentation above.
- Step 6: In **Vertical axis settings** we can customize settings to vertical axis. Please check documentation above.
- Step 7: In node **series** that you can ses expanded nodes of created line chart we add the fields (in this case series) 
that represents the measurement information. In this example, add a `new series` from button in secondary menu.
- Step 8: In `Model settings` we add the field that represent the measure. In this case it is `totalSales`.
- Step 9: For added series you can customize colors for line and points. Also you can set advance options for more options.
