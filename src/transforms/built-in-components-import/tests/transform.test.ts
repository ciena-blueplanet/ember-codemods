import runTestCases from "#utils/testHelper.js";
import transform, {
  parser,
} from "#transforms/built-in-components-import/index.js";

const testCases = [
  {
    name: "should handle built-in-components-import in javascript",
    input: "transform.input.js",
    output: "transform.output.js",
  },
  {
    name: "should handle built-in-components-import in typescript",
    input: "transform.input.ts",
    output: "transform.output.ts",
  },
];

runTestCases(
  "built-in-components-import",
  __dirname,
  testCases,
  transform,
  parser,
);
