---
title: "Overview"
description: "Here, you will find information about integrating your apps with other applications and extending the platform's features."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "services"
toc: true
weight: 2
---

## **What are extensions?**

Extensions are a fundamental feature of the platform that enhances its functionalities, materializing through services and packages.
These extensions seamlessly facilitate connections with external APIs, manage authentication, and perform key operations.
By encapsulating specific solutions, extensions foster a collaborative and diverse ecosystem, driving continuous innovation and the creation of more robust, personalized solutions.
In summary, extensions, supported by services and packages, are fundamental for the creation of modern and adaptable applications.

👉 [Service](/extensions/services/overview) is essentially a piece of software that operates alongside your app, providing additional features and capabilities.  For instance, you can implement an service that offers cryptographic algorithms or pdf images generator, enabling your app to utilize them securely.

👉 [Packages](/extensions/packages/overview) are a convenient way to import a set of metadata into your application. In simpler words, it's a way to import a set of prebuilt functionalities. Their primary purpose is to streamline the implementation of predefined functionalities, saving developers a significant amount of time.

These services and packages integrate to interact with an external API, such as Mandrill. How do we achieve this? Very simply, the service, in this case, an HTTP service, contains the logic in Java or Node to establish the connection to the external service. In other words, it constructs the HTTP requests and sends them to the Mandrill API. Meanwhile, the Mandrill package provides authentication methods and functions with which the platform developer interacts to send requests to the endpoint. This will become clearer in the following diagram:

![config package](/images/vendor/extensions/arq_diagram.png)

As you can see, Slingr processes multiple types of services and packages that will help you integrate with external APIs. On the other hand, you can develop your own services or packages, share them with the community, or keep them for personal use only. In the following entries, you will find information on how to install [services](/extensions/services/overview), [packages](/extensions/packages/overview), or create your own using our [Java](/extensions/services/java-sdk), or [Node](/extensions/services/node-sdk) SDKs.
