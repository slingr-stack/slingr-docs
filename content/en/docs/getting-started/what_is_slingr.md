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
weight: 100
toc: true
---

Slingr is a platform to create cloud apps that can easily integrate with other SaaS solutions out there.

The approach followed by Slingr is that you describe your data model and business rules, and that information will be used to create your application. The idea behind this is that you can **focus on solving business problems instead of technical issues**, what is usually what you end up doing when creating business apps using more low level tools like Java or .Net. Our goal is to incredibly **increase productivity** when creating apps.

On the other hand, we know that there are a lot of great SaaS solutions that were built with one specific purpose in mind, making them very efficient for the problem they solve. Trying to reproduce that on Slingr makes no sense, so our approach is to provide tools so you can easily integrate those existing cloud apps and put your efforts on creating those custom workflows your business needs.

![Alt Text](/images/vendor/whats-slingr-stack.png)

This means that you define the business rules and data model, and you automatically get a working app with a **UI together with a REST API** that allows to use your app from other apps. Slingr has a lot of features that let you model your business requirements; we built it to create real-world apps, and not just some toy apps.

As every developer knows, businessesevolve and apps need to do so. Slingr provides mechanisms that allow to **evolve your apps quickly and with a low cost and risk.** When you change something, the app is automatically refactored to reflect those changes, making evolution as simple as possible.

Additionally, Slingr provides tools to monitor your apps, keep your data safe and make sure everything is controlled all the time.

Finally, everything happens on the cloud, which means you don’t need to setup or maintain any server, have to configure development environments or worry about user terminals. It means an **end-to-end cloud solution.**

### Highlights

- Focus on solving business problems instead of technical issues
- Increase your productivity to create cloud apps
- Integrate with existing cloud apps
- Define your data model and business rules while user interface is generated
- Auto-generated REST API to easily integrate your app
- Easily evolve your apps as your business does
- End-to-end cloud solution, from development to your end users


### How it works

As explained before, you need to define your data model and business rules in the builder, and that definition will be taken by the app runtime to execute it. To make this easier to understand we will put a very simplified example of how it would work.

Let’s suppose we have a Companies entity with a few properties. That defines your data model. Then you have some actions and conditions to activate/deactivate a company, as well as some rules when a company changes its status so the owner is notified by email.

Here you can see how the data model is defined and then the resulting app in a browser:

![Alt Text](/images/vendor/how-it-works.png)

Apart from the UI, the following REST API will be generated:

```
POST    /data/companies
GET     /data/companies/{id}
GET     /data/companies
PUT     /data/companies/{id}
DELETE  /data/companies/{id}
PUT     /data/companies/{id}/activate
PUT     /data/companies/{id}/deactivate
```

The idea is that you only need to take care of the problem you need to solve instead of thinking about which database to use, which technology for backend and frontend, spend time setting up servers, development environments, etc. You just need to care about your business requirements. We take care of the rest 😃

This is a very simplified example to show the basics of how Slingr works, but you can do much more powerful things with it. We will describe a few user cases in the next section.

### Use cases
##### Create an app to support your business
![Alt Text](/images/vendor/whats-slingr-stack.png)
In this case you need an app to support your main business processes and you integrate with very specific systems like email and payment gateways. You can create this app on Slingr by defining your business rules, permissions for different users, etc. Then you should configure endpoints for the integrations you need and set up the integration points.

##### Glue your existing apps
![Alt Text](/images/vendor/glue.png)
In this case you are already using different cloud apps. You can use Slingr to coordinate workflows in your business, breaking silos in the different departments. Some use cases for the schema above:

- Custom support will use Zendesk. Some information will flow to Slingr, for instance, log type of issues, resolution, surveys from customers, or escalate issues to a different department. For example, there might be an issue that needs to be attended by a developer, so the person at customer support will escalate the issue to development, creating an issue on the app on Slingr, which will trigger the creation of the ticket in JIRA.
- Manager and executives will be able to control what’s going on using SLNGR. No need to log into each specific app to get information about the state of the business.
- After running billing, charges are moved to QuickBooks where accountants can process it.
- When a developer closes a ticket on JIRA that was escalated by support, an email is sent to customer support so they can contact the user to indicate the problem has been solved.
- There is a mobile app that uses the REST API to get information out from and in to the app on Slingr. This mobile app has a very customize UI and exposes only a few things that are of interest to the user.

##### Customize a template app
![Alt Text](/images/vendor/customize.png)


In this case, instead of creating an app from scratch on Slingr, you can take one of the template apps and adapt them to your business needs.

This can apply also to your own apps. Let’s suppose you build an app for lawyers and you want to sell it to different companies, but each company has it’s own requirements. In this case you can have a template app and then for each company you can customize what they need without affecting other apps.

##### Use it as a backend for mobile apps
![Alt Text](/images/vendor/useit.png)
Due to the great REST API that gets automatically generated for your app, it is very easy to create mobile apps for specific purposes that pull and push data to the app on Slingr, serving as a backend. As long as the mobile app can access the Slingr API, they can be native or use HTML5.

In the example on the diagram above, employees use the app on Slingr, while customers use the mobile apps that have nicer UIs adapted to a specific purpose.

