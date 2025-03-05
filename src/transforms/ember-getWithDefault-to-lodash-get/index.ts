import type {
  API,
  FileInfo,
  ImportSpecifier,
  JSCodeshift,
  Options,
} from "jscodeshift";

export const parser = "ts";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options,
) {
  const j: JSCodeshift = api.jscodeshift;
  const root = j(file.source, options);
  const getMethodName = "get";
  const getwithDefault = "getWithDefault";

  // check for the usage of getWithDefault() or this.getWithDefault
  const hasGetWithDefaultUsage =
    root
      .find(j.CallExpression, {
        callee: (callee) =>
          (callee.type === "MemberExpression" &&
            callee.property.type === "Identifier" &&
            callee.property.name === getwithDefault) ||
          (callee.type === "Identifier" && callee.name === getwithDefault),
      })
      .size() > 0;

  if (hasGetWithDefaultUsage) {
    let existingLodashGetImport: string | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let emberObjectImportPath: any = null;

    //Analyse import statements - if lodash - get is already imported then use that
    root.find(j.ImportDeclaration).forEach((path) => {
      const importSource = path.value.source.value;
      if (typeof importSource === "string") {
        if (["lodash/get", "lodash-es/get"].includes(importSource)) {
          const defaultSpecifier = path.value.specifiers?.find(
            (spec) => spec.type === "ImportDefaultSpecifier",
          );
          if (defaultSpecifier && defaultSpecifier.local) {
            existingLodashGetImport = defaultSpecifier.local.name;
          }
        } else if (["lodash", "lodash-es"].includes(importSource)) {
          const specifiers = path.value.specifiers?.find(
            (spec) =>
              spec.type === "ImportSpecifier" &&
              spec.imported.name === getMethodName,
          );
          if (specifiers && specifiers.local) {
            existingLodashGetImport = specifiers.local.name;
          }
        }
        if (importSource === "@ember/object") {
          emberObjectImportPath = path;
        }
      }
    });

    // Add lodash/get import
    if (!existingLodashGetImport) {
      root
        .find(j.ImportDeclaration)
        .at(0)
        .insertBefore(
          j.importDeclaration(
            [j.importDefaultSpecifier(j.identifier(getwithDefault))],
            j.literal("lodash/get"),
          ),
        );
    }

    //Replace all getWithDefault usages
    root
      .find(j.CallExpression, {
        callee: (callee) =>
          (callee.type === "MemberExpression" &&
            callee.property.type === "Identifier" &&
            callee.property.name === getwithDefault) ||
          (callee.type === "Identifier" && callee.name === getwithDefault),
      })
      .replaceWith((path) => {
        const args = path.value.arguments;
        const replacementIdentifier = existingLodashGetImport || getwithDefault;
        const newArgs =
          path.value.callee.type === "MemberExpression"
            ? [path.value.callee.object, ...args]
            : args;
        return j.callExpression(j.identifier(replacementIdentifier), newArgs);
      });

    // Remove getWithDefault from @ember/object imports
    if (emberObjectImportPath) {
      emberObjectImportPath.value.specifiers =
        emberObjectImportPath.value.specifiers?.filter(
          (spec: ImportSpecifier) =>
            spec.type !== "ImportSpecifier" ||
            spec.imported.name !== getwithDefault,
        );

      if (emberObjectImportPath.value.specifiers.length === 0) {
        j(emberObjectImportPath).remove();
      }
    }
  }

  return root.toSource({ quote: "single", objectCurlySpacing: false });
}
