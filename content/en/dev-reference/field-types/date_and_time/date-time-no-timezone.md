---
title: "Date-Time no timezone type"
lead: "Date-Time no timezone type documentation."
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

This type is capable of storing both date and time, but it doesn't retain any timezone information. As a result, the date and time will appear identical regardless of the user's viewing timezone. For instance, consider an events entity where you desire all users to view event date and time using the event's local timezone; this type would ensure a consistent view for everyone.

The default format is **`yyyy-MM-dd HH:mm`**, yet you have the flexibility to customize it as needed.

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

This defines the format for displaying the date and time. The default format is yyyy-MM-dd HH:mm, but you have the flexibility to customize it to suit your needs.

There exist several predefined formats that are commonly used. Additionally, you have the option to choose "Custom" and define a format according to the following rules:

- Era designator: G (AD)
- Year: yy (16), yyyy (2016)
- Month: MMMM (July), MMM (Jul), MM (07)
- Week in year: w (27)
- Day in year: D (189)
- Day in month: d (9), dd (09)
- Day name in week: EEE (Tue), EEEE (Tuesday)
- Am/pm marker: a (PM)
- Hour in 24h: H (0), HH (00)
- Hour in am/pm: h (1), hh (01)
- Minute in hour: m (5), mm (05)
- Second in minute: s (9), ss(09)
- Millisecond: SSS (123)

Furthermore, you can also define a format for the date-time picker as needed.

## **REST API**

### Read format

The format is a string with the format yyyy-MM-dd HH:mm:

```js
"eventDateTime": "2016-11-05 19:00"
```
<br>

### Write format

You should pass a string in the format yyyy-MM-dd HH:mm:

```js
"eventDateTime": "2016-11-05 19:00"
```
<br>

## **JavaScript API**

### Read format

The **`val()`** method in the wrapper will return a **`Date`** object.

```js
// this will print something like "date: Mon Jan 16 2017 14:53:00 GMT-0000 (UTC)"
log('date: '+record.field('eventDateTime').val());
```
<br>

Keep in mind that the Date object does have a timezone. The date and time will be set according to what's stored in the field's default timezone.

### Write format

When writing the value, you can use either a **`Date`** object, a string with the format **`yyyy-MM-dd HH:mm`**, or milliseconds since the Epoch:

```js
record.field('eventDateTime').val(new Date());
record.field('eventDateTime').val('2016-07-09 11:00');
```
<br>

If the value is not valid, the field will be set to null silently.

Additionally, please keep in mind that when you use a **`Date`** object, the timezone information will be lost.

### Wrapper Method: <br> **format(pattern)**

  Formats the date-time to a string. If a format pattern is given, it will be used. Otherwise, the format set in the default display options of the field will be used.

  ##### Parameters

  Name|Type|Required|Description
  ---|---|---|---
  pattern|string|no|The pattern to format the date-time. Please check the documentation for display options to know which options are available for setting the format.<br>If no pattern is provided, the default display options of the field will be used.

  ##### Returns

  **`string`** - The formatted date.

  ##### Exceptions

  **`badRequest`**

  If **`pattern`** is invalid
  
  ##### Samples

  ```js
  // formats date using 'MM-dd-yyyy HH:mm' pattern
  var company = sys.data.findOne('companies', {name: 'Blogpad'});
  log('last update millis: '+company.field('lastUpdate').format('MM-dd-yyyy HH:mm'));

  ```
  <br>

  ```js
  // formats date-time using default display options
  var company = sys.data.findOne('companies', {name: 'Blogpad'});
  log('last update millis: '+company.field('lastUpdate').format());
  ```
  <br>

  ---

## **Export/Import**

### Export format

The export format is **`yyyy-MM-dd HH:mm`**, regardless of the display options configured for that field.

```js
"dateField1","dateField2"
"2017-05-14 13:20","2015-07-14 08:20"
```
<br>

### Import format

The import format is **`yyyy-MM-dd HH:mm`**, regardless of the display options configured for that field.

```js
"dateField1","dateField2"
"2017-05-14 13:20","2015-07-14 08:20"
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

You should pass a string with the format **`yyyy-MM-dd HH:mm`**. For example:

{{< query_sample
        id="sample"
        description="finds companies with start date 2016-07-12"
        entity="companies"
        jsQueryMap="{'eventDateTime': 'greater(2016-11-05 11:00)'}"
        jsQueryBuilder=".field('eventDateTime').greater('2016-11-05 11:00')"
        restApi="eventDateTime=greater(2016-11-05 11:00)"
>}}
<br>

When using the query builder, you can use a Date object or a string in the format **`'yyyy-MM-dd HH:mm'`**:

```js
query.field('eventDateTime').less(new Date());
query.field('eventDateTime').less('2016-03-20 03:16');
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