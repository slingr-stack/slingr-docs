---
title: "Email type"
lead: "Email type documentation.
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

This field type is designed to store email addresses, such as **`"user@test.com."`** The field will be displayed as a **`mailto`** link.

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
Default display options|no

## **REST API**

### Read format

The format is a straightforward string containing the email:

```js
"contactInformation": {
  "email": "user@test.com"
}
```
<br>

### Write format

You should provide a string containing the email:

  ```js
  "contactInformation": {
  "email": "user@test.com"
  }
  ```
  <br>


## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return a plain string with the email address:

```js
// this will print something like "email: user@test.com"
log('email: '+record.field('contactInformation.email').val());
```
<br>

### Write format

To set the value, you should provide a plain string containing the email:

```js
record.field('contactInformation.email').val('user@test.com');
```
<br>

## **Export/Import**

### Export format

The export format is a simple string with the email:

```js
"emailField1","emailField2"
"user1@test.com","user2@test.com"
```
<br>

### Import format

The import format is a simple string with the email:

```js
"emailField1","emailField2"
"user1@test.com","user2@test.com"
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

You should provide the email as a plain string. For example:

{{< query_sample
        id="sample"
        description="finds companies with contact email like 'test'"
        entity="companies"
        jsQueryMap="{'contactInformation.email': 'like(test)'}"
        jsQueryBuilder=".field('contactInformation.email').like('test')"
        restApi="contactInformation.email=like(test)"
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