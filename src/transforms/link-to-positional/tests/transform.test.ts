import runTestCases from "#utils/testHelper.js";
import transform, { parser } from "#transforms/link-to-positional/index.js";

const testCases = [
  {
    name: "should handle link-to positional argument usage",
    input: "transform.input.hbs",
    output: "transform.output.hbs",
  },
  {
    name: "should not do anything if there is no link-to positional argument usage",
    input: "no-change.input.hbs",
    output: "no-change.output.hbs",
  },
];

runTestCases("link-to-positional", __dirname, testCases, transform, parser);
