import runTestCases from "#utils/testHelper.js";
import transform, { parser } from "#transforms/has-block/index.js";

const testCases = [
  {
    name: "should handle hasBlock and hasBlockParams usage",
    input: "transform.input.hbs",
    output: "transform.output.hbs",
  },
  {
    name: "should not do anything if there is no hasBlock or hasBlockParams usage",
    input: "no-change.input.hbs",
    output: "no-change.output.hbs",
  },
];

runTestCases("has-block", __dirname, testCases, transform, parser);
