---
title: "Masked text type"
description: "Masked type documentation."
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

A mask can be specified to enforce a specific pattern for the text stored in this field.

It's important to note that only the text entered by the user will be stored. This means that if there are characters coming from the mask, they won't be saved in the database. For example, if the mask is "**`999-aaa`**" and the value entered is "**`123-ABC`**," the value stored in the database will be "**`123ABC`**."

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
Aggregation|no
Default type rules|yes
Default display options|no

## **Type rules**

#### Mask

 Specifies the mask used to validate values. Special characters in the mask include:

  - **`9`**: Must be a number.
  - **`a`**: Must be a letter.
  - **`w`**: Must be a number or a letter.

You can also include other characters in the mask that will remain fixed. For example, the mask "**`999-aaa`**" will accept values like "**`123-ABC`**" or "**`123ABC`**." In this case, you can omit the dash because it's part of the mask.

In the UI, special characters like **`9`**, **`a`**, and **`w`** will be displayed as empty spaces where you can enter values. Other characters will be displayed as they are and will be read-only.

## **REST API**

### Read format

The format is a simple string that is already formatted according to the mask:

```js
"taxId": "862-SKB"
```
<br>

### Write format

To set the value, you should provide a string with the appropriate value:

```js
"taxId": "123-ABC"
```
<br>

You can omit fixed characters in the mask:

```js
"taxId": "123ABC"
```
<br>

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return an already formatted string:

```js
// this will print something like "taxId: 123-ABC"
log('taxId: '+record.field('taxId').val());
```
<br>

### Write format

You can pass the value with or without the mask format:

```js
// all these lines are equivalent
record.field('taxId').val('123-ABC');
record.field('taxId').val('123ABC');
```
<br>

## **Export/Import**

### Export format

The export format is a simple string:

```js
"maskedTextField1","maskedTextField2"
"abc-123","udl-860"
```
<br>

### Import format

The import format is a simple string:

```js
"maskedTextField1","maskedTextField2"
"abc-123","udl-860"
```
<br>

## **Queries**

For more information, please refer to the [Query Language Documentation]({{<ref "/dev-reference/queries/query-language.md">}}).

### Available operators

Operator|Supported|Notes
---|---|---
equals|yes
notEquals|yes
empty|yes
notEmpty|yes
like|yes|It's important to note that in this case, the matching will be done with the value stored in the database. This means that fixed characters in the mask won't be considered for the matching process. For instance, if the mask is "999-aaa" and the value is "123-ABC," querying with **`like(3-A)`** won't result in a match. However, querying with **`like(3A)`** will match.
greater|yes
greaterOrEquals|yes
less|yes
lessOrEquals|yes
between|yes
currentUserField|no

### Query formats

For equality queries, you can provide the value with or without the mask format. For example:

{{< query_sample
        id="sample"
        description="finds companies with tax ID '123-ABC'"
        entity="companies"
        jsQueryMap="{'taxId': '123-ABC'}"
        jsQueryBuilder=".field('taxId').equals('123-ABC')"
        restApi="taxId=123-ABC"
>}}
<br>

You could skip the fixed characters in the mask as well:

{{< query_sample
        id="sample2"
        description="finds companies with tax ID '123ABC'"
        entity="companies"
        jsQueryMap="{'taxId': '123ABC'}"
        jsQueryBuilder=".field('taxId').equals('123ABC')"
        restApi="taxId=123ABC"
>}}
<br>

Keep in mind that you cannot use the formatted form when using the **`like`** operator, as the matching will be done with the value stored in the database.

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
Matching operator|**`like`**<br> Keep in mind that you cannot use the formatted value. See the notes in the like query operator.

### Available operators

Operator|Supported
---|---
Many values|yes
Greater|no
Greater or equals|no
Less|yes
Less or equals|yes
Between|no