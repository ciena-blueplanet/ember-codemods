import type {API, FileInfo} from 'jscodeshift'

export const parser = 'ts'

/**
 * TODO:
 * Determine if want to use get instead of getProperties
 * Handle class based decorators version(? do we have any usages like this?). Think it's mainly classic
 */

export default function transformer (fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift;

  return j(fileInfo.source)
      .find(j.ImportDeclaration)
      .forEach((path) => {
        if (path.node.source.value === "@ember/string") {
          let needsReplacement = false;
          let newSpecifiers = [];

          path.node.specifiers.forEach((specifier) => {
            if (specifier.imported.name === "htmlSafe" || specifier.imported.name === "isHTMLSafe") {
              needsReplacement = true;
              newSpecifiers.push(specifier);
            } else {
              newSpecifiers.push(specifier);
            }
          });

          if (needsReplacement) {
            // Create a new import declaration for @ember/template
            const newImport = j.importDeclaration(
                newSpecifiers.filter((specifier) => specifier.imported.name === "htmlSafe" || specifier.imported.name === "isHTMLSafe"),
                j.literal("@ember/template")
            );

            // Add the new import declaration
            j(path).insertBefore(newImport);

            // Remove the old specifiers
            path.node.specifiers = path.node.specifiers.filter((specifier) => specifier.imported.name !== "htmlSafe" && specifier.imported.name !== "isHTMLSafe");

            // If no specifiers left, remove the whole import
            if (path.node.specifiers.length === 0) {
              j(path).remove();
            }
          }
        }
      })
      .toSource({ quote: "single", objectCurlySpacing: false, noSemicolons: true });
}
