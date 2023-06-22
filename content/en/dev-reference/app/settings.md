---
title: "App settings"
lead: "Explanation of the global app settings."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 13
---

These are global settings of the app found in the app builder under `App > Settings`.
  
## Notifications

In this section you can customize notifications for welcome and password reset email.

### Customize welcome email

If this flag is set you will be able to customize the template that will be used to build emails sent to 
users when they sign up in the app (keep in mind that notification could be avoided).

The template is basically a HTML file that supports [Freemarker](http://freemarker.org/docs/dgui_quickstart_template.html)
directives and you have the following variables available in the template:

- `appLabel`: the label of the app.
- `appUrl`: URL to the app runtime.
- `firstName`: first name of the user that signed up.
- `lastName`: last name of the user that signed up.
- `fullName`: full name of the user that signed up.
- `email`: the email of the user that signed up.
- `plainPassword`: this is the password generated for the user. This password is temporal.

Following Freemarker syntax you can merge these variables in the template like this:

```
<h3>Welcome ${fullName}!</h3>

<p>To login to ${appLabel} go to ${appUrl} and login with your credentials.</p>
```

Additionally you can configure the `From name`, which is the sender's name users will see in their email
clients.

### Customize password reset email

If this flag is set you will be able to customize the template that will be used to build emails sent to 
users when they reset their password.

The template is basically a HTML file that supports [Freemarker](http://freemarker.org/docs/dgui_quickstart_template.html)
directives and you have the following variables available in the template:

- `appLabel`: the label of the app.
- `appUrl`: URL to the app runtime.
- `firstName`: first name of the user that signed up.
- `lastName`: last name of the user that signed up.
- `fullName`: full name of the user that signed up.
- `email`: the email of the user that signed up.
- `plainPassword`: this is the password generated for the user. This password is temporal.

Following Freemarker syntax you can merge these variables in the template like this:

```
<h3>Hi ${fullName}!</h3>

<p>Your password has been reset to ${plainPassword}. This is a temporal password you can use
to login at ${appUrl}</p>
```

Additionally you can configure the `From name`, which is the sender's name users will see in their email
clients.

## Other settings

### Initialization script

This is a script that will be executed during start up process and after every clear cache in `runtime`. It can access
all JS API, but it is not part of it (not possible to call functions defined here).

The main idea is to allow call functions during initialization of metadata process in `runtime`. [To get more information
about scripting using our API check here]({{site.baseurl}}/app-development-js-api.html)
