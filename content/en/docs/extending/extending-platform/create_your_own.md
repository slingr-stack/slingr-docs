---
title: "Create your own endpoints"
lead: "Here you will find information to create your own endpoints to add more features to your app."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "extending-platform"
toc: true
---

It is possible to create your own endpoints and use them in your apps. This will allow to expand the
features available in Slingr with things that you need. For example an integration with an app that
is not in the official endpoints, use some existing libraries that you have, etc.

There are three steps to follow in order to create a new endpoint:
 
1. Create a new endpoint
1. Test it using the proxy endpoint
1. Register your endpoint in Slingr

These steps will be detailed in the following sections.

## Create a new endpoint

The first thing you will need to do is creating a new endpoint. We recommend you to follow any of these to
guides depending on your programming language preference:

- [Java SDK]({{site.baseurl}}/extensions-java-sdk.html)
- [Node SDK]({{site.baseurl}}/extensions-node-sdk.html)

## Development with proxy endpoint

In order to develop and test your own endpoints, there is one special endpoint that will help you on that task 
called the `Proxy endpoint`:

![Endpoint proxy](/images/vendor/extending/endpoint-proxy.png)

When you create a new endpoint in the app builder you will see the `Proxy endpoint` in the list of
available endpoints. This is an special endpoint that will proxy the one running on your local
box as shown in the diagram above.

{% include callout.html content="Keep in mind that the communication between the proxy endpoint and your local endpoint could be over HTTP and not HTTPS. If that's the case you shouldn't send sensitive information for security reasons.'" type="warning" %} 

Basically this is what the proxy endpoint will do:

- When your app calls a function on the endpoint's API, the proxy endpoint will make a call to your 
  local endpoint, which will process the request and send the response back to the proxy endpoint.
- When there is an event in your local endpoint, it will be sent to the proxy endpoint, which will
  send it up to your app.
- When the app loads the endpoint's metadata (like `endpoint.json` definition file), it will get it
  from your local running endpoint.
  
This way you can run your endpoint locally, make changes, debug it, and see how it works in your
app without needing anything else.

For more information about the proxy endpoint, go to its [documentation page]({{site.baseurl}}/endpoints-proxy.html).

## Register your endpoint

Once the endpoint has been implemented, it is required to register it on the platform so it is available to your apps or, 
if you decide so, make it public so other people can also use it.

In the `Developer Portal`, in `Endpoints` section, developers are able to see the endpoints they can manage, allowing 
to register new endpoints, update them or disable them.

When you register a new endpoint, this is the information you need to provide:

- `Label`: the human-friendly name of the endpoint. 
- `Name`: the name you will give to the endpoint. The name cannot be modified later and must match with the name used in 
   the endpoint definition file (`endpoint.json`).
- `Repository`: this will be the Git URL of the repository. The repository needs to be public. If it is private, today 
   we only support GitHub repositories and you need to give read access to the repository to the user `slingr-builder`. 
   The URL must be in `SSH` format like `git@github.com:workspace_id/repo_name.git`. 
- `Folder`: in case the endpoint is under one specific folder. In most cases will be empty.
- `Type`: here you can choose between `Java` and `Node.js`. 
- `Visibility`: this could be private or public. If it is public any app will be able to use it. If it is private, you 
   will be able to indicate which apps can access the endpoint and it will be available for them.

When you register a new endpoint it is associated to the developer that registered it, but it is possible to transfer 
the ownership to another account if needed through a tool available in the endpoint edition section.

Once the endpoint gets registered, the platform will find new versions of the endpoint automatically (which are tags with 
the corresponding format `v1.15.1` for example). Those versions are displayed when you open the details of an endpoint. 
Here you are able to manage versions:

- Force to find new versions: refreshes the list of versions for endpoint.
- Build one specific version: allows to perform the build for one specific version.
- Set one version as the latest/default one. 

It is possible to change the icon of the endpoint in the details of the endpoint. The icon requires to be: `PNG` format, 
size `48x48px`.

It isn't possible to delete endpoints. You can disable them, which means that they cannot be used on any app any longer.  

## Summary

To summarize, what you need to start developing your endpoint is:

1. Create your local endpoint using either the [Java SDK]({{site.baseurl}}/extensions-java-sdk.html) 
  or the [Node SDK]({{site.baseurl}}/extensions-node-sdk.html).
1. Create a proxy endpoint in your app.
1. Configure the proxy endpoint to point to your local endpoint and the other way around.
1. Develop, use and test your endpoint in your app! Don't forget to [check out what you can do in
   your endpoints here]({{site.baseurl}}/extensions-common-features.html).
1. Once it is working well, register it and build a version of your endpoint.
1. Use your endpoint in your apps!
