---
title: "Group type"
description: "Group type documentation."
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

This field type enables the referencing of a group within the application.

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

### Filtering

This feature allows you to specify which groups can be assigned in this field. The available options include:

- **`None`**: All groups will be listed.
- **`By Groups`**: You can specify which groups will be available for selection in this field.

## **REST API**

### Read format

The read format is represented in JSON and comprises the following fields:

- **`id`**: This corresponds to the ID of the referenced group.
- **`label`**: This represents the label associated with the referenced group.

Sample group field in JSON format:

```js
"group": {
  "id": "57fe5269e4b0f6600fdfbdba",
  "label": "Read-only user"
}
```
<br>

### Write format

You have several options for the write format:

- You can provide only the ID and omit the **`label`** field.

  ```js
  "group": {"id": "57fe5269e4b0f6600fdfbdba"}
  ```
  <br>

- Alternatively, you can directly pass the ID as a string.

  ```js
  "group": "57fe5269e4b0f6600fdfbdba"
  ```
  <br>

- Lastly, you can supply the label of the group.

  ```js
  "group": "Read-only user"
  ```
  <br>

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return an object:

```js
{
  "id": "57fe5269e4b0f6600fdfbdba",
  "label": "Read-only user"
}
```
<br>

Where:

- **`id`**: This refers to the ID of the referenced group.
- **`label`**: This corresponds to the label of the referenced group.

However, in most cases, rather than obtaining the raw value of the relationship, you will likely utilize the methods provided within the wrapper to directly access the ID or the label.

### Write format

There are multiple ways to provide the value of a group in the JavaScript API.

- You can provide only the ID.

  ```js
  record.field("group").val({id: "57fe5269e4b0f6600fdfbdba"});
  ```
  <br>

- Alternatively, you can directly pass the ID as a string.

  ```js
  record.field("group").val("57fe5269e4b0f6600fdfbdba");
  ```
  <br>

- Another option is to pass the label of the group.

  ```js
  record.field("group").val("Read-only user");
  ```
  <br>


The JavaScript API also offers the ability to set a group wrapper as shown below:

```js
task1.field('group').val(task2.field('group'));
```
<br>

### Wrapper method: <br> **id()**

  Returns the ID of the referenced group or null if the field is empty.

  ##### Returns

  **`string`** - The ID of the referenced group.
  
  ##### Samples

  ```js
  // prints the ID of the referenced group in the field
  var record = sys.data.findOne('tasks', {number: 1});
  log('group id: '+record.field('group').id());
  ```
  <br>

  ---

### Wrapper method: <br> **label()**

  Returns the **`label`** of the referenced group or **`null`** if the field is empty.

  ##### Returns

  **`string`** - The label of the referenced group.
  
  ##### Samples

  ```js
  // prints the label of the referenced group in the field
  var record = sys.data.findOne('tasks', {number: 1});
  log('group label: '+record.field('group').label());
  ```
  <br>

  ---

### Wrapper method: <br> **name()**

  Returns the **`name`** of the referenced group or **`null`** if the field is empty.

  ##### Returns

  **`string`** - The name of the referenced group.
  
  ##### Samples

  ```js
  // prints the name of the referenced group in the field
  var record = sys.data.findOne('tasks', {number: 1});
  log('group name: '+record.field('group').name());
  ```
  <br>

  ---

## **Export/Import**

### Export format

The export format is the **`label`** of the group:

```js
"groupField1","groupField2"
"Group A","Group B"
```
<br>

### Import format

The import format can be either the **`name`** or the **`label`** of the group:

```js
"groupField1","groupField2"
"Group A","groupB"
```
<br>

If there is ambiguity, the name takes precedence over the label.

## **Queries**

For more information, please refer to the [Query Language Documentation]({{<ref "/dev-reference/queries/query-language.md">}}).

### Available operators

Operator|Supported|Notes
---|---|---
equals|yes|Matching will be done based on the group's ID, followed by the name, and then the label, in that order of precedence.
notEquals|yes|Matching will be performed using the group's ID, name, or label, in that order of precedence.
empty|yes|-
notEmpty|yes|-
like|yes|Matching will be carried out using the group's label.
greater|no|-
greaterOrEquals|no|-
less|no|-
lessOrEquals|no|-
between|no|-
currentUserField|no|-

### Query formats

By default, the label will be utilized for various query operators.

For instance, the following query will retrieve tasks where the assignee's label is set to **`'Read-only user'`**:

{{< query_sample
        id="sample"
        description="finds a task by group's label"
        entity="tasks"
        jsQueryMap="{group: 'Read-only user'}"
        jsQueryBuilder=".field('group').equals('Read-only user')"
        restApi="tasks?group=Read-only user"
>}}
<br>

You can also provide the ID:

{{< query_sample
        id="sample2"
        description="finds a task by group's ID"
        entity="tasks"
        jsQueryMap="{'group.id': '57fe5269e4b0f6600fdfbdba'}"
        jsQueryBuilder=".field('group').equals('57fe5269e4b0f6600fdfbdba')"
        restApi="group.id=57fe5269e4b0f6600fdfbdba"
>}}
<br>

Please note once more that the query builder will automatically recognize the ID, and you don’t need to append the "id" suffix.

Remember that when employing the query builder, you have the flexibility to utilize any of the formats accessible in the [JavaScript API]({{<ref "/dev-reference/field-types/references/group.md#write-format-1">}}).

## **Aggregate queries**

Please refer to the [Aggregate Queries Documentation]({{<ref "/dev-reference/queries/aggregate-queries.md">}}) for more detailed information.

### Available operators

Operator|Supported
---|---
sum|no
avg|no
first|yes
last|yes
min|no
max|no

## **UI queries**

Please refer to the [UI Queries Documentation]({{<ref "/dev-reference/queries/ui-queries.md">}}) for more detailed information.

### Matching of values

Property|Description
---|---
Matching operator|**`like`** <br> The label of the referenced group will be used for matching.

### Available operators

Operator|Supported
---|---
Many values|yes
Greater|no
Greater or equals|no
Less|no
Less or equals|no
Between|no