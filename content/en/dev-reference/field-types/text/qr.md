---
title: "QR type"
lead: "QR type documentation."
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

This type stores text and displays it as a QR code in read-only view.

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
Default display options|yes

## **Type rules**

#### Minimum length

The minimum number of characters that values can have.

#### Maximum length

The maximum number of characters that values can have.

#### Exact length

The value must have exactly this number of characters.

#### Regular expression

If set, you can provide a regular expression to validate the value of the field. The expression should follow [Java regular expression syntax](https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html).

You will see the following options:

  - **`Expression`**: This is the regular expression used to validate values.
  - **`Hint`**: In case of a validation error, you can provide a message to be displayed to the user to assist them.
  - **`Case Insensitive`**: If enabled, matching will be case insensitive. Note that this applies only to simple characters in the expression. For example, **`[a-z]`** will require the letter to be in lowercase, even with this flag enabled. However, expressions like "ab" will work with variations in case when this flag is set.

## **Display options**

#### Representation

Determines how the field should be displayed in the edit view. This only affects the edit view. Options include:

  - **`Input Box`**: Displays a single-line input box.
  - **`Text Area`**: Displays a text area. You can specify the number of rows for the text area.

#### Limit number of characters

Limits the number of characters displayed, with a **`"More"`** button to expand the content. This option is effective only in **`read-only`** mode.

#### Error correction level

QR codes have four error correction levels that add varying amounts of **`"backup"`** data, based on expected damage:

  - **`Level L`** – Up to 7% damage
  - **`Level M`** – Up to 15% damage
  - **`Level Q`** – Up to 25% damage
  - **`Level H`** – Up to 30% damage

#### Color

Hex color code for the QR code. Default is **`#000000`**.

#### Background color

Hex background color code for the QR code. Default is **`#ffffff`**.

#### Width

Width of the generated image in pixels. Default is **`128`**.

#### Height

Height of the generated image in pixels. Default is **`250`**

## **REST API**

### Read format

The format is a simple string:

```js
"name": "test1"
```
<br>

### Write format

To set the value, you should provide a string:

```js
"name": "new name"
```
<br>

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return a plain string:

```js
// this will print something like "name: test1"
log('name: '+record.field('name').val());
```
<br>

### Write format

You should provide a string to set the new value:

```js
record.field('name').val('new name');
```
<br>

## **Export/Import**

### Export format

The export format is a simple string:

```js
"textField1","textField2"
"value1","this is a long text"
```
<br>

### Import format

The import format is a simple string:

```js
"textField1","textField2"
"value1","this is a long text"
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
like|yes
greater|yes
greaterOrEquals|yes
less|yes
lessOrEquals|yes
between|yes
currentUserField|no

### Query formats

To perform queries, you should provide the text as a plain string. For example:

{{< query_sample
        id="sample"
        description="finds companies with name like 'ae'"
        entity="companies"
        jsQueryMap="{'name': 'like(ae)'}"
        jsQueryBuilder=".field('name').like('ae')"
        restApi="name=like(ae)"
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
Matching operator|**`like`**

### Available operators

Operator|Supported
---|---
Many values|yes
Greater|no
Greater or equals|no
Less|yes
Less or equals|yes
Between|no