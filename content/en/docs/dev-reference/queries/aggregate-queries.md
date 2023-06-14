---
title: "Aggregated queries"
lead: "Explains how to make aggregate queries over data. Samples demostrating some common use cases."
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

Aggregated queries allow you to perform aggregation operations over records in entities, 
like count, sum or average.

This feature is implemented following [MongoDB's aggregation framework](http://docs.mongodb.org/manual/core/aggregation-pipeline/),
so you will notice many similarities. Here you will find all the information to write
aggregate queries and you shouldn't need to check MongoDB's docs.

Basically there is a pipeline where the input are the records in the entity
and from there you apply different operations to filter, sort and aggregate
data. Here is a sample of an aggregate query:

```js
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

Here in the pipeline we have two steps:

1. Select only records associated with a customer
2. Group by `company` and sum up the field `numberOfSkills` and store it in the field `totalSkills`

So the input of one step is the result of the previous one. That's why it is a pipeline.

You will end up with a result set that contains records with the following structure
for the example above:

```
{
  "company": {
    "id": "57fd2d61e4b0ce322b0c530d",
    "label": "Flashset"
  },
  "totalSkills": 12
}
```

As you can see you get a simple Javascript (it follows the JSON representation 
you can see in the [REST API]({{site.baseurl}}/app-development-apps-rest-api.html) object instead of 
something like a [record object]({{site.baseurl}}/app-development-js-api-data.html#sys.data.Record). 
This is because the structure changes based on the operations in your pipeline
and the result is not a record from an entity any longer. You should check each type's 
documentation to verify what's the format used in the JSON representation.

Aggregated queries, similar to other queries, can be expressed using a query map, a query builder and
the REST API. Here you will find samples for all versions.

## Operations 

### Count

Allows to count elements and store the result in a field. This field cannot contain special characters, only numbers 
and letters and will be the only one in the result.

Here are some samples of how you can use it:

{{< query_sample
  id="tgert24234"
  description="counts companies from New York"
  entity="companies"
  jsQueryMap="{match: {'address.state': 'NY'}, count: 'counter_field'}"
  jsQueryBuilder="query.match().field('address.state').equals('NY'); query.count().counterName('counter_field');"
  restApi="{\"match\": {\"address.state\": \"NY\"}, \"count\": \"counter_field\"}"
>}}


When you run the above query you will get something like this as the output:

```js
{"counter_field":2}
```

### Skip

Allows to skip a number of elements. This operator is configured with a positive integer and omits the first number of 
results.

Here are some samples of how you can use it:

{{< query_sample 
id="432lkj3kyt"
description="retrieves contacts skipping first 3 results"
entity="contacts"
jsQueryMap="{skip: 3}"
jsQueryBuilder="query.skip().step(3);"
restApi="{\"skip\": 3}"
>}}

### Limit

Allows to limit number of elements. This operator is configured with a positive integer and retrieves the first number of 
results.

Here are some samples of how you can use it:

{{< query_sample 
id="4df23s5fdy"
description="retrieves first 5 contacts"
entity="contacts"
jsQueryMap="{limit: 5}"
jsQueryBuilder="query.limit().step(5);"
restApi="{\"limit\": 5}"
>}}

### Unwind

Allows to unwind multivalued fields. This operator is configured with field, if this field is an array, it will retrieve 
the same record with a single value for selected field per each element in array.

Here are some samples of how you can use it:

{{< query_sample 
id="8gfddf0980"
description="retrieves companies unwinding services"
entity="companies"
jsQueryMap="{unwind: {fieldPath: 'services', includeEmpty: true}}"
jsQueryBuilder="query.unwind().path('services').includeEmpty(true);"
restApi="{\"unwind\": {\"fieldPath\": \"services\", \"includeEmpty\": true}}"
>}}

When you run the above query you will get something like this as the output:

```js
{"id":"57fd2d64e4b0ce322b0c8349","name":"Photolist","services":"SERVICE_A"} 
{"id":"57fd2d64e4b0ce322b0c8349","name":"Photolist","services":"SERVICE_C"} 
{"id":"57fd2d62e4b0ce322b0c6268","name":"DabZ","services":"SERVICE_A"} 
{"id":"57fd2d62e4b0ce322b0c6268","name":"DabZ","services":"SERVICE_B"} 
{"id":"57fd2d62e4b0ce322b0c6268","name":"DabZ","services":"SERVICE_D"} 
{"id":"57fd2d60e4b0ce322b0c50f0","name":"Mydo","services":null} 
{"id":"57fd2d64e4b0ce322b0c7d12","name":"Zazio","services":"SERVICE_C"} 
...
```

### Lookup

Allows to lookup elements from other entities in current records. This operator makes an equivalent to a SQL left-join
using the name of a foreign entity, a foreign field in that entity and a local field in current entity (set in query).

Here are some samples of how you can use it:

{{< query_sample 
id="asd678asw2"
description="retrieves companies with related contacts"
entity="companies"
jsQueryMap="{'lookup': {'localFieldPath': 'id', 'foreignFieldPath': 'company.id', 'foreignEntityName': 'contacts', 'as': 'relatedContacts'}}"
jsQueryBuilder="query.lookup().localField('id').foreignField('company.id').foreignEntity('contacts').as('relatedContacts');"
restApi="{\"lookup\": {\"localFieldPath\": \"id\", \"foreignFieldPath\": \"company.id\", \"foreignEntityName\": \"contacts\", \"as\": \"relatedContacts\"}}"
>}}


When you run the above query you will get something like this as the output:

```js
{"id":"57fd2d64e4b0ce322b0c8349","name":"Photolist","relatedContacts":[{
                                                                           "id": "5506fc44c2eee3b1a702694c",
                                                                           "company": {
                                                                             "id": "5506fc43c2eee3b1a7026944",
                                                                             "label": "Photolist"
                                                                           },
                                                                           "firstName": "John",
                                                                           "lastName": "Doe",
                                                                           "email": "john.doe@abcinc.com",
                                                                           "phoneNumbers": [
                                                                             "3039514211",
                                                                             "3039514210"
                                                                           ]
                                                                         },
                                                                         {
                                                                           "id": "5506fc44c2eee3b1a702694d",
                                                                           "company": {
                                                                             "id": "5506fc43c2eee3b1a7026944",
                                                                             "label": "Photolist"
                                                                           },
                                                                           "firstName": "Martin",
                                                                           "lastName": "Smith",
                                                                           "email": "martin.smith@abcinc.com"
                                                                         }]} 
{"id":"57fd2d62e4b0ce322b0c6268","name":"DabZ","relatedContacts":[{"id": "5506fc44c2eee3b1a702694e",
                                                                   "company": {
                                                                     "id": "5506fc43c2eee3b1a7026946",
                                                                     "label": "DabZ"
                                                                   },
                                                                   "firstName": "William",
                                                                   "lastName": "Brown",
                                                                   "email": "william.brown@acme.com",
                                                                   "phoneNumbers": [
                                                                     "3039514211",
                                                                     "3039514210"
                                                                   ]}]} 
{"id":"57fd2d60e4b0ce322b0c50f0","name":"Mydo","relatedContacts":[]} 
{"id":"57fd2d64e4b0ce322b0c7d12","name":"Zazio","relatedContacts":[]} 
...
```

### Match

Allows to filter records in the pipeline. You need to use this operation to 
select the records you want to use for your aggregation.

This filter works the same way as the ones for regular queries, which means 
you can pass a query map or query builder (if you are using the Javascript API). 
Keep in mind that only filters by fields are supported here while other parameters
are ignored.

Here are some sample of matching operations:

{{< query_sample
id="dfgf4543563qasd"
description="counts the number of skills for contacts of customers // see how the match operator filters contacts where company is a customer"
entity="contacts"
jsQueryMap="{match: {'company.isCustomer': true}}, {group: {totalNumberOfSkills: 'sum(numberOfSkills)'}}"
jsQueryBuilder="query.match().field('company.isCustomer').equals(true); query.group().accumulate('totalNumberOfSkills').sum('numberOfSkills');"
restApi="{\"match\": {\"company.isCustomer\": true}}, {\"group\": {\"totalNumberOfSkills\": \"sum(numberOfSkills)\"}}"
>}}


{{< query_sample id="sd234sDFSD2314a" description="counts the number of skills for contacts // the match operator filters contacts by customers and state equals to New Jersey" entity="contacts" jsQueryMap="{match: {'company.isCustomer': true, 'address.state': 'NJ'}}, {group: {totalNumberOfSkills: 'sum(numberOfSkills)'}}" jsQueryBuilder="query.match().field('company.isCustomer').equals(true).field('address.state').equals('NJ'); query.group().accumulate('totalNumberOfSkills').sum('numberOfSkills');" restApi="{\"match\": {\"company.isCustomer\": true, \"address.state\": \"NJ\"}}, {\"group\": {\"totalNumberOfSkills\": \"sum(numberOfSkills)\"}}" >}}

### Sort

Allows to change the sorting of records in your aggregation pipeline. This
is useful for sorting the final result or to use together with accumulators
like `first()` or `last()` in the `group` operator.

Here are some samples of how you can use it:

{{< query_sample
id="we423423dsfwerw"
description="finds the contact with more skills per company"
entity="contacts"
jsQueryMap="{sort: {'numberOfSkills': 'desc'}}, {group: {by: 'company', firstName: 'first(firstName)', lastName: 'first(lastName)', skills: 'first(numberOfSkills)'}}"
jsQueryBuilder="query.sort().by('numberOfSkills', 'desc'); query.group().by('company').accumulate('firstName').first('firstName').accumulate('lastName').first('lastName').accumulate('skills').first('numberOfSkills');"
restApi="{\"sort\": {\"numberOfSkills\": \"desc\"}}, {\"group\": {\"by\": \"company\", \"firstName\": \"first(firstName)\", \"lastName\": \"first(lastName)\", \"skills\": \"first(numberOfSkills)\"}}"
>}}


{{< query_sample
id="Ofdke8234sdjf"
description="finds the contact with more skills per company and sorts the result by skills and last name"
entity="contacts"
jsQueryMap="{sort: {'numberOfSkills': 'desc'}}, {group: {by: 'company', firstName: 'first(firstName)', lastName: 'first(lastName)', skills: 'first(numberOfSkills)'}}, {sort: {'skills': 'desc', 'lastName': 'asc'}}"
jsQueryBuilder="query.sort().by('numberOfSkills', 'desc'); query.group().by('company').accumulate('firstName').first('firstName').accumulate('lastName').first('lastName').accumulate('skills').first('numberOfSkills'); query.sort().by('skills', 'desc').by('lastName', 'asc');"
restApi="{\"sort\": {\"numberOfSkills\": \"desc\"}}, {\"group\": {\"by\": \"company\", \"firstName\": \"first(firstName)\", \"lastName\": \"first(lastName)\", \"skills\": \"first(numberOfSkills)\"}}, {\"sort\": {\"skills\": \"desc\", \"lastName\": \"asc\"}}"
>}}


### Project

Allows to remove fields from records and reduce memory usage. This is important if you need to process a lot of records but you just need a few fields.

Here are some samples of how to use it:

{{< query_sample
id="324dfgty34523qrfw"
description="leaves only number of employees and the sums up"
entity="companies"
jsQueryMap="{project: 'name,numberOfEmployees'}"
jsQueryBuilder="query.project().field('name').field('numberOfEmployees');"
restApi="{\"project\": \"name,numberOfEmployees\"}"
>}}

When you run the above query you will get something like this as the output:

```js
{"id":"57fd2d64e4b0ce322b0c8349","name":"Photolist","numberOfEmployees":83} 
{"id":"57fd2d62e4b0ce322b0c6268","name":"DabZ","numberOfEmployees":635} 
{"id":"57fd2d60e4b0ce322b0c50f0","name":"Mydo","numberOfEmployees":917} 
{"id":"57fd2d64e4b0ce322b0c7d12","name":"Zazio","numberOfEmployees":618} 
...
```

You can see that only fields `name` and `numberOfEmployees` were included in the output (and `id` that is always there).

Sure! Here's the updated version of the code snippet using the query_sample shortcode:

```markdown
### Group

This is the most important operation as it is the one that will actually aggregate data. It allows you to group a set of records based on some fields and accumulate the results of those records into a field.

For example:

{{< query_sample
id="asd324fdgt6457dfgeee"
description="calculate the total number of skills per company"
entity="contacts"
jsQueryMap="{project: 'company,numberOfSkills'}, {group: {by: 'company', totalSkills: 'sum(numberOfSkills)'}}"
jsQueryBuilder="query.project().field('company').field('numberOfSkills'); query.group().by('company').accumulate('totalSkills').sum('numberOfSkills');"
restApi="{\"project\": \"company,numberOfSkills\"}, {\"group\": {\"by\": \"company\", \"totalSkills\": \"sum(numberOfSkills)\"}}"
>}}

For this query, you will get a result set like this one:

```js
{"company":{"id":"57fd2d60e4b0ce322b0c503d","label":"Jabbercube"},"totalSkills":4}
{"company":{"id":"57fd2d63e4b0ce322b0c75b0","label":"Skilith"},"totalSkills":4}
{"company":{"id":"57fd2d61e4b0ce322b0c5dc6","label":"Trupe"},"totalSkills":4}
{"company":{"id":"57fd2d60e4b0ce322b0c4c22","label":"Feedbug"},"totalSkills":8}
{"company":{"id":"57fd2d62e4b0ce322b0c65ce","label":"Realcube"},"totalSkills":8}
{"company":{"id":"57fd2d61e4b0ce322b0c530d","label":"Flashset"},"totalSkills":12}
{"company":{"id":"57fd2d60e4b0ce322b0c51fe","label":"Thoughtworks"},"totalSkills":8}
{"company":{"id":"57fd2d60e4b0ce322b0c4e02","label":"Mynte"},"totalSkills":0}
```

Here you can see how data was grouped by the fields indicated in the `by` option
(in this case the `company` field) and then you have accumulators defined that
are added as fields in the output (in this case the `totalSkills` field).

Basically the `by` option indicates how records will be groups. Records that have
the same value(s) in the fields listed in this option will belong to the same group.
You can put more than one field if you separate the names using commas or calling
`by()` multiple times in the query builder.

Then you can define any number of accumulators. Each accumulator will be a field
in the output and must use one of the accumulator operations available:

**count()**

This will return the number of records in the group:

{{< query_sample
id="bggessrr6633ggjnju"
description="counts contacts on each company"
entity="contacts"
jsQueryMap="{project: 'company'}, {group: {by: 'company', numberOfContacts: 'count()'}}"
jsQueryBuilder="query.project().field('company').field('numberOfSkills'); query.group().by('company').accumulate('numberOfContacts').count();"
restApi="{\"project\": \"company\"}, {\"group\": {\"by\": \"company\", \"numberOfContacts\": \"count()\"}}"
>}}


**sum(field)**

Sums up the value in one field for the records in the group:

{{< query_sample
id="ODieiNNDDN02032"
description="calculate the total number of skills per company"
entity="contacts"
jsQueryMap="{project: 'company,numberOfSkills'}, {group: {by: 'company', totalSkills: 'sum(numberOfSkills)'}}"
jsQueryBuilder="query.project().field('company').field('numberOfSkills'); query.group().by('company').accumulate('totalSkills').sum('numberOfSkills');"
restApi="{\"project\": \"company,numberOfSkills\"}, {\"group\": {\"by\": \"company\", \"totalSkills\": \"sum(numberOfSkills)\"}}"
>}}


This only works for number fields like integer, money, decimal or percentage.

**avg(field)**

Calculates the average of the values in one field for the records in the group:

{{< query_sample
id="OFFFFFFFFFFFF33"
description="calculate the average number of skills per company per contact"
entity="contacts"
jsQueryMap="{project: 'company,numberOfSkills'}, {group: {by: 'company', avgSkills: 'avg(numberOfSkills)'}}"
jsQueryBuilder="query.project().field('company').field('numberOfSkills'); query.group().by('company').accumulate('avgSkills').avg('numberOfSkills');"
restApi="{\"project\": \"company,numberOfSkills\"}, {\"group\": {\"by\": \"company\", \"avgSkills\": \"avg(numberOfSkills)\"}}"
>}}

This only works for number fields like integer, money, decimal or percentage.

Keep in mind that if the value of the field is `null` or the field isn't 
present at all in the record it won't count for the average calculation.

**first(field)**

It will select the value of the first record as the value of the output. This
is usually used in combination with the `sort` operator:

{{< query_sample
id="OWERw82348230dnf"
description="finds the contact with more skills per company"
entity="contacts"
jsQueryMap="{sort: {'numberOfSkills': 'desc'}}, {group: {by: 'company', firstName: 'first(firstName)', lastName: 'first(lastName)', skills: 'first(numberOfSkills)'}}"
jsQueryBuilder="query.sort().by('numberOfSkills', 'desc'); query.group().by('company').accumulate('firstName').first('firstName').accumulate('lastName').first('lastName').accumulate('skills').first('numberOfSkills');"
restApi="{\"sort\": {\"numberOfSkills\": \"desc\"}}, {\"group\": {\"by\": \"company\", \"firstName\": \"first(firstName)\", \"lastName\": \"first(lastName)\", \"skills\": \"first(numberOfSkills)\"}}"
>}}


**last(field)**

It will select the value of the last record as the value of the output. This
is usually used in combination with the `sort` operator:

{{< query_sample
id="ccccccccccccssssssssss"
description="finds the contact with more skills per company"
entity="contacts"
jsQueryMap="{sort: {'numberOfSkills': 'asc'}}, {group: {by: 'company', firstName: 'last(firstName)', lastName: 'last(lastName)', skills: 'last(numberOfSkills)'}}"
jsQueryBuilder="query.sort().by('numberOfSkills', 'asc'); query.group().by('company').accumulate('firstName').last('firstName').accumulate('lastName').last('lastName').accumulate('skills').last('numberOfSkills');"
restApi="{\"sort\": {\"numberOfSkills\": \"asc\"}}, {\"group\": {\"by\": \"company\", \"firstName\": \"last(firstName)\", \"lastName\": \"last(lastName)\", \"skills\": \"last(numberOfSkills)\"}}"
>}}

**max(field)**

It will select the maximum value from all records record as the value of the output.

{{< query_sample
id="as34234sdfgdf2323edsww"
description="finds the maximum number of skills per company for one contact"
entity="contacts"
jsQueryMap="{group: {by: 'company', skills: 'max(numberOfSkills)'}}"
jsQueryBuilder="query.group().by('company').accumulate('skills').max('numberOfSkills');"
restApi="{\"group\": {\"by\": \"company\", \"skills\": \"max(numberOfSkills)\"}}"
>}}


**min(field)**

It will select the minimum value from all records record as the value of the output.

{{< query_sample
id="98wiueqaiudgasdasd"
description="finds the minimum number of skills per company for one contact"
entity="contacts"
jsQueryMap="{group: {by: 'company', skills: 'min(numberOfSkills)'}}"
jsQueryBuilder="query.group().by('company').accumulate('skills').min('numberOfSkills');"
restApi="{\"group\": {\"by\": \"company\", \"skills\": \"min(numberOfSkills)\"}}"
>}}
## Limitations

Aggregated queries work well for small and moderated data sets. If you need
to perform analysis over big data sets we recommend moving that information to
other services especifically designed with that purpose in mind like Google Big Query
or Amazon Redshift.