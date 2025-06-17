---
title: "Query language"
description: "Describe the query language, which is shared by the REST API as well as the Javascript API"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 137
---

## **Overview**

The query language enables you to search for records within an entity using complex criteria. This language is used by both the [REST API]({{<ref "/dev-reference/rest-apis/apps-api.md">}}) and the [Javascript API]({{<ref "/dev-reference/scripting/namespaces.md">}}). However, please note that the method of specifying queries differs between the two.

For example, a simple query to retrieve 10 active companies using the REST API looks like this:

```
GET https://app.{{ site.slingr_domain }}/prod/runtime/api/data/companies?state=active&_size=10
```
<br>

In contrast, with the Javascript API, it would look something like this:

```js
var records = sys.data.find('companies', {state: 'active', _size: 10});
while (records.hasNext()) {
  // do something
}
```
<br>

In the Javascript API, you can also utilize the [query builder]({{<ref "/dev-reference/scripting/sys-data.md#sysdataquery">}})), which provides helpful tools for constructing queries:

```js
var query = sys.data.createQuery('companies')
    .field('state').equals('active')
    .size(10);
var records = sys.data.find(query);
while (records.hasNext()) {
  // do something
}
```
<br>

Generally, when dealing with more intricate query criteria, the query builder is easier to use than the simple map form because it offers conversion and parsing features. Additionally, there are queries that cannot be expressed using the query map version. For instance:

```js
var query = sys.data.createQuery('companies').query(function(q) {
  return q.or(
    q.field('name').like('test'),
    q.field('name').equals('abc')
  );
});
```
<br>

The above query cannot be expressed using the query map version because you cannot use the same key in the map. It would look like this:

```js
var query = {
  name: 'like(test)',
  name: 'like(abc)'
};
```
<br>

In this case, the key **`name`** appears twice in the map and won't work as expected.

Another consideration is exception handling. When using the query builder, exceptions may be thrown during query construction. For example:

```js
try {
  var query = sys.data.createQuery('companies')
      .field('doesNotExist').equals('test');
  log('count: '+sys.data.count(query);
} catch (e) {
  log('error: '+e.message());
}
```
<br>

The script above will throw an exception when calling the **`field()`** method because the field **`doesNotExist`** is not a valid field in the **`companies`** entity. Similar exceptions will occur with other improper query configurations, so be aware that exceptions may arise during query construction.

On the other hand, when using the query map, exceptions won't occur during query construction but rather when executing the query:

```js
try {
  var query = {doesNotExist: 'test'};
  var count = sys.data.count('companies', query);
  log('count: '+count);
} catch (e) {
  log('error: '+e.message());
}
```
<br>

In this case, the exception will be thrown when calling the [sys.data.count()]({{<ref "/dev-reference/scripting/sys-data.md#count">}}) method.

This documentation section provides samples in all three versions for comparison. If a feature only applies to specific versions, it will be explicitly indicated.

## **Simple queries**

Simple queries allow you to filter records using the **`AND`** logical operator exclusively, although you can still specify multiple filters. Here are some simple query examples:

{{< query_sample
  id="00"
  description="finds a company by exact name"
  entity="companies"
  jsQueryMap="{name: 'Blogpad'}"
  jsQueryBuilder=".field('name').equals('Blogpad')"
  restApi="name=Blogpad"
>}}
<br>

{{< query_sample
  id="01"
  description="filters by companies with more than 200 employees; limits results to 10 and use offset of 20"
  entity="companies"
  jsQueryMap="{numberOfEmployees: 'greater(200)', _size: 10, _offset: 20}"
  jsQueryBuilder=".field('numberOfEmployees').greater(200).size(10).offset(20)"
  restApi="numberOfEmployees=greater(200)&_size=10&_offset=20"
>}}
<br>


{{< query_sample
  id="02"
  description="filters by two fields"
  entity="companies"
  jsQueryMap="{type: 'a', isCustomer: false}"
  jsQueryBuilder=".field('type').equals('a').field('isCustomer').equals(false)"
  restApi="type=a&isCustomer=false"
>}}
<br>

{{< query_sample
  id="03"
  description="filters by a nested field"
  entity="companies"
  jsQueryMap="{'addresses.state': 'CA'}"
  jsQueryBuilder=".field('addresses.state').equals('CA')"
  restApi="addresses.state=CA"
>}}
<br>

{{< query_sample
  id="04"
  description="retrieves only name and type of customers"
  entity="companies"
  jsQueryMap="{isCustomer: true, _fields: 'name,type'}"
  jsQueryBuilder=".field('isCustomer').equals(true).includeFields('name', 'type')"
  restApi="isCustomer=true&_fields=name,type"
>}}
<br>

