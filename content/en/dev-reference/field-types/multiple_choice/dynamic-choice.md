---
title: "Dynamic choice type"
lead: "Dynamic choice type docuemntation
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

This feature enables the specification of a set of potential dynamic values that the field can accommodate. Within the user interface (UI), users can select a value from these options using a dropdown, list, box, or switcher, depending on the chosen representation. The key distinction from standard choices lies in the inability to configure the potential values during the app builder's field configuration process. Instead, the potential values can be defined using the JavaScript API, typically in events like **`"before show"`** or **`"on record change."`** Consequently, this field can possess varying potential values (and a distinct selected value) based on the current status of the record, the user, or any other condition.

It's important to note that the raw value of the field will store all potential values along with the currently selected value.

## **Available features**

Name|Supported
---|---
Many multiplicity|yes
Default values|yes
Unique flag|no
Required flag|yes
Indexable flag|no
Sensitive flag|yes
Calculated value|yes
Automatic initialization|no
Calculated initial value|no
Aggregation|no
Default type rules|no
Default display options|yes

## **Display options**

### Representation


This determines how the field should be presented. The available options are:

- **`Dropdown`**: A dropdown containing the potential values will be displayed.
- **`List`**: A list showcasing all values will be displayed.
- **`Switcher`**: A switcher displaying all values will be shown. However, if there are numerous potential values, this might not be the optimal representation.
- **`Boxes`**: All records that can be chosen as the field's value will be exhibited in boxes, simplifying user selection. This representation should only be used when the number of potential options is limited. Note that this representation supports a maximum of 100 records.

## **REST API**

### Read format

The format is a JSON containing the name of the value and the possible options for the selected value:

```js
{
  "options": [{
      "label": "Alabama",
      "name": "AL"
    }, {
      "label": "Alaska",
      "name": "AK"
    }, {
      "label": "Arizona",
      "name": "AZ"
    }],
  "selectedValue": "AZ"
}
```
<br>

### Write format

To set the value, provide a JSON with the selected value's name and the possible values as options:

```js
record.field('dynamicChoice').val({
  "options": [{
      "label": "Alabama",
      "name": "AL"
    }, {
      "label": "Alaska",
      "name": "AK"
    }, {
      "label": "Arizona",
      "name": "AZ"
    }],
  "selectedValue": "AZ"
});
```
<br>

If you provide only a string, it will be considered as the selected value, and the possible values will be automatically generated with a single option using the provided string as both the name and label:

```js
record.field('dynamicChoice').val('AZ');
```
<br>

```js
{
  "options": [{
      "label": "AZ",
      "name": "AZ"
    }],
  "selectedValue": "AZ"
}
```
<br>

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return a JSON containing the selected value's name as well as the possible values as options:

```js
// this will print something like
// "state: {options: [{label: Alabama, name: AL}, {label: Alaska, name: AK},{label: Arizona, name: AZ}], selectedValue: AZ}"
log('state: ' + JSON.stringify(record.field('state').val()));
```
<br>

The **`selectedValue()`** method within the wrapper will return a string containing the name of the value or null if no value is set.

```js
// this will print something like "state: AZ"
log('state: ' + record.field('state').selectedValue());
```
<br>

The **`selectedLabel()`** method within the wrapper will return a string with the label of the selected value or null if no value is set.

```js
// this will print something like "state: Arizona"
log('state: ' + record.field('state').selectedLabel());
```
<br>

The **`options()`** method within the wrapper will return an array with the potential options for the value.

```js
// this will print something like
// "state options: [{"label": "Alabama", "name": "AL"},{"label": "Alaska", "name": "AK"},{"label": "Arizona", "name": "AZ"}]"
log('state options: ' + JSON.stringify(record.field('state').options()));
```
<br>

### Write format

For **`val()`**, you can provide a JSON with the selected value's name and an array containing the potential values as options:

