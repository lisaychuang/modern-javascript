# Modern Javascript training
### by [Mike North](https://github.com/mike-north), [Github repo](https://github.com/mike-north/modern-javascript)

[Course description:](https://mike.works/course/modern-javascript-437a5c3)

JavaScript is flexible enough to do just about anything, and while this is one of its great strengths, it's also what makes best practices less clear. This deep dive into the fundamentals and latest advances in the language will help you learn how to make the most of it!

### VARIABLE DECLARATIONS & SCOPE

#### VAR
- var declarations ARE NOT block-scoped
- "belong" to the function or global scope they're defined in
- Be mindful of hoisting! 
- Supported by all browsers

#### LET
- let declarations are block-scoped
- "belong" to the block scope they're defined in
- NOT hoisted
- supported in newer browsers

#### CONST
- const declarations must be initalized at the time of declaration
- can't be assigned again, after initial assignment
- NOT hoisted
- use with ```Object.freeze``` to make a const variable *IMMUTABLE*

Example: Freezing an object literal

```
const favoriteFoods = Object.freeze({
    fruits: ['apple', 'grape']
    });

favoriteFoods.fruits.push('pear');
console.log(favoriteFoods.fruits);  // [ 'apple', 'grape', 'pear']
```

### FUNCTION DECLARATIONS

- Functions are hoisted to top of block scope 
- function can be named or anonymous 

```
# Named function
function add(x,y) {
    return x + y;
};

# Anonymous function
function (x) {
    console.log(x);
};
```

Note: Read up on [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

### OBJECT LITERAL

- you can specify object prototype AT construction using ```_proto_```

```
let mike = {
    _proto_: MyObject.prototype,
    name: 'Mike',
    age: 34
};
```

- you can use dynamic properties within objects
- use ```super``` calls in functions/methods within an object

Note: Read up on [super calls](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)

- ES2015: destructuring assignment syntax to ''pluck' values or keys from objects / arrays

#### ES2018: ```rest``` & ```spread``` PROPERTIES! 

- rest: sugar for "and the rest go here" in destructuring syntax

```
Example:

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]
```

- spread: sugar for "and all the properties on this object" when defining a {}

```
Example: 
var parts = ['shoulders', 'knees']; 
var lyrics = ['head', ...parts, 'and', 'toes']; 
// ["head", "shoulders", "knees", "and", "toes"]
```

Note: Read up on [Rest/Spread properties](https://github.com/tc39/proposal-object-rest-spread)

#### GETTER & SETTER
- ```get``` syntax binds an object property to a function that will be called when that property is looked up. [MDN doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)

- ```set``` syntax binds an object property to a function to be called when there is an attempt to set that property. [MDN doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)

#### PROPERTY DESCRIPTORS

- ```Object.defineProperty()``` can be used to create or modify properties on objects.

*Accessor descriptor:*
- get
- set

*Data descriptor:*
- value (set default value)
- writable (boolean value)

*Both accessor * data descriptor*
- configurable (boolean option)
- enumerable (boolean option)

### MODULES

- We can break JS file into many files, also referred to as modules
- Modules can have 1 or mroe *named exports*, which can be imported into other files
- Named exports can be "renamed" within the new file, via the ```as``` keyword

```
Example:

// my-module.js

const MY_CONSTANT = 42;

export function namedThing() {
    return MY_CONSTANT;
}

// index.js

import { namedThing } from './my-module';

console.log(namedThing());          // 42
```

- Modules can have 1 *default export*
- When importing the default export, we don't need to use {}

```
EXAMPLE:
// counter.js

export default {
    _count: 0,
    next() {
        return this._count!+;
    }
}

// index.js

import counter from './counter';

console.log(counter.next());        //0
console.log(counter.next());        //1
```

- You can export all variables / functions in a single .js file with *Namespace exports*
- We must ```alias``` this export using the ```as``` keyword

```
EXAMPLE:

// colors.js
export const RED = '#f00';
export const GREEN = '#0f0';
export const BLUE = '#00f';

// index.js

import * as COLORS from './colors';
console.log(COLORS.RED);            // #f00
console.log(COLORS.GREEN);          // #0f0
```

