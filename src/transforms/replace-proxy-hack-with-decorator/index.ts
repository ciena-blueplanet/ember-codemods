import { addImport } from "#utils/transforms/import.js";
import type { API, Collection, FileInfo } from "jscodeshift";
import type { Options } from "jscodeshift";

export const parser = "ts";

function handleProxyHack({
  api,
  api: { jscodeshift: j },
  root,
  proxyMacro,
  actualMacro,
}: {
  api: API;
  root: Collection;
  proxyMacro: "proxyAttr" | "proxyBelongsTo" | "proxyHasMany";
  actualMacro: string;
}): boolean {
  const proxyRelationships = root
    .find(j.Identifier)
    .filter((p) => {
      return p.value.name === proxyMacro;
    })
    .closest(j.CallExpression)
    .forEach((p) => {
      p.value.callee = j.identifier(actualMacro);
    });

  if (proxyRelationships.length > 0) {
    addImport({
      api,
      root,
      source: "@ember-data/model",
      specifier: actualMacro,
    });
    return true;
  }

  return false;
}

function addProxyDecorator({
  api,
  api: { jscodeshift: j },
  root,
}: {
  api: API;
  root: Collection;
}) {
  addImport({
    api,
    root,
    source: "@ice/data/utils/decorators/model",
    specifier: "expectationProxy",
  });

  const exportedModelObject = root
    .find(j.ExportDefaultDeclaration)
    .find(j.CallExpression)
    .filter(
      (p) =>
        p.value.callee.type === "MemberExpression" &&
        p.value.callee.object.type === "Identifier" &&
        p.value.callee.object.name === "Model",
    );

  if (exportedModelObject.length === 1) {
    exportedModelObject.replaceWith(
      j.callExpression(
        j.callExpression(j.identifier("expectationProxy"), []),
        exportedModelObject.nodes(),
      ),
    );
    return;
  }
}

export default function transformer(
  fileInfo: FileInfo,
  api: API,
  options: Options,
) {
  const j = api.jscodeshift;

  // Get the root of the current file's AST
  const root = j(fileInfo.source, options);

  let hasProxyHack = handleProxyHack({
    api,
    root,
    proxyMacro: "proxyAttr",
    actualMacro: "attr",
  });

  hasProxyHack = handleProxyHack({
    api,
    root,
    proxyMacro: "proxyBelongsTo",
    actualMacro: "belongsTo",
  });

  hasProxyHack = handleProxyHack({
    api,
    root,
    proxyMacro: "proxyHasMany",
    actualMacro: "hasMany",
  });

  if (hasProxyHack) {
    addProxyDecorator({ api, root });

    const proxyMacroImport = root
      .find(j.ImportDeclaration)
      .filter(
        (p) =>
          p.value.source.value === "@ice/data/utils/macros/ember-data/proxy",
      );

    proxyMacroImport.remove();
  }

  // Return the modified code
  return root.toSource({ quote: "single", objectCurlySpacing: false });
}
