---
title: "Rank type"
lead: "Rank type documentation."
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

The rank type is essentially a string with additional features designed for enabling users to rank records through drag and drop interactions in the user interface. This type is particularly useful when you want to allow users to rearrange records using fields of this type in grid views or workflow views.

Rank fields are auto-populated with a value. When users rank records, and if the view is configured to use the field as a rank, the value will be automatically updated so that the lexical order matches the user's desired arrangement in the UI. To facilitate this, the rank type provides three methods in the JavaScript API: **`rankBefore()`**, **`rankAfter()`**, and **`rankBetween()`**. These methods will automatically calculate the new rank value to ensure that the record maintains its intended position.

## **Available features**

Name|Supported
---|---
Many multiplicity|no
Default values|no
Unique flag|yes
Required flag|no
Indexable flag|yes
Sensitive flag|yes
Calculated value|no
Automatic initialization|yes
Calculated initial value|yes
Aggregation|no
Default type rules|yes
Default display options|no

## **REST API**

### Read format

The format is a simple string with the rank value:

```js
"rank": "iiiii00000"
```
<br>

### Write format

You should provide a string with the rank value:

```js
"rank": "iiiii00000"
```
<br>

## **JavaScript API**

### Read format

When using the **`val()`** method in the wrapper for a rank type field, it will return a string with the rank value.

```js
// this will print something like "rank: iiiii00000"
log('rank: '+record.field('rank').val());
```
<br>

### Write format

You should provide a string with the rank value:

```js
record.field('rank').val('iiiii00000');
```
<br>

### Wrapper method: <br> **rankBefore(rank)**

  The **`rankBefore()`** method is used to update the rank value of a record so that it is positioned before the specified value in the ranking order.

  ##### Parameters

  Name|Type|Required|Description
  ---|---|---|---
  rank|string|yes|This value will serve as the rank reference, and accordingly, the value needs to be updated to precede it.

  ##### Returns

  **`string`** -  The new rank value.

  ##### Exceptions

  **`badRequest`**

  If **`rank`** is invalid
  
  ##### Samples

  ```js
  // moves a record to be before another one (when sorting by rank)
  var task1 = sys.data.findOne('tasks', {number: 1});
  var task2 = sys.data.findOne('tasks', {number: 2});
  var newRank = task1.field('rank').rankBefore(task2.field('rank').val());
  sys.data.save(task1);
  log('new rank: '+newRank);
  ```
  <br>

  ---


### Wrapper method: <br> **rankAfter(rank)**

  The **`rankAfter()`** method updates the rank value so that it comes after the provided value.

  ##### Parameters

  Name|Type|Required|Description
  ---|---|---|---
  rank|string|yes|This value will serve as the reference rank, and the given value will be updated to follow it.

  ##### Returns

  **`string`** -  The new rank value.

  ##### Exceptions

  **`badRequest`**

  If **`rank`** is invalid
  
  ##### Samples

  ```js
  // moves a record to be after another one (when sorting by rank)
  var task1 = sys.data.findOne('tasks', {number: 1});
  var task2 = sys.data.findOne('tasks', {number: 2});
  var newRank = task1.field('rank').rankAfter(task2.field('rank').val());
  sys.data.save(task1);
  log('new rank: '+newRank);
  ```
  <br>

  ---




### Wrapper method: <br> **rankBetween(before, after)**

  Updates the rank value to position it between the two specified values.

  ##### Parameters

  Name|Type|Required|Description
  ---|---|---|---
  before|string|yes|This value will serve as the reference rank, and the current value will be adjusted to come after it.
  after|string|yes|This value will serve as the reference rank, and the value will be updated to be positioned before it.

  ##### Returns

  **`string`** -  The new rank value.

  ##### Exceptions

  **`badRequest`**

  If the **`before`** or **`after`** values are invalid
  
  ##### Samples

  ```js
  // puts a task in between other two tasks
  var task1 = sys.data.findOne('tasks', {number: 1});
  var task2 = sys.data.findOne('tasks', {number: 2});
  var task3 = sys.data.findOne('tasks', {number: 3});
  var newRank = task1.field('rank').rankBetween(task2.field('rank').val(), task3.field('rank').val());
  sys.data.save(task1);
  log('new rank: '+newRank);
  ```
  <br>

  ---

## **Export/Import**

### Export format

The export format is a simple string:

```js
"rankField1","rankField2"
"iiiii0001s","iiiii00za8"
```
<br>

### Import format

The import format is a simple string:

```js
"rankField1","rankField2"
"iiiii0001s","iiiii00za8"
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

You should provide the rank value. For instance:

{{< query_sample
        id="sample"
        description="finds a task with rank 'iiiii00000'"
        entity="tasks"
        jsQueryMap="{'rank': 'iiiii00000'}"
        jsQueryBuilder=".field('rank').equals('iiiii00000')"
        restApi="rank=iiiii00000"
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