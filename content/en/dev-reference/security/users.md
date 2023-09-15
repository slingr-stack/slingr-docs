---
title: "Users"
lead: "Management of users in the app. Groups and permissions. Identity providers."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 40
---

To access the app, whether through the UI or the REST API, you must possess a valid user account created within the app. Alternatively, you can create an account through an [Identity Provider]({{<ref "/dev-reference/security/single-sign-on.md">}}).

User records are maintained within the system entity **`System > Users`**. This entity is generated and managed by the platform. While the metadata associated with this entity cannot be altered, it can be extended through custom configurations such as entity fields and actions.

User management can be performed from various locations. In the app builder, user management is available under **`Security > Users`**. Within the app monitor, this function resides in the **`Users`** section. Additionally, during app runtime, users with sufficient permissions can manage users using the **`Manage Users`** menu item in the secondary menu.

User permissions and authentication settings are determined by the groups to which they belong. For further insights, please refer to the documentation on [Groups]({{<ref "/dev-reference/security/groups.md">}}).

## **User settings**

The following system user fields are created by default. Furthermore, custom fields can be created within this entity.

### First name

Refers to the user's first name.

### Last name

Represents the user's last name.

### Email

Denotes the user's email address. This email must be unique within the app, and notifications will be dispatched to this address. Therefore, it's imperative to ensure the email provided is valid.

It's worth noting that certain identity providers might utilize the email address for user identification.

### Send welcome email

This flag is exclusively available during the creation of a new user. When activated, a notification containing login instructions is dispatched to the user.

### Authentication

This section pertains to settings associated with user session authentication.

#### Password

This refers to the password utilized by the user to log in using the default Slingr identity provider.

When creating a new user, the **`Generate Password`** flag can be selected to automatically generate a password.

#### Two-Factor authentication

Two-Factor Authentication adds an extra layer of security, necessitating not just a password and username, but also a unique piece of information known solely to the user. This could be a physical token, for instance.

Users can activate this feature within their own profiles by scanning the QR code generated using Google Authenticator on their mobile devices. Additionally, a phone number is required to enable SMS-based recovery of the authentication code, in case the user changes their mobile device.

### Groups

This section displays the groups to which the user belongs. Each user must have one and only one primary group.

### Identity providers

This section showcases the identity providers configured for the user. You can add or remove identity providers, and also modify the external ID associated with each provider.

It's important to be aware that some identity providers might be configured for automatic addition to a user. For more details, consult [Single Sign-On]({{<ref "/dev-reference/security/single-sign-on.md">}}).

## **Operations**

### Reset password

In the event of a user forgetting their password, this operation can be employed to reset it. A temporary password will be generated and sent to the user, who will be prompted to change it during their first login.

### Deactivate

This operation renders a user account inactive. An inactive user cannot log in or access the app, but their account information remains intact.

### Activate

Reactivates an inactive user account, granting them access to the app once again.

