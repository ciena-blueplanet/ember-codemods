import type { FileInfo } from "jscodeshift";
import { transform, TransformPluginBuilder } from "ember-template-recast";
import type { Syntax } from "ember-template-recast";
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
    const elementAttrs = [];
    let body = undefined;
    let linkRouteNode = node.hash.pairs.find(
      ({ key }) => key === "route",
    )?.value;
    let modelParamsStartIndex = 1;

    if (node.type === "MustacheStatement") {
      body = [builders.text((node.params[0] as AST.StringLiteral).value)];

      if (!linkRouteNode) {
        linkRouteNode = node.params[1];
        modelParamsStartIndex = 2;
      }
    } else if (node.type === "BlockStatement") {
      body = node.program.body;

      if (!linkRouteNode) {
        linkRouteNode = node.params[0];
      }
    }

    switch (linkRouteNode!.type) {
      case "StringLiteral":
        elementAttrs.push(
          builders.attr("@route", builders.text(linkRouteNode!.value)),
        );
        break;
      case "SubExpression":
        elementAttrs.push(
          builders.attr(
            "@route",
            builders.mustache(
              linkRouteNode!.path,
              linkRouteNode!.params,
              linkRouteNode!.hash,
            ),
          ),
        );
        break;
      default:
        elementAttrs.push(
          builders.attr("@route", builders.mustache(linkRouteNode!)),
        );
        break;
    }

    const modelParamNodes = node.params
      .slice(modelParamsStartIndex)
      .filter((paramNode) => paramNode.type === "PathExpression");

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

    node.hash.pairs
      .filter(({ key }) => key !== "route")
      .forEach(({ key, value: node }) => {
        switch (node.type) {
          case "StringLiteral":
            elementAttrs.push(builders.attr(key, builders.text(node.value)));
            break;
          case "SubExpression":
            elementAttrs.push(
              builders.attr(
                key,
                builders.mustache(node.path, node.params, node.hash),
              ),
            );
            break;
          default:
            elementAttrs.push(builders.attr(key, builders.mustache(node)));
            break;
        }
      });

    return builders.element("LinkTo", {
      attrs: elementAttrs,
      children: body,
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
