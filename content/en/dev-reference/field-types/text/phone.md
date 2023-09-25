---
title: "Phone type"
description: "Phone type documentation."
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

This type can store a phone number, such as "**`111-222-3333`**." It's also possible to store an international phone number if desired. In both cases, characters other than numbers are removed, and the phone number is automatically formatted for reading and display in the UI.

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

#### International

Indicates whether the field supports international phone numbers. When enabled, validation becomes more flexible, allowing the entry of international phone numbers.

#### Default international prefix

If the field is set as international and the '+' sign is not indicated at the beginning of the value, a default prefix will be automatically added.

## **REST API**

### Read format

The format is a simple string that is already formatted as a phone number:

```js
"contactInformation": {
  "phoneNumber": "1-702-845-9380"
}
```
<br>

### Write format

To set the value, you should provide a string with the appropriate value:

```js
"contactInformation": {
  "phoneNumber": "1-702-845-9380"
}
```
<br>

You can omit fixed format:

```js
"contactInformation": {
  "phoneNumber": "17028459380"
}
```
<br>

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return a the formatted phone number (with dashes):

```js
// this will print something like "phone number: 1-405-298-5885"
log('phone: '+record.field('contactInformation.phoneNumber').val());
```
<br>

### Write format

You can input the phone number in various formats. However, please note that only the numbers will be retained, and any other characters will be discarded. The phone number will then be automatically formatted for reading. Here are some sample formats:

```js
// all this lines are equivalent
record.field('contactInformation.phone').val('1-405-298-5885');
record.field('contactInformation.phone').val('+1-405-298-5885');
record.field('contactInformation.phone').val('14052985885');
```
<br>

### Wrapper method: <br> **format()**

  Returns the phone number formatted with dashes.

  ##### Returns

  **`string`** - The formatted phone number.
  
  ##### Samples

  ```js
  // logs the formatted phone number
  var record = sys.data.findOne('contacts', {number: 1});
  sys.logs.info(record.field('phoneNumber').format());
  ```
  <br>

  ---


## **Export/Import**

### Export format

The export format is a string representation of the phone number, including dashes:

```js
"phoneField1","phoneField2"
"111-222-3333","549-261-654-9862"
```
<br>

### Import format

The import format is a string representation of the phone number, where dashes are optional:

```js
"phoneField1","phoneField2"
"111-222-3333","549-261-654-9862"
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

To perform queries, you should provide the phone number as a plain string. Please note that non-numerical characters will be removed before executing the query. For example:

{{< query_sample
        id="sample"
        description="finds companies with contact phone number like '123'"
        entity="companies"
        jsQueryMap="{'contactInformation.phoneNumber': 'like(123)'}"
        jsQueryBuilder=".field('contactInformation.phoneNumber').like('123')"
        restApi="contactInformation.phoneNumber=like(123)"
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