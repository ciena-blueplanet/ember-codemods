import runTestCases from "#utils/testHelper.js";
import transform, { parser } from "#transforms/replace-with-syntax/index.js";

const testCases = [
  {
    name: "should handle `#with` syntax usage",
    input: "transform.input.hbs",
    output: "transform.output.hbs",
  },
  {
    name: "should not do anything if there is no `#with` syntax usage",
    input: "no-change.input.hbs",
    output: "no-change.output.hbs",
  },
];

runTestCases("replace-with-syntax", __dirname, testCases, transform, parser);
