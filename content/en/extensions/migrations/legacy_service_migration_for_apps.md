---
title: "Migration"
description: "Here we will describe how to perform the migration task from endpoints to packages and services for Slingr apps. For App Developers"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "migrations"
toc: true
weight: 23
---

## Summary

Here we will describe how to perform the migration from a legacy service to packages and services for Slingr apps.

For this example case we will use the application "test1" in its "dev" environment: <https://test1.slingrs.io/dev/builder/> . And the endpoint we will migrate will be "PandaDoc" with version v3.8.4.

## Requirements

Before we can start the migration task we need:

- Have a Developer account on Slingr.

- Have permissions to access the builder in the app to be migrated.

To begin, first make sure that the package is registered in the Developer Portal. To do this go to <https://developer-portal.slingrs.io/#packages> . If the package exists you can continue, otherwise you must search for its repository and add it with the “**+ Create**” button.

![register package](/images/vendor/extensions/register_package.png)

Once verified, we can go to the Builder of the application to which the migration will be performed.

The official endpoints have undergone a Standardization process. Therefore, the latest stable versions of these endpoints contain significant changes such as the addition of Flow Steps, changes in the way of referencing helpers (functions) and bug fixes.

- Make sure you understand how the references to helpers have changed.

_Note: the helper functions can typically be accessed similarly as is the name of the external service and the http operation to be performed. For example if you have the operation "_**_GET https\://api.pandadoc.com/documents/idOfTheDocument_**_" the reference to the function from an endpoint will be: "_**_app.endpoints.pandadoc.documents.get(idOfTheDocument)_**_". This helps to better identify which function is used and which external service is referenced in a more standard way in all endpoints._


## Creating a Http Service

1. Once inside, go, according to the App navigation panel, to: **Extensions -> Services** .

_Note: as an important improvement, it is no longer necessary to have an especific instance deployed to access an external service. If all your endpoints made http request you can replace them with just one http service.

Here we are going to create the service "http" (only if it doesn't exist, you don't need more than one) which allows us to centralize all the calls that use this protocol and use this single component to make external calls.

2. Click on the **+ Create** button. And select "**Http**".

As already specified you can use a single instance of this component to replace all the endpoints that use this protocol, you can even use the same component for different apps.

3. You can select "**Instance type**" as "**Shared**" or "**dedicated**". If shared is selected you will be using a shared http service with other apps. The shared http service is free but keep in mind that this may affect the app performance as it is also used by other apps.

4. So you can confirm the creation by clicking on the “**+ Create**” button.

_Note: if you have a large transaction load and you need a unique and customized processing component for your application you can still perform a custom Deploy of the component, just select as "_**_Instance type_**_" the value "_**_Dedicated_**_", this will work exactly like the old Http Endpoint, but it will also have all the compatibility to work with the Packages. We recommend version v1.1.4 or higher to work._

5. Last step to start working with the created component you need to do a Push of the last changes. Click on "**Push changes**".

![install service](/images/vendor/extensions/install_service.png)


## Creating a Package

1. From here we can go to the section (of the App navigation) **Extensions -> Packages**.

2. Click on the "**MARKETPLACE**" tab.

3. And select the desired package to migrate from the list on the left. In this case it will be "**pandadoc**".

![install package](/images/vendor/extensions/install_package.png)

Once selected, in the right section you can see the information related to the package, it is a Readme of the repository with instructions for use, functions and details of the package.

4. Here you can select the version to install, then click the "**Install**" button.

_Note: As you can notice the configuration of the package is very similar to the services and even to the endpoint itself. But unlike these, a package is no longer in charge of Instance or Component configurations, neither memory nor replicas. A package only contains code, helpers to access the logic of this code, flow steps, etc._

5. Once you have completed the required fields you can click on the "**Install**" button.

6. Finally to start working with the created package you need to Push the last changes again. Click on "**Push changes**".

![config package](/images/vendor/extensions/config_package.png)


## Migration

### Calls to Helpers/Scripts

Before, app calls to endpoints were done through helpers provided by the endpoint.

Currently, endpoints helpers are replaced by script libraries from the package. They contain all the necessary logic to perform all the HTTP requests methods through the service. Also, they contain methods that help the developer to consume the external service.

The authentication is managed by the package. Some packages may include some methods related to specific authentications flows, like OAuth 2.0.

_Note: you can see the whole implementation of a package, with its configurations, dependencies, helpers and listeners directly under the tree from the App Navigator: Extensions -> Packages -> pandadoc -> Script | Listeners ._

![view script](/images/vendor/extensions/view_script.png)

#### Migration tip:

1. Go to the panel on the right, to the **App explorer & help**.

2. Click on the "**Find**" tab.

3. Type in the "**Search**" field the primitive way to access the endpoint. "**app.endpoints.{endpointName}**" (e.g. "app.endpoints.pandadoc") and hit the Enter button.

4. In the Metadata search you will be able to see each Endpoint usage and its location. Click on the location to be redirected to the script location.

5. Verify that it is a script that you can modify.

6. Migrate the script to use a package method (e.g. "app.endpoint.pandadoc.get" will change to "pkg.pandadoc.api.get").

7. Click on the "**Save**" button.

8. And repeat the procedure from step 1 until there are no more occurrences that you can modify in the Metadata list.

![implement package](/images/vendor/extensions/implement_package.png)

### Listeners

If you have listeners that are listening to endpoints events then proceed with the following steps.

1. Go from the App Navigation to **Model -> Listeners -> Endpoint**.

2. Searches each listener to see if it uses any endpoint events.

3. Creates a new listener for each event used:

   1. Packages may include a listener that will process webhooks that arrive to the http service, do some processing, like webhook verification and trigger a package event that you can listen to. You can have a  “**Package**” listener  for this
   2. Also you can create a listener of type "**Service**", listen to the http service and add a condition that filters webhooks by the package path. For example, `/pandadoc.

2. If it is an internal event to your application that does not wait for external system calls, create a listener of type “**Package**”.

4. Delete the Endpoint listener by clicking on the “**Delete**” action in the listener list.

![listeners](/images/vendor/extensions/listeners.png)


### Flow Steps

All Flow Steps must be removed and replaced by a new Step. If the endpoint has been standardized, the logic of each Step should not vary in its behavior.

1. You have to go from the App Navigation to **Model -> Entity**.

2. For each entity verify where you use Flows (Actions, Assignment of Default Values...). If in that flow you use a Step of your Endpoint, copy the values entered to the inputs, and the name of the outputs and **delete the Step**. Then, **create a Package Step** that represents the same call as the previous one. Paste the previous values, and click on the "**Save**" button.


## Legacy Endpoint Removal

Once you have completed the above steps, you can delete the endpoint and push changes.

1. You have to go from the App Navigation to **Model -> Legacy services**.

2. Select your Endpoint

3. Click the "**Delete**" button and confirm.

4. Finally to start working with the created package you need to Push the last changes again. Click on "**Push changes**".

5. Test your application on the actions that use your Package.

![list endpoints](/images/vendor/extensions/list_endpoints.png)
