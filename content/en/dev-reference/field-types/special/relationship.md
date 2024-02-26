
---
title: "Relationship type"
description: "Relationship type documentation."
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

The relationship type enables the storage of references to other records within the app. It encompasses various features to manage which records can be referenced, along with how to display these references in the user interface.

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

## **Type rules**

#### Related Entity

This indicates the entity of the records that can be referenced by this field. It's possible to point to the same entity to which the field belongs.

#### Filtering

A filter is utilized to specify which records can be referenced by this field. If a record fails to meet the filter's criteria, a validation error will be triggered.

It's important to note that the user interface (UI) will automatically filter out records that don't fulfill the specified criteria.

If another record is specified within displayed options, the filters will be combined so that both criteria are met.

#### Copied Fields

Due to certain restrictions inherent to the database functionality, there might be instances where it's necessary to not only store a reference to a record but also specific information from that record. For instance, let's consider an entity named "contacts" which has a relationship field pointing to another entity named "companies". Within the "companies" entity, there's a field named "type". Suppose you wish to perform a query to retrieve all contacts where the "type" field of the company they reference is "a". To facilitate this type of query, you should designate "type" as a copied field from the relationship field pointing to "company". This arrangement would allow you to execute a query like the following (assuming "company" is the name of the relationship field):

{{< query_sample
        id="sample"
        description="filter contacts by company type"
        entity="companies"
        jsQueryMap="{'company.type': 'a'}"
        jsQueryBuilder=".field('company.type').equals('a')"
        restApi="company.type=a"
>}}
<br>

Once a field is designated as a copied field, it becomes available for use in various contexts. For instance, when you're defining permissions for the "contacts" entity, you can utilize the "company.type" field to filter accessible records.

It's important to note that you don't always need to add copied fields when creating expressions based on fields in related records. For instance, if you're creating an expression to highlight records in a grid view, you don't necessarily need to copy fields. For instance, if you want to highlight all contacts where the "type" is "b," you wouldn't need to make the "type" field a copied field.

The guiding principle is that copied fields are required when queries are involved, whether initiated by you or internally by the application. If a query isn't necessary, then copying the field is unnecessary. In the app builder, you'll notice that while in some cases you can select any field from related records, in other cases, you can only select copied fields.

Understanding the Overhead and Behavior of Copied Fields:

In the provided example, the "type" field will be copied from the "company" record to the "contact" record. Consequently, if you edit the "company" and update the "type" field, the new value will automatically propagate to contacts that were referencing this company. This cascade update takes place asynchronously in the background, which means that depending on the number of records that need updating, there could be a noticeable delay in this process.

It's worth noting that introducing numerous copied fields can potentially have adverse effects on an application's performance. Therefore, it's advisable to employ them only when no alternative solution exists for a given problem.

Lastly, you have the ability to modify the default propagation behavior through the "Copied Fields Update Policy" option.

{{< callout type="info" contend="" >}}
It's advisable that copied fields do not undergo frequent value changes, as this can help prevent potential performance concerns. Moreover, if alterations to a copied field tend to trigger a substantial number of updates, it's worth exploring alternatives to utilizing copied fields.
{{< /callout >}}

#### Delete policy

This indicates the action to take when the record referenced by the field is deleted. The available options are:

- **`None`**: This is the default behavior. No action will be taken, and the field will continue to point to the deleted record, resulting in a broken relationship. An attempt to save the record will trigger a validation error.
- **`Remove Relationship`**: The field's value will be set to null, and if it's a multi-valued field, it will be removed from the list.
- **`Delete Record`**: The record that references the deleted record will also be deleted. This can be particularly useful for master-detail relationships, where associated records are meant to be deleted when the master record is deleted.

#### Label update policy

By default, if the label of a record changes and there are other records referencing it, a job will be initiated to update the label on those records, similar to the behavior of copied fields.

It's crucial to ensure that labels are updated accurately for correct user display in the UI and for queries that filter by the relationship field using record labels.

However, updating the label in all fields that reference the modified record incurs a performance penalty. To manage this behavior, there are options:

- **`Yes`**: The field's value will be automatically updated when the label of the record changes.
- **`No`**: The field's value won't be updated if the label of the record changes. In this scenario, there might be a discrepancy between the label displayed in the field and the actual label in the referenced record.

To mitigate performance concerns, strive to keep labels as stable as possible to minimize frequent changes that trigger numerous cascade updates.

#### Copied fields update policy

This policy allows you to specify whether copied fields should be automatically updated when their values change. The available options are:

- **`Yes`**: If the value of any copied field changes in the referenced record, the corresponding values in the relationship field will be updated.
- **`No`**: If the value of any copied field changes in the referenced record, the values in the relationship field won't be updated. This could lead to inconsistent query results when using those copied fields.

