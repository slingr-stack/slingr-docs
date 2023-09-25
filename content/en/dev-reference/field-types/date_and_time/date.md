---
title: "Date type"
description: "Date type documentation."
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

This type can store a date without including the time; only the date is stored.

The default format is yyyy-MM-dd, but you have the option to customize it as needed.

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

The format used to display the date is customizable. The default format is yyyy-MM-dd, but you have the flexibility to modify it to your preferences.

You can choose from predefined formats that are commonly used, or you have the option to define a Custom format based on the following rules:

- Era designator: G (AD)
- Year: yy (16), yyyy (2016)
- Month: MMMM (July), MMM (Jul), MM (07)
- Week in year: w (27)
- Day in year: D (189)
- Day in month: d (9), dd (09)
- Day name in week: EEE (Tue), EEEE (Tuesday)

## **REST API**

### Read format

The format for the date is a string using the **`yyyy-MM-dd`** format.

```js
"startDate": "2016-07-12"
```
<br>

### Write format

To specify the date, you need to provide a string in the **`yyyy-MM-dd`** format.

```js
"startDate": "2016-07-12"
```
<br>

## **JavaScript API**

### Read format

When utilizing the **`val()`** method within the wrapper, it will yield a **`Date`** object.

```js
// this will print something like "date: Sat Jun 15 2013 00:00:00 GMT-0000 (UTC)"
log('date: '+record.field('startDate').val());
```
<br>

Since the Date object includes time, it will be set to 00:00 of the time zone of the server. This approach ensures that the date in the field remains unchanged, while the time is uniformly set to 00:00.

### Write format

When writing the value, you have the option to either use a Date object or provide a string in the yyyy-MM-dd format.

```js
record.field('startDate').val(new Date());
record.field('startDate').val('2016-07-09');
```
<br>

If the provided value is not valid, the field will be silently set to null.

### Wrapper method: <br> **addDays(numberOfDays)**

  This function adds days to the value stored in the field.

  ##### Parameters

  Name|Type|Required|Description
  ---|---|---|---
  numberOfDays|number|yes|The number of days to add. This value can be either positive or negative.

  ##### Returns

  **`sys.data.Wrapper`** - Returns itself.

  ##### Exceptions

  **`badRequest`**

  If **`numberOfDays`** is not a number.

  ##### Samples

  ```js
  // adds 2 days to the start date
  var company = sys.data.findOne('companies', {name:'Oodoo'});
  log('start date: '+company.field('startDate').format());
  company.field('startDate').addDays(2);
  log('start date: '+company.field('startDate').format());
  ```
  <br>

  ---

### Wrapper method: <br> **format(pattern)**

  This method formats the date into a string. If a format pattern is provided, it will be utilized. Otherwise, the format set in the default display options of the field will be used.

  ##### Parameters

  Name|Type|Required|Description
  ---|---|---|---
  pattern|string|no|The pattern to format the date. Please refer to the documentation for display options to understand the available format choices.<br>If no pattern is supplied, the default display options of the field will be utilized.

  ##### Returns

  **`string`** - The formatted date.

  ##### Exceptions

  **`badRequest`**

  If **`pattern`** is invalid
  
  ##### Samples

  ```js
  // formats date using 'MM-dd-yyyy' pattern
  var company = sys.data.findOne('companies', {name:'Oodoo'});
  log('start date: '+company.field('startDate').format('MM-dd-yyyy'));
  ```
  <br>

  ```js
  // formats date using default display options
  var company = sys.data.findOne('companies', {name:'Oodoo'});
  log('start date: '+company.field('startDate').format());
  ```
  <br>

  ---

## **Export/Import**

### Export format

The export format is **`yyyy-MM-dd`**, regardless of the display options configured for that field.

```js
"dateField1","dateField2"
"2017-02-10","2017-05-24"
```
<br>

### Import format

The import format is **`yyyy-MM-dd`**, regardless of the display options configured for that field.

```js
"dateField1","dateField2"
"2017-02-10","2017-05-24"
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

You should pass a string with the format yyyy-MM-dd. For example:

{{< query_sample
        id="sample"
        description="finds companies with start date 2016-07-12"
        entity="companies"
        jsQueryMap="{'startDate':'2016-07-12'}"
        jsQueryBuilder=".field('startDate').equals('2016-07-12')"
        restApi="startDate=2016-07-12"
>}}
<br>

When utilizing the query builder, you have can use a **`Date`** object.

```js
query.field('startDate').equals(new Date());
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
Special values|There are some special values you can use:<br> - **`now`**: This translates to the current date and time, effectively representing the current moment.<br> - **`today`**: This denotes a range that encompasses the entirety of the present day.<br> - **`yesterday`**: This signifies a range that covers the entirety of the preceding day.<br> - **`tomorrow`**: This indicates a range that includes the entirety of the following day.<br> - **`last hour/day/week/month/year`**:These ranges include all instances from the last hour, day, week, month, or year, respectively.<br> - **`this hour/day/week/month/year`**:These ranges include all instances from the current hour, day, week, month, or year, respectively.<br> - **`last X hours/days/weeks/months/years`**:These ranges encompass all instances from the last X number of hours, days, weeks, months, or years.<br> - **`next X hours/days/weeks/months/years`**: These ranges encompass all instances from the next X number of hours, days, weeks, months, or years.

### Available operators

Operator|Supported
---|---
Many values|yes
Greater|no
Greater or equals|no
Less|yes
Less or equals|yes
Between|yes