In the query map and REST API, parameters starting with **`_`** are system parameters, while others are fields. The next section explains all the options for filtering by fields.

### Filters by field

You can filter results by field value. For instance, if your entity has a field called **`name`**, you can make the following query:

{{< query_sample
  id="05"
  entity="companies"
  jsQueryMap="{name: 'Blogpad'}"
  jsQueryBuilder=".field('name').equals('Blogpad')"
  restApi="name=Blogpad"
>}}
<br>

You can also provide several values (comma-separated), and it will act like an **`OR`**:

{{< query_sample
  id="06"
  entity="companies"
  jsQueryMap="{name: 'Blogpad,Jazzy'}"
  jsQueryBuilder=".field('name').equals('Blogpad,Jazzy')"
  restApi="name=Blogpad,Jazzy"
>}}
<br>

If the value you are matching already contains a comma, you should wrap it in double quotes:

{{< query_sample
  id="07"
  entity="companies"
  jsQueryMap="{name: '\"ACME, Inc\"'}"
  jsQueryBuilder=".field('name').equals('\"ACME, Inc\"')"
  restApi="name=\"ACME, Inc\""
>}}
<br>

You can filter by nested fields as well:

{{< query_sample
  id="08"
  entity="companies"
  jsQueryMap="{'contactInformation.email': 'dwelchdp@apple.com'}"
  jsQueryBuilder=".field('contactInformation.email').equals('dwelchdp@apple.com')"
  restApi="contactInformation.email=dwelchdp@apple.com"
>}}
<br>

If the nested group field is multi-valued, you can still perform a query like this:

{{< query_sample
  id="09"
  entity="companies"
  jsQueryMap="'{'_or': {'type': 'a', '_and': {'type': 'b', 'isCustomer': true}}}'"
  jsQueryBuilder="'.query(function(q) { return q.or(q.field('type').equals('a'), q.and(q.field('type').equals('b'), q.field('isCustomer').equals(true))); })'"
  restApi="_query=or(filter('type','a'),and(filter('type','b'),filter('isCustomer','true')))"
>}}
<br>

If the entity has a geo point type, a `near` operator can be used to perform a query. The operator takes 4 parameters:
* latitude
* longitude
* minDistance(optional)
* maxDistance(optional)

{{< query_sample
id="sample"
description="sorts companies by proximity to [ lat: 10, long: 22 ] that are at a min distance of 5000 m and at a maximum of 10000 m"
entity="companies"
jsQueryMap="{'location':'near(5,10,5000,10000)'}"
jsQueryBuilder=".field('location').near(5,10,5000,10000)"
restApi="near(5,10,5000,10000)"
>}}
<br>
Available operators for filtering:

```js
equals(value)
notEquals(value)
like(value)    // options: /value, value/ or /regexp/
between(from,to)
greater(value)
greaterOrEquals(value)
less(value)
lessOrEquals(value)
empty()
notEmpty()
```
<br>

Each field type supports different operators. Refer to the documentation for each type to see which operators are supported.

The following operators are available for all types:

```js
equals(value)
notEquals(value)
empty()
notEmpty()
```
<br>

{{< callout type="info" >}}
If you don't specify any operator, the default one is <b>equals()</b>.
{{< /callout >}}

{{< callout type="info" >}}
It's a good practice to consult the documentation for each type when filtering by field values, as each type may support different querying methods and alternative formats for simplifying usage.
{{< /callout >}}
<br>

## **Complex queries**

Complex queries are similar to regular queries, but they allow you to mix and nest **`OR`** and **`AND`** expressions. They are separated because they require a different syntax, especially in the REST API and query builder.

Here's a sample complex query, highlighting the differences between the three versions:

{{< query_sample
  id="10"
  description="Query on companies"
  entity="companies"
  jsQueryMap="{ _or: { type: 'a', _and: { type: 'b', isCustomer: true }}}"
  jsQueryBuilder=".field('type').equals('a').or().field('type').equals('b').field('isCustomer').equals(true)"
  restApi="_query=or(filter('type','a'),and(filter('type','b'),filter('isCustomer','true')))"
>}}
<br>

The query map version is almost the same as simple queries; it uses the **`_or`** and **`_and`** operators. However, in the REST API and query builder, due to interface limitations, complex queries must be written differently.

For the REST API, you must pass a **`_query`** parameter, where you can use these operators:

