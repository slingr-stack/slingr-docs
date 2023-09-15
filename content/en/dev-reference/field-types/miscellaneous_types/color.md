---
title: "Color type"
lead: "Color type documentation.
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

This field type is designed to store color information. Colors are stored in hexadecimal format, and in the user interface, they are typically displayed as actual colors.

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

The format is a simple string with the hexadecimal code of the color:

```js
"tagColor": "#f5a9a9"
```
<br>

### Write format

When writing a value to a color type field, you should pass a string containing the hexadecimal code of the color. For example:

```js
"tagColor": "#f5a9a9"
```
<br>

## **JavaScript API**

### Read format

When using the **`val()`** method in the wrapper for a color type field, it will return a string with the hexadecimal code of the color.

```js
// this will print something like "color: #f5a9a9"
log('color: '+record.field('tagColor').val());
```
<br>

### Write format

When writing a value to a color type field, you should pass a string with the hexadecimal code of the color.

```js
record.field('tagColor').val('#f5a9a9');
```
<br>

## **Export/Import**

### Export format

The export format is a simple string with the hex code:

```js
"tagColor"
"#f5a9a9"
```
<br>

### Import format

The import format is a simple string with the hex code:

```js
"tagColor"
"#f5a9a9"
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
greater|no
greaterOrEquals|no
less|no
lessOrEquals|no
between|no
currentUserField|no

### Query formats

When using the query builder to filter records based on a color type field, you should pass the hexadecimal code of the color as a string. For example:

{{< query_sample
        id="sample"
        description="finds skills with tag color '#f5a9a9'"
        entity="skills"
        jsQueryMap="{'tagColor': 'like(#f5a9a9)'}"
        jsQueryBuilder=".field('tagColor').like('#f5a9a9')"
        restApi="tagColor=like(#f5a9a9)"
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
Matching operator|**`equals`**

### Available operators

Operator|Supported
---|---
Many values|yes
Greater|no
Greater or equals|no
Less|no
Less or equals|no
Between|no