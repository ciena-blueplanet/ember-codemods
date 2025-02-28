import type {
  API,
  JSCodeshift,
  FileInfo,
  ObjectProperty,
  Options,
} from "jscodeshift";

export const parser = "ts";

export default function transformer(
  fileInfo: FileInfo,
  api: API,
  options: Options,
) {
  const j: JSCodeshift = api.jscodeshift;

  if (fileInfo.path.includes("environment.js")) {
    const root = j(fileInfo.source, options);

    const variableDeclarator = root
      .find(j.VariableDeclarator)
      .filter(
        (path) =>
          !!(path.value.init && path.value.init.type === "ObjectExpression"),
      );
    variableDeclarator.forEach((path) => {
      const init = path.value.init;
      // @ts-expect-error jscodeshift type error
      const hasLocationType =
        init &&
        init.properties.some(
          (prop: ObjectProperty) =>
            prop.key.name === "locationType" && prop.value.value === "auto",
        );

      if (hasLocationType) {
        // @ts-expect-error jscodeshift type error
        init.properties.forEach((p: ObjectProperty) => {
          // @ts-expect-error jscodeshift type error
          if (p.key.name === "locationType" && p.value.value === "auto") {
            // @ts-expect-error jscodeshift type error
            p.value.value = "history";
          }
        });
      }
    });

    root
      .find(j.MemberExpression)
      .filter(
        (path) =>
          // @ts-expect-error jscodeshift type error
          path.value.property?.name === "locationType" &&
          path.parent.node.type === "AssignmentExpression" &&
          path.parent.node.right.value === "auto",
      )
      .forEach((path) => {
        path.parent.node.right = j.literal("history");
      });
    return root.toSource({ quote: "single", objectCurlySpacing: false });
  }

  return;
}
