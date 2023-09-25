---
title: "Security"
description: "Overview of the security features available for apps on Slingr."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 38
---

Slingr offers comprehensive features for user authentication and authorization.

## **Authentication**

Slingr provides the capability to establish authentication rules, including password policies, maximum login attempts, IP restrictions, and the utilization of different identity providers to facilitate Single Sign-On (SSO) via protocols such as SAML or Slack.

## **Authorization**

On the authorization front, Slingr empowers you to define granular permissions for entities, fields, actions, and views. This flexible approach allows for precise control over user privileges and operations.

The majority of security configurations are organized into groups. Subsequently, users can be assigned to one or multiple groups (with one designated as the primary group). These group assignments determine a user's permissions. For instance, if group **`G1`** possesses permissions for entity **`E1`** and group **`G2`** has access to entity **`E2`**, a user belonging to both **`G1`** and **`G2`** can access both entities **`E1`** and **`E2`**.

Password rules and policies are associated with the primary group.

All permissions are enforced not only at the UI level but also within the REST API, ensuring data remains shielded from unauthorized access. However, it's important to note that permissions are **`not`** validated within scripts. Developers bear the responsibility of ensuring that scripts operate within the bounds of allowed actions.

For detailed information regarding groups, identity providers, and users, please consult the following documentation:

- [Groups]({{<ref "/dev-reference/security/groups.md">}})
- [Users]({{<ref "/dev-reference/security/users.md">}})
- [Single Sign-On]({{<ref "/dev-reference/security/single-sign-on.md">}})

