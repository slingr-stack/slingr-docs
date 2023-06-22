---
title: "Validation rules"
lead: "Description of the flow designer's validation rules."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 82
---
There are some rules that must be followed to successfully save a flow. If one of these rules are not followed after pressing the `Apply` or `Save` button, you will get a validation error notification and changes won't be saved.

### Validation rules:

- The flow **name** must be unique in the app.
- Each step **name** must be unique in the flow.
- `Start` step and at least one `End` step are mandatory.
- `Start` step should be unique.
- Inputs need to pass their own validation rules.
- Outputs need to pass their own validation rules.
- There can not be steps without any connection except for the `Context step` and expanded version of `subflows`.
- Outside of group containers: every step except for `Start` and `End` steps should be source and target of at least one connection.
- Inside of group containers: there can only be one step that is no target of a connection. This will be the initial step in the flow execution within the group.


