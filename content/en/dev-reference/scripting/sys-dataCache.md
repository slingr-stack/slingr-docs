---

title: "sys.dataCache"
description: "Describes utilities in the Javascript API to entites data cache across all instances."
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

## **sys.dataCache**

This package contains methods to handle app cache optimized for handling application data. Cache is useful when fast performance is needed when reading app information. This should be carefully used since app heap memory can be affected when a lot of information is stored in cache. Records can be stored as records format or a json object in the cache.

### clear(entityName)

Clears data cache for a given entity or all cache if no entity is provided.

#### Parameters

Name|Type|Required|Description
---|---|---|---
entityName|string|no|Name of the entity. If not provided, then all entities cache are cleared

#### Returns

**`void`**

### findAll(entityName, indexes, options) 

Finds all cached data of an entity. Loads the entity records if not cached. If indexes are provided, then app data is indexed on load.

#### Parameters

Name|Type|Required|Description
---|---|---|---
entityName|string|yes|Name of the entity
indexes| string[]|no|Array of index names
options|object|no|These parameters are used to sort results. <br> - **`sortBy`**: Indicates which field should be considered when sorting. <br> - **`sortType`**: Options are "**`asc`**" or "**`desc`**." <br> - **`returnRecord`**: Options are "**`true`**" or "**`false`**. Default value is false

#### Returns

**`sys.data.Record[]`** - Array of records

### find(entityName, key, value, indexes, options)

Finds cached data of an entity given a field and value. Loads the entity if not cached. If indexes are provided, then app data is indexed on load.

#### Parameters

Name|Type|Required|Description
---|---|---|---
entityName|string|yes|Name of the entity
key|string|yes|The key
value|any|yes|The value
indexes|string[]|no|Array of index names
options|object|no|These parameters are used to sort results. <br> - **`sortBy`**: Indicates which field should be considered when sorting. <br> - **`sortType`**: Options are "**`asc`**" or "**`desc`**."  <br> - **`returnRecord`**: Options are "**`true`**" or "**`false`**. Default value is false

#### Returns

**`sys.data.Record[]`** - Array of records

### findOne(entityName, key, value, indexes)

Finds the first cached record of an entity matching a field and value. If not cached, the entity will be loaded. If indexes are provided, then app data is indexed on load. Returns null if not found.

#### Parameters

Name|Type|Required|Description
---|---|---|---
entityName|string|yes|Name of the entity
key|string|yes|The key
value|any|yes|The value
indexes|string[]|no|Array of index names
returnRecord|boolean|no|To store records as json or record wrapper in app cache.

#### Returns

**`sys.data.Record`** - The first matching record, or null if not found

### entities()

Returns a list of cached entities.

#### Returns

**`string[]`**  - The cached entities keys


### entityIndexes(entity)

Returns a list of the indexes of a specified entity.

#### Parameters

Name|Type|Required|Description
---|---|---|---
entity|string|no|Name of the entity. If not provided or entity not cached an empty list is returned

#### Returns

**`string[]`**  - The cached indexes


### indexKeys(entity, index)

Returns a list of values of a specified index.

#### Parameters

Name|Type|Required|Description
---|---|---|---
entity|string|yes|Name of the entity
index|string|yes|Name of the index

#### Returns

**`object[]`**  - The index values