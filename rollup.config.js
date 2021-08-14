const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const nodePolyfills = require("rollup-plugin-node-polyfills");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");

const globals = { fs: "fs", path: "path", canvas: "canvas" };

module.exports = [
  {
    input: "src/lib/index.js",
    output: [
      {
        file: "dist/rangen-name.umd.js",
        format: "cjs",
        exports: "auto",
        globals,
      }, {
        file: "dist/rangen-name.min.js",
        format: "iife",
        name: "RangenName",
        plugins: [terser()],
        globals,
      }
    ],
    external: ["fs", "canvas"],
    plugins: [
      nodePolyfills(),
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
      json()
    ]
  },

  {
    input: "src/lib/index.js",
    external: ["fs", "canvas"],
    output: [
      {
        file: "dist/rangen-name.cjs.js",
        format: "cjs"
      },
      {
        file: "dist/rangen-name.esm.js",
        format: "es"
      }
    ],
    plugins: [
      nodePolyfills()
    ]
  }
];
