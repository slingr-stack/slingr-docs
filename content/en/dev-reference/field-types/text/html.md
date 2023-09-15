---
title: "HTML type"
lead: "HTML type documentation.
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

This field type is designed to store HTML code. It will display a user-friendly text editor in edit mode and render as HTML in **`read-only`** mode.

However, it's essential to note that, for security reasons, HTML code will undergo stripping. Only the following tags are allowed:

``` html
<a href="ftp|http|https|mailto" title="">
<b>
<blockquote cite="http|https">
<br>
<caption>
<cite>
<code>
<col span="" width="">
<colgroup span="" width="">
<dd>
<div>
<dl>
<dt>
<em>
<h1>
<h2>
<h3>
<h4>
<h5>
<h6>
<i>
<img align="" alt="" height="" src="http|https" title="" width="">
<li>
<ol start="" type="">
<p>
<pre>
<q cite="http|https">
<small>
<strike>
<strong
<sub>
<sup>
<table summary="" width="">
<tbody>
<td abbr="" axis="" colspan="" rowspan="" width="">
<tfoot>
<th abbr="" axis="" colspan="" rowspan="" scope="" width="">
<thead>
<tr>
<u>
<ul type="">
<span>
<div>
<hr>
```
<br>

Apart from those specific attributes, the **`"class"`** attribute is allowed for all tags.

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
Default type rules|no
Default display options|yes

## **Display options**

#### Limit number of characters

Enabling this option will restrict the number of characters displayed, accompanied by a **`"More"`** button to expand the content.

Please note that this option only takes effect when the field is in **`read-only`** mode.

## **REST API**

### Read format

The format is the plain HTML code:

```js
"notes": "<p>test <span style=\"background-color: yellow; font-weight: bold;\">html</span> text</p>"
```
<br>

### Write format

You should provide a HTML code:

  ```js
  "notes": "<p>test <span style=\"background-color: yellow; font-weight: bold;\">html</span> text</p>"
  ```
  <br>

Keep in mind that HTML code sent will be stripped out as explained above in the overview.

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return a plain HTML code:

```js
// this will print something like "<p>test</p>"
log('notes: '+record.field('notes').val());
```
<br>

### Write format

To set the value, you should provide a plain string:

```js
record.field('notes').val('<p>test <span style="background-color: yellow; font-weight: bold;">html</span> text</p>');
```
<br>

## **Export/Import**

### Export format

The export format is a simple string with the HTML code:

```js
"htmlField"
"<strong>title</strong><p>blah blah</p>"
```
<br>

### Import format

The import format is a simple string with the HTML code:

```js
"htmlField"
"<strong>title</strong><p>blah blah</p>"
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

You should provide the email as a plain HTML. For example:

{{< query_sample
        id="sample"
        description="Finds companies where notes have the word 'test'"
        entity="companies"
        jsQueryMap="{'notes': 'like(test)'}"
        jsQueryBuilder=".field('notes').like('test')"
        restApi="notes=like(test)"
>}}
<br>

Please be aware that searches will be conducted against the plain text version of the field. For instance, if you have a tag with a class name "test," the query mentioned above will not match it because it is not part of the visible text content of the HTML.

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