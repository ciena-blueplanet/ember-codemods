import runTestCases from "#utils/testHelper.js";
import transform, {
  parser,
} from "#transforms/replace-proxy-hack-with-decorator/index.js";

const testCases = [
  {
    name: "should handle only proxy properties",
    input: "only-proxy.input.js",
    output: "only-proxy.output.js",
  },
  {
    name: "should handle mixed properties",
    input: "mixed.input.js",
    output: "mixed.output.js",
  },
  {
    name: "should not do anything if no proxy hacks are being used",
    input: "no-change.input.js",
    output: "no-change.output.js",
  },
];

runTestCases(
  "replace-proxy-hack-with-decorator",
  __dirname,
  testCases,
  transform,
  parser,
);
