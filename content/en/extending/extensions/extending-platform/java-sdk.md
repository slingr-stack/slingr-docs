---
title: "Java SDK"
description: "Java SDK to create endpoints."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "extending-platform"
toc: true
weight: 16
---
This document will guide through the creation of an endpoint using the Java SDK and will provide details about the framework.

## **Crate your new endpoint project**

To simplify the creation of a new endpoint, we provide a skeleton endpoint on GitHub. You can fork this repository, which contains the common features required for most endpoints. [Visit the repository here](https://github.com/slingr-stack/skeleton-endpoint).

You can also explore our sample endpoints to understand the features available in the Slingr integrations framework:

- [Sample Endpoint](https://github.com/slingr-stack/sample-endpoint)
- [Sample User Endpoint](https://github.com/slingr-stack/sample-user-endpoint)
- [Sample Complex Endpoint](https://github.com/slingr-stack/sample-complex-endpoint)

Additionally, take a look at the [HTTP Endpoint](https://github.com/slingr-stack/http-endpoint) since most endpoints interact with HTTP REST APIs, and this endpoint covers the basic features. You can also see how endpoints like [Sparkpost](https://github.com/slingr-stack/sparkpost-endpoint) utilize these features.

While you can start from scratch, we recommend using the skeleton endpoint to get up and running quickly.

## **Customize the skeleton template**

If you've used the skeleton endpoint, there are a few adjustments you might want to make:

### POM file

The **`pom.xml`** contains several elements you might want to adjust:

- **`groupId`**: This specifies your endpoint's group, which could be your company's group.
- **`artifactId`**: This typically represents your endpoint's name for Maven.
- **`version`**: This is your endpoint's version. You can leave it as **`1.0-SNAPSHOT`** since Slingr uses repository tags for versioning.
- **`name`**: This is a human-readable name for your endpoint.
- **`properties > build.main-class`**: If you modify the package of the main class **`io.sliongr.endpoints.skeleton.SkeletonLegacyService`** (which you probably will), update it to match the package (except for the class **`Runner`**). For example, if your endpoint's main class is **`yourcompany.endpoints.LegacyEndpoint`**, update it to **`yourcompany.endpoints.Runner`**.

### Endpoint descriptor

The **`endpoint.json`** file has at least two fields to update:

- **`label`**: This is a user-friendly endpoint name.
- **`name`**: This is the internal endpoint name used for registration in Slingr.

For other settings, refer to the [Endpoint Features documentation]({{<ref "/extending/extensions/extending-platform/common.md" >}}).

### Main class name

You'll likely want to rename and repackage the **`io.slingr.endpoints.skeleton.SkeletonEndpoint`** class, which is your endpoint's main class.

Additionally, update the **`@SlingrEndpoint`** annotation:

```java
@SlingrEndpoint(name = "name")
public class SkeletonEndpoint extends Endpoint {
}
```
<br>

Ensure that this name matches the corresponding entry in **`endpoints.json`**.

## **Reading configuration**

There are two ways to retrieve configuration settings from the endpoint:

- Define individual fields
- Access the entire configuration using a `Json` object

To define individual variables, follow this syntax within the class annotated with `@SlingrEndpoint`:

```java
@SlingrEndpoint(name = "name")
public class SkeletonEndpoint extends Endpoint {
    @EndpointProperty
    private String token;
}
```
<br>

To store the value of the configuration property **`token`**, assign it to the variable **`token`**. Conventionally, the variable name matches the field name. However, you can customize it using the **`name`** attribute within the **`@EndpointProperty`** annotation.

Additionally, you have the option to utilize the **`@EndpointConfiguration`** annotation in the following manner:

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
<br>

### Hooks

Within endpoints, several hooks are available for executing initialization or cleanup tasks.

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
<br>

### Functions

To implement a function defined in the **`endpoint.json`** file, employ the **`@SlingrFunction`** annotation:


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
<br>

Upon usage, your function will receive a **`Json`** argument containing the parameters sent to the function. Your function is expected to return a **`Json`** object as the response.

### Events

Utilize the **`Events`** interface to dispatch events to the app, which can be accessed through the **`events()`** method:

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
<br>

Note that the event **`inboundEvent`** must be defined in your **`endpoint.json`** descriptor.

When dispatching events using **`send()`**, it's important to note that the process is asynchronous. If you require a response from the app and wish to wait for it, employ **`sendSync()`** instead:

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
<br>

Remember that, in this scenario, to obtain a response, the listener in the app should utilize the keyword **`return`** to send back the desired response.

### Data stores

For endpoints requiring data persistence, data stores are accessible. These stores should be defined in the descriptor file, after which they can be utilized within the endpoint:

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

To enable your endpoint to receive HTTP calls, you can achieve this effortlessly by using the **`@EndpointWebService`** annotation:

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
<br>

Given the above sample, the following URLs will be available:

```
POST https://<yourAppName>.slingrs.io/<env>/endpoints/<endpointName>
POST https://<yourAppName>.slingrs.io/<env>/endpoints/<endpointName>/orders
```
<br>

When those URLs are called, those methods will be invoked.

{{< callout type="warning" contend="" >}}
You should always add some kind of verification (like a token) to avoid anyone calling your endpoints.
{{< /callout >}}

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
<br>

### Logging

It is possible to send logs to the app from your endpoint using the **`AppLogs`**:

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
<br>

In addition to sending a message, you have the option to include supplementary information that will be viewable by clicking on **`More Info`** within the app monitor log.

## **Setting up a proxy endpoint**

Before proceeding to run your endpoint locally, it's essential to configure a proxy endpoint in the app you intend to use for testing your endpoint's development. Further details about this can be found in the guide: [Create your own endpoints]({{<ref "/extending/extensions/extending-platform/create_your_own.md" >}}).

Upon adding a new **`Proxy endpoint`** to your app, you will be prompted to provide the **`Endpoint URI`** in the configuration. We recommend employing [ngrok](https://ngrok.com/) as an alternative to opening a port on your router. With **`ngrok`**, you can establish a URI as follows:

```
./ngrok http 10000
```
<br>

This will provide you with both an HTTP and HTTPS URL. We highly recommend utilizing the HTTPS URL; therefore, copy it and paste it into your endpoint's configuration.

As for the token, we suggest retaining the auto-generated token, unless you have a specific reason not to.

After creating the endpoint, you will encounter a configuration section similar to the following:

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
<br>

Copy and paste this configuration into the **`endpoints.properties`** file. Please note that the final property, **`_endpoint_config`**, should contain valid JSON configuration for your endpoint. You may want to avoid overwriting this property. If you've utilized the skeleton endpoint, your configuration might resemble the following:

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
<br>

If you prefer, an alternative approach is to utilize a separate file if you wish to avoid committing sensitive credentials to your repository. We typically employ **`endpoint_proxy.properties`** for this purpose, which is already included in the **`.gitignore`** of the skeleton endpoint. You can provide this file as an argument when executing your endpoint. Consequently, this configuration will be utilized when your endpoint runs with the proxy.

Please bear in mind that **`endpoint.properties`** is exclusively used when you locally run the endpoint. It's valuable as a foundation for creating **`endpoint_proxy.properties`**. However, it doesn't impact the endpoint's behavior in the cloud since endpoint configuration is managed differently.

Once the proxy endpoint has been established in your app, remember to commit and push changes to ensure proper initialization.

## **Running your endpoint**

Before you proceed with running your endpoint, ensure that you have built it:

```
cd ENDPOINT_FOLDER
mvn package
```
<br>

You can proceed to run your endpoint either through the command line or using your Integrated Development Environment (IDE). Ensure that you provide the following details when launching:

- **Main Class**: Set this to **`package.Runner`**, where **`package`** corresponds to the configuration you established when creating the endpoint. You can find the class path within the **`pom.xml`** file.
- **Configuration File**: Specify the properties file to use. Typically, this will be **`endpoints.properties`**, **`endpoints_proxy.properties`**, or any other designated properties file.
- **VM Options**: Optionally, you can define the heap size using **`-Xmx256M`**. This helps restrict the memory usage of your endpoint, minimizing potential issues upon deployment to the cloud. Keep in mind that this memory setting doesn't precisely mirror the memory available when the endpoint is deployed in the cloud. Total memory consumption includes native memory used by the entire process. Nevertheless, limiting heap memory can be beneficial.
- **Working Directory**: Confirm that the working directory aligns with the location of your endpoint's code.

Using Maven, you can execute the command below in the root folder of your endpoint:

```
mvn exec:java -Dexec.mainClass="io.slingr.endpoints.skeleton.Runner" -Dexec.args="configurationFile=endpoint_proxy.properties" -DROOT_LOGGER=stdout
```
<br>

## **Testing that your endpoint is working**

NWith your endpoint operational and the proxy endpoint established, let's perform a brief test to confirm that everything is functioning correctly. To carry out this test, execute the provided code within your builder or monitor console:

```js
var res = app.endpoints.proxy.randomNumber({});
log('res: '+JSON.stringify(res));
```
<br>

You should see an output like this:

```
res: {"number":5560}
```
<br>
We are making the assumption that you are utilizing the skeleton endpoint template, which includes the availability of this method. Alternatively, if you're not using the skeleton template, ensure that you call a method that exists within your own endpoint.

## **Exploring additional samples**

Numerous endpoints have already been developed for the Slingr platform. Feel free to [browse through them](https://github.com/slingr-stack) to gain insights into the various features offered by the endpoints framework.

