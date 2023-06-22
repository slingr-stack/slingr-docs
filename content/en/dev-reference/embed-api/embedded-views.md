---
title: "Embedded views"
lead: "Integration based on the embed of views."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 144
---
## Embedded views using private tokens

In case authentication is required then the token needs to be obtained from the `REST API` and set it to the `iframe` that will
embed the view.   

Views can be embedded in external web sites through `iframes`. In order to embed a view the following URL can be used:

```javascript
{app}.slingrs.io/{env}/runtime/#views/embed/{viewId}
```

or in case entity views the `recordId` parameter needs to be set:

```javascript
{app}.slingrs.io/{env}/runtime/#views/embed/{viewId}?recordId={recordId}`
```

When a page is loaded it requires the token that should be send using windows messages as

```javascript
window.postMessage({
    type: 'auth:login',
    token: 'XwY8XPh6sQUDLmuhzDcdJd6bSMuEAHo0'
}, '*');
```

When token expired the page should require the token send a message for `auth:requestLogin`. As you can see in the following
example you can listen it to process the login

```javascript
window.addEventListener('message', function (event) {
   if (typeof event.data === 'object' && event.data.type == 'auth:requestLogin' && event.data.token) {
      
        var token = 'XwY8XPh6sQUDLmuhzDcdJd6bSMuEAHo0'; // ...required when using the REST API
        
        window.postMessage({
            type: 'auth:login',
            token: token
        }, '*');

   }
});
``` 

> Some times the `postMessage` should be sent to proper embed container. Check the documentation of your web content system (`Squarespace`, `Wix`, etc.)


## Embedded views using API tokens

In this case authentication is not required. API tokens require to be already generated and they provide access to the `REST API`.
[See more information about the API tokens here]({{site.baseurl}}/app-development-environment-api-tokens.html).

You can embed views with API tokens by setting up the URL like this:

```javascript
{app}.slingrs.io/{env}/runtime/#views/embed/{viewId}?token={apiTokenKey}`
```

