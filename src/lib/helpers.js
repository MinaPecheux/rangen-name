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
  getRandomItem,
  repeatItems,
};