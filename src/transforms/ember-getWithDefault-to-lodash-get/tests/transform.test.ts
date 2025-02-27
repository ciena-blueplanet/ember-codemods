import runTestCases from "#utils/testHelper.js";
import transform, {
  parser,
} from "#transforms/ember-getWithDefault-to-lodash-get/index.js";

const testCases = [
  {
    name: "should handle ember-getWithDefault-to-lodash-get usage with only getWithDefault import",
    input: "transform.input.js",
    output: "transform.output.js",
  },
  {
    name: "should handle ember-getWithDefault-to-lodash-get usage with lodash import",
    input: "lodash.import.input.js",
    output: "lodash.import.output.js",
  },
  {
    name: "should handle ember-getWithDefault-to-lodash-get usage with ember get import",
    input: "ember.get.input.js",
    output: "ember.get.output.js",
  },
  {
    name: "should handle ember-getWithDefault-to-lodash-get usage with lodash get import as alias",
    input: "lodash.get.input.js",
    output: "lodash.get.output.js",
  },
  {
    name: "should handle ember-getWithDefault-to-lodash-get usage with lodash get import as alias",
    input: "lodash.get.input.js",
    output: "lodash.get.output.js",
  },
  {
    name: "should handle ember-getWithDefault-to-lodash-get usage with ts",
    input: "transform.input.js",
    output: "transform.output.js",
  },
];

runTestCases(
  "ember-getWithDefault-to-lodash-get",
  __dirname,
  testCases,
  transform,
  parser,
);
