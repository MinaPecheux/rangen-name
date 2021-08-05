const pkg = require("../../package.json");

const helpers = require("./helpers.js");
const generator = require("./generator.js");

module.exports = {
  VERSION: pkg.version,
  CONSTANTS: {
    MALE: helpers.SEX_MALE,
    FEMALE: helpers.SEX_FEMALE,
    CASING_LOWERCASE: helpers.CASING_LOWERCASE,
    CASING_TITLE: helpers.CASING_TITLE,
    CASING_UPPERCASE: helpers.CASING_UPPERCASE,
  },
  generateFirstname: generator.generateFirstname,
  generateLastname: generator.generateLastname,
  generateFullName: generator.generateFullName,
};
