---
title: "Embedded views"
description: "Integration based on the embed of views."
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

## **Using private tokens**

If authentication is required, you need to obtain a token from the **`REST API`** and set it within the **`iframe`** that will embed the view.

Views can be embedded in external websites through **`iframes`**. To embed a view, you can use the following URL:

```
{app}.slingrs.io/{env}/runtime/#views/embed/{viewId}
```
<br>

For entity views, you need to set the **`recordId`** parameter:

```
{app}.slingrs.io/{env}/runtime/#views/embed/{viewId}?recordId={recordId}`
```
<br>

When a page is loaded, it requires the token, which should be sent using window messages as follows:

```javascript
window.postMessage({
    type: 'auth:login',
    token: 'XwY8XPh6sQUDLmuhzDcdJd6bSMuEAHo0'
}, '*');
```
<br>

When the token expires, the page will request the token by sending a message for **`auth:requestLogin`**. You can listen for this message to process the login.

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
<br>
<br>

> Sometimes, the **`postMessage`** should be sent to the proper embed container. Refer to the documentation of your web content system, such as **`Squarespace`** or **`Wix`**, for more details.

## **Using API tokens**

In this case, authentication is not required. API tokens should already be generated, and they provide access to the **`REST API`**. [For more information about API tokens, see here]({{<ref "/dev-reference/environment-settings/api-tokens.md">}}).

You can embed views with API tokens by setting up the URL like this:

```javascript
{app}.slingrs.io/{env}/runtime/#views/embed/{viewId}?token={apiTokenKey}`
```
<br>

