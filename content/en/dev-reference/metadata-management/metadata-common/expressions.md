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

## **Expressions in Slingr**

Expressions in Slingr consist of sets of conditions that can be grouped using **`AND`** and **`OR`** operators. These expressions can be evaluated against a record, resulting in a **`true`** value if the record matches the expression, and **`false`** if it doesn't.

Moreover, these expressions can be easily translated into database queries, making them particularly useful when you need to retrieve all records that match a specific expression.

While in many cases, expressions can be replaced by scripts (with that option being available when applicable), it is recommended to define your conditions using expressions for several reasons:

- **`Maintainability`**: Expressions are automatically refactored whenever fields are modified, eliminating the need for manual adjustments in most instances.
- **`Usability`**: Expressions can be created using the UI, offering a more intuitive and user-friendly experience.
- **`Database queries`**: For many scenarios, expressions can be directly applied to the database. In cases where queries are necessary, you won't be able to use scripts (such as for access permissions).

Expressions are associated with a target entity, which contains the records against which the expression is evaluated. They comprise a set of conditions that can be organized using **`AND`** and **`OR`** groups.

Each filter within an expression has the following attributes:
- **`Target field`**: This refers to a field in the target entity that will be filtered, except in cases of **`By user value`**.
- **`Operator`**: Used to filter the field (available operators depend on the field type).
- **`Value`**: The filtering value, which can be hard-coded (**`By value`** or **`By user value`**), obtained from a field in a record (**`By record field`**), or taken from a field in the user extended fields record (**`By user field`**).

Complex expressions can be built by combining groups and conditions. For instance, an example expression could look like this:

```
- AND
  - By value: type = 'a'
  - OR
    - By value: state = 'inactive'
    - By value: name like 'test'
```
<br>

Expressions are a versatile concept used in various contexts within the app definition. Paying close attention to the context is essential to understand the target entity and the potential source entity (in conditions of type **`By record field`**).

For instance, consider the following scenarios:
- In a **`By value`** condition for read/write access in an entity field, the target entity will be the entity housing the field.
- If the condition is of type **`By record field`** in the filter of a relationship field, the target entity will be the entity that the relationship points to, while the source entity will be the entity with the relationship field.

## **Groups**

### AND 

All elements within an **`AND`** group must evaluate to **`true`** for the group itself to evaluate to **`true`**. If one or more elements within the group evaluate to **`false`**, the entire group will be considered **`false`**. It's possible to have nested **`OR`** groups inside an **`AND`** group.

### OR 

For an **`OR`** group to evaluate to **`true`**, at least one element within the group must evaluate to **`true`**. If all elements within the group evaluate to **`false`**, the group will be evaluated as **`false`**. Similar to **`AND`** groups, it's possible to have nested **`AND`** groups inside an **`OR`** group.

## **Conditions**

Conditions within expressions have the following structure:

```
Target Field - Operator - Value
```
<br>

For example:

```
type - Equals - 'a'
```
<br>
The different types of conditions are distinguished by how the `Value` is set. It can be:
- Hard-coded (`By value` or `By user value`)
- Obtained from a field in a record (`By record field`)
- Obtained from a field in the user extended fields record (`By user field`)

Understanding how these conditions work with multi-valued fields or many values is crucial.

- When the target field is single-valued and there are multiple values, if any of the values match the value of the target field, the condition evaluates to **`true`**.
- When the target field is multi-valued and there's only one value, if that value matches any of the values of the target field, the condition evaluates to **`true`**.
- When the target field is multi-valued and there are multiple values, if any value matches any of the values in the target field, the condition evaluates to **`true`**.

### By value

In this condition type, the value is hard-coded. Depending on the selected operator, you can specify one or more values.

### By record field

Here, the value is obtained from a field in a record (the **`Source field`**).

For instance, in configuring filters for a relationship field, you might filter records of the target entity based on the **`type`** field, which should equal the value of the **`companyType`** field in the source record. This dynamic filtering ensures that the results differ from record to record.

### By user field

User conditions rely on the [User extended fields]({{<ref "/dev-reference/app/settings.md">}}) feature, which must be enabled in the app before using this condition type.

In this case, the value is obtained from the field in the user extended record (the **`Source field`**) of the current user. Thus, these conditions work when there's a current user with an associated user extended fields record; otherwise, the condition evaluates to **`false`**.

For example, the **`companies`** field in the user extended fields entity could indicate the companies users work for. With a **`tasks`** entity featuring a **`company`** field, you could ensure that users only see tasks for companies they work for by applying a **`By user field`** condition in the permissions.

### By user value

This filter combines the characteristics of **`By user field`** and **`By value`**. The value is hard-coded as **`By value`**, but the **`Target field`** belongs to an entity configured in the [User extended fields]({{<ref "/dev-reference/app/settings.md">}}).

#### Operators

The operation determines how the field is filtered. Available operations depend on the field type defined in **`field`**. Possible operations include:

- **`equals`**: Equivalent to an **`any`** condition, tests if any element of the current value is in the filter value.
- **`notEquals`**: Equivalent to a **`not in`** condition, tests if the current value is not in the filter value.
- **`like`**: Similar to **`equals`**, but matches partial values.
- **`between`**: Specifies a range where the current value should lie.
- **`greater`**: Equivalent to the math operator for number types.
- **`greaterOrEquals`**: Equivalent to the math operator for number types.
- **`less`**: Equivalent to the math operator for number types.
- **`lessOrEquals`**: Equivalent to the math operator for number types.
- **`empty`**: The current value must be **`null`** or an empty list.
- **`notEmpty`**: The current value must not be **`null`** and not an empty list.

## **Query format**

Expressions can also be represented in query language, which is useful when passing expressions in scripts. For instance:

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
<br>

The way to map filters is by utilizing the **`field name`** and the **`value`** to filter for. Within the **`value`** section, an operation can be specified. The available operations are contingent on the field type defined in **`field`**. These include:

- **`equals`**
- **`notEquals`**
- **`like`**
- **`between`**
- **`greater`**
- **`greaterOrEquals`**
- **`less`**
- **`lessOrEquals`**
- **`empty`**
- **`notEmpty`**
- **`currentUserField`**

For a deeper understanding of the query language and the valid operators, please refer to the documentation on [Complex Query Language]({{<ref "/dev-reference/queries/query-language.md#complex-queries">}}).
