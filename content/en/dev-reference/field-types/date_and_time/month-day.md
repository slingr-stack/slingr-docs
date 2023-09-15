---
title: "Month-day type"
lead: "Month-day type documentation."
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

This type can store a day of the year. It doesn’t store the year or time, just the month and day.

**Default format:**
The default format is **`MM-dd`** but you can change it to something else.

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

This defines the format for displaying the day. The default format is **`MM-dd`**, but you have the option to customize it to your preference.

There are several predefined formats available, which are commonly used. Additionally, you can choose the **`"Custom"`** option to define your own format based on the following guidelines:

- Era designator: G (AD)
- Year: yy (16), yyyy (2016)
- Month: MMMM (July), MMM (Jul), MM (07)
- Day in month: d (9), dd (09)

## **REST API**

### Read format

The format for the date is a string using the **`MM-dd`** format.

```js
"birthday": "04-16"
```
<br>

### Write format

To specify the date, you need to provide a string in the **`MM-dd`** format.

```js
"birthday": "04-16"
```
<br>

## **JavaScript API**

### Read format

When utilizing the **`val()`** method within the wrapper, it will yield a **`Date`** object.

```js
// this will print something like "birthday: Wed Jan 11 2017 00:00:00 GMT-0000 (UTC)"
log('birthday: '+record.field('birthday').val());
```
<br>

Since the **`Date`** object includes the year and time components, it will be set to the current year and 00:00 using the time zone of the server.

### Write format

When writing the value, you have the option to either use a Date object or provide a string in the **`MM-dd`** format.

```js
record.field('birthday').val(new Date());
record.field('birthday').val('04-26');
```
<br>

If the provided value is not valid, the field will be silently set to **`null`**.

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
  var contact = sys.data.findOne('contacts', {email:'apetersonay@guardian.co.uk'});
  log('birthday: '+contact.field('birthday').format());
  contact.field('birthday').addDays(2);
  log('birthday: '+contact.field('birthday').format());
  ```
  <br>

  ---

### Wrapper method: <br> **format(pattern)**

  The **`format(pattern)`** method is used to format the day to a string. If a format pattern is provided, it will be used for formatting. If no pattern is provided, the format set in the default display options of the field will be used.

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
  // formats day using 'dd-MM' pattern
  var contact = sys.data.findOne('contacts', {email:'apetersonay@guardian.co.uk'});
  log('birthday: '+contact.field('birthday').format('dd-MM'));
  ```
  <br>

  ```js
  // formats day using default display options
  var contact = sys.data.findOne('contacts', {email:'apetersonay@guardian.co.uk'});
  log('birthday: '+contact.field('birthday').format());
  ```
  <br>

  ---

## **Export/Import**

### Export format

The export format is **`MM-dd`**, regardless of the display options configured for that field.

```js
"monthDayField1","monthDayField2"
"02-10","05-24"
```
<br>

### Import format

The import format is **`MM-dd`**, regardless of the display options configured for that field.

```js
"monthDayField1","monthDayField2"
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

You should pass a string with the format **`MM-dd`**. For example:

{{< query_sample
        id="sample"
        description="finds companies with start date 07-12"
        entity="companies"
        jsQueryMap="{'birthday':'07-12'}"
        jsQueryBuilder=".field('birthday').equals('07-12')"
        restApi="birthday=07-12"
>}}
<br>

When utilizing the query builder, you have can use a **`Date`** object.

```js
query.field('birthday').equals(new Date());
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