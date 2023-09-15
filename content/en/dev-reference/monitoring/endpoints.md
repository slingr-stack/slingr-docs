---
title: "Legacy services management"
lead: "Brief explanation of Slingr and use cases for it."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 151
---

In the App Monitor's **`"legacy services"`** section, you can gain insights into the status and details of your application's legacy services. These legacy services are essential for integrating your app with external services and systems. Here's what you'll find in this section:

- **`Status`**: Indicates whether the legacy service is currently deployed, undeployed, or in an intermediate status.

- **`Last 24 Hours Activity`**: Provides data on the number of function calls and events received in the past 24 hours.

- **`Running Instances`**: Displays the number of active instances for each of your legacy services.

- **`Configuration Details`**: By clicking on a specific legacy service, you can access its detailed configuration settings.

## **Managing legacy services**

You can perform various operations on your legacy services to ensure they are running as expected:

- **`Deploy`**: If an legacy service is undeployed, you can activate it by selecting it and clicking the **`Deploy`** button.

- **`Undeploy`**: If an legacy service is deployed but you no longer need it, you can deactivate it by selecting it and clicking the **`Undeploy`** button. After undeploying, the endpoint will cease to function, and no further calls or events will be processed, conserving resources.

- **`Redeploy`**: This option restarts selected legacy services. It can be useful when changes have been made to configuration through environment variables or when there are unusual behavior patterns in a legacy service.

## **Legacy services configuration**

Configuring legacy services to align with your app's requirements is crucial. You can customize various settings:

- **`Generate Token`**: Legacy services are typically secured with a token to enable communication from external sources. You can regenerate this token here if it is compromised or for security reasons.

- **`Profile`**: Some legacy services offer different memory profiles, which can be tailored to factors such as the size of your team or usage patterns.

- **`Multiple Instances`**: If supported, you can adjust the number of instances for an legacy service. Increasing instances can enhance the legacy service's capacity to handle higher loads for your integrations.

- **`Hide Logs Content`**: For legacy services that process sensitive information, enabling this flag ensures that any sensitive data is not logged. This is particularly important for legacy services dealing with confidential information, such as credit card processing in production.

Managing your legacy services efficiently ensures the smooth operation of your app's integrations and external interactions.