## **Display options**

#### Representation

Determines how the value will be rendered:

- **`Drop down`**: A dropdown menu will be employed for selecting the field's value.
- **`Boxes`**: All records eligible as the field's value will be presented in individual boxes, enabling users to easily select one. It's advisable to use this representation when the number of available options is limited. Note that this representation supports a maximum of 100 records.

In both cases, these representations are applicable only in edit mode.

#### Display value

Determines how the related record will be displayed:

- **`Label`**: The label of the related record is set by its entity configuration.
- **`Field`**: A field will be used to show the value of a record.

#### Filtering

A filter is employed to specify which records can be referenced by this field. Unlike the filtering option available in type rules, this filter operates solely at the UI level and will not trigger validation errors.

This option proves beneficial when you intend to narrow down the records that can be selected for a specific view.

#### Enable Link

Enabling this flag results in the rendering of a link to the reference record in read-only mode.

Please note that you must select a view in which the referenced record can be displayed.

#### Allow creating new records

When enabled, this flag adds a button in edit mode that allows the creation of a new record. If the record is created using this button, it will be automatically selected as the value for the field.

Keep in mind that you need to select a view to use for creating the new record.

#### Allow editing records

Enabling this flag displays a button in edit mode that permits the editing of the referenced record.

Please note that you must select a view in which the referenced record can be edited.

#### Sort field

This allows the possible records to be sorted by a specific field.

#### Sort type

Specifies the sort direction, which can be ascending or descending.

#### Visible fields

If you require displaying more information from the referenced record beyond just the label, you can employ visible fields. These fields will be showcased in the read-only view of the field alongside the record's label.

It's important to understand that these visible fields are not stored in the database, which distinguishes them from copied fields. Instead, they are dynamically merged at the time of reading the record.

#### Visible fields layout

This option provides control over the layout of visible fields, particularly useful when space is limited. The available options are:

- **`Automatic`**: The layout is chosen based on the view's context. For example, the dynamic layout is applied in grid views, while read-only views adopt the fixed layout.
- **`Fixed`**: Labels are allocated a predetermined space, with the remaining space designated for visible field values.
- **`Dynamic`**: Space allocated for both labels and values of visible fields adjusts according to the content in each column.
- **`Custom`**: In this scenario, you can specify the width allocated for visible field labels, while the remaining space is designated for values.

#### Allow label wrapping

Set this to true when labels of relationship fields are notably lengthy, and you wish to wrap the context by adding ellipsis. This should be applied only when displaying the field using the label class, similar to visible fields. The default value is false.

## **REST API**

### Read format

The data is represented in JSON format and includes the following fields:

- **`id`**: This signifies the ID of the referenced record.
- **`label`**: This represents the label of the referenced record.
- **`Copied fields`**: Any copied fields are contained within the map structure. In the example provided below, the fields **`type`** and **`isCustomer`** are copied fields.

Here is a sample representation of a relationship field in JSON format:

```js
"company": {
  "id": "57fd2d61e4b0ce322b0c55af",
  "label": "Fivechat",
  "type": "c",
  "isCustomer": false
}
```
<br>

### Write format

You have several options for the write format:

- You can provide only the ID:

  ```js
  "company": {"id": "57fd2d61e4b0ce322b0c55af"}
  ```
  <br>

- Alternatively, you can directly pass the ID as a string:

  ```js
  "company": "57fd2d61e4b0ce322b0c55af"
  ```
  <br>

- You can supply the label of the record:

  ```js
  "company": {"label": "Fivechat"}
  ```
  <br>

- Or provide the label as a string:

  ```js
  "company": "Fivechat"
  ```
  <br>

When utilizing the label, it's imperative that each label is unique. If multiple records share the same label, attempting to save the records will result in a validation error.

Furthermore, it's possible to employ a lookup field. For instance, if the field **`"code"`** in the **`"companies"`** entity has been designated as a lookup field, you can utilize the following approach:

```js
  "company": {"code": "fivechat-co"}
```
<br>

Or provide the code field value as a string:

```js
  "company": "fivechat-co"
  ```
  <br>

## **JavaScript API**

### Read format

The **`val()`** method within the wrapper will return an object:

```js
{
  "id": "57fd2d61e4b0ce322b0c55af",
  "label": "Fivechat",
  "link": "/data/companies/57fd2d61e4b0ce322b0c55af",
  "type": "c",
  "isCustomer": false
}
```
<br>

Where:

- **`id`**: This is the ID of the referenced record.
- **`label`**: This represents the label of the referenced record.
- **`link`**: This is the URL in the REST API for the record.
- **`Copied fields`**: Any copied fields are included within the map structure. In the example provided below, the fields **`type`** and **`isCustomer`** are copied fields.

