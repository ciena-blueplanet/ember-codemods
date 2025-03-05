import runTestCases from "../../../utils/testHelper";
import transform, { parser } from "#transforms/ember-string-codemod/index.js";

const testCases = [
  {
    name: "should handle ember-string-codemod import and usage in javascript",
    input: "destructuring.input.js",
    output: "destructuring.output.js",
  },
  {
    name: "should handle ember-string-codemod import and usage in javascript",
    input: "transform.input.js",
    output: "transform.output.js",
  },
  {
    name: "should handle ember-string-codemod import and usage in typescript",
    input: "transform.input.ts",
    output: "transform.output.ts",
  },
  {
    name: "should handle config without environment configs",
    input: "config-no-env/config/environment.js",
    output: "config-no-env/config/environment.output.js",
  },
  {
    name: "should handle config without EmberENV configs",
    input: "config-no-ember-env/config/environment.js",
    output: "config-no-ember-env/config/environment.output.js",
  },
  {
    name: "should handle config without extended prototype configs",
    input: "config-no-extend-proto/config/environment.js",
    output: "config-no-extend-proto/config/environment.output.js",
  },
  {
    name: "should handle config without string prototype configs",
    input: "config-no-string-proto/config/environment.js",
    output: "config-no-string-proto/config/environment.output.js",
  },
  {
    name: "should handle config with string prototype configs",
    input: "config-has-string-proto/config/environment.js",
    output: "config-has-string-proto/config/environment.output.js",
  },
];

runTestCases("ember-string-codemod", __dirname, testCases, transform, parser);
