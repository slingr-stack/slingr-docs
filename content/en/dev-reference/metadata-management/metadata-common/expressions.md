---
title: "Building expressions"
lead: "Describes how to build and use expressions."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 9
---

Expressions are a set of conditions that can be grouped in different ways using `AND` and 
`OR` operators. These expressions can be evaluated against a record, which will return
`true` if the record matches the expression or `false` otherwise.

Additionally these expressions can be easily converted to queries in the database, so they
are used when we need to fetch all records that match the expression.

Expressions could be replaced by scripts in most of the cases (and you will have the option 
when that's possible), but if you can define your conditions using expressions it is recommended
to do so for the following reasons:

- **Maintainability**: they are automatically refactored when fields are modified, so you don't
  have to worry in most cases.
- **Usability**: expressions can be created using the UI, which is more intuitive and easier
  to master.
- **Database queries**: most expressions can be applied directly to the database, so you will
  see that in cases where queries are necessary, you won't be able to write scripts (like
  access permissions).

Expressions point to a target entity, which is the entity that contains the records the
expression can be evaluated against. They basically have set of conditions than can be organized 
using `AND` and `OR` groups.

Each filter has a reference to a field in the target entity (the `Target field`) which is the
field that is going to be filtered (except `By user value`, see below), an `Operator` used to filter the field (available operators
depends on the type of the field), and a value used to filter. The value used to filter could
be hard-coded (`By value` or `By user value`), it could come from a field in a record (`By record field`) or from
a field in the user extended fields record (`By user field`).

You can combine groups and conditions to build complex expressions. For example it could be 
something like this:

```
- AND
  - By value: type = 'a'
  - OR
    - By value: state = 'inactive'
    - By value: name like 'test'
```

Expressions are a generic concept that is used in several places in the app definition. For 
that reason it is very important to pay attention to the context to understand what's the target
entity and what could be the source entity (in conditions of type `By record field`).

For example, in a `By value` condition in a read/write access in an entity field, the target entity
will be the one holding the field. On the other hand, if the condition is of type `By record field` 
in the filter of a relationship field, the target entity will be the entity the relationship points 
to while the source entity is the entity holding the relationship field.

## Groups

### AND

All elements inside this group need to evaluate to `true` to make the group itself
evaluate to `true`. If one or more elements evaluate to `false`, then the whole group will
be evaluated as `false`.

It is possible to have `OR` groups inside `AND` groups.

### OR

Any element inside this group needs to evaluate to `true` to make the group itself
evaluate to `true`. If all elements evaluate to `false`, the the group will be evaluated
as `false`.

It is possible to have `AND` groups inside `OR` groups.

## Conditions

Conditions have the following form:

```
Target Field - Operator - Value
```

For example:

```
type - Equals - 'a'
```

The difference between the types of conditions are how the `Value` is set. It could be
hard-coded (`By value` or `By user value`), it could come from a field in a record (`By record field`) or from
a field in the user extended fields record (`By user field`).

It is important to understand how it works when there are multi-valued fields or many values.

When the target field is single-valued and there are many values, if any of the values matches the
value of the target field, the condition will evaluate to `true`.

When the target field is multi-valued and there is only one value, if the value matches any of 
the values of the target field, the condition will evaluate to `true`.
 
Finally, when target field is multi-valued and there are many values, if any of the values
matches any of the values in the target field, the condition will evaluate to `true`.

### By value

In these type of conditions the value is hard-coded. Depending on the selected operator it will
be possible to specify one or more values.

### By record field

In this case the value will be obtained from a field in a record (the `Source field`).
 
For example, when configuring filters of a relationship field, you could filter records of
the target entity by saying that their field `type` should be equals to the value of the
`companyType` field in the source record instead of providing a hard-coded value. This way
the results of the filter will be different from record to record as the value of `companyType`
could be different.

### By user field

User conditions are based on the [User extended fields]({{site.baseurl}}/app-development-app-settings.html#user-extended-fields)
feature, so it must be enabled in the app before using this type of condition.

In this case the value will be obtained from the field in the user extended record (the `Source field`)
of the current user. This means that these conditions will only work when there is a current user set 
and there is a user extended fields record associated to it when the condition is evaluated, otherwise
this condition will evaluate to `false`.
 
For example you could have the field `companies` in the user extended fields entity that
indicates for which companies users work for. Then there could be a `tasks` entity with a
`company` field. If you want that users only see tasks for companies they work for, you could
add a condition `By user field` in the permissions for the `tasks` entity where the target field is 
`company` and the source field is `companies` (in the user extended fields entity). 

### By user value

This filter is a mix between `By user field` and `By value`. Here, value is hard-coded as `By value`, but 
the `Target field` belongs to entity configured into [User extended fields]({{site.baseurl}}/app-development-app-settings.html#user-extended-fields).

#### Operation

It is the operation used to filter the field. Available operations depends on the type of the field defined in `field` 
(check docs for the type), but it could be one of these operations:

`equals`: equivalent to an `any` condition tests if the any element of current value is in the filter value

`notEquals`: equivalent to an `not in` condition tests if the current value is not in the filter value

`like`: similar to `equals` but matches partially every value

`between`: operator which defines two extremes of a range where current value should eb placed 

`greater`: exactly equivalent to math operator for number types

`greaterOrEquals`: exactly equivalent to math operator for number types

`less`: exactly equivalent to math operator for number types

`lessOrEquals`: exactly equivalent to math operator for number types

`empty`: the current value must be a `null` or empty list

`notEmpty`: the current value must be not `null` and not empty list

## Query format

Expressions can be represented with query language, which is useful when you need to pass expressions in scripts.
For example:

```js
// this is a simple query expression where field 'company' should be equals to 'GOOGLE'
{
  company: 'GOOGLE'
}

// this query expression is to filter by companies with 'type' in 'a' or 'b',
// or with 'numberOfPeople' greater or equals to 100
{
  _or: {
    type: ['a', 'b'],
    numberOfPeople: 'greaterOrEquals(100)'
  }
}

// this query expression is to filter companies by the related company to the logged user
{
  name: 'currentUserField(company.name)'
}
```
The way to map filters is using the `field name` and the `value` to filter for. Inside `value` we can put an operation.
Available operations depends on the type of the field defined in `field` (check docs for the type), but it could be one
of these operations:

- `equals`
- `notEquals`
- `like`
- `between`
- `greater`
- `greaterOrEquals`
- `less`
- `lessOrEquals`
- `empty`
- `notEmpty`
- `currentUserField`

To learn more about query language and the valid operators please check the docs for [Complex Query Language]({{site.baseurl}}/app-development-query-language.html#complex-queries).

