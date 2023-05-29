---
title: "Single sign on"
lead: "Explanation of what are identity providers. Description of each supported identity provider."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---

Identity provides allow users to login into your app without having to sign up. Instead they can use
an existing account in one of the supported identity providers.

For example, if you enable Slack as an identity provider, a user with a Slack account will be able
to sign into your app with that user (of course you can define some settings to restrict who can do
it).

Below are the supported identity providers.

## Common options for all identity providers

These options are available to all identity providers.

### Label

This is what the button in the login page will say. Usually you will want to have something like
`Login with Slack!` so the user understands it is possible to login using Slack credentials.

### Name

This is the internal name of the identity provider. It cannot hold special characters or spaces.

If you were using the name of the identity provider in scripts or the REST API, you might need
to make some manual adjustments if you change the name.

### Icon

This is the icon that will be displayed in the button in the login screen.

It should be square and at least 64x64 is recommended.

### Allow to create user

If this flag is set and a user without an account tries to sign in using the identity
provider, a new user will be created in the app.

If this flag is unset, then the user must already exist in the app.

### Allow to update user data

If this flag is set, when a user signs in through the identity provider, the information
of the user will be updated using what's coming from the identity provider. Otherwise
once the user is created, access will be given but the user won't be modified at all
in the app.

### Allow to add provider

If this flag is set, when a user tries to sign in through the identity provider but
it is not configured as one of the valid identity providers for the user, it will be
added automatically.

If this flag is unset, you must manually allow the identity provider to the user.

## Slack

The Slack identity provider allows Slack users to login to your app.

### Allow to login with any team

Indicates which Slack users can login. If this flag is set, any user will be able to do it.
If not, then it is possible to define a list of teams that will be allowed. Here you need
to put the team id, not the domain.

In order to get the **team id** you can use the [Web API](https://api.slack.com/methods/auth.test/test) 
set the request token in **Extra args** like `token=XYZ123`. For more information about how obtain a token read 
[Legacy tokens](https://api.slack.com/custom-integrations/legacy-tokens) from official documentation.

### Use default Slack application

If you don't want to go through the process of creating a Slack application, you can use the
default one provided by Slingr.

The main reason to create your own Slack application is that you can setup your logo and app
name there so when users sign in with Slack they will see your app requesting permissions.

If you decide not to use the default Slack application your will need to provide the following
settings:

- `Client ID`: this is the client ID of the Slack application to use.
- `Client secret`: this is the client secret of the Slack application to use.
- `Redirect URI`: this is the URI you need to configure in your Slack application.

For more information about how to create a Slack application, please check the documentation
at [Getting started with Slack apps](https://api.slack.com/slack-apps) and 
[Sign in with Slack](https://api.slack.com/docs/sign-in-with-slack). Remember that you just
need to create the app and copy the settings. The button to sign in is already implemented
in Slingr!

### Default group

If it is allowed to create users when signing in through this identity provider, when the new
user is created it will be assigned to this group by default.

## Veritone

The Veritone identity provider allows Veritone aiWARE platform users to login into a Slingr app.

### Configure application in Veritone aiWARE platform side
First, it is required to register the Slingr app in Veritone side. The following settings have to be configured:

- `Application label`: the used label for the Slingr app.
- `URL`: the URL of the Slingr app. The standard is: `https://<appName>.slingrs.io`.
- `OAuth2 Redirect URL`: The redirect URL in Slingr side in which the access code will be received. The standard is: 
`https://<appName>.slingrs.io/<environment>/runtime/api/sso/<providerName>/consumer`.

There are some other optional additional settings like `Application Description` and `Icon` that can be specified.

For more information about how to create a Veritone aiWARE application, please check the documentation
at [Veritone aiWARE docs](https://docs.veritone.com/).

### Configure identity provider in Slingr app side
After registering the app in Veritone side, an `ID` and `OAuth2 Client Secret` will be provided. By using those settings it
is necessary to create a identity provider record in the Slingr app with the following settings:

- `API URL`: this is the API URL to perform authentication. The production URL is `https://api.veritone.com`.
- `Client ID`: this is the client ID of the Veritone application to be used during the single sign on flow.
- `Client secret`: this is the client secret of the Veritone application to be used during the single sign on flow.
- `Default group`:  when a new user is created it will be assigned to this group by default if user roles information 
is not provided.

### Users management
It is allowed to create/update users when signing in through this identity provider. The following user attributes are going 
to be synchronized between Slingr and Veritone: `id`, `first name`, `last name`, `email` and `roles`.

After configuring app settings in Slingr a button to sign in is going to be automatically displayed in the login page of the app.

## SAML

SAML is an open-standard data format for exchanging authentication and authorization data between
parties (see [Security Assertion Markup Language](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language)).

This is commonly used in corporate environments. This way you can keep managing users centrally
using your existing tools and your users can just jump to the Slingr app without having to login
again.

### Login URL

This is the URL to sign in. It must be provided by the SAML identity provider.

### Change password URL

This is the URL t change the password of a user. It must be provided by the SAML identity provider.

### Certificate

This is the certificate to validate tokens are valid. Just copy the content of the certificate
as it is.

It must be provided by the SAML identity provider.

### Synchronize only external groups

If this flag is set, only groups added by the identity provider in the past will be synced. For example
if the user belongs to group `A`, `B` and `C`, but only `C` was added by the identity provider, then if the 
identity provider sends group `D` for that user, groups `A` and `B` won't be removed as they were not added 
by the identity provider.

### Attribute mapping

This indicates how the mapping of attributes from the identity provider to the user should be done.

If you select the default mapping, we will assume the following attributes are present:

- `userId`: immutable ID from identity provider. This will be set as the external ID of the user for 
  this identity provider.
- `userEmail`: email of the user in the identity provider.  
- `userFirstName`: first name of the user in the identity provider. 
- `userLastName`: last name of the user in the identity provider. 
- `userGroups`: groups that user belongs to in the identity provider. It is a list of group names
  separated by comma. 

If you decide to provide a custom mapping, here is the context of the script:

{{< js_script_context context="samlAttributesMappingScript">}}
