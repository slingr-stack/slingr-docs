---
title: "sys.commons"
lead: "Documentation for common classes in the Javascript API."
description: "Documentation for common classes in the Javascript API."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 61
---

## **sys.commons.ResultSet**

**`ResultSet`** is an iterator designed for traversing API service call results. The **`ResultSet`** object retains a cursor that indicates the current object it's pointing to. Initially, the cursor is positioned before the first object. The **`next()`** method advances the cursor to the next available object.

The cursor can only move forward.

### hasNext()

Checks whether there are more objects.

##### Returns

**`boolean`**  - **`true`** if there are more objects, **`false`** otherwise.

##### Samples

``` javascript
// prints the name of 10 companies
var query = sys.data.createQuery('companies').size(10);
var resultSet = sys.data.find(query);
while (resultSet.hasNext()) {
  var company = resultSet.next();
  log(company.label());
}
```
<br>


### next()

Returns a single object and advances the cursor.

##### Returns

**`object`**  - Typically a **`sys.data.Record`**.

##### Exceptions

**badRequest**

Thrown when there are no more objects.

##### Samples

``` javascript
// prints the name of 10 companies
var query = sys.data.createQuery('companies').size(10);
var resultSet = sys.data.find(query);
while (resultSet.hasNext()) {
  var company = resultSet.next();
  log(company.label());
}
```
<br>

### nextAndLock()

Returns and locks single object and advances the cursor.

##### Returns

**`object`**  - Typically a **`sys.data.Record`**.

##### Exceptions

**badRequest**

Thrown when there are no more objects.

##### Samples

``` javascript
// prints the name of 10 companies
var query = sys.data.createQuery('companies').size(10);
var resultSet = sys.data.find(query);
while (resultSet.hasNext()) {
  var company = resultSet.nextAndLock();
  log(company.label());
}
```
<br>

### count()

Calculates the count of objects that match the query. This count is not influenced by the limit (`_size` parameter).

##### Returns

**`number`**  - The count of objects that match the query.

##### Samples

``` javascript
// counts number of companies of type 'a'
var query = sys.data.createQuery('companies').field('type').equals('a');
var resultSet = sys.data.find(query);
log('count: '+resultSet.count());
```
<br>


### toArray()

Iterates through all objects and returns them as an array. If the number of objects exceeds 1,000, the method will raise an exception to prevent memory overload.

##### Returns

**`object[]`**  - An array containing all objects. Typically, these objects are of type **`sys.data.Record`**, but this depends on what you are iterating over.

##### Exceptions

**systemException**

Thrown when the result set contains more than 1,000 objects.

##### Samples

``` javascript
// prints the name of 10 companies
var query = sys.data.createQuery('companies').size(10);
var resultSet = sys.data.find(query);
var companies = resultSet.toArray();
companies.forEach(function(company) {
  log(company.label());
});
```
<br>
