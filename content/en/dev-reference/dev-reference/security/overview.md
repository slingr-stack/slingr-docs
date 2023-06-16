---
title: "Security"
lead: "Overview of the security features available for apps on Slingr."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
---


Slingr provides features for authentication and authorization of users.

For authentication it is possible to define rules for password, maximum login attempts,
restrictions by IP, as well as the usage of different identity providers to support
single sign on (SSO) through SAML or Slack for example.

On the side of authorization it is possible to define fine-grained permissions for
entities, fields, actions and views. It is a very flexible approach that allow to
indicate with precision what information a user can manage and what can be done.

Most security settings are configured in groups. Then users can belong to one or more
groups (one of them must be the primary group), which will define which are the permissions
for the user. For example if group `G1` has permissions for entity `E1` and group `G2` has
access to entity `E2`, if the user belongs to groups `G1` and `G2` he will be able to
access entities `E1` and `E2`.

Settings password rules and policies are based on the primary group.

All permissions are enforced at the UI level as well as the REST API level. This way
you can be sure data will be safe from inappropriate access. However remember that
permissions are **not** validated in scripts. This is because developer is responsible 
of making sure that scripts don't do anything that is not allowed.

Please check the documentation for groups, identity providers and users:

- [Groups]({{site.baseurl}}/app-development-security-groups.html)
- [Users]({{site.baseurl}}/app-development-security-users.html)
- [Single sign on]({{site.baseurl}}/app-development-security-single-sign-on.html)

