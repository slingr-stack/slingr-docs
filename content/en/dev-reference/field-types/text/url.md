---
title: "URL type"
lead: "URL type documentation."
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

This field type is designed for storing URLs, such as **`http://www.test.com/path`**. The field will be displayed as a clickable link.

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

#### Open in current tab

Enabling this flag causes the link to open in the same tab. If the flag is not set, the link will open in a new tab.

## **REST API**

### Read format

The format consists of a simple string representing the URL:

```js
"homepage": "http://www.test.com"
```
<br>

### Write format

To set the value, you should provide a string with the URL:

```js
"homepage": "http://www.test.com"
```
<br>

The value of a URL can be a straightforward URL, but it's also possible to utilize Markdown to enhance its readability.

```js
"homepage": "(http://www.test.com)<Test>"
```
<br>

## **JavaScript API**

### Read format

The **`val()`** method in the wrapper will return a plain string representing the URL:

```js
// this will print something like "url: http://www.test.com"
log('url: '+record.field('homepage').val());
```
<br>

Alternatively, it will return the Markdown value:

```js
// this will print something like "url+label: (http://www.test.com)<Test>"
log('url+label: '+record.field('homepage').val());
```
<br>

If you wish to retrieve only the URL:

```js
// this will print something like "url: http://www.test.com"
log('url: '+record.field('homepage').url());
```
<br>

If you're interested in retrieving only the label:

```js
// this will print something like "label: Test"
log('label: '+record.field('homepage').text());
```
<br>

### Write format

To set the value, you should provide a plain string containing the URL:

```js
record.field('homepage').val('http://www.test1.com');
```
<br>

You can also use Markdown to define both the URL and the label:

```js
record.field('homepage').val('(http://www.test1.com)<Test>');
```
<br>

## **Export/Import**

### Export format

The export format is a simple string:

```js
"urlField1","urlField2"
"http://www.google.com","www.google.com"
```
<br>

### Import format

The import format is a simple string:

```js
"urlField1","urlField2"
"http://www.google.com","www.google.com"
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

For equality queries, you can provide the value with or without the mask format. For example:

{{< query_sample
        id="sample"
        description="finds companies with homepage like 'test'"
        entity="companies"
        jsQueryMap="{'homepage': 'like(test)'}"
        jsQueryBuilder=".field('homepage').like('test')"
        restApi="homepage=like(test)"
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