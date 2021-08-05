const helpers = require("./helpers.js");

var
  countTable = null,
  nameStarts = null,
  nameEnds = null,
  maleFirstnames = [],
  femaleFirstnames = [];

const _initialize = () => {
  // store possible firstnames
  maleFirstnames = helpers.MALE_FIRSTNAMES;
  femaleFirstnames = helpers.FEMALE_FIRSTNAMES;

  const names = helpers.LASTNAMES;
  countTable = {};
  for (const c1 of helpers.ALPHABET) {
    const d2 = {};
    for (const c2 of helpers.ALPHABET) {
      const d3 = {};
      for (const c3 of helpers.ALPHABET) {
        d3[c3] = 0;
      }
      d2[c2] = d3;
    }
    countTable[c1] = d2;
  }
  nameStarts = {};
  nameEnds = {};

  for (const name of names) {
    const n = name.toLowerCase();
    for (let c = 0; c < n.length - 2; c++) {
      // mark name start, or add one occurence
      // to the matching one in the dict
      if (c === 0) {
        const start = n.substring(0, Math.min(3, n.length));
        if (start in nameStarts) nameStarts[start]++;
        else nameStarts[start] = 1;
      }

      // mark name end, or add one occurence
      // to the matching one in the dict
      if (c === n.length - 3) {
        const end = n.substring(0, Math.min(3, n.length));
        if (end in nameEnds) nameEnds[end]++;
        else nameEnds[end] = 1;
      }

      if (
        !(n[c] in countTable) ||
        !(n[c + 1] in countTable[n[c]]) ||
        !(n[c + 2] in countTable[n[c]][n[c + 1]])
      ) continue;
      countTable[n[c]][n[c + 1]][n[c + 2]]++;
    }
  }
};

const _applyCasing = (casing, subject) => {
  if (casing === helpers.CASING_TITLE) {
    return subject.split(" ").map((p) => {
      return `${p.charAt(0).toUpperCase()}${p.substring(1)}`;
    }).join(" ");
  } else if (casing === helpers.CASING_UPPERCASE) {
    return subject.toUpperCase();
  }
  return subject;
};

const generateFirstname = ({
  sex = helpers.SEX_FEMALE,
  casing = helpers.CASING_TITLE
} = {}) => {
  if (countTable === null) _initialize();
  let firstname = helpers.getRandomItem(
    sex === helpers.SEX_FEMALE ? femaleFirstnames : maleFirstnames
  );
  firstname = _applyCasing(casing, firstname);
  return firstname;
};

const generateLastname = ({
  casing = helpers.CASING_TITLE,
  maxLength = 10,
  stopThreshold = 0.75,
} = {}) => {
  if (countTable === null) _initialize();

  // get random probable start
  let lastname = helpers.getRandomItem(helpers.repeatItems(nameStarts));

  // add chars with Markov Chain-like algorithm
  let currentId = 3;
  let pattern, possibilities, nextLetter;
  while (lastname.length < maxLength) {
    if (
      !(lastname[currentId - 2] in countTable) ||
      !(lastname[currentId - 1] in countTable[lastname[currentId - 2]])
    ) break;
    possibilities = helpers.repeatItems(countTable[lastname[currentId - 2]][lastname[currentId - 1]]);
    if (possibilities.length === 0)
      break;
    nextLetter = helpers.getRandomItem(possibilities);
    lastname += nextLetter;
    pattern = lastname.substring(lastname.length - 3);
    // if this is a known word end,
    // try termination
    if (pattern in nameEnds) {
      if (nameEnds[pattern] > 1e-4) {
        const p = Math.random();
        if (p < stopThreshold)
          break;
      }
    }
    currentId++;
  }

  // check for crude ending
  while (!(lastname.substring(Math.max(0, lastname.length - 3)) in nameEnds)) {
    lastname = lastname.substring(0, lastname.length - 1);
    if (lastname.length === 0)
      lastname = generateLastname({ casing, maxLength, stopThreshold });
  }

  // remove too-small parts
  const finalParts = lastname.split(" ").filter((p) => p.length > 2);
  lastname = finalParts.join(" ");

  lastname = _applyCasing(casing, lastname);
  return lastname;
};

const generateFullName = ({
  sex = helpers.SEX_FEMALE,
  casing = helpers.CASING_TITLE,
  maxLength = 10,
  stopThreshold = 0.75,
} = {}) => {
  const firstname = generateFirstname({ sex, casing });
  const lastname = generateLastname({ casing, maxLength, stopThreshold });
  return `${firstname} ${lastname}`;
};

module.exports = {
  generateFirstname,
  generateLastname,
  generateFullName,
};
