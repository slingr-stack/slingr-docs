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
---

`API Tokens` are credentials to access to the `REST API`. 

It is up to the developer to give proper permissions to the token. This is to restrict the access to sensitive information.

The key generated automatically is the one that needs to be set on each request to the `REST API` by using the header `token`.

A public token contains the following properties:

- `Label`: human readable label to identify public token.
- `Name`: unique code to identify public token.
- `User`: the user associated to the token. The calculation of permissions is based on this user permissions. So, normally
an `REST API` user with proper restricted permissions will be used.
- `Key`: the key that needs to be used on each call to the `REST API`. This value needs to be set as the `token` header.
- `Allowed domains`: for security reasons, this property allows to control the origin of the requests. The usage of 
wildcards (*) is allowed. For example: `https://*.slingrs.io`.
