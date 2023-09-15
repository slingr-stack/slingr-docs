---
title: "Nested Fields"
lead: "Nested fields type documentation."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

## **Overview**

This field type allows for the inclusion of other fields within it, facilitating nested structures. This capability permits the creation of multiple levels of nesting, thereby supporting complex data structures within entities.

For instance, you can create a structure like the following:

- name
- email
- address
  - addressLine
  - zipCode
  - state

In this scenario, "address" is a field of type nested fields and contains the fields "`addressLine`," "`zipCode`," and "`state`."

Furthermore, these nested structures can also be multi-valued, as demonstrated in the following example:

- name
- email
- addresses
  - addressLine
  - zipCode
  - state
  - primary

In this instance, you can store multiple addresses within the "`addresses`" field.
Feel free to use the corrected version above to update your documentation.

## **Available features**

Name|Supported
---|---
Many multiplicity|yes
Default values|no
Unique flag|no
Required flag|yes
Indexable flag|no
Sensitive flag|no
Calculated value|yes
Automatic initialization|no
Calculated initial value|no
Aggregation|no
Default type rules|no
Default display options|no

## **Type rules**

#### Label

This option allows you to assign a label to the group of fields. This label can be employed throughout the application to display a preview of the nested fields or to facilitate searches across records.

There are three available options:

- **`None`**: No label will be generated. In the user interface, an auto-generated label might appear based on the field's name and the index if it's a multi-valued field.
- **`Field`**: A nested field can be chosen, and its value will be used as the label.
- **`Script`**: A script can be utilized to generate the label:

  ---

  ##### Parameters

  | Name   | Type                | Description |
  |--------|---------------------|-------------|
  | record | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) | The record the field belongs to. |
  | nested | [sys.data.Record]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}) | This is a **`sys.data.Record`** object, with the distinction that the root of the record is designated to the nested fields. To illustrate, consider the subsequent structure:<br>- name<br>- email<br>- addresses<br>  - addressLine<br>  - zipCode<br>  - state<br> Suppose the field "addresses" is multi-valued, and you desire the label to be the "state." In this situation, you cannot utilize the record variable since you aren't aware of which address you are generating the label for. The solution entails employing the nested variable, which inherently points to the address you are calculating the label for. This could be achieved as follows:<br><pre><code> return nested.field('state').name(); </code></pre> |

  ##### Returns

  **`string`**: You should return the label

  ##### Samples

  ```js
  // uses the state and zip code as the label
  return nested.field('state').val()+'-'+nested.field('zipCode').val();
  ```
  <br>

  ---

## **Display options**

#### Show as accordion
Enabling this option allows the group of fields to be collapsible and expandable, with the label serving as the title of the accordion.

#### Indent fields
Enabling this option causes the inner fields to be indented in the UI, aligning them to the right of the parent field's label.

If this option isn't enabled, the label of the parent field will be displayed at the top, and the inner fields will be rendered below without indentation.

#### Inner fields layout
This setting controls the layout of inner fields, which proves especially useful when space is limited. The available options are:

- **`Automatic`**: Based on the view's context, either a fixed or dynamic layout will be selected. For example, the dynamic layout will be used in the grid view, while the fixed layout will be chosen in read-only views.
- **`Fixed`**: Labels are allocated a predetermined amount of space, with the remaining space reserved for the values of the inner fields.
- **`Dynamic`**: The space allotted for inner field labels and values adjusts based on the content in each column.
- **`Custom`**: In this scenario, you can specify the width assigned to inner field labels, while the remaining space is designated for the values.

## **REST API**

### Read format

The data is represented in JSON format and comprises the following fields:

- **`id`**: This serves as the identifier for the nested group, primarily intended for internal use.
- **`label`**: The label associated with the nested group.
- **`Inner fields`**: Each inner field is contained within the map structure. In the example provided below, the fields **`addressLine`**, **`zipCode`**, **`city`**, and **`state`** are considered inner fields.

Here is a sample representation of a nested field in JSON format:

```js
"address": {
  "id": "5877e2bd41058800079d11cc",
  "label": "WV - 25335",
  "addressLine": "3351 Harper Center",
  "zipCode": "25335",
  "city": "Charleston",
  "state": "WV"
}
```
<br>

### Write format

You can set a nested field by providing it’s inner fields:

  ```js
  "address": {
    "addressLine": "3351 Harper Center",
    "zipCode": "25335",
    "city": "Charleston",
    "state": "WV"
  }
  ```
  <br>

When updating a multi-valued nested field, it is crucial to include the corresponding **`id`**:

  ```js
  "addresses": [
    {
      "id": "57fd45aee4b0ce322b0c86ac",
      "addressLine": "4 Crownhardt Plaza",
      "zipCode": "73157",
      "city": "Oklahoma City",
      "state": "OK"
    },
    {
      "id": "57fd45aee4b0ce322b0c86aa",
      "addressLine": "4 Magdeline Place",
      "zipCode": "89145",
      "city": "Las Vegas",
      "state": "NV"
    }
  ]
  ```
  <br>

If the **`id`** is not provided, the system will interpret the absence of the **`id`** as a request to delete the existing entry and add a new one, which will result in assigning a new ID to the entry.

Please note that you should refrain from sending the **`label`**, as it is automatically calculated and managed.

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return an object:

