---
title: "Query language"
lead: "Describe the query language, which is shared by the REST API as well as the Javascript API"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

## Overview


The query language allows to find records in an entity using complex criteria. This language is shared by 
the [REST API]({{site.baseurl}}/app-development-apps-rest-api.html) as well as the [Javascript API]({{site.baseurl}}/app-development-js-api.html), however 
keep in mind that the way you specify queries will be different. For example a simple query to retrieve
10 active companies using the REST API looks like this:

```
GET https://app.{{ site.slingr_domain }}/prod/runtime/api/data/companies?state=active&_size=10
```

while in the Javascript API it would be something like this:

```js
var records = sys.data.find('companies', {state: 'active', _size: 10});
while (records.hasNext()) {
  // do something
}
```


In the Javascript API it is also possible to use the [query builder]({{site.baseurl}}/app-development-js-api-data.html#sys.data.Query)) which provides 
some helpers to build these queries:

```js
var query = sys.data.createQuery('companies')
    .field('state').equals('active')
    .size(10);
var records = sys.data.find(query);
while (records.hasNext()) {
  // do something
}
```

Usually when you have more complex query criteria the query builder is easier to use than the 
simple map form as it provides conversion and parsing features. Also there are
queries that cannot be expressed in the query map version. For example:

```js
var query = sys.data.createQuery('companies').query(function(q) {
  return q.or(
    q.field('name').like('test'),
    q.field('name').equals('abc')
  );
});
```

The above query cannot be expressed in using the query map version because
you cannot use the same key in the map. It would be something like this:

```js
var query = {
  name: 'like(test)',
  name: 'like(abc)'
};
```

So in that case the key `name` is twice in the map and won't work as expected.

Another thing to take into account is exception handling. When you use the query builder
some exception will be thrown when you are building the query. For example:
 
```js
try {
  var query = sys.data.createQuery('companies')
      .field('doesNotExist').equals('test');
  log('count: '+sys.data.count(query);
} catch (e) {
  log('error: '+e.message());
}
```

The above script will throw an exception when calling the method `field()` because
field `doesNotExist` is not a valid field in the `companies` entity. The same will
happen with other bad query configurations, so you need to keep in mind that exceptions
could be thrown during the building of the query.

On the other hand, when using the query map, you won't get any exception when building
the query but when executing it:

```js
try {
  var query = {doesNotExist: 'test'};
  var count = sys.data.count('companies', query);
  log('count: '+count);
} catch (e) {
  log('error: '+e.message());
}
```

So in this case the exception will be thrown when calling the method [sys.data.count()](../../getting-started/what_is_slingr)


Here you will find all samples in the three versions so you can compare them. If something
only applies to some versions it will be explicitly indicated.

## Simple queries

Simple queries allow to filter records using `AND` logical operator only. You can still indicate many filters. Here 
there are some simple queries:

{{< query_sample
  id="8i3jfds032"
  description="finds a company by exact name"
  entity="companies"
  jsQueryMap="{name: 'Blogpad'}"
  jsQueryBuilder=".field('name').equals('Blogpad')"
  restApi="name=Blogpad"
>}}


{{< query_sample
  id="med83jf982"
  description="filters by companies with more than 200 employees; limits results to 10 and use offset of 20"
  entity="companies"
  jsQueryMap="{numberOfEmployees: 'greater(200)', _size: 10, _offset: 20}"
  jsQueryBuilder=".field('numberOfEmployees').greater(200).size(10).offset(20)"
  restApi="numberOfEmployees=greater(200)&_size=10&_offset=20"
>}}


{{< query_sample
  id="5egfd8213h"
  description="filters by two fields"
  entity="companies"
  jsQueryMap="{type: 'a', isCustomer: false}"
  jsQueryBuilder=".field('type').equals('a').field('isCustomer').equals(false)"
  restApi="type=a&isCustomer=false"
>}}

{{< query_sample
  id="54dfgdf234w"
  description="filters by a nested field"
  entity="companies"
  jsQueryMap="{'addresses.state': 'CA'}"
  jsQueryBuilder=".field('addresses.state').equals('CA')"
  restApi="addresses.state=CA"
>}}

{{< query_sample
  id="8dgh30smn3"
  description="retrieves only name and type of customers"
  entity="companies"
  jsQueryMap="{isCustomer: true, _fields: 'name,type'}"
  jsQueryBuilder=".field('isCustomer').equals(true).includeFields('name', 'type')"
  restApi="isCustomer=true&_fields=name,type"
>}}


In the query map and REST API, parameters starting with `_` are system parameters,
while others are fields. Next section explains all options to filter by fields.

### Filters by field

You can filter results by field value. For example, if your entity has a field called `name`, you 
could make the following query:

{{< query_sample
  id="asd2423redfgdsfw"
  entity="companies"
  jsQueryMap="{name: 'Blogpad'}"
  jsQueryBuilder=".field('name').equals('Blogpad')"
  restApi="name=Blogpad"
>}}

Also you could provide several values (comma separated) and it is going to act like an `OR`:

{{< query_sample
  id="34fg345deawvc"
  entity="companies"
  jsQueryMap="{name: 'Blogpad,Jazzy'}"
  jsQueryBuilder=".field('name').equals('Blogpad,Jazzy')"
  restApi="name=Blogpad,Jazzy"
>}}

 
Keep in mind that if the value you are matching already has a comma you will need to wrap it using
double quotes:

{{< query_sample
  id="98432uhnsdofh9we7"
  entity="companies"
  jsQueryMap="{name: '\"ACME, Inc\"'}"
  jsQueryBuilder=".field('name').equals('\"ACME, Inc\"')"
  restApi="name=\"ACME, Inc\""
>}}

You are able to filter by nested fields as well:

{{< query_sample
  id="9jks93fnc734fg"
  entity="companies"
  jsQueryMap="{'contactInformation.email': 'dwelchdp@apple.com'}"
  jsQueryBuilder=".field('contactInformation.email').equals('dwelchdp@apple.com')"
  restApi="contactInformation.email=dwelchdp@apple.com"
>}}

If nested group field is multi-valued, you can still do a query like this:
{{< query_sample
  id="Kfiewr934sdfwer234ga"
  entity="companies"
  jsQueryMap="'{'_or': {'type': 'a', '_and': {'type': 'b', 'isCustomer': true}}}'"
  jsQueryBuilder="'.query(function(q) { return q.or(q.field('type').equals('a'), q.and(q.field('type').equals('b'), q.field('isCustomer').equals(true))); })'"
  restApi="_query=or(filter('type','a'),and(filter('type','b'),filter('isCustomer','true')))"
>}}

These are the available operators:

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

Each field type allows different operators. You should check each type's 
documentation to see which operators are supported.

The following operators are available for all types:

```js
equals(value)
notEquals(value)
empty()
notEmpty()
```

{{< callout type="info" >}}
If you don't specify any operator, the default one is equals()
{{< /callout >}}

{{< callout type="info" >}}
It is always a good idea to check each type's documentation when you need to filter by field values. Each type supports different ways to query and might accept alternative formats to simplify its usage.
{{< /callout >}} 

## Complex queries

Complex queries are just regular queries but you can mix and nest `OR` and `AND` expressions. The reason
why they are separated is that they require a different syntax to be written, especially in the REST API
and query builder.

Here is a sample of a complex query and you can see the differences between the three versions:

{{< query_sample
  id="Kfiewr93fefsdfwer234ga"
  entity="companies"
  jsQueryMap="{ _or: { type: 'a', _and: { type: 'b', isCustomer: true } } }"
  jsQueryBuilder=".field('type').equals('a').or().field('type').equals('b').field('isCustomer').equals(true)"
  restApi="_query=or(filter('type','a'),and(filter('type','b'),filter('isCustomer','true')))"
>}}


The query map version is almost the same as simple queries. It just uses the `_or` and `_and` 
operators. However in the REST API and query builder, due to some limitations in the interface, 
complex queries need to be written in a different way.

For the REST API you will have to pass a `_query` parameter where you can use these operators:

- `or(...)`: evaluates to true if any of the criteria passed as arguments is true. It accepts a list of filter 
  criteria that can be `and()`, `filter()`, or just another `or()`.
- `and(...)`: same as `or()`, but it will evaluate to true if all the criteria passed as arguments are true.
- `filter(field,value)`: this is just a simple field filter as the ones in simple queries. You 
  should always enclose name and value with single quotes.

When using the query builder you will need to use the `query()` method, which accepts 
a function as parameter. That function will get a helper object and should return a query
criteria.

Here are some samples of complex queries in the REST API and query builder:

{{< query_sample
  id="ALAOEMsidewor9234324"
  entity="companies"
  jsQueryBuilder=".and(q.field('isCustomer').equals(true), q.or(q.field('addresses.state').equals('CA'), q.field('numberOfEmployees').greater(100)))"
  restApi="_query=and(filter('isCustomer','true'),or(filter('addresses.state','CA'),filter('numberOfEmployees','greater(100)')))"
>}}

{{< query_sample
  id="8923jsdf34dsaaa"
  entity="companies"
  jsQueryBuilder=".or(q.field('isCustomer').equals(true), q.field('numberOfEmployees').greater(900), q.field('addresses.state').equals('CA,CO,NJ'))"
  restApi="_query=or(filter('isCustomer','true'),filter('numberOfEmployees','greater(900)'),filter('addresses.state','CA,CO,NJ'))"
>}}

## Query parameters

Apart from filtering by fields you can also specify some parameters to control
 how the query is performed.

### Limit size

You can limit the maximum number of records to fetch using the `_size` parameter or 
the `size()` method:

{{< query_sample
  id="jknd732hnf7839"
  description="fetches 10 records at most"
  entity="companies"
  jsQueryMap="{_size: 10}"
  jsQueryBuilder=".size(10)"
  restApi="_size=10"
>}}


It is possible that the query returns less than the specified number of
records.

The REST and Javascript APIs will return the total number of records matched
by the query. Please look at the documentation of each API to find more information.

{{< callout type="warning" >}}
For the REST API the maximum value you can send is 1,000. The default value is 20 if not specified. These limits and defaults do not apply to the Javascript API because a cursor is used to iterate over the results.
{{< /callout >}} 

### Skip records

You can pass an offset to skip some records in your query. You can use a number
to indicate how many records you want to skip or you can use an ID.

If you use a number, that number will indicate how many records to skip. You
should use the `_offset` parameter or the `offset()` method:

{{< query_sample
  id="Njsue83Md92"
  description="skips the first 5 records and the first record retrieved will be the 6th one"
  entity="companies"
  jsQueryMap="{_offset: 5}"
  jsQueryBuilder=".offset(5)"
  restApi="_offset=5"
>}}


If there are less records than the specified offset, then the query will return no results.

The other thing you can pass as offset is an ID. This form can only
be used if you are either explicitly sorting by the `id` field or you have omitted
sorting options in your query (the default is `id`).

For example, you query 5 records and you get the following record IDs:

```js
[
  '57fd2d65e4b0ce322b0c8665', 
  '57fd2d65e4b0ce322b0c8565', 
  '57fd2d65e4b0ce322b0c8547', 
  '57fd2d65e4b0ce322b0c84b1', 
  '57fd2d64e4b0ce322b0c8349'
]
```

Then, if you want to fetch the next 5 records, you should make the following query (using the last record's ID as offset):

{{< query_sample
  id="fh2dJd892aid82xz"
  description="starts after record with ID 57fd2d64e4b0ce322b0c8349"
  entity="companies"
  jsQueryMap="{_offset: '57fd2d64e4b0ce322b0c8349'}"
  jsQueryBuilder=".offset('57fd2d64e4b0ce322b0c8349')"
  restApi="_offset=57fd2d64e4b0ce322b0c8349"
>}}

This query is not going to return record with ID `57fd2d64e4b0ce322b0c8349`, but the next 5 records after it.

{{< callout type="success" >}}
If you need to iterate over all records using the REST API and you want to avoid fetching the same record twice you probably want to use IDs as offsets. If you use numbers it is possible the the modifications of records affects your query and you might process the same record twice or miss some of them.
{{< /callout >}} 

### Sorting

It is possible to sort results based on a field. By default we use the `id` field 
and `desc` direction if no sorting options are indicated, but you can change that 
using the `_sortField` and `_sortType` parameters or the `sortBy()` method:

{{< query_sample
  id="rrttthbbbffffff"
  entity="companies"
  jsQueryMap="{ state: 'active', _sortField: 'name', _sortType: 'asc' }"
  jsQueryBuilder=".field('state').equals('active').sortBy('name', 'asc')"
  restApi="state=active&_sortField=name&_sortType=asc"
>}}

You can even use a nested field for sorting:

{{< query_sample
  id="LdiweJASIEQWR32"
  entity="companies"
  jsQueryMap="{ _sortField: 'contactInformation.email', _sortType: 'asc' }"
  jsQueryBuilder=".sortBy('contactInformation.email', 'asc')"
  restApi="_sortField=contactInformation.email&_sortType=asc"
>}}


Sorting direction can be `asc` (ascending) or `desc` (descending). By default `desc` will
be used if not indicated.

Keep in mind that you cannot use multi-valued or nested fields as the sorting field.

So far you cannot specify many fields for sorting. In some cases you can achieve the same 
result by adding a calculated field that concatenates the fields you want to use for sorting.

### Select fields to fetch

By default all fields will be fetched. If you want to specify which fields you want to fetch, you can 
pass the `_fields` parameter or use the `includeFields()` method:

{{< query_sample
  id="AAAAOdijdewq8324823"
  description="only name and email fields will be fetched"
  entity="companies"
  jsQueryMap="{ _fields: 'name,email' }"
  jsQueryBuilder=".includeFields('name', 'email')"
  restApi="_fields=name,email"
>}}

You can select nested fields like `addresses.state`. If you put the parent field, like `addresses`,
all inner fields will be included.

{{< query_sample
  id="MMMFf82348sdfs2"
  description="you can also indicate nested fields"
  entity="companies"
  jsQueryMap="{ _fields: 'name,addresses.state' }"
  jsQueryBuilder=".includeFields('name', 'addresses.state')"
  restApi="_fields=name,addresses.state"
>}}

System field will always be returned (`id`, `version`, `label`).

### Fetch related records

{{< callout type="warning" >}}
This parameter only works on the REST API. It won't have any effect if you use it on the Javascript API.
{{< /callout >}} 

If you want to reduce the number of requests to the server you can fetch a record and 
its related records by using the `_relationshipsToFetch` parameter, which accepts a comma-separated list of
relationship fields.

{{< query_sample
  id="nnfgewRwerweoprpweoi34"
  description="fetches the main records and also fetch the information of the company"
  entity="contacts"
  restApi="_relationshipsToFetch=company&_size=10"
>}}

{{< query_sample
  id="fiw87222mMDDE82swa"
  description="you can specify multiple relationship fields separated by commas, even if the relationship field is multi-valued"
  entity="contacts"
  restApi="_relationshipsToFetch=company,skills&_size=10"
>}}


### Global search

{{< callout type="warning" >}}
This is only allowed for entities with global search enabled.
{{< /callout >}} 

When querying using the global search feature it will try to match the string in any field on the entity instead 
of trying to match one specific field. For example:

{{< query_sample
  id="qqpwo928272ddd"
  description="finds records where any field has either the word 'lacinia'' or 'erat'"
  entity="companies"
  jsQueryMap="{ _globalSearch: 'lacinia erat' }"
  jsQueryBuilder=".globalSearch('lacinia erat')"
  restApi="_globalSearch=lacinia erat"
>}}

Notice that in order to match the whole sentence you need to enclose it with double quotes:

{{< query_sample
  id="oe932Mdskw7823nas"
  description="finds record where any field has the tense 'lacinia erat'"
  entity="companies"
  jsQueryMap="{ _globalSearch: '\"lacinia erat\"' }"
  jsQueryBuilder=".globalSearch('\"lacinia erat\"')"
  restApi="_globalSearch=\"lacinia erat\""
>}}


Keep in mind that all searches are case insensitive.

### Format

{{< callout type="warning" >}}
This parameter only works on the REST API. It won't have any effect if you use it on the Javascript API.
{{< /callout >}} 

In the REST API you can use the `_format` parameter to format the records. There are two options:

-  `native`: returns the "raw" values for each field. For example, a date time field will be returned as 
   milliseconds. This is the default format.
-  `plainText`: returns values of fields converted to string using the display option of each field. 
   For example, a date time field will be returned as a string based on the display options of the field.
   
The `plainText` format is useful when you need to display information to the user
in an external app outside Slingr runtime and you don't want to take care of formatting.

{{< query_sample
  id="43ids832jkdsERW341"
  entity="companies"
  restApi="_format=plainText&_size=10"
>}}

### Format using one specific user's settings

This can be done using the `_formatForUser` parameter and only makes sense if you use the option `plainText` in `_format`.

You should pass either the user's ID or email that will be used to format the record. For example, if the user configured a different time zone, date-time fields will use that setting to format dates. This is useful if you need to send emails to individuals that live across different time zones.

{{< query_sample
  id="43ids832jkdsERW33331"
  entity="companies"
  restApi="_format=plainText&_formatForUser=test1.docs@slingr.io&_size=10"
>}}
