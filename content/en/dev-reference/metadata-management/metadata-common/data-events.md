---
title: "Data events"
lead: "Describes how to define data events."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 10
---

Data events allow to define a set of rules that will match different events on records. For 
example you might have a rule to match when a record is deleted so you can do some clean up 
in an external system.

You can define many rules. If at least one rule matches the event, it will be considered that 
the event was matched.

All rules are always applied to only one entity, that has to be indicated in the `Entity` field.

Each rule has the following settings:

## Event

This is the type of the event the rule will match. Possible values are:
 
- `On record created`: this event is triggered when a record is created.
- `On record changed`: this event is triggered when a record is updated. Keep in mind that a record 
  could be updated by a human through the UI, an external app through the REST API, a script running
  in the background, etc. So be careful when you use this event because any change on the record will
  trigger this event.
- `On record deleted`: this event is triggered when a record is deleted.
- `On action performed`: this event is triggered when an action is executed over a record. 
- `On condition met`: this event is triggered when a record is changed in a way that the condition 
  (see below) is met and it wasn't met before updating the record. For example, if the condition is 
  that field `type` has to be `a`, if the record is updated and before it didn't have `a` in `type` 
  and now it does have that value, the event will be matched by the rule. If the record already had `a` 
  in `type` and the record is updated and the value is still `a`, the event won't be matched because 
  the condition was already met in the old version of the record.

## Condition

Apart from the event, you can define a set of conditions that should be met in order to match the
event. Options are:

- `None`: there are no conditions, so as long as the event is trigger, the rule will match.
- `Expression`: it is possible to define an expression that should evaluate to true in order for the
  event to be matched.
  See documentation of [Expressions]({{<ref "/dev-reference/metadata-management/metadata-common/expressions.md">}}) for more
  information.
- `Script`: allows to provide a script that should evaluate to true if the event should be matched.
  This is the context:


{{< js_script_context context="dataEventConditionScript">}}


## Actions

If `Event` is `On action performed` you will be able to select a list of actions that could be matched.

Notice that only actions of type `One record` can be selected. Actions of type `Many records` aren't
associated to any specific record so they can't be used here.
