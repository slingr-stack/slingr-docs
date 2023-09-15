---
title: "Text type"
lead: "Text type documentation."
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

This type can store free text of up to 300 characters. If you require more space, consider using the [Long Text]({{<ref "/dev-reference/field-types/text/long_text.md">}}) type.

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

Specifies the minimum number of characters allowed for field values.

#### Maximum length

Specifies the maximum number of characters allowed for field values.

#### Exact length

Requires that the value consists of a specific number of characters.

#### Regular expression

If set, you can use a regular expression to validate the value of the field. The expression should adhere to Java's regular expression syntax.

The following options are available:

- **`Expression`**: This field allows you to enter the regular expression for value validation.
- **`Hint`**: In the event of a validation error, you can provide a user-friendly message here to assist users.
- **`Case Insensitive`**: If enabled, matching will be case insensitive. It's important to note that this only applies to simple characters in the expression. For instance, **`[a-z]`** will still require the letter to be lowercase, even if this flag is set. However, if you use "ab" in the expression, variations like "Ab" or "AB" will work.

#### Display options

#### Representation

Determines how the field should be displayed, primarily impacting the edit view. The available options are:

- **`Input Box`**: Displays a single-line input box.
- **`Text Area`**: Displays a text area. An additional option lets you specify the number of rows for the text area.

#### Limit number of characters

This restricts the number of characters displayed, accompanied by a "More" button to expand the content. This option exclusively affects read-only fields.

#### Background color

Defines whether the text value should appear as a label in the read-only view. By default, this value is null, resulting in the value being displayed without a label. You have the ability to establish multiple conditional background color rules. For each rule, you must select a color and define an expression. All fields matching the expression will adopt the chosen color. Alternatively, you can use a script in place of an expression. The script can make use of the following parameters:
- **`record`**: Represents the current record that the field is a part of.
- **`parentField`**: Applicable when the field is an inner field of a nested field type. This parameter enables referencing sibling fields.
- **`action`**: Applicable when the field is a parameter of an action. 

It's important to note that this option comes into play only when the field is in read-only mode.

#### Password type

This denotes an editing control intended for entering passwords.

## **REST API**

### Read format

The format is a simple string:

```js
"notes": "test1"
```
<br>

### Write format

You should provide a string:

```js
"notes": "new name"
```
<br>

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return a plain string:

```js
// this will print something like "notes: test notes"
log('name: '+record.field('name').val());
```
<br>

### Write format

To set the value, you should provide a plain string:

```js
record.field('name').val('new name');
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