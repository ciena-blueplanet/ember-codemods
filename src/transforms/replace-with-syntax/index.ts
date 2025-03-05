import type { FileInfo } from "jscodeshift";
import type { TransformPluginBuilder } from "ember-template-recast";
import { transform } from "ember-template-recast";

export const parser = "ts";

const replaceWithSyntaxTransformPlugin: TransformPluginBuilder = (env) => {
  const {
    syntax: { builders },
  } = env;

  return {
    BlockStatement(node) {
      if (
        node.path.type === "PathExpression" &&
        node.path.original === "with"
      ) {
        const param = node.params[0];
        if (param?.type === "PathExpression") {
          return builders.block(
            builders.path("let"),
            node.params,
            builders.hash(),
            builders.program(
              [
                builders.text("\n"),
                builders.block(
                  builders.path("if"),
                  node.program.blockParams.map((param) => builders.path(param)),
                  builders.hash(),
                  builders.program(node.program.body),
                  node.inverse,
                ),
                builders.text("\n"),
              ],
              node.program.blockParams,
            ),
          );
        } else {
          return { ...node, path: builders.path("let") };
        }
      }
    },
  };
};

export default function transformer(fileInfo: FileInfo) {
  return transform(fileInfo.source, replaceWithSyntaxTransformPlugin).code;
}
