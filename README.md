# Rangen: Name

Rangen is a suite of random generators and procedural generation tools; rangen-name focuses on name generation.

## TL;DR

The lib provides you with 3 functions:

- the `generateFirstname()`: gets a random item from lists of common male or female firstnames
- the `generateLastname()`: uses a 3-step Markov Chain process to create a random (but plausible) surname
- the `generateFullName()`: combines a firstname and lastname (with the previous rules) to get a full name

## API

### Util constants

The lib has a list of useful constants you can use in the 3 core functions:

- `MALE`: "male"
- `FEMALE`: "female"
- `CASING_LOWERCASE`: "lowercase"
- `CASING_TITLE`: "title"
- `CASING_UPPERCASE`: "uppercase"

### `generateFirstname()`

Parameters:

- `sex`: determines if you want a male or a female firstname; can be "male" or "female"
  
  [default: CONSTANTS.FEMALE]
- `casing`: applies a specific casing to the generated value; can be "lowercase", "title" and "uppercase"
  
  [default: CONSTANTS.CASING_TITLE]

```js
const firstname = rangenName.generateFirstname({
  sex: rangenName.CONSTANTS.FEMALE,
  casing: rangenName.CONSTANTS.CASING_UPPERCASE
});
console.log(firstname);
// LORIANNE
```

## `generateLastname()`

Parameters:

- `maxLen`: maximum length for the generated surname
  
  [default: 10]
- `stopThreshold`: probability of stopping when the generated surname contains a known word-end
  
  [default: 0.75]
- `casing`: applies a specific casing to the generated value; can be "lowercase", "title" and "uppercase"
  
  [default: CONSTANTS.CASING_TITLE]

```js
const lastname = rangenName.generateLastname({
  maxLen: 15,
  stopThreshold: 0.35,
  casing: rangenName.CONSTANTS.CASING_LOWERCASE
});
console.log(lastname);
// truckler
```

## `generateFullName()`

Parameters:

- `sex`: determines if you want a male or a female firstname; can be "male" or "female"
  
  [default: CONSTANTS.FEMALE]
- `maxLen`: maximum length for the generated surname
  
  [default: 10]
- `stopThreshold`: probability of stopping when the generated surname contains a known word-end
  
  [default: 0.75]
- `casing`: applies a specific casing to the generated value; can be "lowercase", "title" and "uppercase"
  
  [default: CONSTANTS.CASING_TITLE]

```js
const fullname = rangenName.generateFullName({
  sex: rangenName.CONSTANTS.MALE,
  maxLen: 15,
  stopThreshold: 0.5,
  casing: rangenName.CONSTANTS.CASING_TITLE
});
console.log(fullname);
// Alice Whic
```
