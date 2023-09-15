---
title: "Time duration type"
lead: "Time duration type documentation."
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

The duration type can store a time duration, such as "3 hours" or "2 days and 2 hours". The duration is stored internally in milliseconds, while users can utilize a user-friendly language representation in the format **`Xd`** **`Xh`** **`Xm`** **`Xs`**. Here, **`'d'`** represents days, **`'h'`** for hours, **`'m'`** for minutes, and **`'s'`** for seconds.

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

When dealing with durations, you can customize how they are displayed using the following options:

- **`Format up to`**: This determines the larger unit of time to display. For instance, if the chosen unit is hours, you might see a duration as "40h". However, if days are the chosen unit, the duration could be displayed as "1d 16h".

- **`Format down to`**: This specifies the smaller unit of time for display, truncating the rest. For example, if the value is "2h 30m 15s" and the smaller unit is minutes, the display will be "2h 30m".

- **`Default unit`**: When entering a value without a unit, this unit will be assumed. For instance, if "3" is entered without a unit and the default unit is hours, it will be interpreted as "3d".

## **REST API**

### Read format

The value of this type is represented as the number of milliseconds.

```js
"hoursPerWeek": 10800000
```
<br>

### Write format

When writing the value for this type, you should provide the number of milliseconds.

```js
"hoursPerWeek": 10800000
```
<br>

## **JavaScript API**

### Read format

The **`val()`** method in the wrapper will return the number of milliseconds.

```js
// this will print something like "hoursPerWeek: 10800000"
log('hoursPerWeek: '+record.field('hoursPerWeek').val());
```
<br>

### Write format

You should provide the number of milliseconds.

```js
record.field('hoursPerWeek').val(10800000);
```
<br>

## **Export/Import**

### Export format

The export format uses the form explained in the overview of the duration type:
- **`Xd Xh Xm Xs`**, where **`X`** represents the number of days, hours, minutes, and seconds respectively.

```js
"durationField1","durationField2"
"4h 30m","3d"
```
<br>

### Import format

The import format uses the form explained in the overview of the duration type:
- **`Xd Xh Xm Xs`**, where **`X`** represents the number of days, hours, minutes, and seconds respectively.

```js
"durationField1","durationField2"
"4h 30m","3d"
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

When working with queries, it's essential to provide the time in milliseconds.

{{< query_sample
        id="sample"
        description="finds contacts that worked more than 40 hours per week"
        entity="contacts"
        jsQueryMap="{'hoursPerWeek': 'greater(144000000)'}"
        jsQueryBuilder=".field('hoursPerWeek').greater(144000000)"
        restApi="hoursPerWeek=greater(144000000)"
>}}
<br>

## **Aggregate queries**

Please refer to the [Aggregate Queries Documentation]({{<ref "/dev-reference/queries/aggregate-queries.md">}}) for more detailed information.

### Available operators

Operator|Supported
---|---
sum|yes
avg|yes
first|yes
last|yes
min|yes
max|yes

## **UI queries**

Please refer to the [UI Queries Documentation]({{<ref "/dev-reference/queries/ui-queries.md">}}) for more detailed information.

### Matching of values

Property|Description
---|---
Matching operator|**`equals`**<br>The format is **`Xd Xh Xm Xs`**, where **`X`** represents the number of days, hours, minutes, and seconds respectively.

### Available operators

Operator|Supported
---|---
Many values|yes
Greater|no
Greater or equals|no
Less|yes
Less or equals|yes
Between|yes