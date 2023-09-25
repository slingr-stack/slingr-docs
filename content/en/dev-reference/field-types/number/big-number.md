---
title: "Big Number type"
description: "Big Number type documentation.
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

This type is designed to store large numbers and can accommodate up to 34 significant digits.

The big number type utilizes [bignumber.js](https://mikemcl.github.io/bignumber.js/) within the JavaScript API. For performing operations using this data type, you can refer to **`bignumber.js`**'s documentation.

To set the value, you can use a string, number, or a big number object. The **`BigNumber`** class is accessible through **`sys.utils.numbers`**.

For instance:

```js
// retrieve the big number instance
var bigNumber = record.field('raiting').val();
// perform some operation. Check documentation http://mikemcl.github.io/bignumber.js
bigNumber = bigNumber.plus(3); // objects are immutable
// set value before save it
record.field('raiting').val(bigNumber);

// or
var bigNumber = new sys.utils.numbers.BigNumber(1011, 2);
bigNumber = bigNumber.plus(5);
record.field('raiting').val(bigNumber);
```
<br>

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
Aggregation|yes
Default type rules|yes
Default display options|yes

## **Type rules**

### Minimum value

The minimum value (inclusive).

### Maximum value

The maximum value (inclusive).

### Limit decimals

This feature enables the limitation of the number of decimals. This limitation will be applied at the data level, meaning numbers will be stored in the database with the specified number of decimals, and any additional decimals will be discarded. If you wish to retain the additional decimals for display purposes while limiting their storage, you should configure these settings within the display options.

When you opt to limit the number of decimals, the following choices will be presented:

- **`Number of Decimals`**: This indicates the number of decimals to be stored. It can range from 0 to 4.

- **`Extra Decimals Action`**: This specifies the action to take when there are more decimals than the limit permits. The available options include:
  - **`Round`**: Rounding will be used to limit the decimals.
  - **`Truncate`**: Truncation will be applied to the trailing decimals.
  - **`Throw Error`**: An error will be triggered if an attempt is made to set more decimals than the allowable limit.

## **Display options**

- **`Show Thousands Separator`**: If this flag is enabled, the thousands separator will be displayed in read-only mode. Please note that this flag does not impact edit mode.

- **`Limit Number of Decimals`**: This feature permits the restriction of the displayed decimals. It operates at the UI level and does not affect validation rules or the storage of numbers in the database. Consequently, these options only apply to read-only mode.

When you choose to limit the number of decimals, the following choices will be available:

- **`Number of Decimals`**: This denotes the count of decimals to be shown. It can range from 0 to 4.

- **`Extra Decimals Action`**: This specifies the action to be taken when there are more decimals than the set limit. The available options include:
  - **`Round`**: Rounding will be employed to limit the decimals.
  - **`Truncate`**: Truncation will be applied to the trailing decimals.

## **REST API**

### Read format

The format is an string with big number:

```js
"amount": "8.997738199773819977381"
```
<br>

### Write format

To set the value, provide a string with the big number:

```js
"amount": "8.997738199773819977381"
```
<br>

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper  will return an instance of a big number:

```js
// this will print something like "energy: 0.123465789"
log('energy: '+record.field('energy').val());

var value = record.field('energy').val();
log('energy: '+ value.toFormat(2)); // toFormat is a BigNumber function and limit to two decimals
```
<br>

### Write format

To set the value, provide a number, string, or big number:

```js
var number = new sys.utils.numbers.BigNumber('zz.9', 36);   // Number base 36 -> "1295.25"
var n1 = new sys.utils.numbers.BigNumber(1011, 2);          // Number base 2  -> "11"
number = number.plus(n1);
log(number);  // print -> 1306.25
record.field('energy').val(number); // set before seved it
```
<br>

### Wrapper method: <br> **toHex()**

  The **`toHex()`** method returns string of hexadecimal representation of the value or empty **`('')`** if null.

  ##### Returns

  **`string`** - Hex value of number.
  
  ##### Samples

  ```js
  // prints the hex value of a big number field
  var record = sys.data.findOne('contacts', {email: 'william.brown@acme.com'});
  sys.logs.debug('contact token hex: '+record.field('token').toHex());
  ```
  <br>

  ---

### Wrapper method: <br> **format(options)**

  Returns a string representing the formatted number value or an unformatted string.

  ##### Parameters

  Name|Type|Required|Description|
  ---|---|---|---|
  options|object|no|These parameters are used to format the value. If left empty, the default display options will be used for formatting.<br> - **`thousandsSeparator`**: If set to "**`true`**," a thousands separator will be displayed; if set to "**`false`**," it won't.<br> - **`limitNumberOfDecimals`**: If set to "**`true`**," the number of decimals will be limited; if set to "**`false`**," it won't.<br> - **`numberOfDecimals`**: The count of decimals to be displayed. Default is **`2`**.<br> - **`limitRuleType`**: The rule to use when limiting decimals, either "**`TRUNCATE`**" or "**`ROUND`**." Default is "**`TRUNCATE`**."

  ##### Returns

  **`string`** - String of formatted value of number.
  
  ##### Samples

  ```js
  // prints the formated value of a big number field
  var inv = sys.data.findById('invoices', '579f5929e4b043b8ce4519b6');
  sys.logs.debug('total: ' + inv.field('total').format({
    'thousandsSeparator': true, 
    'limitNumberOfDecimals': true, 
    'numberOfDecimals': 2
    })
  );
  ```
  <br>

  ---

## **Export/Import**

### Export format

The export format is a big number:

```js
"bigNumberField1","bigNumberField2"
"0.872","27810.0028"
```
<br>

### Import format

The import format is a string with a big number:

```js
"bigNumberField1","bigNumberField2"
"0.872","27810.0028"
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
like|no
greater|yes
greaterOrEquals|yes
less|yes
lessOrEquals|yes
between|yes
currentUserField|no

### Query formats

You should provide the number. For instance:

{{< query_sample
        id="sample"
        description="finds companies with rating grater or equals than 3.0"
        entity="companies"
        jsQueryMap="{'rating': 'greaterOrEquals(3.0)'}"
        jsQueryBuilder=".field('rating').greaterOrEquals('3.0')"
        restApi="rating=greaterOrEquals(3.0)"
>}}
<br>

## **Aggregate queries**

Please refer to the [Aggregate Queries Documentation]({{<ref "/dev-reference/queries/aggregate-queries.md">}}) for more detailed information.

### Available operators

Operator|Supported
---|---
sum|yes
avg|yes
first|yes
last|yes
min|yes
max|yes

## **UI queries**

Please refer to the [UI Queries Documentation]({{<ref "/dev-reference/queries/ui-queries.md">}}) for more detailed information.

### Matching of values

Property|Description
---|---
Matching operator|**`equals`**

### Available operators

Operator|Supported
---|---
Many values|yes
Greater|no
Greater or equals|no
Less|yes
Less or equals|yes
Between|yes