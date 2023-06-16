---
title: "UI settings"
lead: "Detailed explanation of global settings of the UI."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---
These settings have a global impact in the UI of the app.

## Theme

It is possible to select between different themes that will change the styling of the app,
especially colors. By changing the theme all parts in the app will be updated to use it.

### Show icons

If it is disabled buttons and menu options does not show icons. This option is enabled by default.

## Header

### Show app logo

If set the logo of the app will be displayed on the header.

### Show app label

If set the label of the app will be displayed on the header and there will a new
setting called `Show app label in uppercase` that will let you decide if the name
should be converted to uppercase or just leave it as it is.

## Login

### Show default identity provider

If there are additional identity providers configured and you don't want the default one to
show up, you can unset this flag.

For example if you configure the identity provider for Slack and you don't want users to
see the button `Login with <app label>` button you should unset this flag.

If there aren't additional identity providers configured this flag doesn't have any effect.

### Show app logo

If set the logo should be displayed in login page.

### Show background image

If set the background image that was previously set in the developer portal should be displayed in the login page.



### Change login panel color

If set you can define the background color for the login page.

### Login panel opacity

Here you can set the opacity that the login panel is going to have. You can set a value between zero and one hundred.
