---
title: "Endpoints Node SDK"
lead: "Node SDK to create endpoints."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "extending-platform"
toc: true
weight: 17
---

This document will guide through the creation of an endpoint using the Node SDK and will provide details about the
framework.

## Create your new endpoint project

In order to simplify the creation of a new endpoint, we have a sample endpoint in GitHub that you can
fork and has the most common features people need in endpoints. This is the URL of this repository:

[Nodejs Skeleton Endpoint](https://github.com/slingr-stack/skeleton-endpoint)

Of course you can start from scratch and do everything yourself, but we think that using the skeleton
endpoint will help you to quickly get up and running.

## Customize the skeleton endpoint template

If you used the skeleton endpoint, there are a few things you will want to adjust:

### package.json file

The `package.json` contains a few things that you may want to modify:

- `name`: This a human-readable name for your endpoint.
- `version`: This is the version of your endpoint. You can leave `1.0.0` as this version has nothing
  to do with the versions registered in Slingr, which uses the tags in your repository instead.
- `description`: Description of your what this endpoint is about.
- `scripts`: Here you can set scripts for execution of your endpoints or tests.
- `keywords`: Here you can set some keywords related to your endpoint.
  
### Endpoint descriptor

The file `endpoint.json` contains at least two fields that you will want to update:

- `label`: this is the human-friendly name of the endpoint.
- `name`: this is the internal name of the endpoint and must match the name you use to register the endpoint
  in Slingr.

To understand the other settings, you want to take a look at [Endpoints features]({{site.baseurl}}/extensions-common-features.html).

### Reading configuration

You can access the endpoint configuration like this (always inside a function):

```js
endpoint.functions.someFunction = (endpointRequest) => {
    const configs = endpoint.endpointConfig;
    //your code...
} 
``` 

### Hooks

There are a few hooks in endpoints that you can use to perform some initializations or clean up.

```js
endpoint.hooks.onConfigurationReady = () => {
    //Some code here...
}
endpoint.hooks.onEndpointServicesConfigured = () => {
    //Some code here...
}
endpoint.hooks.onWebServicesReady = () => {
    //Some code here...
}
endpoint.hooks.onEndpointStart = () => {
    //Some code here...
}
//This one receives a 'cause' parameter wich is the 'code' of the process.on('beforeExit') event
endpoint.hooks.onEndpointStop = (cause) => {
    //Some code here...
}
```

### Functions

To implement a function that is defined in the `endpoint.json` file, you should do the following:

```js
endpoint.functions.yourFunctionName = (endpointRequest) => {
    //You can access all the endpoint services here like endpoint.endpointConfig or endpoint.dataStores
    //Your custom code goes here...
    return { someInfo: 'someValue'}
}
``` 
Endpoint functions will get a request parameter that includes the parameters sent to the function (among other info). 
You must always return a `Json` object with the response. 

### Events

You can send events to the app using the events' property of the endpoint.
You can send an async event, or a sync one if you expect a response from the app:

```js
endpoint.functions.fnThatSendsAsyncEvent = (endpointRequest) => {
    const requestId = endpointRequest.id;
    //Later in your code...
    endpoints.events.send('someEventName', data, requestId);
}

endpoint.functions.fnThatSendsSyncEvent = (endpointRequest) => {
    const requestId = endpointRequest.id;
    //Later in your code...
    let eventResponse = endpoints.events.sendSync('someEventName', data, requestId);
    //Do something with that response...
}
```

Keep in mind that the `'someEventName'` should be defined in your `endpoint.json` file, under the `events` property. 
The `data` argument will be the data you want to receive on the event.
Finally, `requestId` will be the request id which can be retrieved from the request parameter on the defined function like shown above.

### Data stores

If you endpoint needs to persist information, data stores are available for endpoints. They need to be defined in the 
`endpoint.json` file and then you can use them in the endpoint.

The available methods to access the various datastores are the following:

```js
endpoints.functions.someFunction = async () => {
    //Find documents by some flter: Filter here is the same as the one in sys.data.find(). eg: {someField: 'someValue'}
    endpoints.dataStores.someDataStore.find(filter); 
    endpoints.dataStores.someDataStore.findOne(filter);
    //Find document by id:
    endpoints.dataStores.someDataStore.findById('documentId');
    //Save a document: Some object will be any javascript object.
    endpoints.dataStores.someDataStore.save(someObject);
    //Update a document:
    endpoints.dataStores.someDataStore.update('documentId',someObject);
    //Remove documents by filter:
    endpoints.dataStores.someDataStore.remove(filter);
    //Remove by id:
    endpoints.dataStores.someDataStore.removeById('documentId',someObject);
    //Count the documents currently saved in the store by filter:
    endpoints.dataStores.someDataStore.count(filter);
}
```
You can either `await` the response or use the `then()` block depending on your needs.

### Webservices

If you want your endpoint to receive calls over HTTP, you can define them with the `webServices` property. You must define it
as an object which will contain the `method`, `path` and `handler` of the webservice:

```js
endpoint.webServices.nameForYourWebService = {
    method: 'POST',
    path: '/',
    //As this is an express endpoint, you receive the req, and res objects
    handler: (req, res) => {
        //Do something... and then return a response to the caller 
        res.json({status: 'ok'})
    }
}
```

Given the above example, the following URL will be available and listening to requests:

```
POST https://<yourAppName>.slingrs.io/<env>/endpoints/<endpointName>
```

When that URL is called, the handler will be invoked.

{% include callout.html content="You should always add some kind of verification (like a token) to avoid anyone calling your endpoints." type="warning" %} 

### Handling files

It is possible to upload and download files to/from the app using the utilities in the property `files`.
If you want to handle the processing in a sync or async way, you will need to either `await` the service, or handle the 
response in the `then()` block and send an event to the platform.

Both scenarios are shown below:

```js
endpoint.functions.asyncDownloadFileFromEndpoint = async (endpointRequest) => {
    const file = endpointRequest.params;
    endpoint.files.download(file.id).then(
        (res) => {
            endpoint.logger.info('File download has completed!');
            //In this case we return res.toString() because we know the file being downloaded is a .txt. Its not recommended to return the plain buffer to the platform.
            endpoint.events.send('onDownloadComplete', res.toString(), endpointRequest.id)
        }
    );
    return { msg: 'File [' + file.id + '] is being downloaded and the processing will be made asynchronously. An event will be fired when the download is complete.' }
};

endpoint.functions.syncDownloadFileFromEndpoint = async (endpointRequest) => {
    const file = endpointRequest.params;
    var fileResponse = await endpoint.files.download(file.id);
    endpoint.logger.info('File download has completed!');
    //In this case we return res.toString() because we know the file being downloaded is a .txt. Its not recommended to return the plain buffer to the platform.
    return { fileContents: fileResponse.toString() }
};

endpoint.functions.uploadFileSyncFromEndpoint = async (endpointRequest) => {
    const fileUrl = 'https://jsoncompare.org/LearningContainer/SampleFiles/PDF/sample-pdf-with-images.pdf';
    try {
        //We download the dummy file from an HTTP request
        var downloadResponse = await endpoint.httpModule.get(fileUrl);
    } catch (error) {
        endpoint.logger.error('Couldn\'t download the file from [' + fileUrl + '].', error);
    }
    //And upload it to the platform
    var fileInfo = await endpoint.files.upload('somefile.pdf', downloadResponse.data);
    //The info is returned to the app synchronously 
    return fileInfo;
};

endpoint.functions.uploadFileAsyncFromEndpoint = (endpointRequest) => {

    const fileUrl = 'https://jsoncompare.org/LearningContainer/SampleFiles/PDF/sample-pdf-with-images.pdf';
    //We download the dummy file from an HTTP request
    endpoint.httpModule.get(fileUrl).then(
        (downloadResponse) => {
            //And upload it to the platform
            endpoint.files.upload('somefile.pdf', downloadResponse.data).then(
                (fileInfo) => {
                    //In this case, the info will be sent asynchronously via events
                    endpoint.events.send('onUploadComplete', fileInfo, endpointRequest.id);
                }
            ).catch(
                (err) => {
                    endpoint.logger.error('Couldn\'t upload the file to platform.', err);
                }
            );
        }
    ).catch(
        (err) => {
            endpoint.logger.error('Couldn\'t download the file from [' + fileUrl + '].', err);
        }
    );

    return { msg: 'A file will be downloaded and then uploaded to the platform. This processing will be made asynchronously. An event will be fired when the download/upload is complete.' }
};
```

{% include important.html content="Remember that the events must be defined in the **`endpoint.json`** file, and if you are using callbacks, also in the function's callbacks array property."%}

### Logging

It is possible to send logs to the app from your endpoint using the `AppLogs`:

```js
endpoint.functions.someFunctionThatLogs = (endpointRequest) => {
    endpoint.appLogger.debug('Function executed!')
    endpoint.appLogger.info('Function executed!')
    endpoint.appLogger.warn('Function executed!')
    endpoint.appLogger.error('Function executed!')
}
```

You can send additional information that will be displayed when you click on `More Info` in the log in the app monitor by sending
a second parameter to the appLogger functions like this:

```js
endpoint.functions.someFunctionThatLogs = (endpointRequest) => {
    endpoint.appLogger.debug('Function executed!',someObjectOrMessage)
    endpoint.appLogger.info('Function executed!',someObjectOrMessage)
    endpoint.appLogger.warn('Function executed!',someObjectOrMessage)
    endpoint.appLogger.error('Function executed!',someObjectOrMessage)
}
```

*Debug logs will only be shown in dev and staging environments monitor.*

## Creating a proxy endpoint

Before you can run your endpoint locally, you should set up a proxy endpoint in the app you will be using to test
the development of your endpoint. You can find more information about this in [Create your own endpoints]({{site.baseurl}}/extensions-create-your-own-endpoints.html).

When you add a new `Proxy endpoint` to you app, you will be asked to enter the `Endpoint URI` in the configuration. We
recommend to use [ngrok](https://ngrok.com/) instead of opening a port in your router. With `ngrok` you can set up
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

You should copy this configuration to `.env` file. Keep in mind that the last property, `_endpoint_config`,
should have a valid JSON with the config of your endpoint, so you might want to override that. 
If you used the skeleton endpoint you should have something like this:

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

Keep in mind that `.env` is only used when you run the endpoint locally, but it does not affect the endpoint when running on the cloud because endpoint config is passed in another way.

*If you need, you can have multiple `.env` for different environments or setups. For example, you could have additional `.staging.env` or `.myCustomEnv.env` files. In this case, you should execute your endpoint setting the `NODE_ENV` environment variable to match the name of the file. [Here it's how set env variables in different OSs and terminals](https://stackoverflow.com/a/9204973).
By default, the `.env` file is loaded.*

Once you have created the proxy endpoint in your app, remember to push changes to initialize it.

## Running your endpoint

Before running your endpoint, make sure that install all the dependencies:

```
cd ENDPOINT_FOLDER
npm install
```

Then you can run your endpoint from the command line or using your IDE:

```
node endpoint.js
```
or
```
npm start
```
Or you can customize your own start script from the `package.json` file.

## Testing that your endpoint is working

Now that the endpoint is running and the proxy endpoint is set up, we can do a quick test to verify everything
is working. In order to do that execute the following code in your builder or monitor console:

```js
var res = app.endpoints.proxy.randomNumber({});
log('res: '+JSON.stringify(res));
``` 

You should see an output like this:

```
res: {"number":5560} 
```

We are assuming that you are using the skeleton endpoint template where this method is available. Otherwise,
you should call a method that exists in your endpoint.

## More samples

There are dozens of endpoints already developed for the Slingr platform. You can [take a look at them](https://github.com/slingr-stack) to see
more features in the endpoints' framework:

