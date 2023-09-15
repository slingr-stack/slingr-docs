---
title: "Integer type"
lead: "Integer type documentation.
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

This type is designed to store integer numbers.

## **Available features**

Name|Supported
---|---
Many multiplicity|yes
Default values|yes
Unique flag|yes
Required flag|yes
Indexable flag|yes
Sensitive flag|yes
Calculated value|yes
Automatic initialization|no
Calculated initial value|no
Aggregation|yes
Default type rules|yes
Default display options|yes

## **Type rules**

### Minimum value

The minimum value (inclusive).

### Maximum value

The maximum value (inclusive).

## **Display options**

- **`Show Thousands Separator`**: If this flag is enabled, the thousands separator will be displayed in read-only mode. Please note that this flag does not impact edit mode.

## **REST API**

### Read format

The format is an integer number:

```js
"numberOfEmployees": 8
```
<br>

### Write format

To set the value, provide the integer number:

```js
"numberOfEmployees": 10
```
<br>

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return an instance of an integer number:

```js
// this will print something like "numberOfEmployees: 8"
log('numberOfEmployees: '+record.field('numberOfEmployees').val());
```
<br>

### Write format

To set the value, provide an integer number:

```js
record.field('numberOfEmployees').val(10);
```
<br>

If you provide something that isn’t a number, the field will be set to **`null`**.

### Wrapper method: <br> **toHex()**

  The **`toHex()`** method returns string of hexadecimal representation of the value or empty **`('')`** if null.

  ##### Returns

  **`string`** - Hex value of number.
  
  ##### Samples

  ```js
  // prints the hex value of a integer field
  var record = sys.data.findOne('projects', {name: 'Point-to-point link'});
  sys.logs.debug('project number of people hex: '+record.field('numberOfPeople').toHex());
  ```
  <br>

  ---

### Wrapper method: <br> **format(options)**

  Returns a string representing the formatted number value or an unformatted string.

  ##### Parameters

  Name|Type|Required|Description|
  ---|---|---|---|
  options|object|no|These parameters are used to format the value. If left empty, the default display options will be used for formatting.<br> - **`thousandsSeparator`**: If set to "**`true`**," a thousands separator will be displayed; if set to "**`false`**," it won't.

  ##### Returns

  **`string`** - String of formatted value of number.
  
  ##### Samples

  ```js
  // prints the formated value of a integer field
  var record = sys.data.findOne('projects', {name: 'Point-to-point link'});
  sys.logs.debug('project number of people: '+record.field('numberOfPeople').format({thousandsSeparator: true}));
  ```
  <br>

  ---

## **Export/Import**

### Export format

The export format is an integer number:

```js
"integerField1","integerField2"
"1383","-37"
```
<br>

### Import format

The import format is a string with an integer number:

```js
"integerField1","integerField2"
"1383","-37"
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

You should provide the number. For instance:

{{< query_sample
        id="sample"
        description="finds companies with more than 10 employees"
        entity="companies"
        jsQueryMap="{'numberOfEmployees': 'greater(10)'}"
        jsQueryBuilder=".field('numberOfEmployees').greater(10)"
        restApi="numberOfEmployees=greater(10)"
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