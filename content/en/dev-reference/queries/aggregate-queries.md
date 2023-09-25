---
title: "Aggregated queries"
description: "Explains how to make aggregate queries over data. Samples demostrating some common use cases."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 138
---

## **Overview**

Aggregated queries enable you to perform aggregation operations on records in entities, such as counting, summing, or averaging.

This feature is implemented using the [MongoDB's aggregation framework](http://docs.mongodb.org/manual/core/aggregation-pipeline/), so you'll notice many similarities. This guide provides all the information you need to write aggregate queries, and you shouldn't need to refer to MongoDB's documentation.

In essence, there is a pipeline where the input consists of records in the entity, and you apply various operations to filter, sort, and aggregate the data. Here's an example of an aggregate query in JavaScript:

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
<br>

In this pipeline, we have two steps:

1. Select only records associated with a customer.
2. Group by **`company`** and sum the field **`numberOfSkills`**, storing it in the field **`totalSkills`**.
The input of one step is the result of the previous one, which is why it's called a pipeline.

The result set for the above example will contain records with the following structure:

```
{
  "company": {
    "id": "57fd2d61e4b0ce322b0c530d",
    "label": "Flashset"
  },
  "totalSkills": 12
}
```
<br>

As you can see, you get a simple JavaScript object (it follows the JSON representation you can see in the [REST API]({{<ref "/dev-reference/rest-apis/apps-api.md">}}) object) instead of something like a [record object]({{<ref "/dev-reference/scripting/sys-data.md#sysdatarecord">}}). This is because the structure changes based on the operations in your pipeline, and the result is no longer a record from an entity. You should check each type's documentation to verify the format used in the JSON representation.

Aggregated queries, like other queries, can be expressed using a query map, a query builder, and the REST API. Below, you'll find samples for all versions.

## **Operations** 

### Count

The Count operation allows you to count elements and store the result in a field. This field cannot contain special characters; only numbers and letters are allowed, and it will be the only field in the result.

Here are some samples of how you can use it:

{{< query_sample
  id="01"
  description="Counts companies from New York"
  entity="companies"
  jsQueryMap="{match: {'address.state': 'NY'}, count: 'counter_field'}"
  jsQueryBuilder="query.match().field('address.state').equals('NY'); query.count().counterName('counter_field');"
  restApi="{\"match\": {\"address.state\": \"NY\"}, \"count\": \"counter_field\"}"
>}}
<br>

When you run the above query, you will get output similar to this:

```js
{"counter_field":2}
```
<br>

### Skip

The Skip operation allows you to skip a specified number of elements. This operator is configured with a positive integer, which determines how many results to omit from the beginning.

Here are some samples of how you can use it:

{{< query_sample 
id="02"
description="Retrieves contacts while skipping the first 3 results"
entity="contacts"
jsQueryMap="{skip: 3}"
jsQueryBuilder="query.skip().step(3);"
restApi="{\"skip\": 3}"
>}}
<br>

### Limit

The Limit operation allows you to limit the number of elements in your aggregation results. This operator is configured with a positive integer and retrieves the specified number of results.

Here are some samples of how you can use it:

{{< query_sample 
id="03"
description="retrieves first 5 contacts"
entity="contacts"
jsQueryMap="{limit: 5}"
jsQueryBuilder="query.limit().step(5);"
restApi="{\"limit\": 5}"
>}}

### Unwind

The Unwind operation allows you to unwind multi-valued fields. This operator is configured with a field; if this field is an array, it will retrieve the same record with a single value for the selected field for each element in the array.

Here are some samples of how you can use it:

{{< query_sample 
id="04"
description="retrieves companies unwinding services"
entity="companies"
jsQueryMap="{unwind: {fieldPath: 'services', includeEmpty: true}}"
jsQueryBuilder="query.unwind().path('services').includeEmpty(true);"
restApi="{\"unwind\": {\"fieldPath\": \"services\", \"includeEmpty\": true}}"
>}}
<br>

When you run the above query, you will get output similar to this:

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
<br>

### Lookup

The Lookup operation allows you to lookup elements from other entities in current records. This operator is equivalent to a SQL left-join using the name of a foreign entity, a foreign field in that entity, and a local field in the current entity (set in the query).

Here are some samples of how you can use it:

{{< query_sample 
id="05"
description="retrieves companies with related contacts"
entity="companies"
jsQueryMap="{'lookup': {'localFieldPath': 'id', 'foreignFieldPath': 'company.id', 'foreignEntityName': 'contacts', 'as': 'relatedContacts'}}"
jsQueryBuilder="query.lookup().localField('id').foreignField('company.id').foreignEntity('contacts').as('relatedContacts');"
restApi="{\"lookup\": {\"localFieldPath\": \"id\", \"foreignFieldPath\": \"company.id\", \"foreignEntityName\": \"contacts\", \"as\": \"relatedContacts\"}}"
>}}
<br>

When you run the above query, you will get output like this:

```js
{"id":"57fd2d64e4b0ce322b0c8349",
"name":"Photolist",
"relatedContacts":[
  {
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
  }]
} 
{"id":"57fd2d62e4b0ce322b0c6268","name":"DabZ","relatedContacts":[
  {
    "id": "5506fc44c2eee3b1a702694e",
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
    ]}]
  } 
{"id":"57fd2d60e4b0ce322b0c50f0","name":"Mydo","relatedContacts":[]} 
{"id":"57fd2d64e4b0ce322b0c7d12","name":"Zazio","relatedContacts":[]} 
...
```
<br>

### Match

The Match operation allows you to filter records in the pipeline. You need to use this operation to select the records you want to use for your aggregation.

This filter works the same way as the ones for regular queries, which means you can pass a query map or query builder (if you are using the JavaScript API). Keep in mind that only filters by fields are supported here while other parameters are ignored.

Here are some samples of matching operations:

{{< query_sample
id="06"
description="Counts the number of skills for contacts of customers // see how the match operator filters contacts where company is a customer"
entity="contacts"
jsQueryMap="{match: {'company.isCustomer': true}}, {group: {totalNumberOfSkills: 'sum(numberOfSkills)'}}"
jsQueryBuilder="query.match().field('company.isCustomer').equals(true); query.group().accumulate('totalNumberOfSkills').sum('numberOfSkills');"
restApi="{\"match\": {\"company.isCustomer\": true}}, {\"group\": {\"totalNumberOfSkills\": \"sum(numberOfSkills)\"}}"
>}}
<br>

{{< query_sample 
id="07" 
description="counts the number of skills for contacts // the match operator filters contacts by customers and state equals to New Jersey" 
entity="contacts" 
jsQueryMap="{match: {'company.isCustomer': true, 'address.state': 'NJ'}}, {group: {totalNumberOfSkills: 'sum(numberOfSkills)'}}" jsQueryBuilder="query.match().field('company.isCustomer').equals(true).field('address.state').equals('NJ'); query.group().accumulate('totalNumberOfSkills').sum('numberOfSkills');" restApi="{\"match\": {\"company.isCustomer\": true, \"address.state\": \"NJ\"}}, {\"group\": {\"totalNumberOfSkills\": \"sum(numberOfSkills)\"}}" >}}

### Sort

Allows to change the sorting of records in your aggregation pipeline. This is useful for sorting the final result or to use together with accumulators like **`first()`** or **`last()`** in the **`group`** operator.

Here are some samples of how you can use it:

{{< query_sample
id="08"
description="finds the contact with more skills per company"
entity="contacts"
jsQueryMap="{sort: {'numberOfSkills': 'desc'}}, {group: {by: 'company', firstName: 'first(firstName)', lastName: 'first(lastName)', skills: 'first(numberOfSkills)'}}"
jsQueryBuilder="query.sort().by('numberOfSkills', 'desc'); query.group().by('company').accumulate('firstName').first('firstName').accumulate('lastName').first('lastName').accumulate('skills').first('numberOfSkills');"
restApi="{\"sort\": {\"numberOfSkills\": \"desc\"}}, {\"group\": {\"by\": \"company\", \"firstName\": \"first(firstName)\", \"lastName\": \"first(lastName)\", \"skills\": \"first(numberOfSkills)\"}}"
>}}
<br>

{{< query_sample
id="09"
description="finds the contact with more skills per company and sorts the result by skills and last name"
entity="contacts"
jsQueryMap="{sort: {'numberOfSkills': 'desc'}}, {group: {by: 'company', firstName: 'first(firstName)', lastName: 'first(lastName)', skills: 'first(numberOfSkills)'}}, {sort: {'skills': 'desc', 'lastName': 'asc'}}"
jsQueryBuilder="query.sort().by('numberOfSkills', 'desc'); query.group().by('company').accumulate('firstName').first('firstName').accumulate('lastName').first('lastName').accumulate('skills').first('numberOfSkills'); query.sort().by('skills', 'desc').by('lastName', 'asc');"
restApi="{\"sort\": {\"numberOfSkills\": \"desc\"}}, {\"group\": {\"by\": \"company\", \"firstName\": \"first(firstName)\", \"lastName\": \"first(lastName)\", \"skills\": \"first(numberOfSkills)\"}}, {\"sort\": {\"skills\": \"desc\", \"lastName\": \"asc\"}}"
>}}

### Project

The Project operation allows you to remove fields from records and reduce memory usage. This is important if you need to process many records but only need a few fields.

Here are some samples of how to use it:

{{< query_sample
id="10"
description="leaves only number of employees and the sums up"
entity="companies"
jsQueryMap="{project: 'name,numberOfEmployees'}"
jsQueryBuilder="query.project().field('name').field('numberOfEmployees');"
restApi="{\"project\": \"name,numberOfEmployees\"}"
>}}

When you run the above query, you will get output like this:

```js
{"id":"57fd2d64e4b0ce322b0c8349","name":"Photolist","numberOfEmployees":83} 
{"id":"57fd2d62e4b0ce322b0c6268","name":"DabZ","numberOfEmployees":635} 
{"id":"57fd2d60e4b0ce322b0c50f0","name":"Mydo","numberOfEmployees":917} 
{"id":"57fd2d64e4b0ce322b0c7d12","name":"Zazio","numberOfEmployees":618} 
...
```
<br>

You can see that only the fields **`name`** and **`numberOfEmployees`** were included in the output (and **`id`** that is always there).

### Group

The Group operation is the most important operation in your aggregation pipeline as it aggregates data. It allows you to group a set of records based on some fields and accumulate the results of those records into a field.

For example:

{{< query_sample
id="11"
description="calculate the total number of skills per company"
entity="contacts"
jsQueryMap="{project: 'company,numberOfSkills'}, {group: {by: 'company', totalSkills: 'sum(numberOfSkills)'}}"
jsQueryBuilder="query.project().field('company').field('numberOfSkills'); query.group().by('company').accumulate('totalSkills').sum('numberOfSkills');"
restApi="{\"project\": \"company,numberOfSkills\"}, {\"group\": {\"by\": \"company\", \"totalSkills\": \"sum(numberOfSkills)\"}}"
>}}
<br>

For this query, you will get a result set like this:

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
<br>

Here, you can see how data was grouped by the fields indicated in the **`by`** option (in this case, the **`company`** field), and then you have accumulators defined that are added as fields in the output (in this case, the **`totalSkills`** field).

Basically, the by option indicates how records will be grouped. Records that have the same value(s) in the fields listed in this option will belong to the same group. You can put more than one field if you separate the names using commas or call **`by()`** multiple times in the query builder.

Then you can define any number of accumulators. Each accumulator will be a field in the output and must use one of the accumulator operations available:

**count()**

This operation returns the number of records in the group. For example, you can count the number of contacts for each company.

{{< query_sample
id="12"
description="counts contacts on each company"
entity="contacts"
jsQueryMap="{project: 'company'}, {group: {by: 'company', numberOfContacts: 'count()'}}"
jsQueryBuilder="query.project().field('company').field('numberOfSkills'); query.group().by('company').accumulate('numberOfContacts').count();"
restApi="{\"project\": \"company\"}, {\"group\": {\"by\": \"company\", \"numberOfContacts\": \"count()\"}}"
>}}

**sum(field)**

This operation calculates the sum of the values in a specified field for the records in the group. For example, you can calculate the total number of skills per company.

{{< query_sample
id="13"
description="calculate the total number of skills per company"
entity="contacts"
jsQueryMap="{project: 'company,numberOfSkills'}, {group: {by: 'company', totalSkills: 'sum(numberOfSkills)'}}"
jsQueryBuilder="query.project().field('company').field('numberOfSkills'); query.group().by('company').accumulate('totalSkills').sum('numberOfSkills');"
restApi="{\"project\": \"company,numberOfSkills\"}, {\"group\": {\"by\": \"company\", \"totalSkills\": \"sum(numberOfSkills)\"}}"
>}}
<br>

This only works for number fields like integer, money, decimal or percentage.

**avg(field)**

This operation calculates the average of the values in a specified field for the records in the group. It works for number fields like **`integer`**, **`money`**, **`decimal`**, or **`percentage`**.

{{< query_sample
id="14"
description="calculate the average number of skills per company per contact"
entity="contacts"
jsQueryMap="{project: 'company,numberOfSkills'}, {group: {by: 'company', avgSkills: 'avg(numberOfSkills)'}}"
jsQueryBuilder="query.project().field('company').field('numberOfSkills'); query.group().by('company').accumulate('avgSkills').avg('numberOfSkills');"
restApi="{\"project\": \"company,numberOfSkills\"}, {\"group\": {\"by\": \"company\", \"avgSkills\": \"avg(numberOfSkills)\"}}"
>}}
<br>

Keep in mind that if the value of the field is `null` or the field isn't  present at all in the record it won't count for the average calculation.

**first(field)**

This operation selects the value of the first record as the value of the output. It is often used in combination with the **`sort`** operator to find the first value of a field.

{{< query_sample
id="15"
description="finds the contact with more skills per company"
entity="contacts"
jsQueryMap="{sort: {'numberOfSkills': 'desc'}}, {group: {by: 'company', firstName: 'first(firstName)', lastName: 'first(lastName)', skills: 'first(numberOfSkills)'}}"
jsQueryBuilder="query.sort().by('numberOfSkills', 'desc'); query.group().by('company').accumulate('firstName').first('firstName').accumulate('lastName').first('lastName').accumulate('skills').first('numberOfSkills');"
restApi="{\"sort\": {\"numberOfSkills\": \"desc\"}}, {\"group\": {\"by\": \"company\", \"firstName\": \"first(firstName)\", \"lastName\": \"first(lastName)\", \"skills\": \"first(numberOfSkills)\"}}"
>}}

**last(field)**

This operation selects the value of the last record as the value of the output. It is often used in combination with the **`sort`** operator to find the last value of a field.

{{< query_sample
id="16"
description="finds the contact with more skills per company"
entity="contacts"
jsQueryMap="{sort: {'numberOfSkills': 'asc'}}, {group: {by: 'company', firstName: 'last(firstName)', lastName: 'last(lastName)', skills: 'last(numberOfSkills)'}}"
jsQueryBuilder="query.sort().by('numberOfSkills', 'asc'); query.group().by('company').accumulate('firstName').last('firstName').accumulate('lastName').last('lastName').accumulate('skills').last('numberOfSkills');"
restApi="{\"sort\": {\"numberOfSkills\": \"asc\"}}, {\"group\": {\"by\": \"company\", \"firstName\": \"last(firstName)\", \"lastName\": \"last(lastName)\", \"skills\": \"last(numberOfSkills)\"}}"
>}}

**max(field)**

This operation selects the maximum value from all records as the value of the output.

{{< query_sample
id="17"
description="finds the maximum number of skills per company for one contact"
entity="contacts"
jsQueryMap="{group: {by: 'company', skills: 'max(numberOfSkills)'}}"
jsQueryBuilder="query.group().by('company').accumulate('skills').max('numberOfSkills');"
restApi="{\"group\": {\"by\": \"company\", \"skills\": \"max(numberOfSkills)\"}}"
>}}

**min(field)**

This operation selects the minimum value from all records as the value of the output.

{{< query_sample
id="18"
description="finds the minimum number of skills per company for one contact"
entity="contacts"
jsQueryMap="{group: {by: 'company', skills: 'min(numberOfSkills)'}}"
jsQueryBuilder="query.group().by('company').accumulate('skills').min('numberOfSkills');"
restApi="{\"group\": {\"by\": \"company\", \"skills\": \"min(numberOfSkills)\"}}"
>}}

## **Limitations**

These aggregation operations allow you to perform various calculations and data manipulations in your aggregated queries. However, it's essential to keep in mind that aggregated queries work well for small to moderate-sized datasets. If you need to analyze large datasets, it's recommended to use dedicated data analysis tools and services like Google BigQuery or Amazon Redshift.