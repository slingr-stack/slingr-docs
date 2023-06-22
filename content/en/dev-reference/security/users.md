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


In order to use the app (either through the UI or the REST API) you must have a valid user created
in the app (or create one through an [Identity provider]({{site.baseurl}}/app-development-security-single-sign-on.html)).

Users records are hold by the system entity `System > Users`. This entity is created and managed by the platform. Metadata
generated for this entity can not be changed but it can be extended by adding custom configuration like entity fields 
and actions. 

Users can be managed from different places. In the app builder you can manage user in section 
`Security > Users`, in the app monitor this can be done in section `Users`, while in the app runtime it
is also possible to manage users for users with enough permissions using the menu item `Manage users`
in the secondary menu.

Permissions and authentication settings for users are based on the groups they belong to. Please check 
the documentation for [Groups]({{site.baseurl}}/app-development-security-groups.html) for more information.

## User's settings

The following system user fields are created by default. It is possible also to create custom fields in this entity.

### First name

The first name of the user.

### Last name

The last name of the user.

### Email

The email of the user. It must be unique in the app and notifications will be sent to this address,
so make sure it is a valid one.

Keep in mind that some identity providers might use the email address to match users.

### Send welcome email

This flag is only available when creating a new user. If set a notification will be sent to
the user with instructions to login.

### Authentication

Settings that are related to the authentication of user sessions.

#### Password

This is the password used by the user to login using the default Slingr identity provider.

When creating a new user it is possible to set the flag `Generate password` to generate
a password automatically.

#### Two factor authentication

Two Factor Authentication is an extra layer of security that requires not only a password and username but also something 
that only, and only, that user has on them, i.e. a piece of information only they should know or have immediately to hand 
- such as a physical token.

The user can enable this feature from its own profile and scan the QR code generated using Google Authenticator
from its mobile phone. Also the phone number is required in order to recover the code by SMS if user change its mobile. 

### Groups

These are the groups the user belongs to. There must be one and only one primary group.

### Identity providers

These are the identity providers configured for the user. It is possible to add or remove
identity providers as well as edit the external ID for each of them.

Keep in mind that some identity providers could be configured so they can be added automatically
to a user. See [Single sign on]({{site.baseurl}}/app-development-security-single-sign-on.html) 
for more information.

## Operations

### Reset password

If a user forgets its password it is possible to reset it using this operation. The temporary
password will be generated and sent to the user, who will need to change it during the first
login.

### Deactive

Makes a user inactive. An inactive user cannot login or use the app, but will still be there.

### Activate

Reactivates a user that is inactive.