```js
{
  "addressLine": "803 Anthes Pass",
  "zipCode": "08608",
  "city": "Trenton",
  "state": "NJ"
}
```
<br>

In essence, this represents an object with inner fields contained within.

However, rather than directly retrieving the raw value of the relationship in most instances, you will typically utilize the methods provided within the wrapper to directly access the ID or label.

### Write format

When configuring nested fields, you should adhere to the same format as used for reading:

  ```js
  {
    "addressLine": "803 Anthes Pass",
    "zipCode": "08608",
    "city": "Trenton",
    "state": "NJ"
  }
  ```
  <br>

For example:

  ```js
  contact.field('address').val({
    "addressLine": "803 Anthes Pass",
    "zipCode": "08608",
    "city": "Trenton",
    "state": "NJ"
  });
  ```
  <br>

If the field is multi-valued, you have the option to specify the index:

  ```js
  company.field('addresses[1]').val({
    "addressLine": "803 Anthes Pass",
    "zipCode": "08608",
    "city": "Trenton",
    "state": "NJ"
  });
  ```
  <br>

For multi-valued fields, you can also leverage the utilities provided by [sys.data.ManyWrapper]({{<ref "/dev-reference/scripting/sys-data.md">}}).

### Wrapper method: <br> **field(path)**

  Returns the wrapper of an inner field.

  ##### Parameters

  Name|Type|Required|Description|
  ---|---|---|---|
  path|string|yes|The path of the inner field to get the wrapper.

  ##### Returns

  **`sys.data.Wrapper`** or **`sys.data.ManyWrapper`** - The wrapper of the inner field.

  ##### Exceptions

  **badRequest**

  If **`path`** is invalid
  
  ##### Samples

  ```js
  // gets the wrapper of the inner field and prints its value
  var contact = sys.data.findOne('contacts', {email: 'djohnstonb0@behance.net'});
  var stateWrapper = contact.field('address').field('state');
  log('state: '+stateWrapper.val());
  ```
  <br>

  ---


### Wrapper method: <br> **id()**

  Returns a unique ID of the nested field instance.

  ##### Returns

  **`string`** - The ID of the nested field instance.
  
  ##### Samples

  ```js
  // prints the ID of the nested field
  var record = sys.data.findOne('contacts', {email: 'djohnstonb0@behance.net'});
  log('address id: '+record.field('address').id());
  ```
  <br>

  ---

### Wrapper method: <br> **label()**

  Returns the **`label`** of the nested field or **`null`** if the field is empty.

  ##### Returns

  **`string`** - The label of the nested field as configured in type rules.
  
  ##### Samples

  ```js
  // gets the wrapper of a nested field and prints its label
  var contact = sys.data.findOne('contacts', {email: 'djohnstonb0@behance.net'});
  var addressWrapper = contact.field('address');
  log('state: '+addressWrapper.label());
  ```
  <br>

  ---

## **Export/Import**

### Export format

Nested fields themselves cannot be directly exported. What is exported are the inner fields:

```js
"nested.innerField1","nested.innerField2"
"value1","value2"
```
<br>

### Import format

Nested fields themselves cannot be directly imported. What is imported are the inner fields:

```js
"nested.innerField1","nested.innerField2"
"value1","value2"
```
<br>

If there is ambiguity, the name takes precedence over the label.

## **Queries**

For more information, please refer to the [Query Language Documentation]({{<ref "/dev-reference/queries/query-language.md">}}).

### Available operators

Operator|Supported
---|---
equals|yes
notEquals|no
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

Queries on parent nested fields are not supported. However, you can perform queries using inner fields:

{{< query_sample
        id="sample"
        description="filters by state"
        entity="contacts"
        jsQueryMap="{'address.state': 'NY'}"
        jsQueryBuilder=".field('address.state').equals('NY')"
        restApi="address.state=NY"
>}}
<br>

In these cases, you should employ the format and operators corresponding to the type of inner fields.

Furthermore, querying is feasible even when dealing with multi-valued nested fields:

{{< query_sample
        id="sample2"
        description="filters by state"
        entity="companies"
        jsQueryMap="{'addresses.state': 'NY'}"
        jsQueryBuilder=".field('addresses.state').equals('NY')"
        restApi="addresses.state=NY"
>}}
<br>

In this scenario, since "addresses" is multi-valued, any company that possesses at least one address with "NY" in the "state" field will be encompassed in the results.

Finally, for querying nested record fields simultaneously:

{{< query_sample
        id="sample3"
        description="filters by street and zip code"
        entity="companies"
        jsQueryMap="{'addresses': {'street': 'Street 123', 'zipCode': '1234'}}"
        jsQueryBuilder=".field('addresses').equals({'street': 'Street 123', 'zipCode': '1234'})"
        restApi="addresses={same-as-query-builder}"
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
min|no
max|no

## **UI queries**

Please refer to the [UI Queries Documentation]({{<ref "/dev-reference/queries/ui-queries.md">}}) for more detailed information.

### Matching of values

Property|Description
---|---
Matching operator|**`none`** <br> Nested fields do not support UI queries.

### Available operators

Operator|Supported
---|---
Many values|no
Greater|no
Greater or equals|no
Less|no
Less or equals|no
Between|no