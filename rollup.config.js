const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");

module.exports = [
  {
    input: "src/lib/index.js",
    output: [
      {
        file: "dist/rangen-name.umd.js",
        format: "cjs",
        exports: "auto"
      }, {
        file: "dist/rangen-name.min.js",
        format: "iife",
        name: "RangenName",
        plugins: [terser()]
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      json()
    ]
  },

  {
    input: "src/lib/index.js",
    external: [],
    output: [
      {
        file: "dist/rangen-name.cjs.js",
        format: "cjs"
      },
      {
        file: "dist/rangen-name.esm.js",
        format: "es"
      }
    ]
  }
];
