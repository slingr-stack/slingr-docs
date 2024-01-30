---
title: "Node SDK"
description: "Node SDK to create services."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "services"
toc: true
weight: 17
---

## **Create your new service project**

To streamline the creation of a new service, we offer a sample GitHub repository containing a skeleton service. You can fork this repository to quickly access the common features most users require for their services. Here's the URL for the repository: [Node.js Skeleton Service](https://github.com/slingr-stack/skeleton-endpoint)

While you can certainly start building your service from scratch, utilizing the skeleton service can expedite your setup process.

## **Customize the skeleton template**

If you've chosen to use the skeleton service, there are a few adjustments you may want to make:

### package.json file

The **`package.json`** file contains several elements that you might need to modify:

- **`name`**: This is a user-friendly name for your service.
- **`version`**: This indicates the version of your service. You can leave it as **`1.0.0`** since this version isn't related to the versions registered in Slingr; Slingr employs the tags in your repository instead.
- **`description`**: Provide a description for what this service is all about.
- **`scripts`**: This section allows you to set up execution scripts for your services or tests.
- **`keywords`**: You can specify keywords relevant to your service here.

### Service descriptor

The **`appService.json`** file contains at least two fields that require updates:

- **`label`**: This is the user-friendly name of the service.
- **`name`**: This is the internal service name, and it must correspond with the name you use to register the service in Slingr.

For a better understanding of the other settings, refer to the [Services Features]({{<ref "/extensions/services/common.md" >}}) section.

### Accessing configuration settings

You can access the service configuration using the following code snippet (always within a function):

```js
svc.functions.someFunction = (serviceRequest) => {
    const configs = service.serviceConfig;
    //your code...
}
```
<br>

### Hooks

Services provide a variety of hooks that allow you to execute initializations or perform cleanup tasks.

```js
svc.hooks.onConfigurationReady = () => {
    //Some code here...
}
svc.hooks.onEndpointServicesConfigured = () => {
    //Some code here...
}
svc.hooks.onWebServicesReady = () => {
    //Some code here...
}
svc.hooks.onServiceStart = () => {
    //Some code here...
}
//This one receives a 'cause' parameter which is the 'code' of the process.on('beforeExit') event
svc.hooks.onServiceStop = (cause) => {
    //Some code here...
}
```
<br>

### Functions

To implement a function defined in the **`appService.json`** file, follow these steps:

```js
svc.functions.yourFunctionName = (serviceRequest) => {
    //You can access all the service services here like service.serviceConfig or service.dataStores
    //Your custom code goes here...
    return { someInfo: 'someValue'}
}
```
<br>

When implementing an service function, it will receive a request parameter containing the function's parameters along with other relevant information. Remember, it's essential to always return a **`Json`** object as a response.

### Events

Sending events to the app is accomplished through the use of the **`events`** property within the service. Depending on your requirements, you can dispatch either an asynchronous event or a synchronous event if you anticipate a response from the app:

```js
svc.functions.fnThatSendsAsyncEvent = (serviceRequest) => {
    const requestId = serviceRequest.id;
    //Later in your code...
    svc.events.send('someEventName', data, requestId);
}

svc.functions.fnThatSendsSyncEvent = (serviceRequest) => {
    const requestId = serviceRequest.id;
    //Later in your code...
    let eventResponse = services.events.sendSync('someEventName', data, requestId);
    //Do something with that response...
}
```
<br>

**Note:** Ensure that the event named **`'someEventName'`** is specified within your **`appService.json`** file under the **`events`** property. The **`data`** argument within the event will carry the data you intend to receive.

Additionally, the **`requestId`** parameter, as illustrated in the previous example, can be obtained from the request parameter defined in the respective function.

### Data stores

For services requiring persistent data storage, data stores are at your disposal. Definition of these stores takes place within the **`appService.json`** file, enabling their subsequent utilization within the service.

The subsequent methods offer access to the various data stores:

```js
svc.functions.someFunction = async () => {
    //Find documents by some flter: Filter here is the same as the one in sys.data.find(). eg: {someField: 'someValue'}
    svc.dataStores.someDataStore.find(filter);
    svc.dataStores.someDataStore.findOne(filter);
    //Find document by id:
    svc.dataStores.someDataStore.findById('documentId');
    //Save a document: Some object will be any javascript object.
    svc.dataStores.someDataStore.save(someObject);
    //Update a document:
    svc.dataStores.someDataStore.update('documentId',someObject);
    //Remove documents by filter:
    svc.dataStores.someDataStore.remove(filter);
    //Remove by id:
    svc.dataStores.someDataStore.removeById('documentId',someObject);
    //Count the documents currently saved in the store by filter:
    svc.dataStores.someDataStore.count(filter);
}
```
<br>

