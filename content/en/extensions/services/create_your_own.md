---
title: "Create your own services"
description: "Here you will find information to create your own services to add more features to your app."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "services"
toc: true
weight: 14
---

You have the ability to create your own custom services and seamlessly integrate them into your apps, enhancing the capabilities of Slingr according to your specific requirements. This is particularly useful for integrating with applications not covered by the official services, utilizing existing libraries, and more.

The process of creating a new service involves three fundamental steps:

1. **Service Creation**: Design and set up your new service.
2. **Testing via Proxy Service**: Thoroughly test your service using the proxy service.
3. **Service Registration**: Register your developed service within the Slingr developer portal.

## **Service creation**

To get started, you need to create a new service. We recommend following one of these guides based on your preferred programming language:

- [Java SDK]({{<ref "/extensions/services/java-sdk.md" >}})
- [Node SDK]({{<ref "/extensions/services/node-sdk.md" >}})

## **Testing via proxy service**

### Overview

For developing and testing your custom services, there's a dedicated service designed to assist you—the **`Proxy Service`**:

![Service Proxy](/images/vendor/extensions/service-proxy.png)

When you initiate the creation of a new service in the app builder, you will find the option for the **`Proxy Service`** in the list of available services. This particular service is designed to proxy the one running on your local machine, as depicted in the diagram above.

{{< callout type="warning" contend="" >}}
Please be aware that communication between the proxy service and your local service might occur over HTTP instead of HTTPS. In such cases, refrain from transmitting sensitive information to ensure security.
{{< /callout >}}

### Proxy purposes

The proxy service the following purposes:

- When your app invokes a function on the service's API, the proxy service initiates a call to your local service. This local service then processes the request and forwards the response back to the proxy service.
- Whenever an event occurs in your local service, it is transmitted to the proxy service, which subsequently relays it to your app.
- Upon loading the metadata of the service (such as the **`appService.json`** definition file), the app retrieves this information from your locally running service.

This setup enables you to run and test your service locally, facilitate debugging, and observe its behavior within your app ecosystem, all without any additional requirements.

For a comprehensive understanding of the proxy service's functionality, refer to the [documentation page]({{<ref "/extensions/services/proxy-service.md" >}}).

## **Service registration**

Once your service implementation is complete, it's essential to register it on the platform to make it accessible to your apps. Alternatively, you can choose to make it publicly available for others to use.

Within the **`Developer Portal`** and under the **`Services`** section, developers can view and manage the services under their purview. This section allows you to register new services, update existing ones, or disable them as needed.

When registering a new service, you'll need to provide the following information:

- **`Label`**: A user-friendly name for the service.
- **`Name`**: A unique name for the service, which must match the name used in the **`appService.json`** definition file. Note that the name cannot be modified later.
- **`Repository`**: The Git URL of the repository containing the service's code. The repository must be public. If it's private, we currently support only GitHub repositories, and you'll need to grant read access to the user **`slingr-builder`**. The URL should be in **`SSH`** format, like **`git@github.com:workspace_id/repo_name.git`**.
- **`Folder`**: Optional field for specifying the location of the service within a specific folder.
- **`Type`**: Choose between **`Java`** and **`Node.js`** to indicate the service's programming language.
- **`Visibility`**: Select either **`private`** or **`public`**. For public visibility, any app can utilize the service. For private visibility, you can specify which apps can access the service.

Upon registration, the service is associated with the developer who registers it. However, if necessary, ownership of the service can be transferred to another account using a tool available in the service editing section.

After registration, the platform will automatically detect new versions of the service (identified by tags with the format **`v1.15.1`**, for example). These versions are visible when viewing service details, where you can perform version management tasks:

- Trigger a search for new versions: Refreshes the list of available versions for the service.
- Build a specific version: Initiates the build process for a particular version.
- Set a version as the latest/default: Designates a specific version as the latest or default choice.

Additionally, you can change the service's icon within its details. The icon should be in **`PNG`** format and have a size of **`48x48px`**.

Please note that services cannot be deleted; however, you can disable them, preventing their usage in any app.

## **Summary**

To summarize, here's what you need to start developing your service:

1. Begin by creating your local service using either the [Java SDK]({{<ref "/extensions/services/java-sdk.md" >}}) or the [Node SDK]({{<ref "/extensions/services/node-sdk.md" >}}).
2. Next, create a proxy service in your app.
3. Configure the proxy service to connect both to your local service and vice versa.
4. Develop, utilize, and test your service within your app! Explore the available options for your services [here]({{<ref "/extensions/services/common.md" >}}).
5. Once it's functioning effectively, register it and generate a version of your service.
6. Integrate your service into your apps!
