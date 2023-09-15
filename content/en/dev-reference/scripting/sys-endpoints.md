---
title: "sys.endpoints"
lead: "Describes utilities in the Javascript API to handle legacy services."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 64
---

## **sys.endpoints**

The **`sys.endpoints`** package comprises methods designed to manage legacy services.

###  findById()

This method locates an endpoint using its unique ID.

##### Parameters

Name|Type|Required|Description
---|---|---|---
id|string|yes|ID of the endpoint

##### Returns

[`sys.endpoints.Endpoint`]({{<ref "/dev-reference/scripting/sys-endpoints.md#sys.endpoints.Endpoint">}})  - The endpoint object or **`null`** if not found.

##### Exceptions

**badRequest**

If **`id`** is not a valid ID or it is empty.

##### Samples

``` javascript
// finds an endpoint and prints its status
var endpoint = sys.endpoints.findById('');
log('status: '+endpoint.status());
```
<br>

###  findByName(name)

This method locates an endpoint using its name.

##### Parameters

Name|Type|Required|Description
---|---|---|---
name|string|yes|Name of the endpoint

##### Returns

**[`sys.endpoints.Endpoint`]({{<ref "/dev-reference/scripting/sys-endpoints.md#sys.endpoints.Endpoint">}})**  - The endpoint object or **`null`** if not found.

##### Exceptions

**badRequest**

If **`name`** it is empty.

##### Samples

``` javascript
// finds an endpoint and prints its status
var endpoint = sys.endpoints.findByName('sample');
log('status: '+endpoint.status());
```
<br>

###  isDeployed(name)

Checks if an endpoint is deployed.

##### Parameters

Name|Type|Required|Description
---|---|---|---
name|string|yes|Name of the endpoint

##### Returns

**`boolean`**  - **`true`** if the endpoint is deployed, **`false`** otherwise.

##### Exceptions

**badRequest**

If **`name`** it is empty or endpoint is not found with that name.

##### Samples

``` javascript
// prints if the endpoint is deployed
log('endpoint deployed: '+sys.endpoints.isDeployed('sample'));
```
<br>


## **sys.endpoints.Endpoint**

Contains information about an endpoint.

###  id()

Returns the ID of the endpoint.

##### Returns

**`string`**  - The ID of the endpoint

###  label()

Returns the label of the endpoint.

##### Returns

**`string`**  - The label of the endpoint

###  name()

Returns the name of the endpoint.

##### Returns

**`string`**  - The name of the endpoint

###  type()

Returns the type of the endpoint.

##### Returns

**`string`**  - The type of the endpoint

###  status()

Returns the current status of the endpoint. Possible values are **`DEPLOYED`**, **`UNDEPLOYED`**, **`DEPLOYING`**, **`UNDEPLOYING`**, **`UNKNOWN`**.

##### Returns

**`string`**  - The current status of the endpoint.

###  version()

Returns the current version of the running endpoint.

##### Returns

**`string`**  - The current version of the endpoint.
