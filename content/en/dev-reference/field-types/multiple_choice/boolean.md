---
title: "Boolean type"
description: "Boolean type documentation.
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

This data type can store a boolean value. Fields of this type cannot be **`null`**; their value is strictly either **`false`** or **`true`**.

## **Available features**

Name|Supported
---|---
Many multiplicity|yes
Default values|yes
Unique flag|no
Required flag|no
Indexable flag|yes
Sensitive flag|yes
Calculated value|yes
Automatic initialization|yes
Calculated initial value|yes
Aggregation|no
Default type rules|no
Default display options|yes

## **Display Options**

### Representation

This determines how the field should appear. The available options are:

- **`Switcher`**: In edit mode, a switch will be shown, and in read-only mode, a box with the label will be displayed. When this option is selected, you can specify the labels to be either "Yes/No" or "On/Off".
- **`Check Box`**: In edit mode, a check box will be displayed, while in read-only mode, a check mark or a cross will appear based on the value.

## **REST API**

### Read format

The format is a boolean value:

```js
"isCustomer": false
```
<br>

### Write format

You should provide a boolean:

```js
"isCustomer": true
```
<br>

## **JavaScript API**

### Read format

When using the **`val()`** method in the wrapper will return a boolean value:

```js
// this will print something like "customer: true"
log('customer: '+record.field('isCustomer').val());
```
<br>

### Write format

You should provide a boolean to set the value:

```js
record.field('isCustomer').val(true);
```
<br>

If you pass null, it will be coerced to false.

## **Export/Import**

### Export format

The export format is a string where the value could be either **`"true"`** or **`"false"`**:

```js
"booleanField1","booleanField2"
"true","false"
```
<br>

### Import format

The import format supports various representations for **`true`** and **`false`**:

 - True values: **`"true," "1," "yes"`** (case-insensitive)
 - False values: **`"false," "0," "no" `(case-insensitive)

```js
"booleanField1","booleanField2"
"true","false"
"1","0"
"yes","no"
```
<br>

## **Queries**

For more information, please refer to the [Query Language Documentation]({{<ref "/dev-reference/queries/query-language.md">}}).

### Available operators

Operator|Supported
---|---
equals|yes
notEquals|yes
empty|no
notEmpty|no
like|no
greater|no
greaterOrEquals|no
less|no
lessOrEquals|no
between|no
currentUserField|no

### Query formats

You should provide the boolean value. For instance:

{{< query_sample
        id="sample"
        description="finds a task with rank 'iiiii00000'"
        entity="companies"
        jsQueryMap="{'isCustomer': true}"
        jsQueryBuilder=".field('isCustomer').equals(true)"
        restApi="name=true"
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
Matching operator|**`equals`**<br>Strings **`"true," "yes," and "1"`** are interpreted as the value true, while strings **`"false," "no," and "0"`** are understood as false.

### Available operators

Operator|Supported
---|---
Many values|yes
Greater|no
Greater or equals|no
Less|no
Less or equals|no
Between|no