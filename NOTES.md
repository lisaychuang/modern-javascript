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


