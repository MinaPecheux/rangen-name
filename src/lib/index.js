const pkg = require("../../package.json");

const generator = require("./generator.js");

module.exports = {
  VERSION: pkg.version,
  generateFirstname: generator.generateFirstname,
  generateLastname: generator.generateLastname,
  generateFullName: generator.generateFullName,
};
