---
title: "Endpoints Java SDK"
lead: "Java SDK to create endpoints."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "extending-platform"
toc: true
---
This document will guide through the creation of an endpoint using the Java SDK and will provide details about the
framework.

## Create your new endpoint project

In order to simplify the creation of a new endpoint, we have a skeleton endpoint in GitHub that you can
fork and has the most common features people need in endpoints. [You can find the repository here](https://github.com/slingr-stack/skeleton-endpoint)

You can also take a look at some sample endpoints that we have that showcase the features available in
the integrations framework of Slingr:

- [Sample endpoint](https://github.com/slingr-stack/sample-endpoint)
- [Sample user endpoint](https://github.com/slingr-stack/sample-user-endpoint)
- [Sample complex endpoint](https://github.com/slingr-stack/sample-complex-endpoint)

Another interesting endpoint to look at is the [HTTP endpoint](https://github.com/slingr-stack/http-endpoint) because 
most endpoints will work with HTTP REST API, and the basic features are in this endpoint. You can see other endpoints 
like the one for [Sparkpost](https://github.com/slingr-stack/sparkpost-endpoint) that make usage of these features.

Of course you can start from scratch and do everything yourself, but we think that using the skeleton
endpoint will help you to quickly get up and running.

## Customize the skeleton endpoint template

If you used the skeleton endpoint, there are a few things you will want to adjust:

### POM file

The `pom.xml` contains a few things that you will likely want to adjust:

- `groupId`: this is the group for your endpoint. You might have a group defined for your company.
- `artifactId`: this is usually the name of your endpoint for Maven.
- `version`: this is the version of your endpoint. You can leave `1.0-SNAPSHOT` as this version has nothing
  to do with the versions registered in Slingr, which uses the tags in your repository instead.
- `name`: this a human-readable name for your endpoint.
- `properties > build.main-class`: if you change the package where the main class `io.sliongr.endpoints.skeleton.SkeletonEndpoiont`
  (that you probably do), you need to update it so the packages matches (however leave `Runner` as the class). So let's
  suppose that the main class of your endpoint is `yourcompany.endpoints.LegacyEndpoint`, then should should update
  this value to `yourcompany.endpoints.Runner`. This is very important to get right.
  
### Endpoint descriptor

The file `endpoint.json` contains at least two fields that you will want to update:

- `label`: this is the human-friendly name of the endpoint.
- `name`: this is the internal name of the endpoint and must match the name you use to register the endpoint
  in Slingr.

To understand the other settings, you want to take a look at [Endpoints features]({{site.baseurl}}/extensions-common-features.html).

### Main class name

You probably want to rename and change the package of the class `io.slingr.endpoints.skeleton.SkeletonEndpoint`. This
is the main class of your endpoint.

Also, you will need to update the endpoint name in the `@SlingrEndpoint` annotation:

```java
@SlingrEndpoint(name = "name")
public class SkeletonEndpoint extends Endpoint {
}
```

This name needs to match to the name in `endpoints.json`.

### Reading configuration

There are to ways to read the configuration from the endpoint:

- Define individual fields
- Access the whole configuration using a `Json` object

You can define individual variables like this (in the class marked with `@SlingrEndpoint`):

```java
@SlingrEndpoint(name = "name")
public class SkeletonEndpoint extends Endpoint {
    @EndpointProperty
    private String token;    
}
```

That will put the value of the configuration property `token` in the variable `token`. As you can see, by 
convention the name of the variable is the name of the field, but you can change it using the attribute 
`name` in the annotation `@EndpointProperty`.

Also, you can use the annotation `@EndpointConfiguration` like this:

```java
@SlingrEndpoint(name = "name")
public class SkeletonEndpoint extends Endpoint {
    @EndpointConfiguration
    private Json config;
    
    @Override
    public void endpointStarted() {
        logger.info(String.format("Domain [%s]", config.string("domain")));
    }    
}
``` 

### Hooks

There are a few hooks in endpoints that you can use to perform some initialzation or clean up.

```java
@SlingrEndpoint(name = "name")
public class SkeletonEndpoint extends Endpoint {
    @Override
    public void endpointConfigured() {
        // the definitions and properties are ready to be used at this point
    }

    @Override
    public void endpointsServicesConfigured() {
        // the communication with the app is ready at this point
    }

    @Override
    public void webServicesConfigured() {
        // the web services server is ready at this point
    }

    @Override
    public void endpointStarted() {
        // the endpoint has been started completely
    }

    @Override
    public void endpointStopped(String cause) {
        // endpoint has been stopped
    }
}
```

### Functions

In order to implement a function that is defined in the `endpoint.json` file, you should use the annotation
`@SlingrFunction`:

```java
@SlingrEndpoint(name = "sample")
public class SampleEndpoint extends Endpoint {
    
    @EndpointFunction(name = "randomNumber")
    public Json generateRandomNumber(Json data){
        Json res = Json.map();
        if (data != null && data.contains("max")) {
            res.set("number", random.nextInt(data.integer("max")));
        } else {
            res.set("number", random.nextInt(10000));
        }
        return res;
    }
    
}
``` 

As you can see, you will get a `Json` argument with the parameters sent to the function. Then, your function
should return a `Json` object with the response. 

### Events

You can send events to the app using the `Events` interface, that you can access through the `events()` method:

```java
@SlingrEndpoint(name = "sample")
public class SampleEndpoint extends Endpoint {
    
    @EndpointWebService(methods = {RestMethod.POST})
    private WebServiceResponse inboundEvent(WebServiceRequest request) {
        events().send("inboundEvent", Json.map().set("data", request.getJsonBody()));
        return new WebServiceResponse();
    }
    
}
```

In this case keep in mind that the event `inboundEvent` should be defined in your `endpoint.json` descriptor.

Events sent using `send()` are asynchronous. If you want to wait for a response from the app, you will need to
use `sendSync()`:

```java
@SlingrEndpoint(name = "sample")
public class SampleEndpoint extends Endpoint {
    
    @EndpointWebService(methods = {RestMethod.POST})
    private WebServiceResponse inboundEvent(WebServiceRequest request) {
        Object res = events().sendSync("inboundEvent", Json.map().set("data", request.getJsonBody()));
        // do something with the res
        return new WebServiceResponse();
    }

}
``` 

Keep in mind that in this case, in order to get a response, the listener in the app should use the keyword
`return` to return the response.

### Data stores

If you endpoint needs to persist information, data stores are available for endpoints. They need to be defined
it descriptor file and then you can use them in the endpoint:

```java
@SlingrEndpoint(name = "sample")
public class SampleEndpoint extends Endpoint {

    @EndpointDataStore(name = "test_data_store")
    private DataStore dataStore;
    
    @EndpointWebService(methods = {RestMethod.POST})
    private WebServiceResponse processItems(WebServiceRequest request) {
        Json body = request.getJsonBody();
        Json query = Json.map().set("code", body.string("code"));
        Json item = dataStore.findOne(query);
        if (item == null) {
            item = body;
            dataStore.save(item);
        }
        events().send("items", item);
        return new WebServiceResponse();
    }

}
``` 

### Webhooks

If you want your endpoint to receive calls over HTTP, you can easily do that with the annotation `@EndpointWebService`:

```java
@SlingrEndpoint(name = "sample")
public class SampleEndpoint extends Endpoint {
    
    @EndpointWebService(methods = {RestMethod.POST})
    private WebServiceResponse genericCommand(WebServiceRequest request) {
        // do something with the res
        return new WebServiceResponse();
    }

    @EndpointWebService(path = "/orders", methods = {RestMethod.POST})
    private WebServiceResponse processOrder(WebServiceRequest request) {
        // do something here
        return new WebServiceResponse();
    }

}
```

Given the above sample, the following URLs will be available:

```
POST https://<yourAppName>.slingrs.io/<env>/endpoints/<endpointName>
POST https://<yourAppName>.slingrs.io/<env>/endpoints/<endpointName>/orders
```

When those URLs are called, those methods will be invoked.

{% include callout.html content="You should always add some kind of verification (like a token) to avoid anyone calling your endpoints." type="warning" %} 

### Handling files

It is possible to upload and download files to/from the app using the utilities in ``

```java
@SlingrEndpoint(name = "sample")
public class SampleEndpoint extends Endpoint {
    
    @ApplicationLogger
    private AppLogs appLogger;

    @EndpointFunction
    public Json test1(Json data){
        DownloadedFile file = files().download(data.string("fileId"));
        // do something with the file
    }


    @EndpointFunction
    public Json test2(Json data) throws IOException {
        Json uploadedFileInfo = files().upload("test", IOUtils.toInputStream(data.toString(), "UTF-8"), "application/json");
        return uploadedFileInfo;
    }
}
```

### Logging

It is possible to send logs to the app from your endpoint using the `AppLogs`:

```java
@SlingrEndpoint(name = "sample")
public class SampleEndpoint extends Endpoint {
    
    @ApplicationLogger
    private AppLogs appLogger;

    @EndpointWebService(methods = {RestMethod.POST})
    private WebServiceResponse genericCommand(WebServiceRequest request) {
        appLogger.info("Generic command arrived", request.getJsonBody());
        // do something with the res
        return new WebServiceResponse();
    }

    @EndpointWebService(path = "/orders", methods = {RestMethod.POST})
    private WebServiceResponse processOrder(WebServiceRequest request) {
        appLogger.info("Order processing arrived", request.getJsonBody());
        // do something here
        return new WebServiceResponse();
    }

}
```

You can send a message as well sending additional information that will be displayed when you click
on `More Info` in the log in the app monitor.

## Creating a proxy endpoint

Before you can run your endpoint locally, you should setup a proxy endpoint in the app you will be using to test
the development of your endpoint. You can find more information about this in [Create your own endpoints]({{site.baseurl}}/extensions-create-your-own-endpoints.html).

When you add a new `Proxy endpoint` to you app, you will be asked to enter the `Endpoint URI` in the configuration. We
recommend to use [ngrok](https://ngrok.com/) instead of opening a port in your router. With `ngrok` you can setup
a URI like this:

```
./ngrok http 10000
```

This will give you an HTTP and HTTPS URL. We recommend using the HTTPS URL, so copy it into the configuration of
your endpoint.

Regarding the token we recommend to leave the autogenerated token, except that you have a reason not to do that.


Once you create the endpoint, you will see the configuration below, something like this:

```
_endpoint_name=proxy
_app_name=yourtestapp
_environment=dev
_pod_id=id
_profile=default
_custom_domain=
_debug=true
_local_deployment=true
_base_domain=slingrs.io
_webservices_port=10000
_endpoints_services_api=https://yourtestapp.slingrs.io/dev/endpoints/proxy/api
_token=91833a8b-929f-4eab-b7b4-2383c10cd629
_endpoint_config={}
```

You should copy this configuration to `endpoints.properties`. Keep in mind that the last property, `_endpoint_config`,
should have a valid JSON with the config or your endpoint, so you might not want to override that. So if you used the 
skeleton endpoint you should have something like this:

```
_endpoint_name=proxy
_app_name=yourtestapp
_environment=dev
_pod_id=id
_profile=default
_custom_domain=
_debug=true
_local_deployment=true
_base_domain=slingrs.io
_webservices_port=10000
_endpoints_services_api=https://yourtestapp.slingrs.io/dev/endpoints/proxy/api
_token=91833a8b-929f-4eab-b7b4-2383c10cd629
_endpoint_config={"token":"123456"}
``` 

If you prefer, you can have a separate file in case you don't want to commit sensitive credentials to your repository.
We usually use `endpoint_proxy.properties`, which is already included in `.gitignore` in the skeleton endpoint, and
you can pass this file when running your endpoint. This way this will be the configuration for your endpoint running
with the proxy.

Keep in mind that `endpoint.properties` is only used when you run the endpoint locally and it is useful as a template
to create `endpoint_proxy.properties`, but it does not affect the endpoint when running on the cloud because endpoint
config is passed in another way.

Once you have created the proxy endpoint in your app, remember to push changes so it is initialized.

## Running your endpoint

Before running your endpoint, make sure that you build it:

```
cd ENDPOINT_FOLDER
mvn package
```

Then you can run your endpoint from the command line or using your IDE. Just make sure you pass the 
following things:

- **Main class**: should be set to `package.Runner`, where `package` is what you configure when
  the endpoint was created. You will be able to see the class path in the `pom.xml` file.
- **Configuration file to use**: this is the properties file to be used. It will be usually be
  `endpoints.properties` or `endpoints_proxy.endpoint` or whatever other properties file you are using.
- **VM options**: if you want you can specify the heap with `-Xmx256M`. Tis is to limit the memory of 
  your endpoint and make sure there won't be problems when deployed on the cloud. Keep in mind that 
  this is not exactly the same as the memory available for the endpoint when deployed on the cloud, as
  you need to consider native memory used by the whole process. However it helps to limit at least
  the heap memory.
- **Working directory**: make sure the working directory is the one where the code of the endpoint is
  located.

With Maven you can run it from the command line like this (in the root folder of the endpoint):

```
mvn exec:java -Dexec.mainClass="io.slingr.endpoints.skeleton.Runner" -Dexec.args="configurationFile=endpoint_proxy.properties" -DROOT_LOGGER=stdout
```

## Testing that your endpoint is working

Now that the endpoint is running and the proxy endpoint is setup, we can do a quick test to verify everything
is working. In order to do that execute the following code in your builder or monitor console:

```js
var res = app.endpoints.proxy.randomNumber({});
log('res: '+JSON.stringify(res));
``` 

You should see an output like this:

```
res: {"number":5560} 
```

We are assuming that you are using the skeleton endpoint template where this method is available. Otherwise
you should call a method that exists in your endpoint.

## More samples

There are dozens of endpoints already developed for the Slingr platform. You can [take a look at them](https://github.com/slingr-stack) to see
more features in the endpoints framework.

