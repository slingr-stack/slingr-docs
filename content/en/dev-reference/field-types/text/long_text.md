---
title: "Long Text type"
description: "Long Text type documentation."
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

This field type is designed to store free text. Fields of this type are particularly useful for storing long-form text strings.

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

- **`Minimum Length`**: Specifies the minimum number of characters that values can have.

- **`Maximum Length`**: Specifies the maximum number of characters that values can have.

- **`Exact Length`**: Requires the value to have an exact number of characters as specified.

## **Display options**

#### Representation

Specifies how this field should be displayed. The available options are:

- **`Text Area`**: Displays a text area. You can specify the number of rows the text area should have.
- **`Code Editor`**: Displays a CodeMirror code editor for editing and displaying text with formatting in read-only mode.

#### Number of rows

Specifies the number of rows in the text area used for this field. The minimum is 1, and the maximum is 100.

#### Limit number of characters

Enabling this option will restrict the number of characters displayed, along with a "More" button to expand the content.

Please note that this option only takes effect when the field is in read-only mode.

#### Language

Allows you to select the programming language for styling when using the code editor representation. Available languages are:

- Java
- Javascript
- HTML
- CSS
- Shell
- Markdown
- SQL
- YAML

#### Size

Allows you to choose a size when opting for the code editor representation. Predefined options include: **`small`**, **`medium`**, **`large`**, **`extra large`** (x), **`auto`**, and **`custom`**.

If you choose "**`custom`**," you need to set the width and height in pixels.

## **REST API**

### Read format

The format is a simple string:

```js
"notes": "test notes"
```
<br>

### Write format

You should provide a string:

```js
"notes": "new notes"
```
<br>

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return a plain string:

```js
// this will print something like "notes: test notes"
log('notes: '+record.field('notes').val());
```
<br>

### Write format

To set the value, you should provide a plain string:

```js
record.field('notes').val('new notes');
```
<br>

## **Export/Import**

### Export format

The export format is a simple string:

```js
"longTextField1","longTextField2"
"line1\nline2","this is a long text"
```
<br>

### Import format

The import format is a simple string:

```js
"longTextField1","longTextField2"
"line1\nline2","this is a long text"
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

You should provide the text as a plain string. For example:

{{< query_sample
        id="sample"
        description="finds companies with notes like 'ae'"
        entity="companies"
        jsQueryMap="{'notes': 'like(ae)'}"
        jsQueryBuilder=".field('notes').like('ae')"
        restApi="notes=like(ae)"
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