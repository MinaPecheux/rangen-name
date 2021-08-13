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
yarn add @mpecheux/rangen-name
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
  <script src="https://unpkg.com/@mpecheux/rangen-name@0.1.2/dist/rangen-name.min.js"></script>
  <!-- or:
    <script src="https://cdn.jsdelivr.net/npm/@mpecheux/rangen-name@0.1.2/dist/rangen-name.min.js"></script>
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

### Using custom reference lists

#### For firstnames

The firstname generator in this package simply picks one firstname at random in given lists of male/female firstnames, depending on the gender of the name you asked for (or with a 50/50% chance of male/female name if you didn't specify anything).

The generator is loaded up with a list of common firstnames but, if you want, you can also configure the generator with your own lists:

```js
const rangenName = require("@mpecheux/rangen-name");

for (let i = 0; i < 7; i++)
  console.log(rangenName.generateFirstname({
    maleFirstnameReferenceList: ["Bob", "John", "Mike"],
    femaleFirstnameReferenceList: ["Elise", "Anna", "Tanya"]
  }));
// Bob
// Anna
// John
```

#### For lastnames

The lastname generator, on the other hand, relies on [Markov chains](https://en.wikipedia.org/wiki/Markov_chain); the chain transition probabilities are initialised based on a reference list of common surnames (for more info, check [the Medium article](https://medium.com/codex/generating-random-names-using-maths-8872a8f3b981) I wrote about this lib), and so this reference list is essential in defining the **possible letter sequences** for the generator.

By default, the generator uses a list of *English* lastnames scraped from the Internet.

But you can, of course, pass in your own reference list if you want! This will allow you to generate names that are completely different and "resemble" your custom reference :)

To do that, just use the `lastnameReferenceList` option:

```js
const rangenName = require("@mpecheux/rangen-name");

for (let i = 0; i < 7; i++)
  console.log(rangenName.generateLastname({
    lastnameReferenceList: ["Momomomo", "Titititi", "Yuyuyu", "Lalala", "Lololo"]
  }));
// Yuyuy
// Lalal
// Lolol
// Yuyuy
// Titit
// Titit
// Yuyuyuy
```

Remember: the longer your list, the better it is for the generator because it will have more "raw data" to learn from! In my example, there are too few reference strings to make a credible generator.

On the other hand, here are some results if I feed a list of common Greek surnames:

```js
const rangenName = require("@mpecheux/rangen-name");

const greekSurnames = require("/path/to/data/greek-surnames.json");
for (let i = 0; i < 3; i++)
  console.log(rangenName.generateLastname({
    lastnameReferenceList: greekSurnames
  }));
// Kel
// Flostopol
// Karbar
```

Or of Japanese lastnames:

```js
const rangenName = require("@mpecheux/rangen-name");

const japaneseSurnames = require("/path/to/data/japanese-surnames.json");
for (let i = 0; i < 3; i++)
  console.log(rangenName.generateLastname({
    lastnameReferenceList: japaneseSurnames
  }));
// Sairosh
// Murayaseo
// Sadachi
```

#### For full names

The firstnames aren't auto-correlated, but you can naturally combine the two features and pass all the options to the `generateFullName()` function to better "control the randomness" and get more relevant results:

```js
const rangenName = require("@mpecheux/rangen-name");

const japaneseSurnames = require("/path/to/data/japanese-surnames.json");
for (let i = 0; i < 3; i++)
  console.log(rangenName.generateFullName({
    maleFirstnameReferenceList: ["Akira", "Banzan", "Daido", "Haru", "Ichiro", "Itsu", "Jiro", "Kazuo"],
    femaleFirstnameReferenceList: ["Eido", "Hama", "Hanako", "Iva", "Jin", "Kane", "Kaori", "Kaya"],
    lastnameReferenceList: greekSurnames
  }));
// Hama Konondachi
// Ichiro Ishose
// Haru Kondoi
```

### `generateFirstname()`

Parameters:

- `sex`: determines if you want a male or a female firstname; can be "undefined", "male" or "female"
  
  [default: CONSTANTS.UNDEFINED]
- `casing`: applies a specific casing to the generated value; can be "lowercase", "title" and "uppercase"
  
  [default: CONSTANTS.CASING_TITLE]

- `maleFirstnameReferenceList`: custom list of strings to pick male firstnames from
  
  [default: `null`]

- `femaleFirstnameReferenceList`: custom list of strings to pick female firstnames from
  
  [default: `null`]

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

- `lastnameReferenceList`: custom list of strings to use as reference for the probable letter sequences in the generator
  
  [default: `null`]

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

- `maleFirstnameReferenceList`: custom list of strings to pick male firstnames from
  
  [default: `null`]

- `femaleFirstnameReferenceList`: custom list of strings to pick female firstnames from
  
  [default: `null`]

- `lastnameReferenceList`: custom list of strings to use as reference for the probable letter sequences in the generator
  
  [default: `null`]
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
