---
title: "What's Slingr"
lead: "Brief explanation of Slingr and use cases for it."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
docs:
  parent: "getting-started"
weight: 2
toc: true
---
Slingr is a platform for creating cloud apps that seamlessly integrate with other SaaS solutions.

The approach followed by Slingr is to have you describe your data model and business rules, which will then be used to create your application. The idea behind this approach is to allow you to **focus on solving business problems rather than dealing with technical issues** that often arise when using more low-level tools like Java or .Net.

**`Our goal is to significantly increase productivity when creating apps.`**

On the other hand, we acknowledge that many SaaS solutions are purpose-built and highly efficient for specific problems. Attempting to replicate them within Slingr would be counterproductive. Therefore, our approach is to provide tools that enable easy integration of existing cloud apps, freeing you to concentrate on creating custom workflows tailored to your business needs.

![hola](/images/vendor/whats-slingr-stack.png)

This means you define the business rules and data model, and in return, you automatically get a working app with a **user interface and a REST API** that allows your app to be used by other applications. Slingr offers a wide range of features to help you model your business requirements effectively. It is designed to create real-world apps, not just trivial prototypes.

As every developer knows, businesses evolve, and apps must evolve with them. Slingr provides mechanisms that enable you to **quickly and cost-effectively evolve your apps with minimal risk**. When you make changes to your app, it is automatically refactored to reflect those modifications, simplifying the evolution process.

Additionally, Slingr provides tools to monitor your apps, ensure data security, and maintain control at all times.

Finally, everything happens on the cloud, eliminating the need for you to set up or maintain any servers, configure development environments, or worry about user terminals. 

**`Slingr offers an end-to-end cloud solution.`**

## Highlights

    - Focus on solving business problems instead of technical issues.
    - Increase your productivity to create cloud apps.
    - Integrate with existing cloud apps.
    - Define your data model and business rules while the UI is generated.
    - Auto-generated REST API to easily integrate your app.
    - Easily evolve your apps as your business does.
    - End-to-end cloud solution, from development to your end users.

## How It Works

As explained before, you need to define your data model and business rules in the builder. The app runtime will then use this definition to execute the specified actions and conditions.

To provide a simplified example of how it works, let's consider an entity called "Companies" with a few properties. This entity defines your data model. Additionally, you might have actions and conditions to activate/deactivate a company, along with some rules that trigger when a company changes its status, resulting in the owner being notified by email.

Below, you can observe the data model definition and the resulting app displayed in a web browser:

![hola](/images/vendor/how-it-works.png)

Apart from the UI, the following REST API will be generated:

```js
  POST    /data/companies
  GET     /data/companies/{id}
  GET     /data/companies
  PUT     /data/companies/{id}
  DELETE  /data/companies/{id}
  PUT     /data/companies/{id}/activate
  PUT     /data/companies/{id}/deactivate
```

---

The idea is that you only need to take care of the problems you need to solve, instead of worrying about which database to use, which technologies for the backend and frontend, or spending time setting up servers and development environments, etc. You just need to focus on your business requirements, and we'll take care of the rest :)

This is a highly simplified example to demonstrate the basics of how Slingr works, but you can achieve much more powerful functionalities with it. In the next section, we will describe a few use cases.

## Use Cases
---

### Create an app to support your business
![hola](/images/vendor/use-case.png)
In this scenario, you need an application to support your main business processes, and you want to integrate it with specific systems such as email and payment gateways. With Slingr, you can easily create this application by defining your business rules, permissions for different users, and more. Next, you should configure endpoints for the integrations you require and set up the integration points.

---

### Glue your existing apps
![hola](/images/vendor/glue.png)

In this case, you are already using various cloud apps. You can leverage Slingr to coordinate workflows in your business, breaking silos between different departments. Here are some use cases for the schema described above:

- Custom support will utilize Zendesk. Some information will flow into Slingr, such as log types of issues, resolutions, surveys from customers, or escalated issues to different departments. For example, if there's an issue that requires developer attention, the customer support representative will escalate the issue to development, creating an issue on the Slingr app, which in turn, will trigger the creation of a ticket in JIRA.
- Managers and executives will have the ability to monitor ongoing activities using SLNGR. There's no need to log into each specific app to obtain information about the state of the business.
- After running billing processes, charges are moved to QuickBooks, where accountants can handle them.
- When a developer closes a ticket on JIRA that was previously escalated by support, an email is sent to customer support, notifying them that the problem has been resolved.
- There is a mobile app that utilizes the REST API to extract and insert information into the app on Slingr. This mobile app has a highly customized UI and only exposes a limited set of functionalities that are relevant to the user.

---

### Customize a template app

![hola](/images/vendor/customize.png)

In this case, instead of creating an app from scratch on Slingr, you can take one of the template apps and adapt them to your business needs.

This can apply also to your own apps. Let's suppose you build an app for lawyers, and you want to sell it to different companies, but each company has its own requirements. In this case, you can have a template app, and then for each company, you can customize what they need without affecting other apps.

---

### Use it as a backend for mobile apps

![hola](/images/vendor/useit.png)

Due to the exceptional REST API automatically generated for your app, it becomes incredibly easy to develop mobile apps tailored to specific purposes. These mobile apps can effortlessly pull and push data to the Slingr app, effectively acting as a backend. As long as the mobile app can access the Slingr API, it can be either native or use HTML5.

In the diagram example above, employees utilize the app on Slingr, whereas customers interact with mobile apps featuring enhanced user interfaces adapted for specific purposes.
