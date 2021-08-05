# Rangen: Name

Rangen is a suite of random generators and procedural generation tools; rangen-name focuses on name generation.

## TL;DR

The lib provides you with 3 functions:

- the `generateFirstname()`: gets a random item from lists of common male or female firstnames
- the `generateLastname()`: uses a 3-step Markov Chain process to create a random (but plausible) surname
- the `generateFullName()`: combines a firstname and lastname (with the previous rules) to get a full name

### Installing via NPM

You can install it via NPM (or Yarn):

```
npm install @mpecheux/rangen-name

# or
# yarn add @mpecheux/rangen-name
```

In a Node context, you can then import the package using the `require` keyword:

```js
const rangenName = require("@mpecheux/rangen-name");

const name = rangenName.generateFullName();
console.log(name);
// Karleen Newe
```

For ES6 JavaScript, use the `import` keyword:

```js
import rangenName from "@mpecheux/rangen-name";

const name = rangenName.generateFullName();
console.log(name);
// Vincent Bows
```

### Using CDN versions

You can also use the CDN versions directly if you don't want to install anything:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Rangen: Name - Demo</title>
  <script src="https://unpkg.com/@mpecheux/rangen-name@0.1.0/dist/rangen-name.min.js"></script>
  <!-- or:
    <script src="https://cdn.jsdelivr.net/npm/@mpecheux/rangen-name@0.1.0/dist/rangen-name.min.js"></script>
  -->
</head>
<body>
  <div id="message"></div>
  <button onclick="generateName()">Generate!</button>
  <script>
    const generateName = () => {
      const name = RangenName.generateFullName();
      document.getElementById("message").innerText = name;
    }

    window.onload = () => {
      generateName();
    }
  </script>
</body>
</html>
```

(Or download them and put them in your project as local dependencies ;) )

## API

### Util constants

The lib has a list of useful constants you can use in the 3 core functions:

- `UNDEFINED`: "undefined" (50/50% chance of having a female/male name)
- `MALE`: "male"
- `FEMALE`: "female"
- `CASING_LOWERCASE`: "lowercase"
- `CASING_TITLE`: "title"
- `CASING_UPPERCASE`: "uppercase"

### `generateFirstname()`

Parameters:

- `sex`: determines if you want a male or a female firstname; can be "undefined", "male" or "female"
  
  [default: CONSTANTS.UNDEFINED]
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

- `sex`: determines if you want a male or a female firstname; can be "undefined", "male" or "female"
  
  [default: CONSTANTS.UNDEFINED]
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
