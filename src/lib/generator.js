const helpers = require("./helpers.js");

const context = {
  countTable: null,
  nameStarts: null,
  nameEnds: null,
  currentLastnameReferenceList: null,
  nItems: -1,
};

const _initialize = ({ lastnameReferenceList = null } = {}) => {
  const names = lastnameReferenceList || helpers.LASTNAMES;
  if (lastnameReferenceList)
    context.currentLastnameReferenceList = lastnameReferenceList;
  context.countTable = {};
  for (const c1 of helpers.ALPHABET) {
    const d2 = {};
    for (const c2 of helpers.ALPHABET) {
      const d3 = {};
      for (const c3 of helpers.ALPHABET) {
        d3[c3] = 0;
      }
      d2[c2] = d3;
    }
    context.countTable[c1] = d2;
  }
  context.nameStarts = {};
  context.nameEnds = {};
  context.nItems = 0;

  for (const name of names) {
    const n = name.toLowerCase();
    for (let c = 0; c < n.length - 2; c++) {
      // mark name start, or add one occurence
      // to the matching one in the dict
      if (c === 0) {
        const start = n.substring(0, Math.min(3, n.length));
        if (start in context.nameStarts) context.nameStarts[start]++;
        else context.nameStarts[start] = 1;
      }

      // mark name end, or add one occurence
      // to the matching one in the dict
      if (c === n.length - 3) {
        const end = n.substring(c);
        if (end.length > 0) {
          if (end in context.nameEnds) context.nameEnds[end]++;
          else context.nameEnds[end] = 1;
        }
      }

      if (
        !(n[c] in context.countTable) ||
        !(n[c + 1] in context.countTable[n[c]]) ||
        !(n[c + 2] in context.countTable[n[c]][n[c + 1]])
      ) continue;
      context.countTable[n[c]][n[c + 1]][n[c + 2]]++;
      context.nItems++;
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
  sex = helpers.UNDEFINED,
  casing = helpers.CASING_TITLE,
  maleFirstnameReferenceList = null,
  femaleFirstnameReferenceList = null,
} = {}) => {
  if (sex === helpers.UNDEFINED)
    sex = Math.random() < 0.5 ? helpers.FEMALE : helpers.MALE;

  // get possible firstnames
  const maleFirstnames = maleFirstnameReferenceList || helpers.MALE_FIRSTNAMES;
  const femaleFirstnames = femaleFirstnameReferenceList || helpers.FEMALE_FIRSTNAMES;
  let firstname = helpers.getRandomItem(
    sex === helpers.FEMALE ? femaleFirstnames : maleFirstnames
  );
  firstname = _applyCasing(casing, firstname);
  return firstname;
};

const generateLastname = ({
  casing = helpers.CASING_TITLE,
  maxLength = 10,
  stopThreshold = 0.75,
  lastnameReferenceList = null,
} = {}) => {
  if (
    context.countTable === null ||
    !helpers.arraysAreEqual(lastnameReferenceList, context.currentLastnameReferenceList)
  )
    _initialize({ lastnameReferenceList });

  // get random probable start
  let lastname = helpers.getRandomItem(helpers.repeatItems(context.nameStarts));

  // add chars with Markov Chain-like algorithm
  let currentId = 3;
  let pattern, possibilities, nextLetter;
  while (lastname.length < maxLength) {
    if (
      !(lastname[currentId - 2] in context.countTable) ||
      !(lastname[currentId - 1] in context.countTable[lastname[currentId - 2]])
    ) break;
    possibilities = helpers.repeatItems(context.countTable[lastname[currentId - 2]][lastname[currentId - 1]]);
    if (possibilities.length === 0)
      break;
    nextLetter = helpers.getRandomItem(possibilities);
    lastname += nextLetter;
    pattern = lastname.substring(lastname.length - 3);
    // if this is a known word end,
    // try termination
    if (pattern in context.nameEnds) {
      if (context.nameEnds[pattern] > 1e-4) {
        const p = Math.random();
        if (p < stopThreshold)
          break;
      }
    }
    currentId++;
  }

  // check for crude ending
  while (!(lastname.substring(Math.max(0, lastname.length - 3)) in context.nameEnds)) {
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
  sex = helpers.UNDEFINED,
  casing = helpers.CASING_TITLE,
  maxLength = 10,
  stopThreshold = 0.75,
  maleFirstnameReferenceList = null,
  femaleFirstnameReferenceList = null,
  lastnameReferenceList = null,
} = {}) => {
  const firstname = generateFirstname({
    sex,
    casing,
    maleFirstnameReferenceList,
    femaleFirstnameReferenceList
  });
  const lastname = generateLastname({
    casing,
    maxLength,
    stopThreshold,
    lastnameReferenceList
  });
  return `${firstname} ${lastname}`;
};

module.exports = {
  generateFirstname,
  generateLastname,
  generateFullName,
  context,
};
