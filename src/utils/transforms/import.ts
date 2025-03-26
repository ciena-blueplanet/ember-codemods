import type { API, Collection, ImportDeclaration } from "jscodeshift";

export function addImportDeclaration({
  api: { jscodeshift: j },
  root,
  declaration,
}: {
  api: API;
  root: Collection;
  declaration: ImportDeclaration;
}) {
  const imports = root.find(j.ImportDeclaration);
  if (imports.length > 0) {
    // Add after the last import statement
    imports.at(-1).insertAfter(declaration);
  } else {
    // Add at the top of the file
    const program = root.find(j.Program).nodes()[0];
    program.body = [declaration, ...program.body];
  }
}

export function addImportSpecifier({
  api: { jscodeshift: j },
  declaration,
  specifier,
}: {
  api: API;
  declaration: Collection;
  specifier: string;
}) {
  if (
    declaration
      .find(j.ImportSpecifier)
      .filter((p) => p.value.imported.name === specifier).length === 0
  ) {
    const { specifiers = [] } = declaration.nodes()[0];

    declaration.at(0).forEach((p) => {
      p.value.specifiers = specifiers.concat([
        j.importSpecifier(j.identifier(specifier)),
      ]);
    });
  }
}

export function addImport({
  api,
  api: { jscodeshift: j },
  root,
  source,
  specifier,
}: {
  api: API;
  root: Collection;
  source: string;
  specifier: string;
}) {
  const declaration = root
    .find(j.ImportDeclaration)
    .filter((p) => p.value.source.value === source);
  const importSpecifier = j.importSpecifier(j.identifier(specifier));

  if (declaration.length === 0) {
    addImportDeclaration({
      api,
      root,
      declaration: j.importDeclaration(
        [importSpecifier],
        j.stringLiteral(source),
      ),
    });
  } else {
    addImportSpecifier({
      api,
      declaration,
      specifier,
    });
  }
}
