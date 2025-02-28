import runTestCases from "#utils/testHelper.js";
import transform, {
  parser,
} from "#transforms/remove-run-loop-and-computed-dot-access/index.js";

const testCases = [
  {
    name: "should handle run loop and computed imports dot access in javascript",
    input: "transform.input.js",
    output: "transform.output.js",
  },
  {
    name: "should handle run loop and computed imports in ts",
    input: "transform.input.ts",
    output: "transform.output.ts",
  },
  {
    name: "should handle run loop and computed imports with other imports",
    input: "import.input.js",
    output: "import.output.js",
  },
];

runTestCases(
  "remove-run-loop-and-computed-dot-access",
  __dirname,
  testCases,
  transform,
  parser,
);
