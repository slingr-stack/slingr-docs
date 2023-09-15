---
title: "Apps REST API documentation"
lead: "Let's dive into the process of effortlessly generating REST API documentation, making it easier for external developers to work with your app's API."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 142
---

Developers who want to interact with your app's [REST API]({{<ref "/dev-reference/rest-apis/apps-api.md">}}) need essential information about entities, fields, actions, permissions, and more. However, this critical information is typically locked within the app builder and inaccessible to external developers. To bridge this gap, Slingr offers a solution to auto-generate comprehensive REST API documentation, providing all the details required for seamless API interaction.

## **Understanding REST APIs**

In your app builder, navigate to the **`Model > REST API`** section to find a list of APIs associated with your app. While your app technically has one API based on your model, certain features may be restricted depending on the user's permissions. This section allows you to define the permissions for different types of API users you expect.

There will always be one API called **`Full API`**, which cannot be deleted. It serves as the API for developer users or individuals with comprehensive permissions. Additionally, you can create other APIs to specify the groups to which API users belong. These groups are instrumental in determining user permissions.

Once you configure a REST API and push changes, you can access the API's documentation at this URL:

```
https://{{site.slingr_domain}}/<env>/runtime/api/docs/<api-name>
```
<br>

Please note that these REST APIs defined here serve the sole purpose of auto-generating documentation. Any user who doesn't belong to the specified groups can still use the API but won't have access to the documentation.

## **REST API Settings**

When creating a new REST API, you must provide the following settings:

### Label

A user-friendly, human-readable name for the REST API.

### Name

The internal name of the REST API, used in the API documentation's URL. It should consist only of letters and numbers, with no special characters or spaces.

### Groups

A list of groups that define the permissions for this REST API. Only the components accessible to these groups will be documented.