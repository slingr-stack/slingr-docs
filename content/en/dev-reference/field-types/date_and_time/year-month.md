---
title: "Year-Month type"
lead: "Year-Month type documentation."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "field-types"
toc: true
---

## **Overview**

This field type is capable of storing a specific year and month. It does not include the day or time information, focusing solely on the year and month.

**Default format:**
The default format is **`yyyy-MM`**, although it can be customized to a different format.


## **Available features**

Name|Supported
---|---
Many multiplicity|yes
Default values|yes
Unique flag|no
Required flag|yes
Indexable flag|yes
Sensitive flag|yes
Calculated value|yes
Automatic initialization|no
Calculated initial value|no
Aggregation|no
Default type rules|no
Default display options|yes

## **Display options**

### Representation

This defines the format for displaying the month and year. The default format is **`yyyy-MM`**, but you have the option to customize it to your preference.

There are several predefined formats available, which are commonly used. Additionally, you can choose the **`"Custom"`** option to define your own format based on the following guidelines:

- Era designator: G (AD)
- Year: yy (16), yyyy (2016)
- Month: MMMM (July), MMM (Jul), MM (07)

## **REST API**

### Read format

The format for the date is a string using the **`yyyy-MM`** format.

```js
"nextHolidays": "2016-07"
```
<br>

### Write format

To specify the date, you need to provide a string in the **`yyyy-MM`** format.

```js
"nextHolidays": "2016-07"
```
<br>

## **JavaScript API**

### Read format

When utilizing the **`val()`** method within the wrapper, it will yield a **`Date`** object.

```js
// this will print something like "holidays: Thu Jun 01 2017 00:00:00 GMT-0000 (UTC)"
log('holidays: '+record.field('nextHolidays').val());
```
<br>

As the **`Date`** object contains day and time information, it will be set to 00:00 of the first day of the month using the time zone of the server.

### Write format

When writing the value, you have the option to either use a Date object or provide a string in the **`yyyy-MM`** format.

```js
record.field('nextHolidays').val(new Date());
record.field('nextHolidays').val('2016-07');
```
<br>

If the provided value is not valid, the field will be silently set to **`null`**.

### Wrapper method: <br> **format(pattern)**

  Formats the month into a string. If a format pattern is provided, it will be used; otherwise, the format set in the default display options of the field will be used.

  ##### Parameters

  Name|Type|Required|Description
  ---|---|---|---
  pattern|string|no|The **`pattern`** parameter specifies the format for formatting the month. Please refer to the documentation for display options to understand the available format options.<br>If no **`pattern`** is provided, the default display options of the field will be used.

  ##### Returns

  **`string`** - The formatted month.

  ##### Exceptions

  **`badRequest`**

  If **`pattern`** is invalid
  
  ##### Samples

  ```js
  // formats month using 'MM-yyyy' pattern
  var contact = sys.data.findOne('contacts', {email:'apetersonay@guardian.co.uk'});
  log('holidays: '+contact.field('nextHolidays').format('MM-yyyy'));
  ```
  <br>

  ```js
  // formats month using default display options
  var contact = sys.data.findOne('contacts', {email:'apetersonay@guardian.co.uk'});
  log('holidays: '+contact.field('nextHolidays').format());
  ```
  <br>

  ---

## **Export/Import**

### Export format

The export format is **`yyyy-MM`**, regardless of the display options configured for that field.

```js
"yearMonthField1","yearMonthField2"
"02-10","05-24"
```
<br>

### Import Format

The import format is **`yyyy-MM`**, regardless of the display options configured for that field.

```js
"yearMonthField1","yearMonthField2"
"02-10","05-24"
```
<br>

## **Queries**

For more information, please refer to the [Query Language Documentation]({{<ref "/dev-reference/queries/query-language.md">}}).

### Available operators

Operator|Supported
---|---
equals|yes
notEquals|yes
empty|yes
notEmpty|yes
like|no
greater|yes
greaterOrEquals|yes
less|yes
lessOrEquals|yes
between|yes
currentUserField|no

### Query formats

You should pass a string with the format **`yyyy-DD`**. For example:

{{< query_sample
        id="sample"
        description="finds contacts with holidays in 2017-07"
        entity="contacts"
        jsQueryMap="{'nextHolidays': '2017-07'}"
        jsQueryBuilder=".field('nextHolidays').equals('2017-07')"
        restApi="nextHolidays=2017-07"
>}}
<br>

When utilizing the query builder, you have can use a **`Date`** object.

```js
query.field('nextHolidays').equals(new Date());
```
<br>

## **Aggregate queries**

Please refer to the [Aggregate Queries Documentation]({{<ref "/dev-reference/queries/aggregate-queries.md">}}) for more detailed information.

### Available operators

Operator|Supported
---|---
sum|no
avg|no
first|yes
last|yes
min|yes
max|yes

## **UI queries**

Please refer to the [UI Queries Documentation]({{<ref "/dev-reference/queries/ui-queries.md">}}) for more detailed information.

### Matching of values

Property|Description
---|---
Matching operator|**`equals`**<br>UI queries will attempt to match using the format specified in the default display options of the field.

### Available operators

Operator|Supported
---|---
Many values|yes
Greater|no
Greater or equals|no
Less|yes
Less or equals|yes
Between|yes