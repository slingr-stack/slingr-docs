---
title: "sys.storage"
description: "Describes utilities in the Javascript API to manage the temporary storage."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 71
---

## **sys.storage**

The **`sys.storage`** package provides methods for working with storage. Storage is a temporary key-value data structure used to store information that spans multiple user requests or threads.

It's essential to note that storage is temporary, and data may be lost when the app is restarted or upgraded. Therefore, relying on data being available between restarts or upgrades of the app is not recommended.

###  get(key, options)

This method returns the value stored at the specified key.

##### Parameters

Name|Type|Required|Description
---|---|---|---
key|string|yes|The key for which you want to retrieve the stored value.
options|object|no|Optional parameters to configure the retrieval. The available option is: <br> - **`decrypt`**: If set to **`true`**, it will decrypt the entry value.

##### Returns

**`any`** - The value stored at the specified key or **`null`** if no value exists for the given key.

##### Samples

``` javascript
// puts something in the storage and retrives it
sys.storage.put('key1', 'a');
log('key1: '+sys.storage.get('key1'));
```
<br>

``` javascript
// retrieve sensitive data
sys.storage.put('apiKey', 'd4j6Ls83ndIw2JdnuwUj3bz');
log('apiKey: ' + sys.storage.get('token')); // display api key encrypted
log('apiKey: ' + sys.storage.get('token', {decrypt: true})); // display plain api key
```
<br>


###  put(key, value, options)

This method stores an object or primitive value in the storage.

##### Parameters

Name|Type|Required|Description
---|---|---|---
key|string|yes|The key for which you want to retrieve the stored value.
value|any|yes|The value to store. It can be a primitive or an object.
options|object|no|Optional parameters to configure the storage. The available options are: <br> - **`ttl`**: Indicates the time to live for that key, expressed in milliseconds. <br> - If set to **`true`**, it will encrypt the entry value, which can be useful for storing sensitive data.

##### Returns

**`any`** - The previous value associated with the given key, or **`null`** if there wasn't a value associated with it previously.

##### Samples

``` javascript
// puts a string and an object in the storage
sys.storage.put('key1', 'a');
log('key1: '+sys.storage.get('key1'));
var obj = {prop1: 'a', prop2: 'b'};
sys.storage.put('key2', obj);
log('key2: '+JSON.stringify(sys.storage.get('key2')));
```
<br>

``` javascript
// puts a key that will live for 1 hours
sys.storage.put('key1', 'a', {ttl: 60 * 60 * 1000});
```
<br>

``` javascript
// encrypts and decrypts a token
sys.storage.put('token', 'Okd4j6', {encrypt: true});
log('token: ' + sys.storage.get('token')); // display token encrypted
log('token: ' + sys.storage.get('token', {decrypt: true})); // display plain token
```
<br>

###  put(key, value, options)

This method stores an object or primitive value in the storage at the specified key if it hasn't been set already.

##### Parameters

Name|Type|Required|Description
---|---|---|---
key|string|yes|The key for which you want to retrieve the stored value.
value|any|yes|The value to store. It can be a primitive or an object.
options|object|no|Optional parameters to configure the storage. The available options are: <br> - **`ttl`**: Indicates the time to live for that key, expressed in milliseconds. <br> - If set to **`true`**, it will encrypt the entry value, which can be useful for storing sensitive data.

##### Returns

**`boolean`** - **`true`** if the value was effectively set, or **`false`** otherwise.

##### Samples

``` javascript
// puts a value twice over the same key, but second time it shouldn't be stored
sys.storage.put('key1', 'a');
sys.storage.putIfAbsent('key1', 'b');
log('key1: '+sys.storage.get('key1'));
```
<br>

###  replace(key, value, options)

This method replaces the value at the specified key. If no value was previously set at that key, the new value won't be stored.

##### Parameters

Name|Type|Required|Description
---|---|---|---
key|string|yes|The key for which you want to retrieve the stored value.
value|any|yes|The value to store. It can be a primitive or an object.
options|object|no|Optional parameters to configure the storage. The available options are: <br> - **`ttl`**: Indicates the time to live for that key, expressed in milliseconds. <br> - If set to **`true`**, it will encrypt the entry value, which can be useful for storing sensitive data.

##### Returns

**`boolean`** - **`true`** if the value was effectively set, or **`false`** otherwise.

##### Samples

``` javascript
// tries to replace the value in two different keys
sys.storage.put('key1', 'a');
sys.storage.replace('key1', 'b');
sys.storage.replace('keyThatDoesNotExist', 'c');
log('key1: '+sys.storage.get('key1'));
log('keyThatDoesNotExist: '+sys.storage.get('keyThatDoesNotExist'));
```
<br>

###  remove(key)

This method removes the value at the specified key.

##### Parameters

Name|Type|Required|Description
---|---|---|---
key|string|yes|The key for which you want to retrieve the stored value.

##### Returns

**`any`** - The value at the specified key, or **`null`** if there isn't any value associated with that key.

##### Samples

``` javascript
// puts and remove a value
sys.storage.put('key1', 'a');
log('key1: '+sys.storage.get('key1'));
sys.storage.remove('key1');
log('key1: '+sys.storage.get('key1'));
```
<br>

###  clear()

This method removes all values stored in the storage, effectively clearing it.

##### Samples

``` javascript
// puts and remove a value
sys.storage.put('key1', 'a');
sys.storage.put('key2', 'b');
log('key1: '+sys.storage.get('key1'));
log('key2: '+sys.storage.get('key2'));
sys.storage.clear();
log('key1: '+sys.storage.get('key1'));
log('key2: '+sys.storage.get('key2'));
```
<br>
