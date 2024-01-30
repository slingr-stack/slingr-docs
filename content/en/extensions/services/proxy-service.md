---
title: "Proxy Service"
description: "Detailed description of how the proxy service works and its configuration."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "services"
toc: true
weight: 18

---

## **Overview**
This service acts as a proxy for an service running on your local server within the Slingr platform. It's primarily designed for service development. For more details, refer to the ["Create Your Own Service"]({{<ref "/extensions/services/create_your_own.md" >}}) section.

## **Configuration**

### Service URI
The service URI is the address at which both the external service and Slingr can locate your local service. This should be a public URL (you might need to set up port forwarding on your router). It should point to the TCP port specified by **`_webservices_port`** (default **`TCP port 10000`**). Alternatively, you can use [ngrok](https://ngrok.com/) for added convenience, which creates a secure tunnel to your localhost.

### Service Token
This token serves as a verification mechanism for validating messages sent to and received from the proxy service. While we recommend using the auto-generated token, you have the option to modify it if needed. This token will be part of your local service configuration (see below).

### Local Service Configuration
Here is the fundamental configuration that should be applied to your local service. Consult the SDK documentation you're using to find out where this configuration needs to be placed.

## **Javascript API**
The Javascript API is determined by the functions and scripts within your service. To understand the range of possibilities, please review the ["Service Features"]({{<ref "/extensions/services/common.md" >}}) section.

## **Events**
Events are specified within your service's configuration file. For more details, refer to the ["Service Features"]({{<ref "/extensions/services/common.md" >}}) section.

