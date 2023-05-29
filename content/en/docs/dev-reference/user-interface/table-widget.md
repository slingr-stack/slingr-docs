---
title: "Table widget"
lead: "Detailed explanation of settings available for table widget views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

Table widget views allow to show records of an entity in a list.

## Entity

This is the entity the view will point to. Only records of this entity will be listed
in the table widget.

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
information. Is true by default.

## List settings

### Dataset settings

These settings indicate how the listing should behave.

#### Sort field

This is the default sorting field for the listing.

Users might be able to change the default sorting if that's enabled in any of the columns.

#### Sort type

Indicates the direction of the sorting. 

Users might be able to change the default sorting if that's enabled in any of the columns.

#### Filter type

Can be expression or script. In case to select expression should set record filters. In other case should return
the script.

#### Record filters

Defines which records will be listed. Only records matching the given expression will be listed
in the table widget view.

#### Script

Return query parameter or queryMap. The query map object used to filter records. 
Check the [Query language]({{site.baseurl}}/app-development-query-language.html) documentation for the query map version.

#### Size

The maximum number of records to fetch when the view is loaded.

### Pagination

#### Enable Pagination

Allows to show pagination on the widget

#### Page size

Defines the amount of rows that a page can contain. This option it's only available if [Enable Pagination]({{site.baseurl}}/app-development-widget-table-views.html#enable-pagination) it's `true`.

## Columns

Here it is possible to add/remove fields as columns to the table in the listing. This columns
will use the default display options of fields, but you can override them. Please check the
documentation of [General display options]({{site.baseurl}}/app-development-model-fields.html#general-display-options)
for more information.

Columns have some additional options apart from the ones available for fields:

- `Automatic width`: indicates if the browser should automatically adjust the width of the
  column based on the available space and content, or if it should have a fixed width, that
  could be in pixels or percentage.
- `Allow to wrap title`: by default the title won't be wrapped except that this flag is enabled,
  which might be useful for fields with long labels (you could also override the label of the
  field in the display options).
- `Allow sorting`: this flag indicates if the sorting arrows will be available on this column.
  This flag is set by default for fields that have the indexable flag set.

### Available events

#### On row clicked

This event it's fired every time that you click on a table row and it's being listened for all the defined [layout listeners]({{site.baseurl}}/app-development-ui-dashboard-views.html#on-event)
that belongs to the Dashboard. The event type name it's `TABLE_ROW_CLICKED` and you can access to the event payload that contains the `recordId`. 

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

## Example

### Use case

Table widgets allows to see specific collection information in a more condensed way. Configuration it's very similar to grid views.
Tables make it easy to compare pairs of related values (e.g., quarterly sales over several years). Or if you have more than one set of 
values that have a direct relationship, you may also use a table to organize the data.
As an example, we can think of the relationship between costs and income generated. In this case, perhaps a table is ideal for 
displaying this type of information.

As an example, we have an entity called `Companies` that contains, among its fields, a field that represents `costs` and another that 
represents `income`. In this case we can use a table widget to show this data and have a better visualization of its relationship.

### Precondition

For the case presented, we assume that we already have a grid view that contains a read only view for the `Companies` entity.
The name of the grid view is `companies`. In addition we have several records.

### Create a table widget

 - Step 1: You can create a widget from the root layout of a Dashboard or from a column or a row within a Dashboard view. 
We can also create it from the menu option `Widget views` and then associate it with a` Dashboard` view.
 - Step 2: In the widget view creation screen we have to load the data required by the screen and select the value `Table` in` Widget type`. Then we choose the entity `Companies`. Once all the fields have been completed we click on `Create`.
 - Step 3: We went to the column editing screen of the table widget and created 3 columns referencing the fields `name`,` costs` and `revenue`.
 - Step 4: We associate the new widget with an existing Dashboard.
 - Step 5: We add a listener to our Dashboard that reacts to the `TABLE_ROW_CLICKED` event type and sends a UI message to navigate to the corresponding read only view.
 This is the context of the `On event` script and the script to react to this event by sending a UI message:
 {{< js_script_context context="dashboardViewOnEventRowClickedScript">}}

 - Step 6: Push changes and you will see that clicking on a row inside table widget you go to the corresponding `read only` view.


### Events and UI messages

The following example allow react to table widget row event. To do that we need to check events in some dashboard container.
 
In `event` variable we check that event was fired from the table widget hosted in the dashboard container `salesCompainesContainer`
and use that information to make a new `query` to refresh the bar chart that display sales per company. By suppose that 
exist a widget that display sales per companies and it is hosted in a dashbaord container called `salesPerCompaniesBar`. 

```javascript

if(event.type == 'TABLE_ROW_CLICKED' && event.containerName == 'salesCompaniesContainer') {
    
    var record = sys.data.findById('companies', event.recordId);
    var companyNameStr = record.field('name').val();
    
    var query = sys.data.createQuery('salesPerCompany');
    query.field('companyName').equals(companyNameStr);
    // query.field('period').greaterThan('...'); define some criteria for our query
    
    sys.ui.sendMessage({
      scope: 'view',
      name: 'refresh',
      views: ['dashboardView'],
      widgetContainers: [
        {
          name: 'salesPerCompaniesBar',
          title: 'Sales for - ' + companyNameStr,
          filter: query
        }
      ]
    });
}

``` 
