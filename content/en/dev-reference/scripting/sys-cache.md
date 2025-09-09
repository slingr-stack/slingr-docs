---

title: "sys.cache"
description: "Describes utilities in the Javascript API to manage application cache across all instances."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 60
---

## **sys.cache**

This package contains methods to handle app cache across all app instances. Cache is useful when fast performance is needed when reading app information. This should be carefully used since app heap memory can be affected when a lot of information is stored in cache.

### put(mapName, key, value)

Puts a key-value pair into a specified cache map. Returns the previous value associated with the key, or null.

#### Parameters

Name|Type|Required|Description
---|---|---|---
mapName|string|yes|Name of the cache map
key|string|yes|The key
value|_|yes|The value to be cached

#### Returns

**`any`**  - The previous value associated with the key, or null if there wasn't any

### get(mapName, key)

Gets a value from the specified cache map. Returns null if the key is not found.

#### Parameters

Name|Type|Required|Description
---|---|---|---
mapName|string|yes|Name of the cache map
key|string|yes|The key

#### Returns

**`any`**  - The value associated with the key, or null if the key is not found

### remove(mapName, key)

Removes a key-value pair from the specified cache map. Returns the removed value, if any. If the application has many instances running, then other instances will be notified to execute the remove command with the same parameter passed here.

#### Parameters

Name|Type|Required|Description
---|---|---|---
mapName|string|yes|Name of the cache map
key|string|yes|The key

#### Returns

**`any`**  - The removed value, or null if there was no value associated with the key

### clear(mapName)

Clears all entries from the specified cache map. If the application has many instances running, then other instances will be notified to execute the clear command with the same parameter passed here.

#### Parameters

Name|Type|Required|Description
---|---|---|---
mapName|string|no|Name of the cache map.If not provided all maps are cleared

#### Returns

**`void`**

### maps()

Returns a list of the existing cache maps names.

#### Returns

**`string[]`**  - The map names


### mapKeys(mapName)

Returns a list of keys of a specified map.

#### Parameters

Name|Type|Required|Description
---|---|---|---
mapName|string|no|Name of the cache map. If not provided an empty list is returned

#### Returns

**`string[]`**  - The map keys
