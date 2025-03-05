import type { API, FileInfo, JSCodeshift, Options } from "jscodeshift";

export const parser = "ts";

const LEGACY_COMPONENTS = {
  "@ember/component/checkbox": "Checkbox",
  "@ember/routing/link-component": "LinkComponent",
  "@ember/component/text-area": "TextArea",
  "@ember/component/text-field": "TextField",
};

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options,
) {
  const j: JSCodeshift = api.jscodeshift;
  const root = j(file.source, options);

  //Analyse import statements if @ember/component/xx components are imported
  root.find(j.ImportDeclaration).forEach((path) => {
    const importSource = path.node.source.value;
    if (typeof importSource === "string") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const legacyComponent = (LEGACY_COMPONENTS as any)[importSource];
      if (legacyComponent) {
        const newImport = j.importDeclaration(
          [j.importSpecifier(j.identifier(legacyComponent))],
          j.literal("@ember/legacy-built-in-components"),
        );

        j(path).replaceWith(newImport);
      }
    }
  });

  return root.toSource({ quote: "single", objectCurlySpacing: false });
}
