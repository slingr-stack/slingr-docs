---
title: "API Tokens"
lead: "Management of API tokens."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 21 
---

**`API Tokens`** serve as credentials for accessing the **`REST API`**. Developers are responsible for configuring appropriate permissions for these tokens, which helps restrict access to sensitive information.

The automatically generated key is the essential component that must be utilized in each **`REST API`** request. It should be included in the request header under the **`token`** parameter.

### Public token properties

A public token consists of the following properties:

- **`Label`**: A human-readable label designed to identify the public token.
- **`Name`**: A unique code allocated to the public token for identification purposes.
- **`User`**: The user associated with the token. The calculation of permissions is based on this user's permissions. It's recommended to employ a **`REST API`** user with carefully restricted permissions for security.
- **`Key`**: The key that must be used in every call to the **`REST API`**. This value is set as the **`token`** header in the request.
- **`Allowed Domains`**: This property offers a security mechanism to control the origins of requests. Wildcards (*) are permitted. For instance: **`https://*.slingrs.io`**.