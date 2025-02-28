import runTestCases from "../../../utils/testHelper";
import transform, {
  parser,
} from "#transforms/deprecate-auto-location/index.js";

const testCases = [
  {
    name: "should handle locationtype auto and update to history",
    input: "input.auto-environment.js",
    output: "output.auto-environment.js",
  },
  {
    name: "should handle locationtype hash and not change it",
    input: "input.hash-environment.js",
    output: "output.hash-environment.js",
  },
  {
    name: "should handle locationtype mix of locationType",
    input: "input.mix-environment.js",
    output: "output.mix-environment.js",
  },
];

runTestCases(
  "deprecate-auto-location",
  __dirname,
  testCases,
  transform,
  parser,
);
