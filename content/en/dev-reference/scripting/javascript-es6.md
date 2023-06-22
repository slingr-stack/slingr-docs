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

## Overview

Since the library version was updated, this can support about 40% of the ES6 features.
So we are gFoing to describe some simple well tested syntax examples of some relevant features,
and also you can find here a developer reference from Rhino Library, to get more details
about those and another supported features.

## Tested features

### Goodbye semicolons!

Our new version implements ASI (Automatic Semicolon Insertion), 
so now we can forget about using semicolons at the end of each line.

### Let

let allows you to declare variables that are limited to the scope of a block statement, 
or expression on which it is used.

```js
let foo = 'test'
if (true){
    let foo = 'test2'
    log(foo)
}
log(foo)
```

### Const

Declaring a const mean that the identifier can't be reassigned. So you can ensure that this value won't change.

```js
const PI = 3.14
log(PI)
```
    
### Map

Map objects are collections of key-value pairs.

```js
let userRoles = new Map()
userRoles.set('john', 'admin')

log(userRoles.get('john'))
```

### For of

The 'For of' allow you to loop through a data collection with a simple and intuitive syntax.
Note that in the example we are using a Set, which also is a new feature.

```js
let chars = new Set(['a', 'a', 'b', 'c', 'c'])

for (let char of chars.values()) {
log(char)
}
```

### String templates

This allows you to use simple templates in the Strings to make easier and cleaner the string building.

```js
let name = 'Slingr'

let message = `Hello ${name}!!!`

log(message)
```

### Multi-line strings

For a more legible code now we can use multi line strings.

```js
let string = `This is a test,     
            For multi line Strings`

log(string)
```

### Destructuring Assignment

This make it possible to unpack values from arrays or properties from objects.

```js
let person = {name: "John", age: 28}
let {name, age} = person

log(name)
log(age)
```

### Enhanced object literals

This is used to group variables into objects.

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

### Function* (generator function)

Now you can define a generator function, which returns a generator object.

```js
function* generator(i) {
yield i
yield i + 10
}
const gen = generator(10)

log( gen.next().value)
log( gen.next().value)
```

## Rhino's developer reference

As we said before, Rhino doesn't bring us full support of ES6 yet. So something may work on an unexpected way.
In that case you can check the [Rhino ES6 Support](https://mozilla.github.io/rhino/compat/engines.html) documentation to know if the unexpected behavior become from the library limitations.

When reading the Rhino's documentation, note that we are using the 1.7.14 version, and sending the VERSION_ES6 flag.
With that you can easily find the feature that you need to check.
