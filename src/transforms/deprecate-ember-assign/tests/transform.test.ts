import runTestCases from "../../../utils/testHelper";
import transform, { parser } from "#transforms/deprecate-ember-assign/index.js";

const testCases = [
  {
    name: "should handle polyfills assign import in js",
    input: "ember-merge.transform.input.js",
    output: "ember-merge.transform.output.js",
  },
  {
    name: "should handle polyfills assign import in js",
    input: "ember-assign-merge.transform.input.js",
    output: "ember-assign-merge.transform.output.js",
  },
  {
    name: "should handle polyfills assign import in js",
    input: "polyfills-assign.transform.input.js",
    output: "polyfills-assign.transform.output.js",
  },
  {
    name: "should handle polyfills assign import in ts",
    input: "polyfills-assign.transform.input.ts",
    output: "polyfills-assign.transform.output.ts",
  },
  {
    name: "should handle ember assign",
    input: "ember-assign.transform.input.js",
    output: "ember-assign.transform.output.js",
  },
  {
    name: "should handle extra import from polyfills",
    input: "import-extra.transform.input.js",
    output: "import-extra.transform.output.js",
  },
  {
    name: "should handle extra destructure from Ember",
    input: "destructure-extra.transform.input.js",
    output: "destructure-extra.transform.output.js",
  },
];

runTestCases("deprecate-ember-assign", __dirname, testCases, transform, parser);
