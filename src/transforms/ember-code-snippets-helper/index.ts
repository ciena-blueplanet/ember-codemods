import type { FileInfo } from "jscodeshift";
import type { TransformPluginBuilder, Syntax } from "ember-template-recast";
import { transform } from "ember-template-recast";
import type { ASTv1 as AST } from "@glimmer/syntax";

export const parser = "ts";
const SUPPORTED_CODE_SNIPPET_PATH_TYPES = [
  "StringLiteral",
  "SubExpression",
  "PathExpression",
];

function getCodeSnippetHelper({
  builders,
  snippetPath,
}: {
  builders: Syntax["builders"];
  snippetPath?: AST.Expression;
}): AST.BlockStatement | undefined {
  if (
    !snippetPath ||
    !SUPPORTED_CODE_SNIPPET_PATH_TYPES.includes(snippetPath.type)
  ) {
    return;
  }

  const typecastSnippetPath = snippetPath as AST.Expression;

  return builders.block(
    builders.path("let"),
    [builders.sexpr(builders.path("get-code-snippet"), [typecastSnippetPath])],
    builders.hash(),
    builders.program(
      [
        builders.text("\n"),
        builders.element("pre", {
          attrs: [
            builders.attr(
              "class",
              builders.mustache(builders.path("snippet.language")),
            ),
          ],
          children: [builders.mustache(builders.path("snippet.source"))],
        }),
        builders.text("\n"),
      ],
      ["snippet"],
    ),
  );
}

const replaceWithSyntaxTransformPlugin: TransformPluginBuilder = (env) => {
  const {
    syntax: { builders },
  } = env;

  return {
    MustacheStatement(node) {
      if (
        node.path.type === "PathExpression" &&
        node.path.original === "code-snippet"
      ) {
        const namePair = node.hash.pairs.find((pair) => pair.key === "name");
        const snippetPath = namePair?.value;

        return getCodeSnippetHelper({ snippetPath, builders });
      }
    },
    ElementNode(node) {
      if (node.tag === "CodeSnippet") {
        const nameAttr = node.attributes.find((attr) => attr.name === "@name");
        const snippetPath = nameAttr?.value;

        if (!snippetPath) {
          return;
        }

        switch (snippetPath?.type) {
          case "MustacheStatement":
            if (snippetPath.path.type === "PathExpression") {
              if (
                snippetPath.path.original.startsWith("this") ||
                snippetPath.path.original.startsWith("@")
              ) {
                return getCodeSnippetHelper({
                  snippetPath: snippetPath.path,
                  builders,
                });
              }
            }

            return getCodeSnippetHelper({
              snippetPath: builders.sexpr(snippetPath.path, snippetPath.params),
              builders,
            });
          case "TextNode":
            return getCodeSnippetHelper({
              snippetPath: builders.string(snippetPath.chars),
              builders,
            });
        }
      }
    },
  };
};

export default function transformer(fileInfo: FileInfo) {
  return transform(fileInfo.source, replaceWithSyntaxTransformPlugin).code;
}