- **`or(...)`**: evaluates to true if any of the criteria passed as arguments is true. It accepts a list of filter criteria that can be **`and()`**, **`filter()`**, or another **`or()`**.
- **`and(...)`**: similar to **`or()`**, but it evaluates to true if all the criteria passed as arguments are true.
- **`filter(field,value)`**: a simple field filter, like those in simple queries. Always enclose the name and value with single quotes.
When using the query builder, you should use the query() method, which accepts a function as a parameter. This function receives a helper object and should return a query criteria.

Here are some examples of complex queries in the REST API and query builder:

{{< query_sample
  id="11"
  description="Query on companies"
  entity="companies"
  jsQueryBuilder=".and(q.field('isCustomer').equals(true), q.or(q.field('addresses.state').equals('CA'), q.field('numberOfEmployees').greater(100)))"
  restApi="_query=and(filter('isCustomer','true'),or(filter('addresses.state','CA'),filter('numberOfEmployees','greater(100)')))"
>}}
<br>

{{< query_sample
  id="12"
  description="Query on companies"
  entity="companies"
  jsQueryBuilder=".or(q.field('isCustomer').equals(true), q.field('numberOfEmployees').greater(900), q.field('addresses.state').equals('CA,CO,NJ'))"
  restApi="_query=or(filter('isCustomer','true'),filter('numberOfEmployees','greater(900)'),filter('addresses.state','CA,CO,NJ'))"
>}}
<br>

## **Query parameters**

In addition to field filtering, you can specify query parameters to control how the query is executed.

### Limit size

You can set a maximum number of records to fetch using the **`_size`** parameter or the **`size()`** method:

{{< query_sample
  id="13"
  description="fetches 10 records at most"
  entity="companies"
  jsQueryMap="{_size: 10}"
  jsQueryBuilder=".size(10)"
  restApi="_size=10"
>}}
<br>

It's possible that the query returns fewer records than the specified number.

The REST and Javascript APIs will return the total number of records matched by the query. Please refer to the documentation for each API for more information.

{{< callout type="warning" >}}
For the REST API, the maximum value you can specify is 1,000, with a default value of 20 if not specified. These limits and defaults do not apply to the Javascript API, as it uses a cursor to iterate over the results.
{{< /callout >}}
<br>

### Skip records

You can provide an offset to skip some records in your query. You can use a number to indicate how many records to skip, or you can use an ID.

If you use a number, that number will indicate how many records to skip. Use the **`_offset`** parameter or the **`offset()`** method:

{{< query_sample
  id="14"
  description="skips the first 5 records and the first record retrieved will be the 6th one"
  entity="companies"
  jsQueryMap="{_offset: 5}"
  jsQueryBuilder=".offset(5)"
  restApi="_offset=5"
>}}
<br>

If there are fewer records than the specified offset, the query will return no results.

The other option for specifying an offset is an **`ID`**. This form can only be used if you are either explicitly sorting by the **`id`** field or if you have omitted sorting options in your query (the default is id).

For instance, if you query 5 records and receive the following record IDs:

```js
[
  '57fd2d65e4b0ce322b0c8665',
  '57fd2d65e4b0ce322b0c8565',
  '57fd2d65e4b0ce322b0c8547',
  '57fd2d65e4b0ce322b0c84b1',
  '57fd2d64e4b0ce322b0c8349'
]
```
<br>

To fetch the next 5 records, you should make the following query, using the last record's ID as the offset:

{{< query_sample
  id="15"
  description="starts after record with ID 57fd2d64e4b0ce322b0c8349"
  entity="companies"
  jsQueryMap="{_offset: '57fd2d64e4b0ce322b0c8349'}"
  jsQueryBuilder=".offset('57fd2d64e4b0ce322b0c8349')"
  restApi="_offset=57fd2d64e4b0ce322b0c8349"
>}}
<br>

This query will not return the record with **`ID 57fd2d64e4b0ce322b0c8349`** but rather the next 5 records after it.

{{< callout type="success" >}}
If you need to iterate over all records using the REST API and want to avoid fetching the same record twice, it's advisable to use IDs as offsets. Using numbers might result in duplicated or missed records due to modifications of records affecting your query.
{{< /callout >}}
<br>

### Sorting

You can sort results based on a field. By default, the **`id`** field and **`desc`** direction are used if no sorting options are specified. However, you can change this behavior using the **`_sortField`** and **`_sortType`** parameters or the **`sortBy()`** method:

{{< query_sample
  id="16"
  entity="companies"
  jsQueryMap="{ state: 'active', _sortField: 'name', _sortType: 'asc' }"
  jsQueryBuilder=".field('state').equals('active').sortBy('name', 'asc')"
  restApi="state=active&_sortField=name&_sortType=asc"
>}}
<br>

