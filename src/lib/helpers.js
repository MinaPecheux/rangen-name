const MALE_FIRSTNAMES = require("../data/male-firstnames.json");
const FEMALE_FIRSTNAMES = require("../data/female-firstnames.json");
const LASTNAMES = require("../data/surnames.json");

const ALPHABET = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
  "u", "v", "w", "x", "y", "z", "â", "à", "é", "è",
  "ê", "ë", "î", "ï", "ô", "ö", "ù", "û", "ç", " ",
  "-", ".", "0", "1", "2", "3", "4", "5", "6", "7",
  "8", "9"
];

const UNDEFINED = "undefined";
const MALE = "male";
const FEMALE = "female";

const CASING_LOWERCASE = "lowercase";
const CASING_TITLE = "title";
const CASING_UPPERCASE = "uppercase";

const arraysAreEqual = (a1, a2) => {
  if (a1 === a2) return true;
  if (a1 == null || a2 == null) return false;
  if (a1.length !== a2.length) return false;

  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
};

const getRandomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const repeatItems = (itemRepetitions) => {
  const items = [];
  for (const [item, repetition] of Object.entries(itemRepetitions)) {
    for (let i = 0; i < repetition; i++) {
      items.push(item);
    }
  }
  return items;
};

const normalizeProbabilityMatrix = (refMatrix) => {
  const matrix = {};
  for (const k1 of Object.keys(refMatrix)) {
    const d2 = {};
    for (const k2 of Object.keys(refMatrix[k1])) {
      const d3 = {};
      const s = Object.values(refMatrix[k1][k2]).reduce((acc, v) => acc + v, 0);
      for (const [k3, v] of Object.entries(refMatrix[k1][k2])) {
        d3[k3] = v * 1.0 / s;
      }
      d2[k2] = d3;
    }
    matrix[k1] = d2;
  }
  return matrix;
};

module.exports = {
  MALE_FIRSTNAMES,
  FEMALE_FIRSTNAMES,
  LASTNAMES,
  ALPHABET,
  UNDEFINED,
  MALE,
  FEMALE,
  CASING_LOWERCASE,
  CASING_TITLE,
  CASING_UPPERCASE,
  arraysAreEqual,
  getRandomItem,
  repeatItems,
  normalizeProbabilityMatrix,
};