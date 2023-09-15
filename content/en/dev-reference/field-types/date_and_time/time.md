---
title: "Time type"
lead: "Time type documentation.
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

This field type is designed to store a specific time of the day.

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
Default display options|no

## **REST API**

### Read format

The format is a string with the format **`HH:mm`**:

```js
"openingHours": "08:00"
```
<br>

### Write format

You should provide a string with the format **`HH:mm`**:

```js
"openingHours": "08:00"
```
<br>

## **JavaScript API**

### Read format

The **`val()`** method in the wrapper will return a string in the format **`HH:mm`**.

```js
// this will print something like "time: 08:00"
log('time: '+record.field('openingHours').val());
```
<br>

### Write format

You should provide a string with the format **`HH:mm`**:

```js
record.field('openingHours').val('HH:mm');
```
<br>

## **Export/Import**

### Export format

The export format is **`HH:mm`**:

```js
"timeField1","timeField2"
"20:30","10:15"
```
<br>

### Import format

The import format is **`HH:mm`**:

```js
"timeField1","timeField2"
"20:30","10:15"
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

You should provide a string with the format HH:mm. For example:

{{< query_sample
        id="sample"
        description="finds companies opening after 10:00"
        entity="companies"
        jsQueryMap="{'openingHours': 'greater(10:00)'}"
        jsQueryBuilder=".field('openingHours').greater('10:00')"
        restApi="openingHours=greater(10:00)"
>}}
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