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

  const root = j(fileInfo.source, options);

  let isAssignImportedFromEmberPolyfills = false;
  let isMergeImported = false;

  // Check for assign or merge import from @ember/polyfills
  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.node.source.value === "@ember/polyfills") {
      const specifiers = path.node.specifiers;
      if (Array.isArray(specifiers)) {
        specifiers.forEach((specifier) => {
          if (specifier.local) {
            if (specifier.local.name === "assign") {
              isAssignImportedFromEmberPolyfills = true;
            }
            if (specifier.local.name === "merge") {
              isMergeImported = true;
            }
          }
        });

        // Remove assign and merge from imports
        const filteredSpecifiers = specifiers.filter(
          (s) =>
            s.local && s.local.name !== "assign" && s.local.name !== "merge",
        );

        // Replace or remove import declaration
        if (filteredSpecifiers.length > 0) {
          j(path).replaceWith(
            j.importDeclaration(
              filteredSpecifiers,
              j.literal("@ember/polyfills"),
            ),
          );
        } else {
          j(path).remove();
        }
      }
    }
  });

  // Replace direct usage of Ember.assign and Ember.merge
  root.find(j.MemberExpression).forEach((path) => {
    if (
      // @ts-expect-error jscodeshift type error
      path.node.object.name === "Ember" &&
      // @ts-expect-error jscodeshift type error
      (path.node.property.name === "assign" ||
        // @ts-expect-error jscodeshift type error
        path.node.property.name === "merge")
    ) {
      j(path).replaceWith(
        j.memberExpression(j.identifier("Object"), j.identifier("assign")),
      );
    }
  });

  let foundAssign = false;
  let foundMerge = false;

  // Handle destructured assign and merge from Ember
  root
    .find(j.VariableDeclarator, {
      id: { type: "ObjectPattern" },
      init: { name: "Ember" },
    })
    .forEach((path) => {
      // @ts-expect-error jscodeshift type error
      path.node.id.properties = path.node.id.properties.filter(
        (p: ObjectProperty) => {
          // @ts-expect-error jscodeshift type error
          if (p.key.name === "assign") {
            foundAssign = true;
          }
          // @ts-expect-error jscodeshift type error
          return p.key.name !== "assign";
        },
      );

      // @ts-expect-error jscodeshift type error
      path.node.id.properties = path.node.id.properties.filter(
        (p: ObjectProperty) => {
          // @ts-expect-error jscodeshift type error
          if (p.key.name === "merge") {
            foundMerge = true;
          }
          // @ts-expect-error jscodeshift type error
          return p.key.name !== "merge";
        },
      );

      // @ts-expect-error jscodeshift type error
      if (path.node.id.properties.length === 0) {
        j(path.parent).remove();
      }
    });

  // Replace calls to assign or merge
  if (isAssignImportedFromEmberPolyfills || foundAssign) {
    root.find(j.CallExpression).forEach((path) => {
      if (
        path.node.callee.type === "Identifier" &&
        path.node.callee.name === "assign"
      ) {
        j(path).replaceWith(
          j.callExpression(
            j.memberExpression(j.identifier("Object"), j.identifier("assign")),
            path.node.arguments,
          ),
        );
      }
    });
  }

  if (isMergeImported || foundMerge) {
    root.find(j.CallExpression).forEach((path) => {
      if (
        path.node.callee.type === "Identifier" &&
        path.node.callee.name === "merge"
      ) {
        j(path).replaceWith(
          j.callExpression(
            j.memberExpression(j.identifier("Object"), j.identifier("assign")),
            path.node.arguments,
          ),
        );
      }
    });
  }

  return root.toSource({ quote: "single", objectCurlySpacing: false });
}
