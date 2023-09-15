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

Table widget views enable the display of records from an entity in a tabular format.

## **Entity**

This specifies the entity to which the view will refer. Only records of this entity will be listed
in the table widget.

## **Label**

This is a human-readable name for the view. You can use spaces, special characters, and
a mix of upper case and lower case letters.

This label will appear at the top of the table widget view, so ensure that you choose something
understandable for users.

## **Name**

This serves as the internal name of the view. It cannot contain special characters or spaces.

Usually, you will use the name of the view in scripts and the REST API. Changing it
could potentially affect your app, necessitating manual adjustments.

## **Description**

This provides a human-readable description for the widget. Special characters, spaces, and
a mix of upper case and lower case letters can be used. This description can also be internationalized.

This description will be displayed at the top of the added widget in your dashboard.

## **Allow refresh**

This option controls the display of a refresh button. Users can use this button to update the widget's 
information. It is set to **`true`** by default.

## **List settings**

### Dataset settings

These settings determine the behavior of the listing.

### Sort field

This is the default sorting field for the listing.

Users might be able to change the default sorting if that functionality is enabled in any of the columns.

### Sort type

This indicates the sorting direction.

Users might be able to change the default sorting if that functionality is enabled in any of the columns.

### Filter type

This can be either an expression or a script. If "expression" is selected, record filters should be set. Otherwise, a script should be returned.

### Record filters

This defines which records will appear in the list. Only records that match the given expression will be listed
in the table widget view.

### Script

This returns a query parameter or queryMap. The query map object is used to filter records. 
Refer to the [Query Language]({{<ref "/dev-reference/queries/query-language.md">}}) documentation for the query map version.

### Size

This specifies the maximum number of records to fetch when the view is loaded.

## **Pagination**

### Enable pagination

This option determines whether pagination is displayed on the widget.

### Page size

This defines the number of rows that a page can contain. This option is only available when [Enable Pagination](#enable-pagination) is set to **`true`**.

## **Columns**

Here, you can add or remove fields as columns in the table listing. These columns
will use the default display options of fields, but you can override them. For more information, consult the
[General Display Options]({{<ref "/dev-reference/data-model-and-logic/fields.md#general-display-options">}})
documentation.

Columns have additional options beyond those available for fields:

- **`Automatic Width`**: Indicates whether the browser should automatically adjust the width of the
  column based on the available space and content or if it should have a fixed width, which
  can be specified in pixels or as a percentage.
- **`Allow to Wrap Title`**: By default, the title won't wrap unless this flag is enabled. This can be useful for fields with long labels (you can also override the label of the
  field in the display options).
- **`Allow Sorting`**: This flag indicates whether sorting arrows will be available on this column. This flag is set by default for fields with the indexable flag set.

## **Available events**

### On row clicked

This event is fired every time you click on a table row. It is listened to by all the defined [layout listeners]({{<ref "/dev-reference/user-interface/dashboard-views.md#on-event">}})
that belong to the Dashboard. The event type name is **`TABLE_ROW_CLICKED`**, and the event payload contains the **`recordId`**. 

## **UI message**

Widgets can react to UI messages, commonly used for refreshing data or applying filters.

### Refresh and filter

You can send a message to refresh the widget using its default settings. These messages are sent to the dashboard 
container and propagated to each widget.

Additionally, you can send a filter parameter to be applied to the query used to fetch the data. This query can be 
a query object or a query map. For query objects, the filter is only applied if the entity matches the entity set in the widget. Refer to the 
[Query Language]({{<ref "/dev-reference/queries/query-language.md">}}) for more information.  

To apply filters, set the **`widgetContainer`** with a list of objects, each describing the 
container's **`name`** and the **`filter`** to be applied on each widget. You can also include the **`title`** to update the widget 
title.

## **Example**

### Use case

Table widgets allow for a more condensed view of specific collection information. The configuration process is similar to grid views.
Tables are useful for comparing pairs of related values, such as quarterly sales over multiple years. They are also suitable for situations where you have multiple sets of 
values with a direct relationship.

For instance, consider a scenario where you want to visualize the relationship between costs and generated income. A table could be ideal for presenting such information.

### Precondition

For this example, we assume that there is an existing grid view containing a read-only view for the **`Companies`** entity.
The grid view is named **`companies`**, and several records are present.

### Creating a table widget

- **`Step 1`**: You can create a widget from the root layout of a Dashboard, or from a column or row within a Dashboard view. Alternatively, you can create it from the **`Widget views`** menu and then associate it with a **`Dashboard`** view.
- **`Step 2`**: On the widget view creation screen, load the required data and select **`Table`** as the **`Widget type`**. Choose the **`Companies`** entity. Once all fields are completed, click **`Create`**.
- **`Step 3`**: In the table widget's column editing screen, create three columns referencing the **`name`**, **`costs`**, and **`revenue`** fields.
- **`Step 4`**: Associate the new widget with an existing Dashboard.
- **`Step 5`**: Add a listener to the Dashboard to react to the **`TABLE_ROW_CLICKED`** event type. Send a UI message to navigate to the corresponding read-only view.
- **`Step 6`**: Provide the necessary context for the **`On event`** script and the script that responds to the event by sending a UI message.

  ##### Parameters

  Name|Type|Description
  ---|---|---
  event|object|This event object contains information about where was the refresh fired, it can be when user click the refresh button of the UI or when send UI messages from other side.

  ##### Samples

  ``` javascript
  // React to a table widget row clicked event 
  // event payload contains all the specific event information
  var eventPayload = event.payload;
  if (eventPayload) {
    // reacting to the event 'TABLE_ROW_CLICKED'
      if (eventPayload.eventName == 'TABLE_ROW_CLICKED') {
        sys.ui.sendMessage({
            scope: 'global',
            name: 'navigate',
            view: 'projects',
            target: 'caller',
            recordId: eventPayload.recordId
        });
      }
  }
  ```
  <br>

- **`Step 6`**: Push changes, and when you click on a row inside the table widget, you will navigate to the corresponding **`read-only`** view.

### Events and UI Messages

Here's an example that demonstrates how to react to a table widget row event. We will need to monitor events in a dashboard container.

Assuming you have a table widget hosted in the dashboard container **`salesCompaniesContainer`**, the following example checks if an event was fired from that specific table widget. This information is then used to create a new **`query`** to refresh a bar chart displaying sales per company.

Suppose you have a widget that displays sales per company, hosted in a dashboard container called **`salesPerCompaniesBar`**.

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
