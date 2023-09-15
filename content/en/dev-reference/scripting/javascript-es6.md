---
title: "Javascript ES6"
lead: "Describes features, examples and limitations of the ES6 implementation"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "dev-reference"
toc: true
weight: 75
---

## **Overview**

With the recent library version update, our library now supports approximately 40% of ES6 features. In this section, we will provide simple and well-tested syntax examples for some key features. Additionally, you can find a developer reference from the Rhino Library for more detailed information about these and other supported features.

## **Tested features**

### Farewell to semicolons!

Our new version implements ASI (Automatic Semicolon Insertion). This means you can now bid farewell to manually adding semicolons at the end of each line.

### Let

The **`let`** keyword enables you to declare variables that are scoped to the block statement or expression in which they are used.

```js
let foo = 'test'
if (true){
    let foo = 'test2'
    log(foo)
}
log(foo)
```
<br>

### Const

When you declare a variable using **`const`**, it signifies that the identifier cannot be reassigned. This ensures that the value associated with this identifier remains constant and won't change during its lifetime.

```js
const PI = 3.14
log(PI)
```
<br>
    
### Map

Map objects are collections of key-value pairs.

```js
let userRoles = new Map()
userRoles.set('john', 'admin')

log(userRoles.get('john'))
```
<br>

### For of

The **`'for...of'`** loop allows you to iterate through a data collection with a simple and intuitive syntax. It provides a convenient way to traverse iterable objects like arrays, sets, and more.

In the example below, we demonstrate its usage with a Set, which is also a notable feature:

```js
let chars = new Set(['a', 'a', 'b', 'c', 'c'])

for (let char of chars.values()) {
log(char)
}
```
<br>

### String templates

String templates, also known as template literals, enable you to create strings with embedded expressions. They provide a more convenient and readable way to construct strings.

With string templates, you can easily interpolate variables and expressions directly into your strings, making the process of string building simpler and cleaner. Here's a basic example:

```js
let name = 'Slingr'

let message = `Hello ${name}!!!`

log(message)
```
<br>

### Multi-line strings

In pursuit of more legible code, ES6 introduces support for multi-line strings. You can now create strings that span multiple lines without resorting to cumbersome concatenation methods.

Here's how you can declare a multi-line string:

```js
let string = `This is a test,     
            For multi line Strings`

log(string)
```
<br>

### Destructuring assignment

Destructuring assignment allows you to unpack values from arrays or properties from objects in a concise and expressive manner.

Here's a brief example of how destructuring assignment works:

```js
let person = {name: "John", age: 28}
let {name, age} = person

log(name)
log(age)
```
<br>

### Enhanced object literals

Enhanced object literals provide a concise and expressive way to define and group variables into objects. They enhance the readability and writability of your code.

Here's a simple example of enhanced object literals in action:

```js
function getMobile(manufacturer, model, year) {
return {
  manufacturer,
  model,
  year
}
}
var mob = getMobile("Samsung", "Galaxy", "2020")

log(mob.manufacturer)
log(mob.model)
log(mob.year)
```
<br>

### Function* (generator function)

ES6 introduces generator functions, denoted by the **`function*`** syntax. These functions enable you to define generator objects, which can yield values one at a time, providing more fine-grained control over iteration.

Here's a basic example of a generator function:

```js
function* generator(i) {
yield i
yield i + 10
}
const gen = generator(10)

log( gen.next().value)
log( gen.next().value)
```

## **Rhino's developer reference**

As mentioned earlier, Rhino does not provide full support for ES6 features. Consequently, certain ES6 functionalities may behave unexpectedly or may not be fully supported.

In such cases, we recommend consulting the [Rhino ES6 Support](https://mozilla.github.io/rhino/compat/engines.html) documentation to identify whether any unexpected behavior arises from the library's limitations.

When referencing the Rhino documentation, please be aware that we are utilizing Rhino version 1.7.14 and are sending the **`VERSION_ES6`** flag. This flag facilitates the process of pinpointing the specific feature you need to examine for compatibility or potential limitations.