You have the option to either **`await`** the response or employ the **`then()`** block, depending on your specific requirements.

### Web services

To enable your service to accept HTTP calls, you can specify these calls using the **`webServices`** property. It's essential to define this property as an object containing the webservice's **`method`**, **`path`**, and **`handler`**:

```js
svc.webServices.nameForYourWebService = {
    method: 'POST',
    path: '/',
    //As this is an express service, you receive the req, and res objects
    handler: (req, res) => {
        //Do something... and then return a response to the caller
        res.json({status: 'ok'})
    }
}
```
<br>

Taking the provided example into account, the subsequent URL will be operational and responsive to incoming requests:

```
POST https://<yourAppName>.slingrs.io/<env>/services/<serviceName>
```
<br>

Upon invoking this URL, the associated handler will be triggered.

{{< callout type="warning" contend="" >}}
To ensure secure access to your services, it's advisable to incorporate a form of verification, such as a token. This measure helps prevent unauthorized calls to your services.
{{< /callout >}}

### File handling

The app provides utilities within the **`files`** property to facilitate the uploading and downloading of files. Depending on whether you intend to process these actions synchronously or asynchronously, you can either **`await`** the service or manage the response within the **`then()`** block. Subsequently, you can dispatch an event to the platform.

Both scenarios are illustrated below:

```js
svc.functions.asyncDownloadFileFromService = async (serviceRequest) => {
    const file = serviceRequest.params;
    svc.files.download(file.id).then(
        (res) => {
            svc.logger.info('File download has completed!');
            //In this case we return res.toString() because we know the file being downloaded is a .txt. Its not recommended to return the plain buffer to the platform.
            svc.events.send('onDownloadComplete', res.toString(), serviceRequest.id)
        }
    );
    return { msg: 'File [' + file.id + '] is being downloaded and the processing will be made asynchronously. An event will be fired when the download is complete.' }
};

svc.functions.syncDownloadFileFromService = async (serviceRequest) => {
    const file = serviceRequest.params;
    var fileResponse = await service.files.download(file.id);
    svc.logger.info('File download has completed!');
    //In this case we return res.toString() because we know the file being downloaded is a .txt. Its not recommended to return the plain buffer to the platform.
    return { fileContents: fileResponse.toString() }
};

svc.functions.uploadFileSyncFromService = async (serviceRequest) => {
    const fileUrl = 'https://jsoncompare.org/LearningContainer/SampleFiles/PDF/sample-pdf-with-images.pdf';
    try {
        //We download the dummy file from an HTTP request
        var downloadResponse = await service.httpModule.get(fileUrl);
    } catch (error) {
        svc.logger.error('Couldn\'t download the file from [' + fileUrl + '].', error);
    }
    //And upload it to the platform
    var fileInfo = await service.files.upload('somefile.pdf', downloadResponse.data);
    //The info is returned to the app synchronously
    return fileInfo;
};

svc.functions.uploadFileAsyncFromService = (serviceRequest) => {

    const fileUrl = 'https://jsoncompare.org/LearningContainer/SampleFiles/PDF/sample-pdf-with-images.pdf';
    //We download the dummy file from an HTTP request
    svc.httpModule.get(fileUrl).then(
        (downloadResponse) => {
            //And upload it to the platform
            svc.files.upload('somefile.pdf', downloadResponse.data).then(
                (fileInfo) => {
                    //In this case, the info will be sent asynchronously via events
                    svc.events.send('onUploadComplete', fileInfo, serviceRequest.id);
                }
            ).catch(
                (err) => {
                    svc.logger.error('Couldn\'t upload the file to platform.', err);
                }
            );
        }
    ).catch(
        (err) => {
            svc.logger.error('Couldn\'t download the file from [' + fileUrl + '].', err);
        }
    );

    return { msg: 'A file will be downloaded and then uploaded to the platform. This processing will be made asynchronously. An event will be fired when the download/upload is complete.' }
};
```
<br>

{{< callout type="warning" contend="" >}}
Remember that the events must be defined in the **`appService.json`** file, and if you are using callbacks, also in the function's callbacks array property."
{{< /callout >}}

### Logging

You can transmit logs from your service to the app using **`AppLogs`**:

```js
svc.functions.someFunctionThatLogs = (serviceRequest) => {
    svc.appLogger.debug('Function executed!')
    svc.appLogger.info('Function executed!')
    svc.appLogger.warn('Function executed!')
    svc.appLogger.error('Function executed!')
}
```
<br>

