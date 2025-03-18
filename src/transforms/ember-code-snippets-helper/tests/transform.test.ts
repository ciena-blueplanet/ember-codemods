import runTestCases from "#utils/testHelper.js";
import transform, {
  parser,
} from "#transforms/ember-code-snippets-helper/index.js";

const testCases = [
  {
    name: "should handle old code snippet component usage",
    input: "transform.input.hbs",
    output: "transform.output.hbs",
  },
  {
    name: "should not do anything if there is no old code snippet component usage",
    input: "no-change.input.hbs",
    output: "no-change.output.hbs",
  },
];

runTestCases(
  "ember-code-snippets-helper",
  __dirname,
  testCases,
  transform,
  parser,
);
