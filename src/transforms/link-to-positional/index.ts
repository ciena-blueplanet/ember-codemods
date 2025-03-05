import type { FileInfo } from "jscodeshift";
import { transform } from "ember-template-recast";
import type { Syntax, TransformPluginBuilder } from "ember-template-recast";
import type { ASTv1 as AST } from "@glimmer/syntax";

export const parser = "ts";

function getLinkToElement({
  node,
  builders,
}: {
  node: AST.MustacheStatement | AST.BlockStatement;
  builders: Syntax["builders"];
}): ReturnType<Syntax["builders"]["element"]> | undefined {
  if (node.path.type === "PathExpression" && node.path.original === "link-to") {
    const stringParamNodes = node.params.filter(
      (paramNode) => paramNode.type === "StringLiteral",
    );

    let linkText: string | undefined = stringParamNodes[0].value;
    let linkRoute = stringParamNodes[1]?.value;

    if (stringParamNodes.length === 1) {
      linkRoute = linkText;
      linkText = undefined;
    }

    const elementAttrs = [builders.attr("@route", builders.text(linkRoute))];

    const modelParamNodes = node.params.filter(
      (paramNode) => paramNode.type === "PathExpression",
    );

    if (modelParamNodes.length === 1) {
      elementAttrs.push(
        builders.attr("@model", builders.mustache(modelParamNodes.at(0)!)),
      );
    } else if (modelParamNodes.length > 1) {
      elementAttrs.push(
        builders.attr(
          "@models",
          builders.mustache(builders.path("array"), modelParamNodes),
        ),
      );
    }

    const queryParamsNode = node.params.find(
      (paramNode) =>
        paramNode.type === "SubExpression" &&
        paramNode.path.type === "PathExpression" &&
        paramNode.path.original === "query-params",
    );

    if (queryParamsNode) {
      elementAttrs.push(
        builders.attr(
          "@query",
          builders.mustache(
            builders.path("hash"),
            undefined,
            (queryParamsNode as AST.SubExpression).hash,
          ),
        ),
      );
    }

    return builders.element("LinkTo", {
      attrs: elementAttrs,
      children: linkText
        ? [builders.text(linkText)]
        : (node as AST.BlockStatement).program.body,
    });
  }
}

const linkToPositionalTransformPlugin: TransformPluginBuilder = (env) => {
  const {
    syntax: { builders },
  } = env;

  return {
    MustacheStatement(node) {
      return getLinkToElement({ node, builders });
    },
    BlockStatement(node) {
      return getLinkToElement({ node, builders });
    },
  };
};

export default function transformer(fileInfo: FileInfo) {
  return transform(fileInfo.source, linkToPositionalTransformPlugin).code;
}
