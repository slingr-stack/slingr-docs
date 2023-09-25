---
title: "Auto-increment type"
description: "Auto-increment type documentation.
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
This type generates auto-incremental unique numbers as new records are created within the entity.

Fields of this type cannot be edited and are consistently managed by the app. As of now, there is no method to reset the counter or set it to a starting position other than zero.

When a field of this type is added to an entity with existing records, it will be initialized by assigning values based on the creation order of the records.

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
Automatic initialization|yes
Calculated initial value|yes
Aggregation|no
Default type rules|yes
Default display options|no


## **Type rules**

### Minimum value

This defines the minimum value to be assigned to the next record. For instance, if you set it to 10,000, the subsequent value will be 10,000. This setting proves useful when you want numbers to initiate from a specific value.

It's important to note that this setting doesn't affect pre-existing records. Moreover, if you modify the value to a number lower than the current auto-increment value, it will not have any impact. For example, if the last created record was assigned the number 3,000 and you alter the minimum value to 1,000, this change will not influence the next value, which will still be 3,001.

## **REST API**

### Read format

The format is a number:

```js
"number": 8
```
<br>

### Write format

There is no method for writing to an auto-increment field.

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return a number.

```js
// this will print something like "number: 23"
log('number: '+record.field('number').val());
```
<br>

### Write format

There is no method for writing to an auto-increment field.

### Wrapper method: <br> **toHex()**

  The **`toHex()`** method returns string of hexadecimal representation of the value or empty **`('')`** if null.

  ##### Returns

  **`string`** - Hex value of number.
  
  ##### Samples

  ```js
  // prints the hex value of a integer field
  var record = sys.data.findOne('projects', {name: 'Point-to-point link'});
  sys.logs.debug('project number of people hex:'+record.field('numberOfPeople').toHex());
  ```
  <br>

  ---

### Wrapper method: <br> **format(options)**

  Returns a string representing the formatted number value or an unformatted string.

  ##### Parameters

  Name|Type|Required|Description|
  ---|---|---|---|
  options|object|no|These parameters are used to format the value. If left empty, the default display options will be used for formatting.<br> - **`thousandsSeparator`**: Indicates whether to show a thousands separator. Options are "**`true`**" or "**`false`**."

  ##### Returns

  **`string`** - String of formatted value of number.
  
  ##### Samples

  ```js
  // prints the formated value of a integer field
  var record = sys.data.findOne('projects', {name: 'Point-to-point link'});
  sys.logs.debug('project number of people:'+record.field('numberOfPeople').format({thousandsSeparator: true}));

  ```
  <br>

  ---

## **Export/Import**

### Export format

The export format is a simple number.

```js
"id","tittle"
"1","task A"
"2","task B"
```
<br>

### Import format

Auto-increment fields cannot be imported because they are generated.

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

You should provide the number. For instance:

{{< query_sample
        id="sample"
        description="finds tickets with field number higjer than 10"
        entity="tickets"
        jsQueryMap="{'number': 'greater(10)'}"
        jsQueryBuilder=".field('tickets').greater(10)"
        restApi="tickets=greater(10)"
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
Matching operator|**`equals`**

### Available operators

Operator|Supported
---|---
Many values|yes
Greater|no
Greater or equals|no
Less|yes
Less or equals|yes
Between|yes