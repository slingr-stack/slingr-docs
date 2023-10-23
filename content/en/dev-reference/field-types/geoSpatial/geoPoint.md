---
title: "Geo point type"
description: "Geo point type documentation."
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

This type can store geo localization data. It consist of a couple of values:
* `latitude`: Valid latitude values are between -90 and 90, both inclusive.
* `longitude`: Valid longitude values are between -180 and 180, both inclusive.

Powerful and useful queries can be done on this data type.

## **Available features**

Name|Supported
---|---
Many multiplicity|yes
Default values|yes
Unique flag|no
Required flag|yes
Indexable flag|yes
Sensitive flag|no
Calculated value|yes
Automatic initialization|yes
Calculated initial value|yes
Aggregation|yes
Default type rules|no
Default display options|no

## **REST API**

### Read format

```js
"location": '{latitude: 10.5, longitude: 12}'
```
<br>

### Write format

To specify the geo point, you need to provide a js object with the latitude and longitude attributes.

```js
"location": '{latitude: 10.5, longitude: 12}'
```
<br>

## **JavaScript API**

### Read format

When utilizing the **`val()`** method within the wrapper, it will yield a **`GeoPoint`** object.

```js
// this will print something like "localization: {longitude:10,latitude:20}"
log('localization: '+record.field('localization').val());
```
<br>

### Write format

```js
record.field('startDate').val({latitude: 10.5, longitude: 12});
```
<br>

## **Export/Import**

### Export format

The export format is **`(lat,long)`**, regardless of the display options configured for that field.

```js
"location","(22,30)"
```
<br>

### Import format

The import format is **`(lat,long)`**, regardless of the display options configured for that field.

```js
"location","(22,30)"
```
<br>

## **Queries**

For more information, please refer to the [Query Language Documentation]({{<ref "/dev-reference/queries/query-language.md">}}).

### Available operators

Operator|Supported
---|---
equals|no
notEquals|no
empty|no
notEmpty|no
like|no
greater|no
greaterOrEquals|no
less|no
lessOrEquals|no
between|no
currentUserField|no
near|yes

### Query samples

{{< query_sample
        id="sample"
        description="sorts companies by proximity to [ lat: 10, long: 22 ] that are at a min distance of 5000 m and at a maximum of 10000 m"
        entity="companies"
        jsQueryMap="{'location':'near(5,10,5000,10000)'}"
        jsQueryBuilder=".field('location').near(5,10,5000,10000)"
        restApi="near(5,10,5000,10000)"
>}}
<br>

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
geoNear|yes

### Aggregated queries samples

{{< aggregate_query_sample
id=""
description="Sorts records by proximity and filters them by min and max distance. Provides the calculated distance value in a custom field "
entity="companies"
jsQueryMap=" [{geoNear: {coordinates: {longitude:10,latitude:5},distanceField:'distance',minDistance:5566,maxDistance:9460000}}]"
jsQueryBuilder="query_.geoNear().coordinates({longitude:10,latitude:05}).distanceField('distance').minDistance(5566).maxDistance(9460000);"
restApi="[{\"geoNear\": {\"coordinates\": {\"longitude\":10, \"latitude\":5}}, \"distanceField\": \"distance\", \"minDistance\": 5566, \"maxDistance\":9460000}]"

>}}
