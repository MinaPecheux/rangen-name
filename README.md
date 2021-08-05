# Rangen: Name

Rangen is a suite of random generators and procedural generation tools; rangen-name focuses on name generation.

## TL;DR

The lib provides you with 3 functions:

- the `generateFirstname()`: gets a random item from lists of common male or female firstnames
- the `generateLastname()`: uses a 3-step Markov Chain process to create a random (but plausible) surname
- the `generateFullName()`: combines a firstname and lastname (with the previous rules) to get a full name

## API

**`generateFirstname()`**

Parameters:

- `sex`: determines if you want a male or a female firstname; can be "male" or "female"
- `casing`: applies a specific casing to the generated value; can be "lowercase", "title" and "uppercase"

**`generateLastname()`**

Parameters:

- `maxLen`: maximum length for the generated surname
- `stopThreshold`: probability of stopping when the generated surname contains a known word-end
- `casing`: applies a specific casing to the generated value; can be "lowercase", "title" and "uppercase"

**`generateFullName()`**

Parameters:

- `sex`: determines if you want a male or a female firstname; can be "male" or "female"
- `maxLen`: maximum length for the generated surname
- `stopThreshold`: probability of stopping when the generated surname contains a known word-end
- `casing`: applies a specific casing to the generated value; can be "lowercase", "title" and "uppercase"
