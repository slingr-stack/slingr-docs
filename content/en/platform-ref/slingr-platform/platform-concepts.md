---
title: "Main Concepts"
description: "Summary: Brief explanation of how the platform works. Description of the different components in the Slingr platform."
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

## **Platform Concepts**

![Alt Text](/images/vendor/platform-ref/platform-concepts.png)

### Developer Account and Portal

To work with Slingr, you will need a developer account. You can create one [here](https://developer-portal.slingrs.io/signup.html). After creating an account, you can log in to the [Developer Portal](https://developer-portal.slingrs.io/login.html) to manage your apps and start building something great. Within the Developer Portal, developers can manage their apps, organizations, endpoints, and account billing settings.

One developer account can have different roles in each app. There are three primary roles:

- **Developer**: Developers have access to work on the app. Permissions are given per environment, so a developer could have access to the development environment but not the production one.
- **Admin**: Admins can change app settings like the plan, database settings, environments, and more. They can also grant permissions to new developers or remove an environment that is no longer used.
- **Owner**: An app can have many admins, but only one can be the owner. Usually, the owner is the user who created the app. However, ownership can be transferred. Owners have all the privileges of an admin and more. You can check the difference between an admin and an owner [here]({{<ref "/platform-ref/slingr-dev-portal/managing-apps.md#admins" >}}).

### Environments and Components

As shown in the diagram, each app in Slingr has environments. Currently, Slingr supports up to three environments: development, staging, and production. Each environment consists of the following components:

- **Runtime**: This component is responsible for taking the configurations done in the builder and generating the app.
- **Monitor**: The monitor allows you to see what's going on in the app during execution. [See more information about the app monitor here]({{<ref "/dev-reference/overview/overview.md" >}}).
- **Builder**: This component is where developers create the app by defining the data model, business logic, and integrations. [See more information about the development of apps here]({{<ref "/dev-reference/overview/overview.md" >}}).

### Environment Isolation

Environments in Slingr are fully isolated from each other to ensure stability and security:

- **Dedicated Memory and CPU**: Each environment has its own instance for the runtime, monitor, and builder, with memory and CPU allocated for them. This allows you to work in your development environments without worrying about the production environment.
- **Isolated Endpoints**: Endpoints are independent execution processes with their memory and CPU allocation. If an endpoint experiences problems, your app will keep working. Additionally, each environment has its own endpoint instances, so issues in development won't propagate to production.
- **Database**: Each environment has its own database, which can be on shared or dedicated servers based on your needs.


{{< callout type="info" contend="" >}}
There is also a Slingr Personal plan that offers a 15-day free trial access. Those are not meant for production.
{{< /callout >}}
