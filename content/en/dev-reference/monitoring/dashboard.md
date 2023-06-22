---
title: "Dashboard"
lead: "A brief explanation of the app monitor dashboard"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 147
---

In the dashboard of the app monitor you can take a quick look at the status of your app. By default it
will show what happened in the last hour, but you can change that to span a longer period of time.

There you will see:

- `API Calls`: this is the number of API calls. It is an important indicator to make sure nothing odd is
  going on. For example if you see that the number of API calls is dropped suddenly it probably means there
  is something wrong. The same if they spike.
- `Response time`: this information will show what's the response time of the app to API calls. If this
  number grows and stays high persistently, you probably need to add more instances to your app to take it
  to an acceptable value.
- `Jobs queue`: indicates how much time jobs have been waiting for execution. If this number goes up and
  it stays high, you might need to add more instances to your app.
- `Database`: here you can quickly see the total size used in your database. Useful in case you are close
  to the limit and you need to upgrade your database.
- `Errors`: the number of error found in the logs in the specified period of time.
- `Active users`: the number of active users in your app in the specified period of time.
- `Storage`: how many keys you have in your app storage.
- `Integrations`: here you can see the status of each of your endpoints with the number of events and
  functions processed and discarded. If you don't see any activity in your endpoint, it probably means
  there is an issue there.  

