---
title: "Pricing and billing"
lead: "Explanation of pricing and how billing is done"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "slingr-dev-portal"
toc: true
weight: 4
---
Pricing of the platform is done by app. Each app will generate a subscription, which could be associated to any
of the three products we have:

- `Slingr Free`: these apps are free and won't generate any charge.
- `Slingr Dev`: these apps have a fixed monthly fee. [You can check the pricing here](https://www.slingr.io/pricing).
- `Slingr Pro`: these apps will be charged based on the usage. The more environment, instances, endpoints, etc., the
  more you will pay. [Please check the pricing here](https://www.slingr.io/pricing) for more details.
  
It is important to notice that even though in the website you see monthly prices, we bill hourly. This means that
what you pay at the end of the month won't be exactly that, but similar. This is a benefit for you, because you will
pay exactly what you use. For example you need to spin up an app in order to do some tests. With our pricing schema
you could create one app, do the tests you need, and then delete it, and you will be charged only by the time you
used it.

Keep in mind that Slingr offers other services like support and professional services that are out of the scope
of the platform billing. You can check them out in the [Slingr website](https://slingr.io).
