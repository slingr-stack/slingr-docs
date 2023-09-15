---
title: "Choice type"
lead: "Choice type documentation."
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

This feature enables you to define a predefined set of values that the field can contain. Within the user interface (UI), the user can select a value from the provided options using a dropdown, list, or switcher, depending on the chosen representation.

Each of the potential values comprises a label and a name, with only the name being stored in the database.

## **Available features**

Name|Supported
---|---
Many multiplicity|yes
Default values|yes
Unique flag|no
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

### Values

These represent the potential values that can be assigned to the field. For each of these possible values, the following properties are available:

- **`Label`**: This is the string displayed to the user.
- **`Code`**: This is the value stored in the database and utilized by the REST and JavaScript APIs.
- **`Color`**: This denotes the color assigned to the choice. The color chosen is sensitive to the current theme.
- **`Condition`**: This allows you to define a conditional expression to determine the availability of this option. The available options include:
  - **`None`**: The option will always be available.
  - **`Expression`**: The option will be accessible only if the expression evaluates to true. For more information, consult the Expressions documentation.
  - **`Script`**: The option will be accessible only when the script evaluates to true. The script's context is as follows:
  ---

    ##### Parameters

    |Name|Type|Description|
    |---|---|---|
    |record|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This refers to the record associated with the operation. If the field is within an entity field, this record will be the one containing the field.<br> In the case of the field being an action parameter, this record will correspond to the record where the action is being executed.|
    |parentField|[sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}})|This variable is only accessible when the field is situated within a nested field, and it is contingent on the source variable being either a record or an action (the same principles apply when it is an action parameter or an entity field).<br> It is a **`sys.data.Record`** object with the distinction that the root of the record is established as the nested fields containing it. This configuration enables you to access fields within the nested group using the syntax **`parentField.field('fieldA')`** instead of **`record.field('nested.fieldA')`** or **`action.field('nested.fieldA')`**. This distinction is particularly valuable when nested fields are multi-valued, as you are not required to ascertain the index.|
    |action|[sys.data.Action]({{<ref "/dev-reference/scripting/sys-data.md">}})|This variable will be accessible solely when the field functions as an action parameter. It grants access to other parameters.|


    ##### Returns

    **`boolean`** - You should return **`true`** if the option is available, and **`false`** otherwise.

    ##### Samples

    ```js
    // option will be available only if 'name' starts with 'test'
    return !record.field('name').isEmpty() &&record.field('name').val().indexOf('test') == 0;
    ```
    <br>
    
    ---

## **Display options**

### Representation

This determines how the field should be presented. The available options are:

- **`Dropdown`**: A dropdown containing the possible values will be displayed.
- **`List`**: A list showing all values will be displayed.
- **`Switcher`**: A switcher displaying all values will be shown. However, if there are numerous possible values, this might not be the optimal representation.

## **REST API**

### Read format

The format is a string containing the name of the value:

```js
"state": "active"
```
<br>

### Write format

To set the value, provide a string containing the name of the value:

```js
"state": "inactive"
```
<br>

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return a string containing the name of the value:

```js
// this will print something like "state: active"
log('state: '+record.field('state').val());
```
<br>

The **`label()`** method within the wrapper will return a string containing the label of the value:

```js
// this will print something like "state: Active"
log('state: ' + record.field('state').label());
```
<br>

### Write format

You should provide a string with the name of the value:

```js
record.field('state').val('active');
```
<br>

### Wrapper method: <br> **label()**

  The **`label()`** method returns the label of the current value or **`null`** if no value is set.

  ##### Returns

  **`string`** -  The label of the current value.
  
  ##### Samples

  ```js
  // prints the label of the current value of the field
  var record = sys.data.findOne('tasks', {number: 1});
  log('status label: '+record.field('status').label());
  ```
  <br>

  ---

## **Export/Import**

### Export format

The export format is a string containing the name of the value:

```js
"choiceField1","choiceField2"
"active","inProgress"
```
<br>

### Import format

The import format is a string containing the name of the value:

```js
"choiceField1","choiceField2"
"active","inProgress"
```
<br>

However, it will also accept the label of the value:

```js
"choiceField1","choiceField2"
"Active","In Progress"
```
<br>

It will first attempt to match by name. If there is no match, it will then attempt to match using the label. In both cases, the matching process is case-insensitive.

## **Queries**

For more information, please refer to the [Query Language Documentation]({{<ref "/dev-reference/queries/query-language.md">}}).

### Available operators

Operator|Supported
---|---
equals|yes
notEquals|yes
empty|yes
notEmpty|yes
like|no
greater|no
greaterOrEquals|no
less|no
lessOrEquals|no
between|no
currentUserField|no

### Query formats

You should provide the a string with the name of value. For instance:

{{< query_sample
        id="sample"
        description="finds active companies"
        entity="companies"
        jsQueryMap="{'state': 'active'}"
        jsQueryBuilder=".field('state').equals('active')"
        restApi="state=active"
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
Matching operator|**`like`**<br>UI queries will try to match either the label or the name.

### Available operators

Operator|Supported
---|---
Many values|yes
Greater|no
Greater or equals|no
Less|no
Less or equals|no
Between|no