You can even use a nested field for sorting:

{{< query_sample
  id="17"
  entity="companies"
  jsQueryMap="{ _sortField: 'contactInformation.email', _sortType: 'asc' }"
  jsQueryBuilder=".sortBy('contactInformation.email', 'asc')"
  restApi="_sortField=contactInformation.email&_sortType=asc"
>}}
<br>

The **`_sortField`** parameter specifies the field to sort by, and **`_sortType`** specifies the sorting order, which can be one of the following:

- **`asc`** (ascending)
- **`desc`** (descending)

Keep in mind that you cannot use multi-valued or nested fields as the sorting field.

So far you cannot specify many fields for sorting. In some cases you can achieve the same result by adding a calculated field that concatenates the fields you want to use for sorting.

### Include fields

By default, all fields are returned in the results. If you only want to retrieve specific fields, you can use the **`_fields`** parameter or the **`includeFields`**() method:

{{< query_sample
  id="18"
  description="only name and email fields will be fetched"
  entity="companies"
  jsQueryMap="{ _fields: 'name,email' }"
  jsQueryBuilder=".includeFields('name', 'email')"
  restApi="_fields=name,email"
>}}
<br>

You can select nested fields like **`addresses.state`**. If you put the parent field, like **`addresses`**,
all inner fields will be included.

{{< query_sample
  id="19"
  description="you can also indicate nested fields"
  entity="companies"
  jsQueryMap="{ _fields: 'name,addresses.state' }"
  jsQueryBuilder=".includeFields('name', 'addresses.state')"
  restApi="_fields=name,addresses.state"
>}}
<br>

System field will always be returned (`id`, `version`, `label`).

### Fetch related records

{{< callout type="warning" >}}
This parameter only functions with the REST API; it will not have any effect when used with the Javascript API.
{{< /callout >}}

If you wish to reduce the number of requests to the server, you can retrieve a record and its related records by using the **`_relationshipsToFetch`** parameter. This parameter accepts a comma-separated list of relationship fields.

{{< query_sample
  id="20"
  description="Fetches the primary records along with company information"
  entity="contacts"
  restApi="_relationshipsToFetch=company&_size=10"
>}}
<br>

{{< query_sample
  id="21"
  description="You can specify multiple relationship fields separated by commas, even if the relationship field is multi-valued"
  entity="contacts"
  restApi="_relationshipsToFetch=company,skills&_size=10"
>}}
<br>

### Indexed filters

{{< callout type="warning" >}}
This is only allowed for entities with indexed filters created.
{{< /callout >}}

When querying using indexed filter feature, it will attempt to match the provided string in any of the fields provided in the index. For example:

{{< query_sample
  id="22"
  description="Finds records where fields name or description contains 'Technology'"
  entity="companies"
  jsQueryMap="{_indexedFilter: 'nameDescription', _indexedFilterQuery: 'Technology'}"
  jsQueryBuilder=".indexedFilter('nameDescription', 'Technology')"
  restApi="_indexedFilter=nameDescription&_indexedFilterQuery=Technology"
>}}
<br>

Note that to match the entire phrase, you should enclose it with double quotes.

Please be aware that all searches are case-insensitive.

### Format

{{< callout type="warning" >}}
This parameter only works with the REST API; it will not have any effect when used with the Javascript API.
{{< /callout >}}

In the REST API, you can utilize the **`_format`** parameter to specify the format of the returned records. There are two options:

- **`native`**: Returns the "raw" values for each field. For example, a date-time field will be returned as milliseconds. This is the default format.
- **`plainText`**: Returns field values converted to strings using the display options of each field. For example, a date-time field will be returned as a string based on the field's display options.

The **`plainText`** format is useful when you need to display information to users in an external application outside of the Slingr runtime, and you do not want to handle formatting.

{{< query_sample
  id="24"
  description="Companies query sample"
  entity="companies"
  restApi="_format=plainText&_size=10"
>}}
<br>

### Format using one specific user's settings

This can be achieved using the **`_formatForUser`** parameter and is only meaningful when using the plainText option in **`_format`**.

You should provide either the user's ID or email that will be used to format the record. For instance, if the user has configured a different time zone, date-time fields will use that setting to format dates. This is useful when you need to send emails to individuals residing in different time zones.

{{< query_sample
  id="25"
  description="Companies query sample"
  entity="companies"
  restApi="_format=plainText&_formatForUser=test1.docs@slingr.io&_size=10"
>}}
<br>
