---
title: "Slingr platform concepts"
lead: "Brief explanation of how the platform works. Description of the different components in the Slingr platform."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "slingr-platform"
toc: true
weight: 1
---

![Alt Text](/images/vendor/platform-ref/platform-concepts.png)

To work with Slingr you will need a developer account. You can create one [developer account here](https://developer-portal.slingrs.io/signup.html). To manage your apps and start building something great, you have to log in to the [Developer Portal](https://developer-portal.slingrs.io/login.html). Here developers can manage their apps, organizations, endpoints, and account billing settings.

One developer account can have different roles in each app. There are basically three roles:

- **Developer**: a developer has access to work in the app. Permissions are given per environment so a developer could have access to the development environment but not to the production one. 
- **Admin**: an admin can change some app settings like the plan, the database settings, the environments, and more. Also, he can perform some actions like giving permissions to new developers or removing an environment that is no longer used.
- **Owner**: An app can have many admins, but only one can be the owner of the app. Usually, the owner is the user that created the app, however, the ownership can be transferred. The owner can do everything an admin can and more. You can check the difference between an admin and an owner [here]({{site.baseurl}}/platform-managing-apps.html#admins).

As shown in the diagram, each app has environments. Currently, Slingr supports up to three environments: development, staging, and production. Each environment has the following components:
- **Runtime**: this is the component in charge of taking the configurations done in the builder and generating the app.
- **Monitor**: this allows you to see what’s going on in the app during execution. [See more information about the app monitor here]({{site.baseurl}}/app-development-overview.html).
- **Builder**: this component is where developers will create the app by defining the data model, business logic, and integrations. [See more information about the development of apps here]({{site.baseurl}}/app-development-overview.html).

Environments are fully isolated from each other:
- **Dedicated memory and CPU**: each environment has its own instance for the runtime, monitor, and builder, with memory and CPU allocated for them. This allows you to work in your development environments without having to worry about the production one.
- **Isolated endpoints**: endpoints are independent execution processes with their own memory and CPU allocated, ensuring that if an endpoint has problems, your app will keep working. Additionally, each environment has its own endpoint instances, so problems in development won’t propagate to production.
- **Database**: each environment has its own database. They can be on shared or dedicated servers, based on your needs.


{{< callout type="info" contend="" >}}
There is also a Slingr Free plan where instances are shared. Those are not meant for production.
{{< /callout >}}
