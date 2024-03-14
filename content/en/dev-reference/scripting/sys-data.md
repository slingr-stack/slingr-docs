---
title: "sys.data"
description: "Describes utilities in the Javascript API to access and manipulate application data."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 63
---

## **sys.data**

This package contains methods and classes for working with data in your application. You'll find utilities for **`querying data`**, **`creating`**, **`updating`**, or **`deleting`** records, as well as more advanced operations like aggregation and executing actions.

###  findById(entityName, id)

This function finds a record by its ID. If the record is not found, **`null`** will be returned.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity
id|string|yes|ID of the record to find

##### Returns

[sys.data.Record](#sysdatarecord)  - Record or **`null`** if not found

##### Exceptions

**badRequest**

This exception is raised if **`entityName`** is not valid or if **`ID`** is not a valid record ID.

##### Samples

``` javascript
// finds one company by its ID
var company = sys.data.findById('companies', '57fd2d65e4b0ce322b0c8665');
if (company) {
  log(company.label());
} else {
  log('company not found');
}
```
<br>

###  findByIdAndLock(entityName, id)

This function finds and lock a record by its ID. If the record is not found, **`null`** will be returned.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity
id|string|yes|ID of the record to find

##### Returns

[sys.data.Record](#sysdatarecord)  - Record or **`null`** if not found

##### Exceptions

**badRequest**

This exception is raised if **`entityName`** is not valid or if **`ID`** is not a valid record ID.

##### Samples

``` javascript
// finds one company by its ID
var company = sys.data.findByIdAndLock('companies', '57fd2d65e4b0ce322b0c8665');
if (company) {
  log(company.label());
} else {
  log('company not found');
}
```
<br>

###  find(entityName, queryMap)

This function retrieves records from the specified entity based on a query map object. It returns a result set that can be iterated to fetch records.

It's important to note that during iteration, records may be returned more than once. This can occur if records are updated either within the iteration itself or by another thread. Be prepared to handle this scenario if it arises.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity
queryMap|object|no|The query map object used to filter records. Check the [Query language documentation]({{<ref "/dev-reference/queries/query-language.md">}}) for the query map version.

##### Returns

[sys.commons.ResultSet]({{<ref "/dev-reference/scripting/sys-commons.md">}}) - A result set that returns [sys.data.Record](#sysdatarecord) objects when iterated.

##### Exceptions

**badRequest**

This exception is raised if **`entityName`** or **`queryMap`** are invalid

##### Samples

``` javascript
// iterates over all companies
var companies = sys.data.find('companies', {});
while (companies.hasNext()) {
  log(companies.next().label());
}
```
<br>

``` javascript
// finds using a query
var companies = sys.data.find('companies', {type: 'a', _sortField: 'name', _sortType: 'asc'});
while (companies.hasNext()) {
  log(companies.next().label());
}
```
<br>

###  find(queryBuilder)

This function retrieves records based on a query builder object. It returns a result set that can be iterated to fetch records.

It's important to note that during iteration, records may be returned more than once. This can occur if records are updated either within the iteration itself or by another thread. Be prepared to handle this scenario if it arises.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
queryBuilder|[sys.data.Query]|yes|The query builder object used to filter records. Check the [Query language documentation]({{<ref "/dev-reference/queries/query-language.md">}}) for the query builder version.

##### Returns

[sys.commons.ResultSet]({{<ref "/dev-reference/scripting/sys-commons.md">}}) - A result set that returns [sys.data.Record](#sysdatarecord) objects when iterated.

##### Exceptions

**badRequest**

This exception is raised if **`queryBuilder`** is invalid

##### Samples

``` javascript
// iterates over all companies
var query = sys.data.createQuery('companies');
var companies = sys.data.find(query);
while (companies.hasNext()) {
  log(companies.next().label());
}
```
<br>

``` javascript
// finds using a query
var query = sys.data.createQuery('companies')
    .field('type').equals('a')
    .sortBy('name', 'asc');
var companies = sys.data.find(query);
while (companies.hasNext()) {
  log(companies.next().label());
}
```
<br>

###  findOne(entityName, queryMap)

This function retrieves one record from the specified entity based on a query map object. If there query returns more than one result, the first one will be returned.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity
queryMap|object|no|The query map object used to filter records. Check the [Query language documentation]({{<ref "/dev-reference/queries/query-language.md">}}) for the query map version.

##### Returns

[sys.data.Record](#sysdatarecord) - The first record found or null if there are no matching records for the given query.

##### Exceptions

**badRequest**

This exception is raised if **`entityName`** or **`queryMap`** are invalid

##### Samples

``` javascript
// finds one company where type is 'b'
var company = sys.data.findOne('companies', {type: 'b'});
log(company.label());
```
<br>

###  findOneAndLock(entityName, queryMap)

This function retrieves and locks one record from the specified entity based on a query map object. If there query returns more than one result, the first one will be returned.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity
queryMap|object|no|The query map object used to filter records. Check the [Query language documentation]({{<ref "/dev-reference/queries/query-language.md">}}) for the query map version.

##### Returns

[sys.data.Record](#sysdatarecord) - The first record found or **`null`** if there are no matching records for the given query.

##### Exceptions

**badRequest**

This exception is raised if **`entityName`** or **`queryMap`** are invalid

##### Samples

``` javascript
// finds one company where type is 'b'
var company = sys.data.findOneAndLock('companies', {type: 'b'});
log(company.label());
```
<br>

###  findOne(queryBuilder)

This function retrieves one record based on a query builder object. If there query returns more than one result, the first one will be returned.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
queryBuilder|[sys.data.Query](#sysdataquery)|yes|The query builder object used to filter records. Check the [Query language documentation]({{<ref "/dev-reference/queries/query-language.md">}}) for the query builder version.

##### Returns

[sys.data.Record](#sysdatarecord) - The first record found or **`null`** if there are no matching records for the given query.

##### Exceptions

**badRequest**

This exception is raised if **`queryBuilder`** is invalid

##### Samples

``` javascript
// finds one company where type is 'b'
var query = sys.data.createQuery('companies')
    .field('type').equals('b');
var company = sys.data.findOne(query);
log(company.label());
```
<br>

###  findOneAndLock(queryBuilder)

This function retrieves and locks one record based on a query builder object. If there query returns more than one result, the first one will be returned.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
queryBuilder|[sys.data.Query](#sysdataquery)|yes|The query builder object used to filter records. Check the [Query language documentation]({{<ref "/dev-reference/queries/query-language.md">}}) for the query builder version.

##### Returns

[sys.data.Record](#sysdatarecord) - The first record found or **`null`** if there are no matching records for the given query.

##### Exceptions

**badRequest**

This exception is raised if **`queryBuilder`** is invalid

##### Samples

``` javascript
// finds one company where type is 'b'
var query = sys.data.createQuery('companies')
    .field('type').equals('b');
var company = sys.data.findOneAndLock(query);
log(company.label());
```
<br>

###  count(queryBuilder)

This function counts the number of records that match the criteria specified in the query builder object. Please note that certain options in the query language, such as **`size`** and **`offset`**, will be ignored when using this function.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
queryBuilder|[sys.data.Query](#sysdataquery)|no|The query builder object used to filter records. Check the [Query language documentation]({{<ref "/dev-reference/queries/query-language.md">}}) for the query builder version.

##### Returns

**`number`** - The number of records matching the criteria.

##### Exceptions

**badRequest**

This exception is raised if **`queryBuilder`** is invalid

##### Samples

``` javascript
// counts companies where type is 'a'
var query = sys.data.createQuery('companies')
    .field('type').equals('b');
var count = sys.data.count(query);
log('count: '+count);
```
<br>



###  aggregate(entityName, aggregateQueryMap)

This function allows you to perform aggregation operations such as sum, average, and count over an entity. It uses an aggregate query map for specifying the aggregation criteria. For more detailed information on how to construct aggregate queries, please refer to the documentation on [Aggregate queries]({{<ref "/dev-reference/queries/aggregate-queries.md">}}).

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity
aggregateQueryMap|object|no|This is the aggregate query map object that defines the operations to perform. Check the documentation for [Aggregate queries]({{<ref "/dev-reference/queries/aggregate-queries.md">}}).

##### Returns

[sys.commons.ResultSet]({{<ref "/dev-reference/scripting/sys-commons.md">}}) - A result set that returns JSON objects when iterated. The structure of this object depends on the aggregation operations performed. Check the documentation for [Aggregate queries]({{<ref "/dev-reference/queries/aggregate-queries.md">}}).

##### Exceptions

**badRequest**

This exception is raised if **`entityName`** or **`aggregateQueryMap`** are invalid

##### Samples

``` javascript
// sums up the total number of skills per customer
var resultSet = sys.data.aggregate('contacts', [
  {match: {'company.isCustomer': true}},
  {group: {by: 'company', totalSkills: 'sum(numberOfSkills)'}}
]);
while (resultSet.hasNext()) {
  var result = resultSet.next();
  // the format of the result is a simple object you can stringify
  log(JSON.stringify(result));
}
```
<br>

``` javascript
// finds contacts with more skills on each company
var resultSet = sys.data.aggregate('contacts', [
  {sort: {'numberOfSkills': 'desc'}},
  {group: {
      by: 'company',
      firstName: 'first(firstName)',
      lastName: 'first(lastName)',
      skills: 'first(numberOfSkills)'
    }
  }
]);
while (resultSet.hasNext()) {
  var result = resultSet.next();
  // the format of the result is a simple object you can stringify
  log(JSON.stringify(result));
}
```
<br>

###  aggregate(aggregateQueryBuilder)

This function allows you to perform aggregation operations such as sum, average, and count over an entity. It uses an aggregate query builder object for specifying the aggregation criteria. For more detailed information on how to construct aggregate queries, please refer to the documentation on [Aggregate queries]({{<ref "/dev-reference/queries/aggregate-queries.md">}}).

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
aggregateQueryBuilder|object|yes|This is the aggregate query builder object that defines the operations to perform. Check the documentation for [Aggregate queries]({{<ref "/dev-reference/queries/aggregate-queries.md">}}).

##### Returns

[sys.commons.ResultSet]({{<ref "/dev-reference/scripting/sys-commons.md">}}) - A result set that returns JSON objects when iterated. The structure of this object depends on the aggregation operations performed. Check the documentation for [Aggregate queries]({{<ref "/dev-reference/queries/aggregate-queries.md">}}).

##### Exceptions

**badRequest**

This exception is raised if **`aggregateQueryBuilder`** is invalid

##### Samples

``` javascript
// sums up the total number of skills per customer
var query = sys.data.createAggregateQuery('contacts');
query.match().field('company.isCustomer').equals(true);
query.group().accumulate('totalNumberOfSkills').sum('numberOfSkills');
var resultSet = sys.data.aggregate(query);
while (resultSet.hasNext()) {
  log(JSON.stringify(resultSet.next()));
}
```
<br>

``` javascript
// finds contacts with more skills on each company
var query = sys.data.createAggregateQuery('contacts');
query.sort().by('numberOfSkills', 'desc');
query.group()
    .by('company')
    .accumulate('firstName').first('firstName')
    .accumulate('lastName').first('lastName')
    .accumulate('skills').first('numberOfSkills');
var resultSet = sys.data.aggregate(query);
while (resultSet.hasNext()) {
  log(JSON.stringify(resultSet.next()));
}
```
<br>

###  refresh(record)

This function retrieves the latest version of a record to ensure it is up-to-date. This is particularly useful to confirm that you have the most recent version of the record, preventing potential optimistic locking exceptions when saving it.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
record|[sys.data.Record](#sysdatarecord)|yes|The record to be refreshed.

##### Returns

[sys.data.Record](#sysdatarecord) - The latest version of the record. It could return null if the record doesn’t exist anymore.

##### Exceptions

**badRequest**

This exception is raised if **`record`** is invalid

##### Samples

``` javascript
// refreshes a company record
var company = sys.data.findById('companies', '57fd2d65e4b0ce322b0c8665');
// ...
// some long operation happens in the middle
// ...
company = sys.data.refresh(company);
if (company) {
  log(company.label());
} else {
  log('company was deleted');
}
```
<br>

###  save(record,options)

This function saves a record in the database, making changes permanent. If the record was already saved (it has an ID that exists in the entity), it will be updated.

This method will execute all validation rules defined in the entity and its fields. Additionally, it will verify the version of the record to ensure that no changes are overwritten. If the version doesn't match, an optimistic locking exception will be thrown.

Once the record is successfully saved, the following events will be triggered:

- **`On record create`**: If the record is new and was created, this event is triggered. You can check the parameter options to modify this behavior.
- **`On record change`**: If the record already existed in the database, this event is triggered. You can check the parameter options to modify this behavior.
- **`Cascade updates`**: If the modification or creation of the record impacts other records, a background job will be created to update them. You can check the parameter options to modify this behavior.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
record|[sys.data.Record](#sysdatarecord)|yes|The record to save into the database. Please note that this object will be updated with the saved version of the record. For instance, if an ID is not present, it will be set, and calculated fields will also be included.
options|object|no|This is a map containing options that can modify the behavior of the save operation, some of which can enhance import performance when dealing with a large number of records. These are the available options:<br>- **`calculateFields`**: When set to **`false`**, calculated fields won't be evaluated and will remain as **`null`** in the saved record. Default is **`true`**.<br> - **`performValidations`**: Indicates whether validations should be executed on the record before saving. Note that type validations are always performed. This option works in conjunction with validations defined in type rules. Default is **`true`**. <br> - **`filterByReadWriteAccess`**: When set to **`false`**, the save process will disregard the read/write access options defined for the fields. This means that all fields will be saved into the database. Default is **`true`**.<br> - **`triggerEvents`**: If set to **`false`**, events such as "on record create" or "on record change" will not be triggered during the save operation. Default is **`true`**.<br> - **`defaultValues`**: When set to **`false`**, default values will not be set during the save operation. Default is **`true`**. <br> - **`cascadeOperations`**: If set to **`false`**, cascade updates for relationship fields or aggregate fields won't be executed. Default is **`true`**.<br> - **`lockRecord`**: If set to **`false`**, the record won't have concurrency protection. This means that listeners or actions could be executed concurrently. Default is **`true`**.<br><br>To configure these settings as defaults, you can use the following parameter:<br> - **`mode`**: Possible values are "standard" and "lite". "Standard" executes the operation using the default values for the parameters described above (this is the default mode). In cases where high performance is required and it's not critical to apply all metadata rules during the save operation, a special "lite" mode is available. In "lite" mode, the record is directly stored in the database without applying validations, permissions, read/write rules, default values, expression calculations, event triggering, cascading, or locking. No result is returned in "lite" mode.

##### Returns

[sys.data.Record](#sysdatarecord) or **null**- The saved or updated record. The ID will be set and calculated or default values will be there. When using the lite mode, null is returned.

##### Exceptions

**validationErrors**

This exception is raised if **`record`** does not meet validation rules defined for the entity.

**optimisticLocking**

This exception is raised if **`record`** is an old version

**badRequest**

This exception is raised if **`record`** is invalid

**notFound**

This exception is raised if the **`record`** is being updated (it has an ID) and it is not found in the database.

##### Samples

``` javascript
// updates a field in a company
var company = sys.data.findById('companies', '57fd2d65e4b0ce322b0c8665');
company.field('notes').val('modified notes');
// you don't need to reassign the 'company' variable because the parameter will be updated
sys.data.save(company);
// ...
// do some other changes and save again
company.field('notes').val('another modification');
sys.data.save(company);
```
<br>

``` javascript
// catches validation errors
var company = sys.data.findById('companies', '57fd2d65e4b0ce322b0c8665');
company.field('type').val('invalid');
try {
  sys.data.save(company);
} catch (e) {
  log(e.code()+': '+e.message());
}
```
<br>

``` javascript
// optimistic locking exception
var company1 = sys.data.findById('companies', '57fd2d65e4b0ce322b0c8665');
var company2 = sys.data.findById('companies', '57fd2d65e4b0ce322b0c8665');
company1.field('notes').val('modified notes');
sys.data.save(company1);
try {
  // this will throw an optimistic locking exception because the record was modified in the middle
  sys.data.save(company2);
} catch (e) {
  log(e.code()+': '+e.message());
}
```
<br>

``` javascript
// high performant update a company record
var company = sys.data.findById('companies', '57fd2d65e4b0ce322b0c8665');
company.field('type').val('typeA');
company.field('notes').val('This is a note');
sys.data.save(company, {mode: 'lite'});
```
<br>


###  createRecord(entityName)

This function creates a new, empty [sys.data.Record](#sysdatarecord) object. Please note that this record is not saved into the database until you explicitly call [`save()`](#👉-saverecordoptions).

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity.

##### Returns

[sys.data.Record](#sysdatarecord)  - The empty record object.

##### Exceptions

**badRequest**

If **`entityName`** is not valid

##### Samples

``` javascript
// creates a new company
var company = sys.data.createRecord('companies');
company.field('name').val('test company '+parseInt(Math.random()*999));
// saves the new company into the database
sys.data.save(company);
company = sys.data.findById('companies', company.id());
log('saved company: '+company.label());
// clean up the created company
sys.data.remove(company);
```
<br>

###  remove(record)

This function deletes a record from the database.

Upon successful deletion of the record, the following events are triggered:

- **`On record delete`**
- **`Cascade updates`**: If the deletion of the record has an impact on other records, a background job will be created to update them.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
record|[sys.data.Record](#sysdatarecord)|yes|The record to remove from the database.

##### Returns

[sys.data.Record](#sysdatarecord)  - The record that was removed.

##### Exceptions

**badRequest**

If **`record`** is not valid.

**notFound**

If **`record`** is not found in the database.

##### Samples

``` javascript
// creates and deletes a company
var company = sys.data.createRecord('companies');
company.field('name').val('test company '+parseInt(Math.random()*999));
// saves the new company into the database
sys.data.save(company);
// deletes the just created company
var deletedCompany = sys.data.remove(company);
log('company ['+deletedCompany.label()+'] was deleted');
```
<br>

###  delete(entityName, queryMap, options)

This function deletes records that match the criteria specified in the query map object. Please note that certain options in the query language, such as **`size`** and **`offset`**, will be ignored when using this function.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity
queryMap|object|no|The query map object used to filter records. Check the [Query language documentation]({{<ref "/dev-reference/queries/query-language.md">}}) for the query map version.
options|object|no|This is a map containing options that can modify the behavior of the deletion operation, and some of them can enhance delete performance when dealing with a large number of records. These are the available options:<br> - **`triggerEvents`**: If set to **`false`**, deletion events will not be triggered. Default is **`true`**. <br> - **`cascadeOperations`**: If set to **`false`**, cascade updates for updating relationship fields or aggregate fields will not be executed. Default is **`true`**.<br> - **`lowPrioriyt`**: Setting this option to **`true`** will mark the job as low priority, causing the deletion to occur only when there are not many jobs running. Default is **`false`**.

##### Returns

**`string`** - Identifier of deletion job.

##### Exceptions

**badRequest**

This exception is raised if **`entityName`** or **`queryMap`** are invalid

##### Samples

``` javascript
// deletes active companies
var jobId = sys.data.delete('companies', {active: true});
log('jobId: '+jobId);
sys.jobs.waitForJob(jobId, 'FINISHED', 1000*10);
```
<br>

###  delete(queryBuilder, options)

This function deletes records that match the criteria specified in the query builder object. Please note that certain options in the query language, such as **`size`** and **`offset`**, will be ignored when using this function.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
queryBuilder|[sys.data.Query](#sysdataquery)|no|The query builder object used to filter records. Check the [Query language documentation]({{<ref "/dev-reference/queries/query-language.md">}}) for the query builder version.
options|object|no|This is a map containing options that can modify the behavior of the deletion operation, and some of them can enhance delete performance when dealing with a large number of records. These are the available options:<br> - **`triggerEvents`**: If set to **`false`**, deletion events will not be triggered. Default is **`true`**. <br> - **`cascadeOperations`**: If set to **`false`**, cascade updates for updating relationship fields or aggregate fields will not be executed. Default is **`true`**.<br> - **`lowPrioriyt`**: Setting this option to **`true`** will mark the job as low priority, causing the deletion to occur only when there are not many jobs running. Default is **`false`**.

##### Returns

**`string`** - Identifier of deletion job.

##### Exceptions

**badRequest**

This exception is raised if **`queryBuilder`** is invalid

##### Samples

``` javascript
// deletes companies where type is 'b'
var query = sys.data.createQuery('companies')
    .field('type').equals('b');
var jobId = sys.data.delete(query);
log('jobId: '+jobId);
sys.jobs.waitForJob(jobId, 'FINISHED', 1000*10);
```
<br>

###  importRecords(entityName, fileId, options)

This function allows you to import records from a CSV file that must already be uploaded. The file can be stored in a field inside a record, retrieved from an endpoint like FTP or HTTP, or created within the script.

The rules for importing from a CSV file are the same as when you import a CSV using the app runtime UI. Please refer to the documentation on imports to understand how they work.

It's important to note that for each record you import, the same events as those triggered by the [`save()`](#👉-saverecordoptions) method will also be triggered.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity.
fileId|string|yes|The ID of the file to import. This should be a private file that has been uploaded into the app previously. For example, it could have been uploaded through the app runtime UI into a file field, uploaded from an HTTP or FTP endpoint, or created as a file using a script. You can refer to the samples to see the various options.
options|object|no| This is a map containing options that can modify the behavior of the import operation, and some of them can enhance import performance when dealing with a large number of records. These are the available options: <br> - **`skipRecordsWithInvalidFields`**: When set to **`true`**, if some fields cannot be converted or are not valid, they will be set to null, and an attempt to save the record will still be made. If set to **`false`**, an exception will be thrown, and the record won't be imported. Default is **`true`**. <br> - **`calculateFields`**: If set to **`false`**, calculated fields will not be evaluated when records are imported and will remain as null. Default is **`true`**. <br> - **`performValidations`**: Indicates whether validations should be executed during the import process. Please note that type validations are always performed. This option works in conjunction with validations defined in type rules. Default is **`true`**. <br> - **`filterByReadWriteAccess`**: When set to **`false`**, the import process will disregard the read/write access options defined for fields, and all fields will be imported into the database. Default is **`true`**. <br> - **`triggerEvents`**: If set to **`false`**, events like "on record create" or "on record change" will not be triggered during the import process. Default is **`true`**. <br> - **`defaultValues`**: If set to **`false`**, default values in imported records will not be set. Default is **`true`**.<br> - **`cascadeOperations`**: If set to **`false`**, cascade updates for updating relationship fields or aggregate fields will not be executed during the import process. Default is **`true`**. <br> - **`lowPriority`**: Setting this option to **`true`** marks the job as low priority, causing the import to occur only when there are not many jobs running. Default is **`false`**. <br>

##### Returns

**`string`** - The ID of the background job responsible for the import. To monitor the progress of the import, including any errors, you should check the status of the background job.

##### Exceptions

**badRequest**

This exception is raised if **`entitiName`** or **`fileId`** are invalid.

##### Samples

``` javascript
// creates a CSV file, imports it into 'companies' entity using low priority and then does a clean up to remove those records
var total = 10;
var fileWriter = sys.files.create('companies.csv', 'text/csv');
try {
  fileWriter.writeHeaders(['name', 'state', 'type']);
  for (var i = 0; i < total; i++) {
    log('writting row '+i);
    fileWriter.writeRow(['test'+i, 'active', 'a']);
  }
} finally {
  fileWriter.close();
}
// import data
var jobId = sys.data.importRecords('companies', fileWriter.descriptor().id(), {lowPriority: true});
sys.jobs.waitForJob(jobId, 'FINISHED', 60*1000);
log(total+' records imported!');
// clean up
var testRecords = sys.data.find('companies', {name: 'like(test)'});
var recordsRemoved = 0;
while (testRecords.hasNext()) {
  sys.data.remove(testRecords.next());
  recordsRemoved++;
}
log(recordsRemoved+' records removed!');
```
<br>

```js
// imports records from a file field
// find record with file
var fileRecord = sys.data.findOne('files', {code: 'test-companies'});
// import data
var jobId = sys.data.importRecords('companies', fileRecord.field('file').id(), {lowPriority: true});
sys.jobs.waitForJob(jobId, 'FINISHED', 60*1000);
log('records imported!');
// clean up
var testRecords = sys.data.find('companies', {name: 'like(test)'});
var recordsRemoved = 0;
while (testRecords.hasNext()) {
  sys.data.remove(testRecords.next());
  recordsRemoved++;
}
log(recordsRemoved+' records removed!');
```
<br>

###  executeAction(entityName, queryMap, actionName, params)

Executes an action in the background over the records returned by the query.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity
queryMap|object|yes|The query map object used to filter records. Check the [Query language documentation]({{<ref "/dev-reference/queries/query-language.md">}}) for the query map version.
actionName|string|yes|The name of the action to be executed.
params|object|no|If the action has parameters you should put them here. The format is the same used by the REST API.
options|object|no|If the action has options you should put them here. For example, use async: false if you don't want it to run in the background.


##### Returns

**`string`** - The ID of the background job responsible for executing the action over all records. To monitor progress (including any errors), you should check the status of the background job. **If you set async to false, it will not return the ID of the background; instead, it will return the result of the action**

##### Exceptions

**badRequest**

This exception is raised if **`entityName`** or **`queryMap`** or **`actionName`** are invalid

##### Samples

``` javascript
// executes the action 'logSomething' over 10 company records of type 'a'
var jobId = sys.data.executeAction('companies', {type: 'a', _size: 10}, 'logSomething');
sys.jobs.waitForJob(jobId, 'FINISHED', 60*1000);
log('completed!');
```
<br>

``` javascript
// executes the action 'logSomething' over 10 company records of type 'a', sending a parameter
var jobId = sys.data.executeAction('companies', {type: 'a', _size: 10}, 'logSomething', {param1: 'a', param2: 'b'});
sys.jobs.waitForJob(jobId, 'FINISHED', 60*1000);
log('completed!');
```
<br>

###  executeAction(queryBuilder, actionName, body)

Executes an action in the background or synchronously over the records returned by the query

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
queryBuilder|[sys.data.Query](#sysdataquery)|yes|The query builder object used to filter records. Check the [Query language documentation]({{<ref "/dev-reference/queries/query-language.md">}}) for the query builder version.
actionName|string|yes|The name of the action to be executed.
body|object|no|If the action has parameters you should put them here. The format is the same used by the REST API.
options|object|no|If the action has options you should put them here. For example, use async: false if you don't want it to run in the background.


##### Returns

**`string`** - The ID of the background job responsible for executing the action over all records. To monitor progress (including any errors), you should check the status of the background job. **If you set async to false, it will not return the ID of the background; instead, it will return the result of the action**

##### Exceptions

**badRequest**

This exception is raised if **`queryBuilder`** or **`actionName`** are invalid

##### Samples

``` javascript
// executes the action 'logSomething' over 10 company records of type 'a'
var query = sys.data.createQuery('companies')
    .field('type').equals('a')
    .size(10);
var jobId = sys.data.executeAction(query, 'logSomething');
sys.jobs.waitForJob(jobId, 'FINISHED', 60*1000);
log('completed!');
```
<br>

``` javascript
// executes the action 'logSomething' over 10 company records of type 'a', sending a parameter
var query = sys.data.createQuery('companies')
    .field('type').equals('a')
    .size(10);
var jobId = sys.data.executeAction(query, 'logSomething', {param1: 'a', param2: 'b'});
sys.jobs.waitForJob(jobId, 'FINISHED', 60*1000);
log('completed!');
```
<br>

###  executeGlobalAction(entityName, actionName, params)

Performs the execution of a global action.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity
actionName|string|yes|The name of the action to be executed.
params|object|no|If the action has parameters you should put them here. The format is the same used by the REST API.
options|object|no|If the action has options you should put them here.For example, use async: false if you don't want it to run in the background.

##### Returns

**`string`** - The ID of the background job responsible for executing the action over all records. To monitor progress (including any errors), you should check the status of the background job.

##### Exceptions

**badRequest**

This exception is raised if **`entityName`** or **`actionName`** are invalid

##### Samples

``` javascript
// executes the global action 'quickAdd' on companies entity and then finds the created company and log some properties
var actionParams = {'name': 'Quick company', 'address': {'addressLine1': 'Siempre viva street'}};
var options = {async: false};
var jobId = sys.data.executeGlobalAction('companies', 'quickAdd', actionParams, options);
sys.jobs.waitForJob(jobId, 'FINISHED', 1000*10);
var dataCursor = sys.data.find('companies', {name: 'Quick company'});
var dataFound = dataCursor.next();
log(dataFound.id());
log(dataFound.label());
log(dataFound.field('address.addressLine1').val());
```
<br>

###  tryLock(record, timeout)

This function attempts to acquire a lock for a specified record. It should be used when multiple threads are trying to access the same record, especially in cases where you have listeners or actions that could be executed concurrently.

If the lock has already been acquired, this method will wait until it is released. If the lock cannot be acquired within the specified timeout, it will return **`null`** instead of the record.

It's important to note that if you attempt to lock the same record within the same execution context, the lock will be granted immediately. This follows the concept of a reentrant lock.

You should always release the lock using **`unlock()`**, and it's recommended to do so in a **`finally`** block to ensure it happens. However, in case you forget to release the lock, the platform will automatically release the locks at the end of the script execution if they were not released manually.

**Important!**: The lock will be held for a maximum of 30 minutes, after which it will be automatically released.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
record|[sys.data.Record](#sysdatarecord)|yes|The record object.
timeout|number|yes|The maximum time in seconds to wait for the lock be acquired. If the lock cannot be acquired it returns a **`null`**.

##### Returns

[sys.data.Record](#sysdatarecord) - The updated version of the record when the lock was acquired, otherwise a **`null`** object.

##### Exceptions

**badRequest**

This exception is raised if **`record`** or **`timeout`** are invalid

**notFound**

If **`record`** is not found in the database

##### Samples

``` javascript
// locks a record for 20 seconds

var company = sys.data.findOne('companies', {name:'Blogpad'});
company = sys.data.tryLock(company);
try {
  // write some code here to update the company
  // if from the app you try to update the record it will be blocked
  // until the lock is released
  log('do something');
  sys.utils.script.wait(20000);
} finally {
  sys.data.unlock(company);
}
```
<br>

###  lock(record, timeout)

This function acquires a lock for a specified record. It should be used when multiple threads are trying to access the same record, especially in cases where you have listeners or actions that could be executed concurrently.

If the lock has already been acquired, this method will wait until it is released. If the lock cannot be acquired within the specified timeout, it will return **`null`** instead of the record.

It's important to note that if you attempt to lock the same record within the same execution context, the lock will be granted immediately. This follows the concept of a reentrant lock.

You should always release the lock using **`unlock()`**, and it's recommended to do so in a **`finally`** block to ensure it happens. However, in case you forget to release the lock, the platform will automatically release the locks at the end of the script execution if they were not released manually.

**Important!**: The lock will be held for a maximum of 30 minutes, after which it will be automatically released.

##### Parameters

| Name  | Type  | Required |Default| Description |
|---|---|---|---|---|
record|[sys.data.Record](#sysdatarecord)|yes|-|The record object.
timeout|number|yes|300000 (5 minutes)|The maximum time in seconds to wait for the lock be acquired. If the lock cannot be acquired it returns a **`null`**.

##### Returns

[sys.data.Record](#sysdatarecord) - The updated version of the record when the lock was acquired, otherwise a **`null`** object.

##### Exceptions

**badRequest**

This exception is raised if **`record`** or **`timeout`** are invalid

**notFound**

If **`record`** is not found in the database

**timeout**

If the lock couldn’t be acquiered within the specified **`timeout`**.

##### Samples

``` javascript
// locks a record for 20 seconds
var company = sys.data.findOne('companies', {name:'Blogpad'});
try {
  company = sys.data.lock(company);
  try {
    // write some code here to update the company
    // if from the app you try to update the record it will be blocked
    // until the lock is released
    log('do something');
    sys.utils.script.wait(20000);
  } finally {
    sys.data.unlock(company);
  }
} catch (le) {
  sys.logs.error('Error acquiring lock');
}
```
<br>

``` javascript
// locks a record several times
var company = sys.data.findOne('companies', {name:'Blogpad'});
company = sys.data.lock(company);
// you can lock again in the same context as it is a reentrant lock
company = sys.data.lock(company);
// you need to unlock twice to release it
sys.data.unlock(company);
sys.data.unlock(company);
```
<br>

###  tryLockById(entityName, recordId, timeout)

This function attempts to acquire a lock for a specified record using its ID (useful when you don’t have the record object but just the ID). It should be used when multiple threads are trying to access the same record, especially in cases where you have listeners or actions that could be executed concurrently.

If the lock has already been acquired, this method will wait until it is released. If the lock cannot be acquired within the specified timeout, it will return **`null`** instead of the record.

It's important to note that if you attempt to lock the same record within the same execution context, the lock will be granted immediately. This follows the concept of a reentrant lock.

You should always release the lock using **`unlock()`**, and it's recommended to do so in a **`finally`** block to ensure it happens. However, in case you forget to release the lock, the platform will automatically release the locks at the end of the script execution if they were not released manually.

**Important!**: The lock will be held for a maximum of 30 minutes, after which it will be automatically released.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity.
recordId|string|yes|The ID of the record to acquire the lock.
timeout|number|yes|The maximum time in milliseconds to wait for the lock be acquired. If the lock cannot be acquired it returns a **`null`**.

##### Returns

[sys.data.Record](#sysdatarecord) - The updated version of the record when the lock was acquired.

##### Exceptions

**badRequest**

This exception is raised if **`record`** or **`timeout`** are invalid.

**notFound**

If record with ID **`recordId`** is not found in the database.

##### Samples

``` javascript
// locks a record for 20 seconds
var company = sys.data.lockById('companies', '57fd2d65e4b0ce322b0c8565');
try {
  if (company) {
    log('company ['+company.label()+'] is locked');
    // write some code here to update the company
    // if from the app you try to update the record it will be blocked
    // until the lock is released
    log('do something');
    sys.utils.script.wait(20000);
  }
} finally {
  log('unlocking company ['+company.label()+']');
  sys.data.unlock(company);
}
```
<br>

###  lockById(entityName, recordId, timeout)

This function acquires a lock for a specified record using its ID (useful when you don’t have the record object but just the ID). It should be used when multiple threads are trying to access the same record, especially in cases where you have listeners or actions that could be executed concurrently.

If the lock has already been acquired, this method will wait until it is released. If the lock cannot be acquired within the specified timeout, it will return **`null`** instead of the record.

It's important to note that if you attempt to lock the same record within the same execution context, the lock will be granted immediately. This follows the concept of a reentrant lock.

You should always release the lock using **`unlock()`**, and it's recommended to do so in a **`finally`** block to ensure it happens. However, in case you forget to release the lock, the platform will automatically release the locks at the end of the script execution if they were not released manually.

**Important!**: The lock will be held for a maximum of 30 minutes, after which it will be automatically released.

##### Parameters

| Name  | Type  | Required | Default |Description |
|---|---|---|---|---|
entityName|string|yes|-|The name of the entity.
recordId|string|yes|-|The ID of the record to acquire the lock.
timeout|number|yes|	300000 (5 minutes)|The maximum time in milliseconds to wait for the lock be acquired. If the lock cannot be acquired it returns a **`null`**.

##### Returns

[sys.data.Record](#sysdatarecord) - The updated version of the record when the lock was acquired.

##### Exceptions

**badRequest**

This exception is raised if **`recordId`** or **`timeout`** are invalid.

**notFound**

If record with ID **`recordId`** is not found in the database.

**timeout**

If the lock couldn’t be acquiered within the specified timeout.

##### Samples

``` javascript
// locks a record for 20 seconds
try {
  var company = sys.data.lockById('companies', '57fd2d65e4b0ce322b0c8565');
  log('company ['+company.label()+'] is locked');
  try {
    // write some code here to update the company
    // if from the app you try to update the record it will be blocked
    // until the lock is released
    log('do something');
    sys.utils.script.wait(20000);
  } finally {
    log('unlocking company ['+company.label()+']');
    sys.data.unlock(company);
  }
} catch(le) {
  sys.logs.error('Log could not have been acquired', le);
}
```
<br>

###  unlock(record)

This function releases a lock that was previously acquired.

If the lock was acquired multiple times, it needs to be released an equivalent number of times as well.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
record|[sys.data.Record](#sysdatarecord)|yes|The record object.

##### Exceptions

**badRequest**

This exception is raised if **`record`** is invalid.

**notFound**

If **`record`** is not found in the database.

##### Samples

``` javascript
// locks a record for 20 seconds und unlocks it at the end
var company = sys.data.findOne('companies', {name:'Blogpad'});
company = sys.data.lock(company);
try {
  // write some code here to update the company
  // if from the app you try to update the record it will be blocked
  // until the lock is released
  log('do something');
  sys.utils.script.wait(20000);
} finally {
  sys.data.unlock(company);
}
```
<br>


###  unlockById(entityName, recordId)

This function releases a lock that was previously acquired.

If the lock was acquired multiple times, it needs to be released an equivalent number of times as well.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity.
recordId|string|yes|The ID of the record to unlock.

##### Exceptions

**badRequest**

This exception is raised if **`record`** is invalid.

**notFound**

If record with ID: **`recordId`** is not found in the database.

##### Samples

``` javascript
// locks a record for 20 seconds und unlocks it at the end
var company = sys.data.lockById('companies', '57fd2d65e4b0ce322b0c8565');
log('company ['+company.label()+'] is locked');
try {
  // write some code here to update the company
  // if from the app you try to update the record it will be blocked
  // until the lock is released
  log('do something');
  sys.utils.script.wait(20000);
} finally {
  log('unlocking company ['+company.label()+']');
  sys.data.unlockById('companies', '57fd2d65e4b0ce322b0c8565');
}
```
<br>

###  replaceRefs(from, to)

This function replaces all references pointing to the **`from`** entity with references to the **`to`** entity. For example, if you have two companies, each with contacts and orders, and you want to merge those two companies, this function allows you to change all relationship fields pointing to **`company1`** to instead point to **`company2`**.

```js
sys.data.replaceRefs(company1, company2);
```
<br>

{{< notes type="warning">}}
<b>Important!!!</b>  This change will be applied to all records in all entities, and there is no way to roll it back.
{{< /notes >}}

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
from|[sys.data.Record](#sysdatarecord)|yes|The record you want to replace its references.
to|[sys.data.Record](#sysdatarecord)|no|The record you want to reference instead of **`from`**. This can be **`null`** and reference will be removed.

##### Returns

**`string`** - The ID of the background job responsible for replacing references over all records. To monitor progress (including any errors), you should check the status of the background job.

##### Exceptions

**badRequest**

This exception is raised if **`from`** or **`to`** are invalid

**notFound**

If **`toId`** is provided and record with ID: **`toId`** is not found in the database.

##### Samples

``` javascript
// locks a record for 20 seconds und unlocks it at the end
// create 2 companies
var company1 = sys.data.createRecord('companies');
company1.field('name').val('testA');
sys.data.save(company1);
var company2 = sys.data.createRecord('companies');
company2.field('name').val('testB');
sys.data.save(company2);
// create 2 contacts associated to company1
var contact1 = sys.data.createRecord('contacts');
contact1.field('company').val(company1);
contact1.field('firstName').val('contact1');
contact1.field('lastName').val('test');
contact1.field('email').val('contact1@test.com');
sys.data.save(contact1);
var contact2 = sys.data.createRecord('contacts');
contact2.field('company').val(company1);
contact2.field('firstName').val('contact2');
contact2.field('lastName').val('test');
contact2.field('email').val('contact2@test.com');
sys.data.save(contact2);
// replace references from company1 to company2
var jobId = sys.data.replaceRefs(company1, company2);
sys.jobs.waitForJob(jobId, 'FINISHED', 60*1000);
// check if references were modified
contact1 = sys.data.refresh(contact1);
contact2 = sys.data.refresh(contact2);
log(contact1.field('company').label());
log(contact2.field('company').label());
```
<br>

###  createQuery(entityName)

This function initializes and returns a [sys.data.Query](#sysdataquery) object. Please refer to the documentation for the [Query language]({{<ref "/dev-reference/queries/query-language.md">}}) for more information.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity.

##### Returns

[sys.data.Query](#sysdataquery)  - The query builder object for the given entity.

##### Exceptions

**badRequest**

If **`entityName`** is not valid

##### Samples

``` javascript
// creates a query to find companies with type 'a'
var query = sys.data.createQuery('companies');
query.field('type').equals('a');
log('total A companies: '+sys.data.count(query));
```
<br>

###  createAggregateQuery(entityName)

This function initializes and returns a [sys.data.AggregateQuery](#sysdataaggregatequery) object. Please refer to the documentation for the [Query language]({{<ref "/dev-reference/queries/query-language.md">}}) for more information.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|The name of the entity.

##### Returns

[sys.data.AggregateQuery](#sysdataaggregatequery)  - The aggregate query builder object for the given entity.

##### Exceptions

**badRequest**

If **`entityName`** is not valid

##### Samples

``` javascript
// creates an aggregate query to find the contact with more skills per company
var query = sys.data.createAggregateQuery('contacts');
query.sort().by('numberOfSkills', 'desc');
query.group()
    .by('company')
    .accumulate('firstName').first('firstName')
    .accumulate('lastName').first('lastName')
    .accumulate('skills').first('numberOfSkills');
var resultSet = sys.data.aggregate(query);
while (resultSet.hasNext()) {
  log(JSON.stringify(resultSet.next()));
}
```
<br>

## **sys.data.Record**

**`sys.data.Record`** represents a record of an entity. It contains methods to read and write fields, execute actions, and perform various other operations.

All operations that retrieve data will return objects of this type. For example, [`sys.data.findOne()`](#👉-findoneentityname-querymap) or [`sys.data.findById()`](#👉-findbyidentityname-id) return objects of [`sys.data.Record`](#sysdatarecord).

You can also create **`Record`** objects using the method [`sys.data.createRecord()`](#👉-createrecordentityname):

```js
var company = sys.data.createRecord('companies');
company.field('name').val('test company');
sys.data.save(company);
```
<br>

###  id()

Returns the ID of the record. If this is a new record that hasn’t been saved into the database, this will return null.

##### Returns

**`string`**  - The ID of the record.

##### Samples

``` javascript
// finds 10 companies and logs their ID
var companies = sys.data.find('companies', {type: 'a', _size: 10});
while (companies) {
  var company = companies.next();
  log('ID: '+company.id());
}
```
<br>

###  label()

This function returns the label of the record based on the instance label expression defined in the entity. Please note the following:

- The label is calculated when the record is saved into the database.
- New records that haven't been saved won't have a label.
- Records that were modified but not updated might have an outdated label.

##### Returns

**`string`**  - The label of the record.

##### Samples

``` javascript
// finds 10 companies and logs their label
var companies = sys.data.find('companies', {type: 'a', _size: 10});
while (companies.hasNext()) {
  var company = companies.next();
  log('Label: '+company.label());
}
```
<br>

###  entityName()

Returns the name of the entity the record belongs to.

##### Returns

**`string`**  - The name of the entity.

##### Samples

``` javascript
// prints the name of the entity
var company = sys.data.findOne('companies', {type: 'a'});
log('Entity name: '+company.entityName());
```
<br>

###  entityId()

Returns the ID of the entity the record belongs to.

##### Returns

**`string`**  - The ID of the entity.

##### Samples

``` javascript
// prints the name of the entity
var company = sys.data.findOne('companies', {type: 'a'});
log('Entity name: '+company.entityId());
```
<br>

###  field(path)

This function returns a wrapper for the field at the specified path. Wrappers provide various methods for accessing data in different ways, and they are type-specific. This means that each data type will offer different methods. Please refer to the documentation of [`sys.data.Wrapper`](#sysdatawrapper) for more information.

It's important to note that this method doesn't return the actual value of the field. Instead, it returns an object of type [`sys.data.Wrapper`](#sysdatawrapper), which you can use to read and manipulate the value. For example:

```js
// 'company' is a record in entity 'companies'
// get the name of the company
var name = company.field('name').val();
// set the name of the company
record.field('name').val('new name');
```
<br>

It is possible to access nested fields:

```js
// 'contact' is a record in entity 'contacts'
// get the state of contacts
var state = company.field('address.state').val();
// set the state of the contact
record.field('address.state').val('NY');
```
<br>

If fields are multi-valued you can access them using an index:

```js
// 'company' is a record in entity 'companies'
// get the first state for a company
var state = company.field('addresses[0].state').val();
// the above line is the same as this one:
var state = company.field('addresses').first().field('state').val();
// set a value in a multi-valued field
company.field('addresses[1].state').val('CA');
```
<br>

If the index is out of bounds, no exception will be thrown. Instead, if you are trying to read the value, you will get **`null`**. If you are trying to set the value, a new element will be created.

When you attempt to access a multi-valued field, you will receive a [`sys.data.ManyWrapper`](#sysdatamanywrapper) object. This object provides several methods for accessing the items inside:

```js
// 'company' is a record in entity 'companies'
// gets the state of the first address
company.field('addresses').first().field('state').val();
// gets the state of the last address
company.field('addresses').last().field('state').val();
// iterates over all addresses
company.field('addresses').each(function(address) {
  log('State: '+address.field('state').val());
});
```
<br>

Please check the documentation of [sys.data.ManyWrapper](#sysdatamanywrapper) for more information.

Finally, if the path is not a valid field, an exception will be thrown.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field. It could be a nested or multi-valued field.

##### Returns

[sys.data.Wrapper](#sysdatawrapper) | [sys.data.ManyWrapper](#sysdatamanywrapper)  - A wrapper that you can use to read and manipulate the value.

##### Exceptions

**badRequest**

If **`path`** is invalid

##### Samples

``` javascript
// prints the name of 10 companies
var companies = sys.data.find('companies', {_size: 10});
while (companies.next()) {
  var company = companies.next();
  log('name: '+company.field('name').val());
}
```
<br>

``` javascript
// creates a new company and sets the name
var company = sys.data.createRecord('companies');
company.field('name').val('test company');
sys.data.save(company);
```
<br>

###  parent()

This is particularly useful when you are working with records that have a prefix set. For example, let's consider an entity with the following structure:

- **`name`**
- **`orderLines`** (multi-valued)
  - **`product`**
  - **`quantity`**
  - **`notes`** (multi-valued)
    - **`note`**
    - **`date`**
    - **`user`**
- **`calculatedField`**

The **`calculatedField`** can have a script to calculate its value, and you will find the variable **`parentField`** in there. This variable represents a record object, but it has a prefix specific to that particular **`notes`** field, like **`orderLines[2].notes[1]`**. This prefix is important because you might need to know the path of your field, allowing you to write expressions like this one:

``` js
return parentField.parent().parent().field('name').val() + ' ' +
  parentField.parent().field('product').name() + ' ' +
  parentField.field('note').val();
```
<br>

##### Returns

[sys.data.Record](#sysdatarecord)  - The record object with a prefix set to the parent field

##### Samples

``` javascript
// this is the value expression for a calculated field taken the sample in the description
return parentField.parent().parent().field('name').val() + ' ' +
  parentField.parent().field('product').name() + ' ' +
  parentField.field('note').val();
```
<br>

###  copy()

This method allows to get a copy of a record and save it as a new one. This is helpful when creating several similar records just changes a few fields

##### Returns

[sys.data.Record](#sysdatarecord)  - The record object without identifiers

##### Samples

``` javascript
// this is the copy of record with name changed and saved.
var copy = record.copy();
copy.field('name').val('newOne');
sys.data.save(copy);
```
<br>

###  isNew()

If the record has an ID set, this method will return **`false`**. Otherwise it will return **`true`**.

##### Returns

**`boolean`**  - **`true`** if the record doesn’t have an ID, **`false`** otherwise.

##### Samples

``` javascript
// check if record is new before and after saving
var company = sys.data.createRecord('companies');
company.field('name').val('test1');
log('new: '+company.isNew());
sys.data.save(company);
log('new: '+company.isNew());
```
<br>

###  action(actionName, params)

This function executes the specified action over the record. The record must be saved into the database before executing an action.

If the action has parameters, you can provide them as the second argument.

The response will vary based on the action's configuration. There are two possible responses:

- **`Record`**: If the action doesn't return any custom response, this method will return the updated record.

- **`Custom Action Response`**: If the action returns a custom response, then that response will be returned.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
actionName|string|yes|The name of the action to execute.
params|object|no|If the action has parameters you should put them here. The format is the same used by the REST API.

##### Returns

**`object`**  - An object of type [sys.data.Record](#sysdatarecord) or a custom response if the action has been configured to do that.

##### Samples

``` javascript
// executes the action 'logSomething' over a company
var company = sys.data.findOne('companies', {name: 'Blogpad'});
company.action('logSomething');
log('completed!');
```
<br>

``` javascript
// executes the action 'logSomething' over a company with parameters
var company = sys.data.findOne('companies', {name: 'Blogpad'});
company.action('logSomething', {param1: 'a', param2: 'b'});
log('completed!');

```
<br>

###  auditLogs()

This function returns an object of type [`sys.data.RecordAuditLogs`](#sysdatarecordauditlogs) that allows you to query audit logs. For more information on how to query a record's audit logs, please refer to [`sys.data.RecordAuditLogs`](#sysdatarecordauditlogs).

##### Returns

[sys.data.RecordAuditLogs](#sysdatarecordauditlogs)  - An object of type [sys.data.RecordAuditLogs](#sysdatarecordauditlogs) to query audit logs

##### Samples

``` javascript
// prints who created the record
var company = sys.data.findOne('companies', {name: 'Blogpad'});
log('creator: '+company.auditLogs().createLog().user());
```
<br>

###  toJson(options)

Converts the record to its native JSON representation.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
options|object|no| These options allow you to control how the record will be converted. The available options are: <br> - **`fields`**: By default, all fields will be fetched. If you want to specify which fields you want to fetch, you can pass this parameter. You can specify multiple fields by separating them with commas. System fields will always be returned (e.g., id, version, etc.). <br> - **`relationshipsToFetch`**: A comma-separated list of relationship fields that will be fetched within the record. For example, if an entity has relationship fields named 'company' and 'region', you can fetch those referenced records like this: <br><br><pre><code>relationshipsToFetch: 'company,region'</code></pre><br> - **`format`**: The format to use when fetching the fields. There are two options: 'native' and 'plainText'. The 'native' option shows the raw value of each field, while 'plainText' returns the values of the fields converted using the display option of each field. The default value is 'native'.<br> - **`user`**: If the format is 'plainText', we may need the user context to convert values with the correct internationalization and timezones. The default is the current user.

##### Returns

**`object`**  - A key-value JSON structure with the fields of the record converted to their native representation.

##### Samples

``` javascript
// converts a contact to the JSON representation
var record = sys.data.findOne('contacts', {email: 'gowensb1@google.ca'});
var recordJson = record.toJson({relatedFields: 'company'});
log('JSON version of record: ' + recordJson);
```
<br>

###  fromJson(recordJson)

Parses a JSON representation of the record.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
recordJson|object|yes|A key-value object map containing the proper record representation. A partial record representation is allowed.

##### Samples

``` javascript
// copies contact info to a new person record using JSON representation
var contact = sys.data.findOne('contacts', {email: 'gowensb1@google.ca'});
var contactJson = record.toJson();
var person = sys.data.createRecord('people');
person.fromJson(contactJson);
log('Person after update: ' + person.toJson());
```
<br>

``` javascript
// performs a partial update of a contact
var person = sys.data.findOne('people', {sid: '20309721919'});
var contact = sys.data.findOne('contacts', {email: 'gowensb1@google.ca'});
contact.fromJson({
    phoneNumber: person.field('phoneNumber').val(),
    webSite: person.field('webSite').val()
});
log('Contact after update: ' + contact.toJson({}));
```
<br>

###  lock(callback)

This function is used to obtain a lock for the current record. It should be employed when multiple threads are vying for access to the same record, particularly in scenarios where listeners or actions might execute concurrently.

If the lock has already been acquired, this method will wait until it becomes available. However, if the lock cannot be acquired within the specified timeout, an exception will be thrown.

It's important to note that if you attempt to lock the same record within the same execution context, the lock will be granted immediately, adhering to the reentrant lock concept.

If you provide the **`callback`** parameter, the lock will be automatically released once the callback finishes executing. Furthermore, after the callback execution, if any modifications were made to the record within the callback, the record object will be automatically refreshed.

In cases where you don't specify the **`callback`** parameter, it is imperative to release the lock using the **`unlock()`** method. The best practice is to do this within a **`finally`** block to ensure it always occurs. Nevertheless, in the event that you forget to release the lock, the platform will automatically free the locks at the end of the script execution if they were not released before.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
callback|function|no|This callback function is executed immediately after a successful lock acquisition. The acquired lock is automatically released upon the completion of the defined callback.

##### Samples

``` javascript
// locks a record for 20 seconds und unlocks it at the end
var company = sys.data.findOne('companies', {name:'Blogpad'});
company.lock();
try {
  // write some code here to update the company
  // if from the app you try to update the record it will be blocked
  // until the lock is released
  log('do something');
  sys.utils.script.wait(20000);
} finally {
  company.unlock();
}
```
<br>

``` javascript
// locks a record for 20 seconds by specifying a callback
var company = sys.data.findOne('companies', {name:'Blogpad'});
company.lock(function (record) {
  // write some code here to update the company
  // if from the app you try to update the record it will be blocked
  // until the lock is released
  log('do something');
  sys.utils.script.wait(20000);
  // at the end lock will be released automatically
});
```
<br>

###  unlock()

This function releases a lock that was previously acquired.

If the lock was acquired multiple times, it must also be released an equivalent number of times.

##### Samples

``` javascript
// locks a record for 20 seconds und unlocks it at the end
var company = sys.data.findOne('companies', {name:'Blogpad'});
company.lock();
try {
  // write some code here to update the company
  // if from the app you try to update the record it will be blocked
  // until the lock is released
  log('do something');
  sys.utils.script.wait(20000);
} finally {
  company.unlock();
}
```
<br>

## **sys.data.Wrapper**

Whenever you need to access or manipulate the value of a field using the JavaScript API, you will interact with a wrapper. You should never create a wrapper manually. Instead, objects of this type are created by methods such as [`sys.data.Record.field()`](#👉-fieldpath)

The wrapper offers several utilities for retrieving and modifying the field's value. Depending on the field type, it may also provide different services. Please refer to the documentation for each field type to understand the specific utilities available in the wrapper.

###  val()

This method returns the value of the field. It's important to note that this value cannot differ from the value in the REST API. For example, a date-time field in the REST API is represented as a number, indicating milliseconds since the EPOCH. However, this method will return a Date object. Please consult the documentation for each field type to determine its default format.

Keep in mind that if the field you are referencing is multi-valued, this method will return an array of values.

##### Returns

**`any` or `any[]`**  - Returns the value of the field. If it is multi-valued, it will return an array. Please consult the type's documentation to understand what is returned.

##### Samples

``` javascript
// get the value of different fields
var company = sys.data.findOne('companies', {name:'Voonyx'});
var nameWrapper = company.field('name');
log('name: '+nameWrapper.val());
// you could also use a shorter form
log('name: '+company.field('name').val());
// the wrapper for nested fields has utilities to access inner fields
var firstAddressWrapper = company.field('addresses[0]');
var stateWrapper = firstAddressWrapper.field('state');
log('state: '+stateWrapper.val());
// or you could use the shorter form
log('state: '+company.field('addresses[0]').field('state').val());
// or even shorter
log('state: '+company.field('addresses[0].state').val());
// some fields, like data time, use a different format from the REST API
// in this case the value is returned as a Date object
var lastUpdateWrapper = company.field('lastUpdate');
log('last update: '+lastUpdateWrapper.val());
log('last update millis: '+lastUpdateWrapper.val().getTime());
// date time also supports formatting the date
log('last update yyyy-MM-dd: '+company.field('lastUpdate').format('yyyy-MM-dd'));
// if the field is multi-valued, you will get an array of values
log('addresses: '+JSON.stringify(company.field('addresses').val()));
// if the field isn't multi-valued, but you the parent is an you don't specify
// an index, then the result will be an array as well
log('states: '+JSON.stringify(company.field('addresses.state').val()));
```
<br>

###  val(value)

This method sets the value of the field. You should refer to the type's documentation to determine the supported formats. For instance, a date-time field can accept Date objects or milliseconds from the EPOCH to facilitate operations.

If the field is multi-valued, you should provide an array of values. In such cases, it's advisable to consult the documentation for [`sys.data.ManyWrapper`](#sysdatamanywrapper), which contains utilities for handling multi-valued fields.

##### Parameters

Name|Type|Required|Description
---|---|---|---
value|any|yes|The value to set in the field. Type depends on the field.

##### Exceptions

**badRequest**

If **`value`** is invalid. Validation rules depends on the type.

##### Samples

``` javascript
// creates a record and changes some of the values
var company = sys.data.createRecord('companies');
// sets a text field
company.field('name').val('test 1');
// sets a date field using a Date object
company.field('startDate').val(new Date());
// you can also set a nested field directly
company.field('contactInformation.phoneNumber').val('111-222-3333');
company.field('contactInformation.email').val('test@test.com');
// you could also set nested fields with a map
company.field('contactInformation').val({
  phoneNumber: '444-555-6666',
  email: 'john@test.com'
});
// you can set a multi-valued field by sending an array
company.field('addresses').val([
  {
    addressLine: '63 test',
    zipCode: '12233'
  },
  {
    addressLine: '32 street',
    zipCode: '83672'
  }
]);
// you change a nested field inside a multi-valued field using an index
company.field('addresses[0].state').val('NY');
```
<br>

###  isEmpty()

This method returns **`true`** if the field is empty. Typically, a field is considered empty when its value is **`null`**. However, certain types may define additional rules; for example, text fields may consider an empty string as an empty value.

For multi-valued fields, this method returns **`true`** if the field has no values.

##### Returns

**`boolean`** - Returns **`true`** if the field is empty, otherwise **`false`**.

###  isNotEmpty()

This method returns **`true`** if the field is not empty. Usually, a field is not empty when it contains a valid value.

For multi-valued fields, this method returns **`true`** if the field contains values.

##### Returns

**`boolean`** - Returns **`true`** if the field is not empty, otherwise **`false`**.


###  equals(value)

This method checks if the value of the field is equal to the given value.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
value|any|yes|The value to compare with the value of the field. Type depends on the field.

##### Returns

**`boolean`**  - Returns **`true`** if values are equal, **`false`** otherwise.

##### Exceptions

**badRequest**

If **`value`** is invalid. Validation rules depends on the type.


## **sys.data.ManyWrapper**

This class inherits from [`sys.data.Wrapper`](#sysdatawrapper) and operates on multi-valued fields. It follows the same concept as [`sys.data.Wrapper`](#sysdatawrapper), but it is tailored for working with multi-valued fields, providing utilities to add values, check if a value is contained in the list, remove values, and more.

Just like with [`sys.data.Wrapper`](#sysdatawrapper), you should not create instances of this class manually. Instead, objects of this type are created using methods like [`sys.data.Record.field()`](#👉-fieldpath).

###  add(value)

This method adds an element to the end of the list.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
value|any|yes|The element to add to the list. The type depends on the field.

##### Exceptions

**badRequest**

If **`value`** is invalid. Validation rules depends on the type.

##### Samples

``` javascript
// adds a few elements to a list
var company = sys.data.createRecord('companies');
company.field('addresses').add({
  addressLine: '52 street',
  zipCode: '18231'
});
company.field('addresses').add({
  addressLine: '73 test',
  zipCode: '84873'
});
```
<br>

###  add(index, value)

This method adds an element at the specified position in the list. Existing elements will be shifted to the right.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
index|number|yes|The position in the list where the new element should be added.
value|any|yes|The element to add to the list. The type depends on the field.

##### Exceptions

**badRequest**

If **`value`** is invalid. Validation rules depends on the type.

##### Samples

``` javascript
// adds an element at the first position of the list
var company = sys.data.createRecord('companies');
company.field('addresses').add({
  addressLine: '52 street',
  zipCode: '18231'
});
company.field('addresses').add({
  addressLine: '73 test',
  zipCode: '84873'
});
// this value will be inserted at the first position and other values will be shifted
company.field('addresses').add(0, {
  addressLine: '10 road',
  zipCode: '92743'
});
```
<br>

###  remove(value)

Removes the first occurrence of an element from the list. It doesn’t need to be the exact same object, but in order to compare the value the method [sys.data.Wrapper.equals()](#👉-equalsvalue) will be used, which can be overridden by each type.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
value|any|yes|The element to remove from the list. The type depends on the field.

##### Exceptions

**badRequest**

If **`value`** is invalid. Validation rules depends on the type.

##### Samples

``` javascript
// removes an element from the list
var contact = sys.data.createRecord('contacts');
contact.field('skills').add('Firewalls');
log('skills: '+JSON.stringify(contact.field('skills').val()));
contact.field('skills').remove('Firewalls');
log('skills: '+JSON.stringify(contact.field('skills').val()));
```
<br>

###  remove(callback)

Removes elements where evaluation of the function returns **`true`**.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
callback|function|yes|The function to evaluate if an element needs to be removed. It will receive the element wrapper as parameter and should return **`true`** if the element has to be removed or **`false`** otherwise.

##### Exceptions

**badRequest**

If **`callback`** is invalid.

##### Samples

``` javascript
// removes an element from the list
var contact = sys.data.createRecord('contacts');
contact.field('skills').add('Firewalls');
contact.field('skills').add('WLAN');
contact.field('skills').add('YouTube');
log('skills: '+JSON.stringify(contact.field('skills').val()));
contact.field('skills').remove(function(element) {
  if (element.label() == 'WLAN' || element.label() == 'YouTube') {
    return true;
  } else {
    return false;
  }
});
log('skills: '+JSON.stringify(contact.field('skills').val()));
```
<br>

###  removeAt(index)

Removes an element from the list from the specified position.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
index|number|yes|The position in the list where the element should be removed.

##### Exceptions

**badRequest**

If **`index`** is invalid.

##### Samples

``` javascript
// removes an element from the list
var contact = sys.data.createRecord('contacts');
contact.field('skills').add('Firewalls');
contact.field('skills').add('WLAN');
contact.field('skills').add('YouTube');
log('skills: '+JSON.stringify(contact.field('skills').val()));
contact.field('skills').removeAt(1);
log('skills: '+JSON.stringify(contact.field('skills').val()));
```
<br>

###  removeAll()

Removes all elements from the list.

##### Samples

``` javascript
// removes all elements from the list
var contact = sys.data.createRecord('contacts');
contact.field('skills').add('Firewalls');
contact.field('skills').add('WLAN');
contact.field('skills').add('YouTube');
log('skills: '+JSON.stringify(contact.field('skills').val()));
contact.field('skills').removeAll();
log('skills: '+JSON.stringify(contact.field('skills').val()));
```
<br>

###  each(callback)

Iterate over all elements in the list.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
callback|function|yes|The function to that will process all elements. It will receive two parameters: the wrapper element and the current index of the iteration. In order to stop iteration it is possible to return `false` explicitly.

##### Exceptions

**badRequest**

If **`callback`** is invalid.

##### Samples

``` javascript
// iterates over all elements
var contact = sys.data.createRecord('contacts');
contact.field('skills').add('Firewalls');
contact.field('skills').add('WLAN');
contact.field('skills').add('VLAN');
contact.field('skills').each(function(skill, index) {
  log('skill: '+skill.label());
});
```
<br>

``` javascript
// iterate over the first two elements
var contact = sys.data.createRecord('contacts');
contact.field('skills').add('Java');
contact.field('skills').add('.NET');
contact.field('skills').add('Python');
contact.field('skills').add('Golang');
contact.field('skills').each(function(skill, index) {
  if (index > 1) {
      return false;
  }
  log('skill: '+skill.label());
});
```
<br>

###  get(index)

Retrieves the element at the specifed position.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
index|number|yes|The position of the element to retrieve.

##### Returns

[sys.data.Wrapper](#sysdatawrapper) - Returns the wrapper of the element at the specified position.

##### Exceptions

**badRequest**

If **`index`** is invalid.

##### Samples

``` javascript
// gets an element from a position in the list
var contact = sys.data.createRecord('contacts');
contact.field('skills').add('Firewalls');
contact.field('skills').add('WLAN');
contact.field('skills').add('YouTube');
log('skills: '+contact.field('skills').get(1).label());
```
<br>

###  first()

Retrieves the first element in the list.

##### Returns

[sys.data.Wrapper](#sysdatawrapper) - Returns the wrapper of the first element. **`null`** if list is empty.

##### Samples

``` javascript
// gets the first element in the list
var contact = sys.data.createRecord('contacts');
contact.field('skills').add('Firewalls');
contact.field('skills').add('WLAN');
contact.field('skills').add('YouTube');
log('skills: '+contact.field('skills').first().label());
```
<br>

###  last()

Retrieves the last element in the list.

##### Returns

[sys.data.Wrapper](#sysdatawrapper) - Returns the wrapper of the first element. **`null`** if list is empty.

##### Samples

``` javascript
// gets the last element in the list
var contact = sys.data.createRecord('contacts');
contact.field('skills').add('Firewalls');
contact.field('skills').add('WLAN');
contact.field('skills').add('YouTube');
log('skills: '+contact.field('skills').last().label());
```
<br>

###  size()

Returns the number of elements in the list.

##### Returns

**`number`** - The number of elements in the list.

##### Samples

``` javascript
// counts the number of elements in the list
var contact = sys.data.createRecord('contacts');
contact.field('skills').add('Firewalls');
log('size: '+contact.field('skills').size());
contact.field('skills').add('WLAN');
log('size: '+contact.field('skills').size());
contact.field('skills').add('YouTube');
log('size: '+contact.field('skills').size());
```
<br>

###  contains(value)

This method checks if the given value is already present in the list. It returns **`true`** if the value is in the list, otherwise, it returns **`false`**. To perform this check, the method uses [sys.data.Wrapper.equals()](#👉-equalsvalue), which can be overridden by each data type.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
value|any|yes|The value to check if it is in the list. The type depends on the field.

##### Returns

**`boolean`** - **`true`** if value is in the list, **`false`** otherwise.

##### Exceptions

**badRequest**

If **`value`** is invalid. Validation rules depends on the type.

##### Samples

``` javascript
// checks if a value is in the list
var contact = sys.data.createRecord('contacts');
contact.field('skills').add('Firewalls');
contact.field('skills').add('WLAN');
contact.field('skills').add('YouTube');
log('Firewalls: '+contact.field('skills').contains('Firewalls'));
log('WLAN: '+contact.field('skills').contains('WLAN'));
log('YouTube: '+contact.field('skills').contains('YouTube'));
log('Java: '+contact.field('skills').contains('Java'));
```
<br>

## **sys.data.Action**

When an action is executed, an object of this class will be accessible in the context of the action's scripts with the name **`action`**. This allows access to fields within the action in a similar way to how you would interact with record fields.

###  name()

Returns the name of the action being executed.

##### Returns

**`string`** - Name of the action being executed.

##### Samples

``` javascript
// print name of the action; only works inside scripts of an action
sys.logs.info('action being executed: '+action.name());
```
<br>

###  field(path)

Returns the action field at the given path. It works exactly the same as [sys.data.Record.field()](#👉-fieldpath) but it works over the fields defined on the action.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field. It could be a nested or multi-valued field.

##### Returns

[sys.data.Wrapper](#sysdatawrapper) or [sys.data.ManyWrapper](#sysdatamanywrapper) - A field object that you can use to read and manipulate the value.

##### Exceptions

**badRequest**

If **`path`** is invalid.

##### Samples

``` javascript
// logs the value of field 'param1'; only works inside a script of an action that has a 'param1' field
sys.logs.info('param1: '+action.field('param1').val());
```
<br>

## **sys.data.RecordAuditLogs**

This class enables the querying of audit logs for a record. It's important to note that the feature to log audit must be enabled on the entity to which the record belongs.

###  find(options)

This method finds audit logs based on a specified query.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
options|object|no|This is the query to retrieve audit logs. The parameters are as follows:<br> - **`eventType`**: The type of the event. Possible values include: **`USER_RECORD_CREATED`**, **`USER_RECORD_CHANGED`**, **`USER_RECORD_DELETED`**, **`USER_ACTION_PERFORMED`**, **`SCRIPT_RECORD_CREATED`**, **`SCRIPT_RECORD_CHANGED`**, **`SCRIPT_RECORD_DELETED`**, **`SCRIPT_ACTION_PERFORMED`**, **`SYSTEM_CASCADE_UPDATE`**, **`SYSTEM_REFACTORING`**. Multiple types can be specified, separated by commas. <br> - **`from`**: The minimum timestamp in milliseconds since the Epoch. <br> - **`to`**: The maximum timestamp in milliseconds since the Epoch. <br> - **`size`**: The maximum number of logs to retrieve. The default value is 20.<br> - **`offset`**: The offset to use when fetching additional logs for pagination.

##### Returns

[sys.data.RecordAuditLog](#sysdatarecordauditlog) - A field object that you can use to read and manipulate the value.

##### Exceptions

**badRequest**

If the query is not valid.

##### Samples

``` javascript
// finds changes performed by users and logs the user that did it
var company = sys.data.findOne('companies', {name: 'Blogpad'});
var auditLogs = company.auditLogs().find({
  eventType: 'USER_RECORD_CHANGED'
});
for (var i = 0; i < auditLogs.length; i++) {
  var auditLog = auditLogs[i];
  log('changed by user: '+auditLog.user());
}
```
<br>

###  createLog()

Returns the create log of the record. It could be null if audit log was not enabled when the record was created.

##### Returns

[sys.data.RecordAuditLog](#sysdatarecordauditlog) -  The create audit log or null if not found.

##### Samples

``` javascript
// prints who created the record
var company = sys.data.findOne('companies', {name: 'Blogpad'});
var createLog = company.auditLogs().createLog();
if (createLog) {
  log('creator: '+createLog.user());
}
```
<br>

###  lastModifiedLog()

Returns the last modified log of the record. This value could be **`null`** if the audit log was not enabled when the record was last modified or if it has not been modified at all. The type of event associated with this log should be **`USER_RECORD_CHANGE`**. Consequently, if the record was modified by a script or by a system process, it won't be returned.

##### Returns

[sys.data.RecordAuditLog](#sysdatarecordauditlog) -  The create audit log or **`null`** if not found.

##### Samples

``` javascript
// prints who modified the record for the last time
var company = sys.data.findOne('companies', {name: 'Blogpad'});
var modifiedLog = company.auditLogs().lastModifiedLog();
if (modifiedLog) {
  log('user last modified: '+modifiedLog.user());
}
```
<br>

## **sys.data.RecordAuditLog**

Contains information about a audit log of a record.

###  id()

Returns the ID of the audit log

##### Returns

**`string`** -  ID of the audit log

###  timestamp()

Returns the date in which the audit log has been recorded.

##### Returns

**`string`** -  The date in which the audit log has been recorded.

###  eventCategory()

Returns the event category of the audit log. It could be **`USER`**, **`SCRIPT`**, or **`SYSTEM`**.

##### Returns

**`string`** -  The event category of the audit log.

###  eventType()

Returns the event type of the audit log. Possible values include: **`USER_RECORD_CREATED`**, **`USER_RECORD_CHANGED`**, **`USER_RECORD_DELETED`**, **`USER_ACTION_PERFORMED`**, **`SCRIPT_RECORD_CREATED`**, **`SCRIPT_RECORD_CHANGED`**, **`SCRIPT_RECORD_DELETED`**, **`SCRIPT_ACTION_PERFORMED`**, **`SYSTEM_CASCADE_UPDATE`**, **`SYSTEM_REFACTORING`**

##### Returns

**`string`** -  he event type of the audit log.

###  user()

Returns the email of the user that generated the audit log.

##### Returns

**`string`** -  The email of the user that generated the audit log.

###  ip()

Returns the IP of the user when the audit log was generated.

##### Returns

**`string`** - The IP of the user when the audit log was generated.

###  oldRecord()

Returns the old values of the fields that were modified. For each field, it contains both the JSON format and a more human-readable format. Here is a sample:

```js
{
  "type": {
    "json": "a",
    "text": "{type:a}"
  }
}
```
<br>

##### Returns

**`object`** - The old values of the fields that were modified.

###  newRecord()

Returns the new values of the fields that were modified. For each field, it contains both the JSON format and a more human-readable format. Here is a sample:

```js
{
  "type": {
    "json": "a",
    "text": "{type:a}"
  }
}
```
<br>

##### Returns

**`object`** - The new values of the fields that were modified.

## **sys.data.Query**

This class allows you to construct more complex queries with ease. In this section, you'll find information about the methods provided by this class. If you want to learn how to use and write queries, please refer to the documentation on [Query Language]({{<ref "/dev-reference/queries/query-language.md">}}).

Typically, you will create query objects using the [`sys.data.createQuery()`](#👉-createqueryentityname) method instead of directly using the constructor.

###  field(path)

This method returns a [`sys.data.QueryField`](#sysdataqueryfield) object for the specified field. With this object, you can add filters to the field.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field. It could be a nested or multi-valued field.

##### Returns

[sys.data.QueryField](#sysdataqueryfield) - A field object for the given path.

##### Exceptions

**badRequest**

If **`path`** is invalid.

##### Samples

``` javascript
// print the name of 10 active companies
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('state');
queryField.equals('active');
query.size(10);
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

``` javascript
// this is the same as the sample above, but using a more compact format
// create a new sys.data.Query object
var query = sys.data.createQuery('companies')
    .field('state').equals('active')
    .size(10);
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  size(size)

Sets the maximum number of records to be retrieved.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
size|number|yes|Maximum number of records to be retrieved.

##### Returns

[sys.data.Query](#sysdataquery) - The same query object. This is to allow to chain more operations easily.

##### Exceptions

**badRequest**

If **`size`** is not a number.

##### Samples

``` javascript
// print the name of 10 companies
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
query.size(10);
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  offset(size)

Sets the maximum number of records to be skipped.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
size|number|yes|Maximum number of records to be retrieved.

##### Returns

[sys.data.Query](#sysdataquery) - The same query object. This is to allow to chain more operations easily.

##### Exceptions

**badRequest**

If **`size`** is not a number or string.

##### Samples

``` javascript
// print the name of 10 companies
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
query.size(10);
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  sortBy(sortField, sortType)

Sets the field and direction to sort results.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
sortField|string|yes|The path of the field to be used for sorting.
sortType|string|yes|Sort direction. Possible values are **`asc`** and **`desc`**.

##### Returns

[sys.data.Query](#sysdataquery) - The same query object. This is to allow to chain more operations easily.

##### Exceptions

**badRequest**

If **`sortField`** is not a valid path or **`sortType`** is different from **`asc`** or **`desc`**.

##### Samples

``` javascript
// print the name of the first 10 companies sorted by name
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
query.sortBy('name', 'asc');
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  includeFields(paths)

Allows to select which fields should be fetched.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
paths|string|yes|The path of the fields that have to be fetched.

##### Returns

[sys.data.Query](#sysdataquery) - The same query object. This is to allow to chain more operations easily.

##### Exceptions

**badRequest**

If any of the paths provided is not a valid field.

##### Samples

``` javascript
// only name and email fields will be fetched
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
query.includeFields('name', 'type');
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  globalSearch(value)

This method attempts to match the provided string in any field within the entity, instead of searching in a specific field. Please note that to match a complete sentence, you should enclose it within double quotes. This functionality is only available for entities with global search enabled.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
value|string|yes|The value to search globally.

##### Returns

[sys.data.Query](#sysdataquery) - The same query object. This is to allow to chain more operations easily.

##### Exceptions

**badRequest**

If **`value`** is not a string.

##### Samples

``` javascript
// finds records where any field has either the word 'lacinia'' or 'erat'
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
query.globalSearch('lacinia erat');
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  query(complexQueryOrFunction)

Allows to specify a complex query where it is possible to mix **`AND`** and *`OR`* expressions.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
complexQueryOrFunction|function or string|yes|A string representing a complex query or an anonymous function returning a [sys.data.ComplexQueryCriteria](#sysdatacomplexquerycriteria).

##### Returns

[sys.data.Query](#sysdataquery) - The same query object. This is to allow to chain more operations easily.

##### Exceptions

**badRequest**

If **`query`** is not a string.

##### Samples

``` javascript
// finds companies with type 'a' or with type 'b' where they are also customers
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
query.query(function(q) {
  return q.or(
    q.field('type').equals('a'),
    q.and(
      q.field('type').equals('b'),
      q.field('isCustomer').equals(true)
    )
  );
});
var records = sys.data.find(query);
log('total: '+records.count());
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

``` javascript
// same query as above, but using a complex query string instead
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
query.query("or(filter('type','a'),and(filter('type','b'),filter('isCustomer','true')))");
var records = sys.data.find(query);
log('total: '+records.count());
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

## **sys.data.QueryField**

This object is returned by the [sys.data.Query.field()](#sysdataqueryfield) method and enables the application of filters to the field.

###  equals(value)

Adds a filter using equals operator.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
value|any|yes|The value to compare to. Please check the field’s type documentation to see which values are allowed.

##### Returns

[sys.data.Query](#sysdataquery) or [sys.data.QueryField](#sysdataqueryfield)- Returns the [sys.data.Query](#sysdataquery) object to allow chain operations or a [sys.data.QueryField](#sysdataqueryfield) in case you are using it in a complex query.

##### Exceptions

**badRequest**

If operation is not supported for the field’s type or if the value is not valid for this type. Keep in mind that some invalid values might be detected only once the query is executed.

##### Samples

``` javascript
// print the name of 10 active companies
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('state');
queryField.equals('active');
query.size(10);
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  notEquals(value)

Adds a filter using not equals operator.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
value|any|yes|The value to compare to. Please check the field’s type documentation to see which values are allowed.

##### Returns

[sys.data.Query](#sysdataquery) or [sys.data.QueryField](#sysdataqueryfield)- Returns the [sys.data.Query](#sysdataquery) object to allow chain operations or a [sys.data.QueryField](#sysdataqueryfield) in case you are using it in a complex query.

##### Exceptions

**badRequest**

If operation is not supported for the field’s type or if the value is not valid for this type. Keep in mind that some invalid values might be detected only once the query is executed.

##### Samples

``` javascript
// print the name of 10 companies where type is not 'a'
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('type');
queryField.notEquals('a');
query.size(10);
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  empty()

Adds a filter using empty operator.

##### Returns

[sys.data.Query](#sysdataquery) or [sys.data.QueryField](#sysdataqueryfield)- Returns the [sys.data.Query](#sysdataquery) object to allow chain operations or a [sys.data.QueryField](#sysdataqueryfield) in case you are using it in a complex query.

##### Exceptions

**badRequest**

If operation is not supported for the field’s type or if the value is not valid for this type.

##### Samples

``` javascript
// print the name of companies where notes are empty
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('notes');
queryField.empty();
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  notEmpty()

Adds a filter using not empty operator.

##### Returns

[sys.data.Query](#sysdataquery) or [sys.data.QueryField](#sysdataqueryfield)- Returns the [sys.data.Query](#sysdataquery) object to allow chain operations or a [sys.data.QueryField](#sysdataqueryfield) in case you are using it in a complex query.

##### Exceptions

**badRequest**

If operation is not supported for the field’s type or if the value is not valid for this type.

##### Samples

``` javascript
// print the name of 10 companies where notes are not empty
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('notes');
queryField.notEmpty();
query.size(10);
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  like(value)

Adds a filter using like operator. This filter type has support for regular expressions and also provide shortcuts for filtering by **`starts with`** and **`ends with`**.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
value|any|yes|The value to compare to. Please check the field’s type documentation to see which values are allowed.

##### Returns

[sys.data.Query](#sysdataquery) or [sys.data.QueryField](#sysdataqueryfield)- Returns the [sys.data.Query](#sysdataquery) object to allow chain operations or a [sys.data.QueryField](#sysdataqueryfield) in case you are using it in a complex query.

##### Exceptions

**badRequest**

If operation is not supported for the field’s type or if the value is not valid for this type. Keep in mind that some invalid values might be detected only once the query is executed.

##### Samples

``` javascript
// print the name of companies where name contains 'odo'
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('name');
queryField.like('odo');
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

``` javascript
// print the name of companies where name starts with 't', can have something else in the middle and ends with 'e' using a regular expression
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('name');
queryField.like('/^t.*e$/');
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

``` javascript
// print the name of companies where name starts with 't' using the `starts with` shortcut
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('name');
queryField.like('/t');
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

``` javascript
// print the name of companies where name ends with 'e' using the `ends with` shortcut
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('name');
queryField.like('e/');
var records = sys.data.find(query);
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  greater(value)

Adds a filter using greater operator.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
value|any|yes|The value to compare to. Please check the field’s type documentation to see which values are allowed.

##### Returns

[sys.data.Query](#sysdataquery) or [sys.data.QueryField](#sysdataqueryfield)- Returns the [sys.data.Query](#sysdataquery) object to allow chain operations or a [sys.data.QueryField](#sysdataqueryfield) in case you are using it in a complex query.

##### Exceptions

**badRequest**

If operation is not supported for the field’s type or if the value is not valid for this type. Keep in mind that some invalid values might be detected only once the query is executed.

##### Samples

```js
// print the name of companies with more than 500 employees
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('numberOfEmployees');
queryField.greater(500);
var records = sys.data.find(query);
log('total: '+records.count());
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  greaterOrEquals(value)

Adds a filter using greater or equals operator.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
value|any|yes|The value to compare to. Please check the field’s type documentation to see which values are allowed.

##### Returns

[sys.data.Query](#sysdataquery) or [sys.data.QueryField](#sysdataqueryfield)- Returns the [sys.data.Query](#sysdataquery) object to allow chain operations or a [sys.data.QueryField](#sysdataqueryfield) in case you are using it in a complex query.

##### Exceptions

**badRequest**

If operation is not supported for the field’s type or if the value is not valid for this type. Keep in mind that some invalid values might be detected only once the query is executed.

##### Samples

```js
// print the name of companies with more than 500 employees or exactly 500 employees
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('numberOfEmployees');
queryField.greaterOrEquals(500);
var records = sys.data.find(query);
log('total: '+records.count());
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  less(value)

Adds a filter using less operator.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
value|any|yes|The value to compare to. Please check the field’s type documentation to see which values are allowed.

##### Returns

[sys.data.Query](#sysdataquery) or [sys.data.QueryField](#sysdataqueryfield)- Returns the [sys.data.Query](#sysdataquery) object to allow chain operations or a [sys.data.QueryField](#sysdataqueryfield) in case you are using it in a complex query.

##### Exceptions

**badRequest**

If operation is not supported for the field’s type or if the value is not valid for this type. Keep in mind that some invalid values might be detected only once the query is executed.

##### Samples

```js
// print the name of companies with less than 500 employees
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('numberOfEmployees');
queryField.less(500);
var records = sys.data.find(query);
log('total: '+records.count());
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  lessOrEquals(value)

Adds a filter using less or equals operator.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
value|any|yes|The value to compare to. Please check the field’s type documentation to see which values are allowed.

##### Returns

[sys.data.Query](#sysdataquery) or [sys.data.QueryField](#sysdataqueryfield)- Returns the [sys.data.Query](#sysdataquery) object to allow chain operations or a [sys.data.QueryField](#sysdataqueryfield) in case you are using it in a complex query.

##### Exceptions

**badRequest**

If operation is not supported for the field’s type or if the value is not valid for this type. Keep in mind that some invalid values might be detected only once the query is executed.

##### Samples

```js
// print the name of companies with less than 500 employees or exactly 500 employees
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('numberOfEmployees');
queryField.lessOrEquals(500);
var records = sys.data.find(query);
log('total: '+records.count());
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  between(from, to)

Adds a filter using between operator.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
from|any|yes|The minimum value to match (inclusive).
to|any|yes|The maximum value to match (inclusive).

##### Returns

[sys.data.Query](#sysdataquery) or [sys.data.QueryField](#sysdataqueryfield)- Returns the [sys.data.Query](#sysdataquery) object to allow chain operations or a [sys.data.QueryField](#sysdataqueryfield) in case you are using it in a complex query.

##### Exceptions

**badRequest**

If operation is not supported for the field’s type or if the value is not valid for this type. Keep in mind that some invalid values might be detected only once the query is executed.

##### Samples

```js
// print the name of companies with a number of employees between 300 and 600 (inclusive)
// create a new sys.data.Query object
var query = sys.data.createQuery('companies');
var queryField = query.field('numberOfEmployees');
queryField.between(300, 600);
var records = sys.data.find(query);
log('total: '+records.count());
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

## **sys.data.ComplexQueryHelper**

This object is passed as a parameter to the function within the [`sys.data.Query.query()`](#querycomplexqueryorfunction) method and aids in the construction of complex queries involving AND and OR operators.

###  field(path)

This method returns a [`sys.data.QueryField`](#sysdataqueryfield) object for the specified field. With this object, you can add filters to the field.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field. It could be a nested or multi-valued field.

##### Returns

[sys.data.QueryField](#sysdataqueryfield) - A query field object for the given path.

##### Exceptions

**badRequest**

If **`path`** is invalid.

##### Samples

``` javascript
// print the name of 10 companies of type 'a'
var query = sys.data.createQuery('companies')
    .query(function(q) {
      // 'q' is an object of type sys.data.QueryComplexHelper
      return q.and(
        q.field('type').equals('a')
      );
    })
    .size(10);
var records = sys.data.find(query);
log('total: '+records.count());
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  and(conditions)

Returns a [sys.data.ComplexQueryCriteria](#sysdatacomplexquerycriteria) object to do an AND with the given parameters.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
conditions|[sys.data.QueryField](#sysdataqueryfield) or [sys.data.ComplexQueryCriteria](#sysdatacomplexquerycriteria)|yes|Any number of query fields or other complex query criteria (like an OR) that will be evaluated using the AND operator.

##### Returns

[sys.data.ComplexQueryCriteria](#sysdatacomplexquerycriteria) - A complex query criteria object with an AND between all parameters.

##### Exceptions

**badRequest**

If parameters sent to the AND operator are invalid.

##### Samples

``` javascript
// print the companies where tyep is 'a' or where type is 'b' and are customers
var query = sys.data.createQuery('companies')
    .query(function(q) {
      // 'q' is an object of type sys.data.QueryComplexHelper
      return q.or(
        q.field('type').equals('a'),
        q.and(
          q.field('type').equals('b'),
          q.field('isCustomer').equals(true)
        )
      );
    });
var records = sys.data.find(query);
log('total: '+records.count());
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

###  or(conditions)

Returns a [sys.data.ComplexQueryCriteria](#sysdatacomplexquerycriteria) object to do an OR with the given parameters.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
conditions|[sys.data.QueryField](#sysdataqueryfield) or [sys.data.ComplexQueryCriteria](#sysdatacomplexquerycriteria)|yes|Any number of query fields or other complex query criteria (like an AND) that will be evaluated using the OR operator.

##### Returns

[sys.data.ComplexQueryCriteria](#sysdatacomplexquerycriteria) - A complex query criteria object with an OR between all parameters.

##### Exceptions

**badRequest**

If parameters sent to the OR operator are invalid.

##### Samples

``` javascript
// print the companies where tyep is 'a' or where type is 'b' and are customers
var query = sys.data.createQuery('companies')
    .query(function(q) {
      // 'q' is an object of type sys.data.QueryComplexHelper
      return q.or(
        q.field('type').equals('a'),
        q.and(
          q.field('type').equals('b'),
          q.field('isCustomer').equals(true)
        )
      );
    });
var records = sys.data.find(query);
log('total: '+records.count());
while (records.hasNext()) {
  log(records.next().label());
}
```
<br>

## **sys.data.ComplexQueryCriteria**

This object is returned by the method in **``sys.data.ComplexQueryHelper``**. You should avoid using this object directly. For more information, please refer to the documentation on [Complex Queries]({{<ref "/dev-reference/queries/query-language.md">}}).

####  toString()

This method returns the string version of the complex query.

##### Returns

**`string`** - The string version of the complex query

## **sys.data.AggregateQuery**

This class facilitates the construction of aggregate queries. In this section, you'll find information about the methods provided by this class. If you want to learn how to use and write aggregate queries, please consult the documentation on Aggregate Queries.

Typically, you will create query objects using the **`sys.data.createAggregateQuery()`** method instead of directly using the constructor.

###  group()

This method adds a [`sys.data.AggregatedGroup`](#sysdataaggregatedgroup) operation to the aggregate query.

##### Returns

[`sys.data.AggregatedGroup`](#sysdataaggregatedgroup) - The group object added to the aggregate query.

###  match()

This method adds a [`sys.data.AggregatedMatch`](#sysdataaggregatedmatch) operation to the aggregate query.

##### Returns

[`sys.data.AggregatedMatch`](#sysdataaggregatedmatch) - The match object added to the aggregate query.

###  sort()

This method adds a [`sys.data.AggregatedSort`](#sysdataaggregatedsort) operation to the aggregate query.

##### Returns

[`sys.data.AggregatedSort`](#sysdataaggregatedsort) - The sort object added to the aggregate query.

###  project()

This method adds a [`sys.data.AggregatedProject`](#sysdataaggregatedproject) operation to the aggregate query.

##### Returns

 [`sys.data.AggregatedProject`](#sysdataaggregatedproject) - The project object added to the aggregate query.

###  count()

This method adds a [`sys.data.AggregatedCount`](#sysdataaggregatedcount) operation to the aggregate query.

##### Returns

[`sys.data.AggregatedCount`](#sysdataaggregatedcount) - The count object added to the aggregate query.

###  skip()

This method adds a [`sys.data.AggregatedSkip`](#sysdataaggregatedskip) operation to the aggregate query.

##### Returns

[`sys.data.AggregatedSkip`](#sysdataaggregatedskip) - The skip object added to the aggregate query.

###  limit()

This method adds a [`sys.data.AggregatedLimit`](#sysdataaggregatedlimit) operation to the aggregate query.

##### Returns

[`sys.data.AggregatedLimit`](#sysdataaggregatedlimit) - The limit object added to the aggregate query.

###  unwind()

This method adds a [`sys.data.AggregatedUnwind`](#sysdataaggregatedunwind) operation to the aggregate query.

##### Returns

[`sys.data.AggregatedUnwind`](#sysdataaggregatedunwind) - The unwind object added to the aggregate query.

###  lookup()

This method adds a [`sys.data.AggregatedLookup`](#sysdataaggregatedlookup) operation to the aggregate query.

##### Returns

[`sys.data.AggregatedLookup`](#sysdataaggregatedlookup) - The lookup object added to the aggregate query.

## **sys.data.AggregatedGroup**

This class allows you to define a group operation in an aggregate query. You should avoid creating an object of this class manually. Instead, use the [`sys.data.AggregateQuery.group()`](#group) method.

###  by(paths)

Indicates which fields will be used to group by.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
paths|string...|yes|The path of the fields used for grouping.

##### Returns

[sys.data.AggregatedGroup](#sysdataaggregatedgroup) - The group object so you can chain more operations.

##### Exceptions

**badRequest**

If any of the **`paths`** is invalid.

###  accumulate(path)

Allows to apply an operation for the values in the group for a given field. For example, sum all values in the group or calculate the average.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field to apply the operation to

##### Returns

[sys.data.AggregateAccumulator](#sysdataaggregateaccumulator) - The accumulator object to configure the operation to perform.

##### Exceptions

**badRequest**

If the **`path`** is invalid.

##### Samples

```js
//
var query = sys.data.createAggregateQuery('contacts');
query.group()
    .by('company')
    .accumulate('totalSkills').sum('numberOfSkills');
var resultSet = sys.data.aggregate(query);
while (resultSet.hasNext()) {
  log(JSON.stringify(resultSet.next()));
}
```
<br>

## **sys.data.AggregatedSort**

Allows to sort elements in an aggregate query. You should never create an object of this class manually. Instead use [sys.data.AggregateQuery.sort()](#sort) method.

###  by(path, sortType)

Indicates which field will be used to sort and the direction of the sorting.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field used for sorting.
sortType|string|yes|The direction of the sorting. Can be **`asc`** or **`desc`**.

##### Returns

[sys.data.AggregatedSort](#sysdataaggregatedsort) - The sort object so you can chain more operations.

##### Exceptions

**badRequest**

If the path or direction are invalid.

## **sys.data.AggregatedProject**

Allows to filter fields in elements in an aggregate query. You should never create an object of this class manually. Instead use [sys.data.AggregateQuery.project()](#project) method.

###  field(path)

Indicates that the given field should be included in the result.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field to include in the results.

##### Returns

[sys.data.AggregatedProject](#sysdataaggregatedproject) - The project object so you can chain more operations.

##### Exceptions

**badRequest**

If the path is invalid.

## **sys.data.AggregatedMatch**

Allows to filter fields in elements in an aggregate query. You should never create an object of this class manually. Instead use [sys.data.AggregateQuery.match()](#match) method.

###  field(path)

Indicates that the given field should be included in the result.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field to apply a filter to.

##### Returns

[sys.data.QueryField](#sysdataqueryfield) - The match object so you can apply filters on that field.

##### Exceptions

**badRequest**

If the path is invalid.

## **sys.data.AggregateAccumulator**

Allows to define accumulation operations for groups created using [sys.data.AggregatedGroup](#sysdataaggregatedgroup) like sum, average, etc.

###  sum(path)

Sums all the numeric values in the group for the given field.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field to sum up

##### Returns

[sys.data.AggregatedGroup](#sysdataaggregatedgroup) - The group object so you can chain more operations.

##### Exceptions

**badRequest**

If the path is invalid.

###  count()

Counts the number of elements in the group.

##### Returns

[sys.data.AggregatedGroup](#sysdataaggregatedgroup) - The group object so you can chain more operations.

###  avg(path)

Calculates the average of all the numeric values in the group for the given field.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field to calculate average

##### Returns

[sys.data.AggregatedGroup](#sysdataaggregatedgroup) -  The group object so you can chain more operations.

##### Exceptions

**badRequest**

If the **`path`** is invalid or not a numeric field.

###  first(path)

Selects the value of the first element in the group for the given field.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field to select its value

##### Returns

[sys.data.AggregatedGroup](#sysdataaggregatedgroup) - The group object so you can chain more operations.

##### Exceptions

**badRequest**

If the **`path`** is invalid or not a numeric field.

###  last(path)

Selects the value of the last element in the group for the given field.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field to select its value

##### Returns

[sys.data.AggregatedGroup](#sysdataaggregatedgroup) - The group object so you can chain more operations.

##### Exceptions

**badRequest**

If the **`path`** is invalid or not a numeric field.

###  min(path)

Selects the minimum value in the group for the given field.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field to select its minimum value

##### Returns

[sys.data.AggregatedGroup](#sysdataaggregatedgroup) - The group object so you can chain more operations.

##### Exceptions

**badRequest**

If the **`path`** is invalid or not a numeric field.

###  max(path)

Selects the maximum value in the group for the given field.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
path|string|yes|The path of the field to select its maximum value

##### Returns

[sys.data.AggregatedGroup](#sysdataaggregatedgroup) - The group object so you can chain more operations.

##### Exceptions

**badRequest**

If the **`path`** is invalid or not a numeric field.

## **sys.data.AggregatedCount**

Allows to count elements in an aggregate query. You should never create an object of this class manually. Instead use [sys.data.AggregateQuery.count()](#count) method.

###  counterName(fieldName)

Indicates that the given string should be the name of attribute under counter will be stored.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
fieldName|string|yes|The name of field that will store the counter.

##### Returns

[sys.data.AggregatedCount](#sysdataaggregatedcount) - The count object so you can chain more operations.

##### Exceptions

**badRequest**

If the **`fieldName`** is invalid.

## **sys.data.AggregatedLimit**

Allows to limit the number of elements in an aggregate query. You should never create an object of this class manually. Instead use [sys.data.AggregateQuery.limit()](#limit) method.

###  step(number)

Indicates that first **`step`** number of elements will be retrieved.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
number|string|yes|The positive interger number of records to ommit.

##### Returns

[sys.data.AggregatedLimit](#sysdataaggregatedlimit) - The limit object so you can chain more operations.

##### Exceptions

**badRequest**

If the **`number`** is invalid.

## **sys.data.AggregatedSkip**

Allows to skip elements in an aggregate query. You should never create an object of this class manually. Instead use [sys.data.AggregateQuery.skip()](#skip) method.

###  step(number)

Indicates that first **`step`** number of elements will be retrieved.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
number|string|yes|The positive interger number of records to ommit.

##### Returns

[sys.data.AggregatedSkip](#sysdataaggregatedskip) - The skip object so you can chain more operations.

##### Exceptions

**badRequest**

If the **`number`** is invalid.

## **sys.data.AggregatedUnwind**

Allows to unwind elements with array attributes in more elements with single attributes in an aggregate query. You should never create an object of this class manually. Instead use [sys.data.AggregateQuery.unwind()](#unwind) method.

###  path(fieldPath)

Indicates selected attribute will be unwound in single elements retrieving one document by every item in array value.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
fieldPath|string|yes|Field in record to be unwound.

##### Returns

[sys.data.AggregatedUnwind](#sysdataaggregatedunwind) - The unwind object so you can chain more operations.

##### Exceptions

**badRequest**

If the **`fieldPath`** is invalid.

###  includeEmpty(includeEmpty)

Indicates that elements with selected attribute equals to **`empty array`** or **`null`** will be included.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
includeEmpty|boolean|no|if **`true`** includes records for empty arrays, nulls or not multivalued fields.

##### Returns

[sys.data.AggregatedUnwind](#sysdataaggregatedunwind) - The unwind object so you can chain more operations.

## **sys.data.AggregatedLookup**

Allows to lookup elements with other collections elemtents making an equivalent SQL left join. You should never create an object of this class manually. Instead use [sys.data.AggregateQuery.lookup()](#lookup) method.

###  localField(fieldPath)

Indicates selected attribute from current entity elements that will be matched with foreign elements.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
fieldPath|string|yes|Field into current entity used as local field.

##### Returns

[sys.data.AggregatedLookup](#sysdataaggregatedlookup) - The lookup object so you can chain more operations.

##### Exceptions

**badRequest**

If the **`fieldPath`** is invalid.

###  foreignField(fieldPath)

Indicates selected attribute from foreign entity elements that will be matched with current elements.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
fieldPath|string|yes|Field into foreign entity used as foreign field.

##### Returns

[sys.data.AggregatedLookup](#sysdataaggregatedlookup) - The lookup object so you can chain more operations.

##### Exceptions

**badRequest**

If the **`fieldPath`** is invalid.

###  foreignEntity(entityName)

Indicates the foreign entity name whose elements will be matched.

##### Parameters

| Name  | Type  | Required | Description |
|---|---|---|---|
entityName|string|yes|Name of an existing entity.

##### Returns

[sys.data.AggregatedLookup](#sysdataaggregatedlookup) - The lookup object so you can chain more operations.

##### Exceptions

**badRequest**

If the **`fieldPath`** is invalid.
