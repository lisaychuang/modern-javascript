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

Note: [MDN Scope cheatsheet](https://developer.mozilla.org/en-US/docs/Archive/Web/Scope_Cheatsheet)

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

- Good practice: always use named functions to make debugging easier!
- You can invoke a function just with (), e.g.

```
EXAMPLE:
function add(a, b) {
    return a + b;
};

add(3,4)  // 7
```

- You can also invoke a function using ```.call()```, where the 1st argument passed becomes the *lexical scope*, which becomes ```this``` within function scope

```
EXAMPLE:

function printUser(message) {
    console.log(`${this.name}(${this.id}): ${message}`);
};

let user = {id: 12, name: 'Mike'};          // user == lexical scope

printUser.call(user, 'Welcome!');           // Mike(12): Welcome!
```

- You can also invoke a function using ```.apply()```, this is similar to ```.call()``` except that arguments are passed as an *array*

```
EXAMPLE:
function printUser(message) {
    console.log(`${this.name}(${this.id}): ${message}`);
};

let user = {id: 20, name: 'Mike'};

printUser.apply(user, ['Welcome!']);        // Mike(20): Welcome!
```

Note: Read up on [.bind() method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) and [Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

#### ARROW FUNCTIONS

- ES2015 new shorthand for function, [MDN doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- Can be written in one-line, no {} needed to define a block, and implies return of expression
- Passes along *lexical scope* to the function as defined
- Idea borrowed from functional programming!

```
EXAMPLE:

User.prototype = {
    posts() {
        //Creating a filter, where post user is current user

        let f = (p) => p.userId === this.id;  
        return POSTS.filter(f);
    }
};
```

#### HIGHER ORDER FUNCTIONS
- A *higher order function* must meet at least 1 of the following conditions:
    1. Return a function
    2. Take a function as an argument
- HOF preserve the scope as they are defined, including arguments
- Examples: ```.map(), .reduce(), .filter()```

NOTE: Read this article [A dirt simple introduction to higher order functions in JavaScript.](https://medium.com/humans-create-software/a-dirt-simple-introduction-to-higher-order-functions-in-javascript-b33bf9e19056)

#### RECURSION
- ES2015 feature:  functions that invoke themselves
- Tail-call optimization: ensuer that the last action in a function ia a *pure invocation of itself* - same overhead as a ```For Loop``` algorithm
- Don't iterate over 50x!

```
EXAMPLE:

function factorial(x, soFar = 1) {
    if (x === 0) return soFar;
    return factorial(x - 1, x * soFar);
}
console.log(factorial(5));
```

NOTE: Read this article [Recursion in Functional JavaScript](https://www.sitepoint.com/recursion-functional-javascript/)

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

### PROTOTYPES
- Instances share state with prototype
- Properties can exist on prototypes or instances
- Use ```hasOwnProperty``` to determin if the property belongs to Instance / Prototype

### ARRAYS
- Use spread operator ```...``` to pass an array as multiple arguments

```
EXAMPLE:

let movie = ['Star Wars', 'A New Hope'];
series = [...movie, 1977];              // ['Star Wars', 'A New Hope', 1977]

function printMovie(series, title, yr) {
    console.log(`${series.toUpperCase()}: ${title} (${yr})`);
}

printMovie(...series);                  // STAR WARS: A New Hope (1977)
```

- Use rest operator 
- Modify array with ```.push(), .pop(), .unshift(), .shift(), .splice(), .slice()```
- Inclusion check with ```.indexOf()```
- Check if all items in array meets defined condition with ```.every()```
- Check if any items in array meets defined condition with ```.some()```

#### ARRAY.REDUCE 
- Iteratively loops through an array, returning 1 value ```.reduce()```
- First argument: a callback function, returning an accumulator value
- Second argument: initial value of an accumulator
- User ```.reduceRight()``` to iterate from right to left
```
EXAMPLE: 
let sum =
    [1, 2, 3].reduce((acc, item) => {
    return acc + item;
    }, 0);

console.log(sum);           /// 6
```