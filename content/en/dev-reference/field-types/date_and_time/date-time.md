---
title: "Date-Time type"
description: "Date-Time type documentation.
"
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

This type can store both date and time information.

The default format is **`yyyy-MM-dd HH:mm`**, but you can customize it to another format.

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

This determines the format for displaying the date and time. The default format is **`yyyy-MM-dd HH:mm`**, but you can modify it according to your preferences.

You have the option to choose from several predefined formats that are commonly used. However, you can also opt for a **`Custom`** format and create your own pattern based on the following guidelines:

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
- Time zone: z (-0700), zzzz (-07:00)

You also have the flexibility to define a format for the date-time picker to suit your needs.

## **REST API**

### Read format

The value of this type is represented as the number of milliseconds since the Epoch.

```js
"lastUpdate": 1484578380000
```
<br>

### Write format

When writing the value for this type, you should provide the number of milliseconds since the Epoch.

```js
"lastUpdate": 1484578380000
```
<br>

## **JavaScript API**

### Read format

When utilizing the **`val()`** method within the wrapper, it will yield a **`Date`** object.

```js
// this will print something like "date: Mon Jan 16 2017 14:53:00 GMT-0000 (UTC)"
log('date: '+record.field('lastUpdate').val());
```
<br>

### Write format

When writing the value for this type, you have multiple options:

- You can use a **Date object**.
- You can use a **string** with the format **`yyyy-MM-dd HH:mm`**.
- You can provide the **number of milliseconds** since the Epoch.

```js
record.field('startDate').val(new Date());
record.field('startDate').val('2016-07-09');
```
<br>

If the value provided is not valid, the field will be **set to null** silently.

### Wrapper method: <br> **toMillis()**

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

The export format for this field is **`yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`**. The value is **converted to UTC time** for export, regardless of the display options set for that field.

```js
"dateTimeField1","dateTimeField2"
"2017-05-14T13:20:01.014Z","2015-07-14T08:20:00.000Z"
```
<br>

The timezone for this field will **always be UTC**. Regardless of the display options or input values, the field will store and handle the date and time in Coordinated Universal Time (UTC).

### Import format

When importing data into this field, the expected format is **`yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`**. This format represents the date and time in Coordinated Universal Time (UTC), regardless of the display options set for the field. The imported value will be converted to UTC time.

```js
 "dateTimeField1","dateTimeField2"
 "2017-05-14T13:20:01.014Z","2015-07-14T08:20:00.000Z"
```
<br>

The timezone for this field will **always be UTC**. Regardless of the display options or input values, the field will store and handle the date and time in Coordinated Universal Time (UTC).

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