However, in most cases, rather than retrieving the raw value of the relationship, you will use the methods available in the wrapper to directly access the **`ID`** or **`label`**.


### Write format

You have several options for the write format of the Javascript API:

- You can provide only the ID:

  ```js
  record.field("company").val({id: "57fd2d61e4b0ce322b0c55af"});
  ```
  <br>

- Alternatively, you can directly pass the ID as a string:

  ```js
  record.field("company").val("57fd2d61e4b0ce322b0c55af");
  ```
  <br>

- You can supply the label of the record:

  ```js
  record.field("company").val({label: "Fivechat"});
  ```
  <br>

- Or provide the label as a string:

  ```js
  record.field("company").val("Fivechat");
  ```
  <br>

When utilizing the label, it's imperative that each label is unique. If multiple records share the same label, attempting to save the records will result in a validation error.

Furthermore, it's possible to employ a lookup field. For instance, if the field **`"code"`** in the **`"companies"`** entity has been designated as a lookup field, you can utilize the following approach:

```js
  record.field("company").val({code: "fivechat-co"});
```
<br>

Or provide the code field value as a string:

```js
  record.field("company").val("fivechat-co");
```
<br>

If you include all the fields, the priority order for determining the value is as follows: **`id`** takes precedence, followed by **`label`**, and finally any configured lookup field.

The JavaScript API also provides the option to establish a relationship wrapper as demonstrated below:

```js
  contact1.field('company').val(contact2.field('company'));
```
<br>

Or provide a record object:

```js
  var company = sys.data.findOne('companies', {name: 'Browsetype'});
  contact.field('company').val(company);
```
<br>

### Wrapper method: <br> **id()**

  Returns the ID of the referenced record or null if the field is empty.

  ##### Returns

  **`string`** - The ID of the referenced record.

  ##### Samples

  ```js
  // prints the ID of the referenced record in a relationship field
  var record = sys.data.findOne('contacts', {email: 'djohnstonb0@behance.net'});
  log('company id: '+record.field('company').id());
  ```
  <br>

  ---

### Wrapper method: <br> **label()**

  Returns the **`label`** of the referenced record or **`null`** if the field is empty.

  ##### Returns

  **`string`** - The label of the referenced record

  ##### Samples

  ```js
  // prints the label of the referenced record in a relationship field
  var record = sys.data.findOne('contacts', {email: 'djohnstonb0@behance.net'});
  log('company label: '+record.field('company').label());
  ```
  <br>

  ---


### Wrapper method: <br> **fetch(fields)**

  Returns the referenced record. If the record cannot be found, it will return null. Optionally, you can specify the fields to be retrieved.

  ##### Parameters

  Name|Type|Required|Description|
  ---|---|---|---|
  fields|string[]|yes|An array of fields to be retrieved

  ##### Returns

  **`sys.data.Record`** - The label of the referenced record.

  ##### Exceptions

  **badRequest**

  If the **`id`** isn't available, for instance, when you only set the field using the label and haven't saved it yet, the **`id`** won't be accessible. Consequently, you cannot fetch the referenced record using this method.

  ##### Samples

  ```js
  // fetches the referenced record
  var contact = sys.data.findOne('contacts', {email: 'djohnstonb0@behance.net'});
  var company = contact.field('company').fetch();
  log('company: '+company.label());
  ```
  <br>

  ```js
  // return only some fields of the related record
  var contact = sys.data.findOne('contacts', {email: 'djohnstonb0@behance.net'});
  var company = contact.field('company').fetch(['name', 'type']);
  log('company: '+company.field('name').val());
  log('company: '+company.field('type').val());
  ```
  <br>

  ---


### Wrapper method: <br> **fetchAndLock(fields)**

  Returns and locks the referenced record. If the record cannot be found, it will return null. Optionally, you can specify the fields to be retrieved.

  ##### Parameters

  Name|Type|Required|Description|
  ---|---|---|---|
  fields|string[]|yes|An array of fields to be retrieved

  ##### Returns

  **`sys.data.Record`** - The label of the referenced record.

  ##### Exceptions

  **badRequest**

  If the **`id`** isn't available, for instance, when you only set the field using the label and haven't saved it yet, the **`id`** won't be accessible. Consequently, you cannot fetch the referenced record using this method.

  ##### Samples

  ```js
  // fetches the referenced record
  var contact = sys.data.findOne('contacts', {email: 'djohnstonb0@behance.net'});
  var company = contact.field('company').fetch();
  log('company: '+company.label());
  ```
  <br>

  ```js
  // return only some fields of the related record
  var contact = sys.data.findOne('contacts', {email: 'djohnstonb0@behance.net'});
  var company = contact.field('company').fetch(['name', 'type']);
  log('company: '+company.field('name').val());
  log('company: '+company.field('type').val());
  ```
  <br>

  ---