To include supplementary information that will be viewable upon clicking **`More Info`** within the app monitor logs, provide a second parameter to the **`appLogger`** functions in the following manner:

```js
svc.functions.someFunctionThatLogs = (serviceRequest) => {
    svc.appLogger.debug('Function executed!',someObjectOrMessage)
    svc.appLogger.info('Function executed!',someObjectOrMessage)
    svc.appLogger.warn('Function executed!',someObjectOrMessage)
    svc.appLogger.error('Function executed!',someObjectOrMessage)
}
```
<br>

**Note:** Debug logs will exclusively appear within development and staging environment monitors.

## **Establishing a proxy service**

Before you can initiate the local execution of your service, it's essential to configure a proxy service within the app you intend to use for testing your service's development. For detailed guidance, refer to [Create Your Own Services]({{<ref "/extensions/services/create_your_own.md" >}}).

Upon adding a new **`Proxy service`** to your app, you will be prompted to input the **`Service URI`** within the configuration. We recommend utilizing [ngrok](https://ngrok.com/) in lieu of opening a port on your router. Through **`ngrok`**, you can configure a URI as demonstrated below:

```
./ngrok http 10000
```
<br>

This will provide both an HTTP and an HTTPS URL. Opt for the HTTPS URL, as it's more secure. Copy this HTTPS URL into your service's configuration.

Regarding the token, we advise retaining the automatically generated token, unless you possess a specific reason to opt otherwise.

Upon creating the service, you will encounter a configuration similar to the example below:

```
_service_name=proxy
_app_name=yourtestapp
_environment=dev
_pod_id=id
_profile=default
_custom_domain=
_debug=true
_local_deployment=true
_base_domain=slingrs.io
_webservices_port=10000
_extension_broker_api=https://yourtestapp.slingrs.io/dev/services/proxy/api
_token=91833a8b-929f-4eab-b7b4-2383c10cd629
_service_config={}
```
<br>

You should duplicate this configuration and place it within your **`.env`** file. Remember, the final property, **`_service_config`**, necessitates a valid JSON containing your service's configuration. Thus, you might need to customize this aspect.

If you've employed the skeleton service, your configuration might resemble the following:

```
_service_name=proxy
_app_name=yourtestapp
_environment=dev
_pod_id=id
_profile=default
_custom_domain=
_debug=true
_local_deployment=true
_base_domain=slingrs.io
_webservices_port=10000
_extension_broker_api=https://yourtestapp.slingrs.io/dev/services/proxy/api
_token=91833a8b-929f-4eab-b7b4-2383c10cd629
_service_config={"token":"123456"}
```
<br>

Please note that the **`.env`** file is only relevant when running the service locally. It doesn't impact the service's behavior when operating in the cloud, as the service configuration is conveyed through a different mechanism.

*Should the need arise, you can maintain multiple **`.env`** files for distinct environments or setups. For instance, you could incorporate supplementary files like **`.staging.env`** or **`.myCustomEnv.env`**. In such scenarios, you must run your service with the **`NODE_ENV`** environment variable aligned with the respective file's name. For guidance on setting environment variables across various operating systems and terminals, refer to [this resource](https://stackoverflow.com/a/9204973). By default, the **`.env`** file is loaded.*

Once you have established the proxy service within your app, remember to commit and push changes to initiate the setup.

## **Executing your service**

Before you execute your service, ensure that you have installed all the required dependencies:

```
cd SERVICE_FOLDER
npm install
```
<br>

Following this, you can proceed to run your service either from the command line or through your integrated development environment (IDE):

```
node service.js
```
<br>

or

```
npm start
```
<br>

Alternatively, you have the option to create a personalized start script within the **`package.json`** file.

## **Testing the functionality of your service**

With your service operational and the proxy service configured, it's prudent to conduct a swift test to ensure all components are functioning as intended. To execute this test, implement the provided code within your builder or monitor console:

```js
var res = svc.proxy.randomNumber({});
log('res: '+JSON.stringify(res));
```
<br>

Upon execution, you should observe an output resembling the following:

```
res: {"number":5560}
```
<br>

Please note that we are making the assumption that you are utilizing the skeleton service template, where this method is readily accessible. In case you are employing a different template, make sure to invoke a method that exists within your service.

## **Additional examples**

The Slingr platform boasts an array of pre-developed services, providing numerous features within the service framework. To explore further functionalities within the service framework, consider browsing through [this repository](https://github.com/slingr-stack).