```js
record.field('state').val(
  {
    "options": [{
        "label": "Alabama",
        "name": "AL"
      }, {
        "label": "Alaska", 
        "name": "AK"
      }, {
        "label": "Arizona",
        "name": "AZ"
      }],
    "selectedValue": "AZ"
  }
);
```
<br>

You can also pass a string, and it will be interpreted as the **`selectedValue`**:

```js
record.field('state').val("AZ");
//this value will be converted to {"options": [{"label": "AZ", "name": "AZ"}], "selectedValue": "AZ"}
```
<br>

The **`selectedValue()`** method within the wrapper will save a selected value and return a string containing the name of the value:

```js
// this will save the name option "AZ" as selected value
record.field('state').selectedValue('AZ');
```
<br>

The **`options()`** method within the wrapper will store the potential options for the value:

```js
// this will save the options to be used as possible values:
record.field('state').options([{
    "label": "Alabama",
    "name": "AL"
  },{
    "label": "Alaska", 
    "name": "AK"
  },{
    "label": "Arizona", 
    "name": "AZ"
  }]
);
```
<br>

### Wrapper method: <br> **selectedLabel()**

  Returns the label of the current value or null if no value is set.

  ##### Returns

  **`string`** -  The label of the current value.
  
  ##### Samples

  ```js
  // prints the label of the current value of the field
  // this will print something like "state: Arizona"
  log('state: ' + record.field('state').selectedLabel());
  ```
  <br>

  ---

### Wrapper method: <br> **selectedValue(newValue)**

 Returns the name of the current value or **`null`** if no value is set.

  ##### Parameters

  Name|Type|Required|Description
  ---|---|---|---
  newValue|string|no|The new value to be selected.

  ##### Returns

  **`string`** - The name of the current value.

  ##### Samples

  ```js
  // prints the name of the current value of the field

  // this will print something like "state: AZ"
  log('state: ' + record.field('state').selectedValue());

  // this will set "AL" as selected value and it will print something like "state: AL"
  log('state: ' + record.field('state').selectedValue('AL'));
  ```
  <br>

  ---

### Wrapper method: <br> **options(newOptions)**

 Returns an array with the possible options for the value.

  ##### Parameters

  Name|Type|Required|Description
  ---|---|---|---
  newOptions|object[]|no|The new possible options for the value.

  ##### Returns

  **`object[]`** - The possible options for the value.

  ##### Samples

  ```js
  // prints the possible options

  // this will print something like
  // "state options: [{"label": "Alabama", "name": "AL"},{"label": "Alaska", "name": "AK"},{"label": "Arizona", "name": "AZ"}]"
  log('state options: ' + JSON.stringify(record.field('state').options()));

  // this will save the options to be used as possible values:
  record.field('state').options([{
      "label": "Alabama", 
      "name": "AL"
    },{
      "label": "Alaska", 
      "name": "AK"
    },{
      "label": "Arizona", 
      "name": "AZ"
    }
  ]);
  ```
  <br>
  
  ---

## **Export/Import**

### Export format

The export format is a string representation of a JSON with the name of the selected value and its possible values as options:

```js
"{options: [{label: Alabama, name: AL}, {label: Alaska, name: AK},{label: Arizona, name: AZ}], selectedValue: AZ}"
```
<br>

### Import format

The import format is a string representation of a JSON with the name of the selected value and its possible values as options:

```js
"{options: [{label: Alabama, name: AL}, {label: Alaska, name: AK},{label: Arizona, name: AZ}], selectedValue: AZ}"
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
greater|no
greaterOrEquals|no
less|no
lessOrEquals|no
between|no
currentUserField|no

## **Aggregate queries**

Please refer to the [Aggregate Queries Documentation]({{<ref "/dev-reference/queries/aggregate-queries.md">}}) for more detailed information.

### Available operators

Operator|Supported
---|---
sum|no
avg|no
first|no
last|no
min|no
max|no

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