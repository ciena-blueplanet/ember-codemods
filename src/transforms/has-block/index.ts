import type { FileInfo } from "jscodeshift";
import { transform, TransformPluginBuilder } from "ember-template-recast";

export const parser = "ts";

const HAS_BLOCK_PROPS = {
  HAS_BLOCK: "hasBlock",
  HAS_BLOCK_PARAMS: "hasBlockParams",
};

const PROP_TO_HELPER = {
  [HAS_BLOCK_PROPS.HAS_BLOCK]: "has-block",
  [HAS_BLOCK_PROPS.HAS_BLOCK_PARAMS]: "has-block-params",
};

const hasBlockTransformPlugin: TransformPluginBuilder = (env) => {
  const {
    syntax: { builders },
  } = env;

  return {
    MustacheStatement(node) {
      if (node.path.type === "PathExpression") {
        const helper = PROP_TO_HELPER[node.path.original];

        if (helper) {
          return {
            ...node,
            path: builders.path({
              ...node.path,
              original: helper,
              parts: [helper],
            }),
          };
        }
      }
    },
    PathExpression(node) {
      const helper = PROP_TO_HELPER[node.original];
      if (helper) {
        return builders.sexpr(
          builders.path({ ...node, original: helper, parts: [helper] }),
        );
      }
    },
  };
};

export default function transformer(fileInfo: FileInfo) {
  return transform(fileInfo.source, hasBlockTransformPlugin).code;
}
