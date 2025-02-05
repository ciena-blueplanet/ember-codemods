import type {API, FileInfo} from 'jscodeshift'

export const parser = 'ts'

/**
 * TODO:
 * Determine if want to use get instead of getProperties
 * Handle class based decorators version(? do we have any usages like this?). Think it's mainly classic
 */

export default function transformer (fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift;

  // Get the root of the current file's AST
  const root = j(fileInfo.source);

  // Find import declaration for EmberError
  const importDeclaration = root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: '@ember/error',
    },
  });

  let emberErrorImported = false;

  console.log(importDeclaration.length)

  // Check if the specific import is found
  importDeclaration.forEach(p => {

    p.node.specifiers.forEach(spec => {
      console.log(spec)
      if (spec.local && spec.local.name === 'EmberError') {
        emberErrorImported = true;
        console.log('here')
        // Remove the import if it's an unused variable
        if (p.node.specifiers.length === 1) {
          j(p).remove();
        } else {
          // Remove only EmberError specifier
          j(p).replaceWith(
              j.importDeclaration(
                  p.node.specifiers.filter(s => s.imported.name !== 'EmberError'),
                  p.node.source
              )
          );
        }
      }
    });
  });

  // If EmberError was imported, replace its usage
  if (emberErrorImported) {
    root.find(j.NewExpression, {
      callee: {
        name: 'EmberError'
      }
    }).replaceWith(path => {
      return j.newExpression(j.identifier('Error'), path.node.arguments);
    });
  }

  // Return the modified code
  return root.toSource({ quote: "single", objectCurlySpacing: false});
}
