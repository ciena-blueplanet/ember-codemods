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

  // Check for assign import from @ember/polyfills
  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.node.source.value === "@ember/polyfills") {
      const specifiers = path.node.specifiers;
      if (Array.isArray(specifiers)) {
        specifiers.forEach((specifier) => {
          if (specifier.local && specifier.local.name === "assign") {
            isAssignImportedFromEmberPolyfills = true;
            j(path).replaceWith(
              j.importDeclaration(
                specifiers.filter(
                  (s) => !!(s.local && s.local.name !== "assign"),
                ),
                j.literal("@ember/polyfills"),
              ),
            );
          }
        });
        // @ts-expect-error jscodeshfit jscodeshift type error
        if (path.node.specifiers.length === 0) {
          j(path).remove();
        }
      }
    }
  });

  let foundAssign = false;

  // Check for direct usage of Ember.assign
  root
    .find(j.MemberExpression, {
      object: {
        name: "Ember",
      },
      property: {
        name: "assign",
      },
    })
    .forEach((path) => {
      // Replace Ember.assign with Object.assign
      j(path).replaceWith(
        j.memberExpression(j.identifier("Object"), j.identifier("assign")),
      );
    });

  // Find variable declarators where Ember is destructured to get assign
  root
    .find(j.VariableDeclarator, {
      id: {
        type: "ObjectPattern",
      },
      init: {
        name: "Ember",
      },
    })
    .forEach((path) => {
      // @ts-expect-error jscodeshfit jscodeshift type error
      path.node.id.properties.forEach((property: ObjectProperty) => {
        // @ts-expect-error jscodeshfit
        if (property.key.name === "assign") {
          foundAssign = true;
          // @ts-expect-error jscodeshfit jscodeshift type error
          path.node.id.properties = path.node.id.properties.filter(
            // @ts-expect-error jscodeshfit jscodeshift type error
            (p: ObjectProperty) => p.key.name !== "assign",
          );
        }
      });
      // @ts-expect-error jscodeshfit jscodeshift type error
      if (path.node.id.properties.length === 0) {
        j(path.parent).remove();
      }
    });

  if (isAssignImportedFromEmberPolyfills || foundAssign) {
    root
      .find(j.CallExpression, {
        callee: {
          type: "Identifier",
          name: "assign",
        },
      })
      .replaceWith((path) => {
        return j.callExpression(
          j.memberExpression(j.identifier("Object"), j.identifier("assign")),
          path.node.arguments,
        );
      });
  }

  return root.toSource({ quote: "single", objectCurlySpacing: false });
}