### Wrapper method: <br> **field(path)**

  Returns the wrapper of a copied field.

  ##### Parameters

  Name|Type|Required|Description|
  ---|---|---|---|
  path|string|yes|The path of the copied field to get the wrapper.

  ##### Returns

  **`sys.data.Wrapper`** or **`sys.data.ManyWrapper`** - The wrapper of the copied field.

  ##### Exceptions

  **badRequest**

  If **`path`** is invalid

  ##### Samples

  ```js
  // gets the wrapper of the copied field and prints it's value
  var contact = sys.data.findOne('contacts', {email: 'djohnstonb0@behance.net'});
  var companyTypeWrapper = contact.field('company').field('type');
  log('company type: '+companyTypeWrapper.val());
  ```
  <br>

  ---

### Wrapper method: <br> **equals(value)**

Determines whether the provided parameter references the same as the current value of the field.

This method overrides the default behavior of **`sys.data.Wrapper.equals()`**.

  ##### Parameters

  Name|Type|Required|Description|
  ---|---|---|---|
  value|any|yes|The value to compare against the field’s value can take different forms: <br> - Record ID <br> - Record label <br> - Another relationship wrapper <br> - A **`sys.data.Record`** object <br> - An object with an **`id`** field <br> - An object with a **`label`** field <br>

  ##### Returns

  **`boolean`** - Returns **`true`** if the value is the same as the field’s value, and **`false`** otherwise.

  ##### Samples

  ```js
  // checks if the value is the same
  var contact = sys.data.findOne('contacts', {email: 'djohnstonb0@behance.net'});
  var company = contact.field('company').fetch();
  log('equals - id: '+contact.field('company').equals(company.id()));
  log('equals - object with id: '+contact.field('company').equals({id: company.id()}));
  log('equals - label: '+contact.field('company').equals(company.label()));
  log('equals - object with label: '+contact.field('company').equals({label: company.label()}));
  log('equals - wrapper: '+contact.field('company').equals(contact.field('company')));
  log('equals - record: '+contact.field('company').equals(company));
  ```
  <br>

  ---


## **Export/Import**

### Export format

The export format is the label of the related record:

```js
"relationshipField","relationshipField.type"
"Record label","a"
```
<br>

Notice that it is possible to export fields from the related record.

### Import format

There are different ways to import relationship fields. One of the simplest methods is to use the label:

```js
"relationshipField"
"Record label"
```
<br>

Additionally, it is possible to indicate a lookup field:

```js
"relationshipField.lookupField"
"abc-123"
```
<br>

In this case, the related record will be matched using the specified lookup field. An error will be thrown if more than one record is matched.

Lastly, please be aware that if you provide the related fields, the record could be automatically created or updated:

```js
"relationshipField.code","relationshipField.name"
"abc-123","test"
```
<br>

For example, this will create a new record with fields **`"code"`** and **`"name"`** set to **`"abc-123"`** and **`"test"`** respectively. If one of those fields is marked as unique, the import process will first attempt to match an existing record. If a match is found, the record will be updated; if not, a new record will be created.

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

### Query formats

By default, the label will be used for the various query operators.

For instance, the following query will retrieve contacts where the label of the company is 'Blogpad':

{{< query_sample
        id="sample2"
        description="finds a contact by company label"
        entity="contacts"
        jsQueryMap="{company: 'Blogpad'}"
        jsQueryBuilder=".field('company').equals('Blogpad')"
        restApi="company=Blogpad"
>}}
<br>

However you can also use the label explicitly:

{{< query_sample
        id="sample3"
        description="finds a contact by company label"
        entity="contacts"
        jsQueryMap="{'company.label': 'Blogpad'}"
        jsQueryBuilder=".field('company').equals('Blogpad')"
        restApi="company.label=Blogpad"
>}}
<br>

Note that you don't need to explicitly include "label" in the query builder path. It is automatically identified based on what you provide to the **`equals`** method.

You can also perform a query based on the ID:

{{< query_sample
        id="sample4"
        description="finds a company by exact name"
        entity="contacts"
        jsQueryMap="{'company.id': '57fd2d65e4b0ce322b0c8565'}"
        jsQueryBuilder=".field('company').equals('57fd2d65e4b0ce322b0c8565')"
        restApi="company.id=57fd2d65e4b0ce322b0c8565"
>}}
<br>

Again, the query builder will automatically recognize the ID, so you don't need to use the "id" suffix in this case.

Remember that when utilizing the query builder, you have the flexibility to use any of the formats available in the JavaScript API.

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
Matching operator|**`like`** <br> The label of the referenced record will be used for matching.

### Available operators

Operator|Supported
---|---
Many values|yes
Greater|no
Greater or equals|no
Less|no
Less or equals|no
Between|no
