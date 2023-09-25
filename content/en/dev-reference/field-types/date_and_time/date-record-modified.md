---
title: "Date record modified type"
description: "Date record modified type documentation."
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

This field type stores the timestamp indicating the most recent modification of the record. Upon creating the record, this value is initialized.

Manual modification of this field type's value is not permissible. Instead, it is automatically updated whenever the record undergoes modification.

The default timestamp format is **`yyyy-MM-dd HH:mm`**, although it is adjustable to an alternative format.

## **Available features**

Name|Supported
---|---
Many multiplicity|no
Default values|no
Unique flag|no
Required flag|no
Indexable flag|yes
Sensitive flag|yes
Calculated value|no
Automatic initialization|no
Calculated initial value|yes
Aggregation|no
Default type rules|no
Default display options|yes

## **Display options**

### Representation

This setting determines the format for displaying both the date and time. The default format is **`yyyy-MM-dd HH:mm`**, but it can be customized to an alternative format.

While several common predefined formats are available, you also have the option to choose 'Custom' and define your own format following these rules:

- Era Designator: G (AD)
- Year: yy (16), yyyy (2016)
- Month: MMMM (July), MMM (Jul), MM (07)
- Week in Year: w (27)
- Day in Year: D (189)
- Day in Month: d (9), dd (09)
- Day Name in Week: EEE (Tue), EEEE (Tuesday)
- AM/PM Marker: a (PM)
- Hour in 24-hour: H (0), HH (00)
- Hour in AM/PM: h (1), hh (01)
- Minute in Hour: m (5), mm (05)
- Second in Minute: s (9), ss(09)
- Millisecond: SSS (123)
- Time Zone: z (-0700), zzzz (-07:00)

It's also possible to define a format for the date-time picker.

## **REST API**

### Read format

The format represents the number of milliseconds since the Unix Epoch:

```js
"lastUpdate": 1484578380000
```
<br>

### Write format

Fields of this type cannot be manually edited or written to.

## **JavaScript API**

### Read format

When utilizing the **`val()`** method within the wrapper, it will yield a **`Date`** object.

```js
// this will print something like "date: Mon Jan 16 2017 14:53:00 GMT-0000 (UTC)"
log('date: '+record.field('lastUpdate').val());
```
<br>

### Write format

Fields of this type cannot be manually edited or written to.

### Wrapper Method: <br> **toMillis()**

  This method returns the date-time in milliseconds since the Unix Epoch.

  ##### Returns

  **`number`** - The time in milliseconds since the Unix Epoch

  ##### Samples

  ```js
  // prints the time in milliseconds since the Unix Epoch

  var company = sys.data.findOne('companies', {name: 'Blogpad'});
  log('last update millis: '+company.field('lastUpdate').toMillis());
  ```
  <br>

  ---

### Wrapper method: <br> **format(pattern, timeZoneId)**

  This function is used to format the date-time into a string. If a format pattern and a time zone ID are provided, they will be applied. Alternatively, if no pattern or time zone ID is given, the default display options of the field will be utilized.

  ##### Parameters

  Name|Type|Required|Description
  ---|---|---|---
  pattern|string|no|The pattern to format the date-time. Please check the docs for display options to know which are the options to set the format.<br>If no pattern is provided, the default display options of the field will be used.
  timeZoneId|string|no|The ID for a time zone. Valid time zone codes are:<br> - US/Hawaii <br> - US/Alaska <br> - US/Pacific <br> - US/Mountain <br> - US/Central <br> - US/Eastern <br> - Canada/Atlantic <br> - America/Buenos_Aires <br> - [See more available Timezones here](https://joda-time.sourceforge.net/timezones.html)

  ##### Returns

  **`string`** - The formatted date.

  ##### Exceptions

  **`badRequest`**

  If **`pattern`** or **`timeZoneId`** is invalid
  
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

The export format is **`yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`**, with the value being converted to UTC time. This format remains consistent regardless of the display options set for that field.

```js
"recordModifiedField"
"2017-05-14T13:20:05.145Z"
```
<br>

The timezone for the export format will always be UTC.

### Import format

Importing record created fields is not supported.

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

When working with queries, it's essential to provide the time in milliseconds since the Unix Epoch.

{{< query_sample
        id="sample"
        description="finds companies where last meeting is after '1458443760000' which is Sun Mar 20 2016 03:16:00 GMT-0000 (UTC)"
        entity="companies"
        jsQueryMap="{'lastMeeting':'greater(1458443760000)'}"
        jsQueryBuilder=".field('lastMeeting').greater(1458443760000)"
        restApi="lastMeeting=greater(1458443760000)"
>}}
<br>

When utilizing the query builder, you have the option to use either a Date object or a string in the format **`‘yyyy-MM-dd HH:mm’`**.

```js
query.field('lastMeeting').less(new Date());
query.field('lastMeeting').less('2016-03-20 03:16');
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