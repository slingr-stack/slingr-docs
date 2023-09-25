---
title: "App settings"
description: "Explanation of the global app settings."
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
  
## **Notifications**

In this section, you can customize notifications for welcome and password reset emails.

### Customize welcome email

If this flag is set, you will be able to customize the template that will be used to build emails sent to 
users when they sign up for the app (keep in mind that notifications could be avoided).

The template is essentially an HTML file that supports [Freemarker](http://freemarker.org/docs/dgui_quickstart_template.html)
directives, and you have the following variables available in the template:

- **`appLabel`**: the label of the app.
- **`appUrl`**: URL to the app runtime.
- **`firstName`**: the first name of the user who signed up.
- **`lastName`**: the last name of the user who signed up.
- **`fullName`**: the full name of the user who signed up.
- **`email`**: the email address of the user who signed up.
- **`plainPassword`**: this is the password generated for the user. This password is temporary.

Using the Freemarker syntax, you can merge these variables into the template like this:

```
<h3>Welcome ${fullName}!</h3>

<p>To login to ${appLabel} go to ${appUrl} and login with your credentials.</p>
```
<br>

Additionally, you can configure the **`From name`**, which is the sender's name users will see in their email
clients.

### Customize password reset email

If this flag is set, you will be able to customize the template that will be used to build emails sent to users when they reset their password.

The template is basically an HTML file that supports [Freemarker](http://freemarker.org/docs/dgui_quickstart_template.html) directives, and you have the following variables available in the template:

- **`appLabel`**: the label of the app.
- **`appUrl`**: URL to the app runtime.
- **`firstName`**: first name of the user who signed up.
- **`lastName`**: last name of the user who signed up.
- **`fullName`**: full name of the user who signed up.
- **`email`**: the email of the user who signed up.
- **`plainPassword`**: this is the password generated for the user. This password is temporary.

Using Freemarker syntax, you can merge these variables in the template like this:

```
<h3>Hi ${fullName}!</h3>

<p>Your password has been reset to ${plainPassword}. This is a temporal password you can use
to login at ${appUrl}</p>
```
<br>

Furthermore, you have the option to configure the **`From name`**, which dictates the sender's name that users will observe in their email clients.

## **Other settings**

### Initialization script

An initialization script is executed during the start-up process and after each cache clearance in the **`runtime`**. This script has access to the entire JS API; however, it operates independently (calling functions defined here is not possible).

The primary purpose of this feature is to enable the invocation of functions during the initialization of the metadata process in the **`runtime`**. For more comprehensive information on scripting using our API, refer to [this resource]({{<ref "/dev-reference/scripting/namespaces.md">}}).