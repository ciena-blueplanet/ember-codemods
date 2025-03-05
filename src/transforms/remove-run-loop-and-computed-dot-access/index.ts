import {
  API,
  FileInfo,
  ImportDeclaration,
  JSCodeshift,
  Options,
} from "jscodeshift";

export const parser = "ts";

const COMPUTED_METHODS = new Set([
  "alias",
  "and",
  "bool",
  "collect",
  "deprecatingAlias",
  "empty",
  "equal",
  "filterBy",
  "filter",
  "gte",
  "gt",
  "intersect",
  "lte",
  "lt",
  "mapBy",
  "map",
  "match",
  "max",
  "min",
  "none",
  "notEmpty",
  "not",
  "oneWay",
  "or",
  "readOnly",
  "setDiff",
  "sort",
  "sum",
  "union",
  "uniqBy",
  "uniq",
]);

const RUN_METHODS = new Set([
  "backburner",
  "begin",
  "bind",
  "cancel",
  "debounce",
  "end",
  "hasScheduledTimers",
  "join",
  "later",
  "next",
  "once",
  "schedule",
  "scheduleOnce",
  "throttle",
  "cancelTimers",
]);

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options,
) {
  const j: JSCodeshift = api.jscodeshift;
  const root = j(file.source, options);

  const computedImports = new Set<string>();
  const runImports = new Set<string>();
  let hasComputedUsage = false;
  let hasRunUsage = false;

  // check for computed.method usage
  root
    .find(j.MemberExpression, {
      object: { type: "Identifier", name: "computed" },
      property: { type: "Identifier" },
    })
    .forEach((path) => {
      const value = path.value;
      if (
        j.Identifier.check(value.object) &&
        j.Identifier.check(value.property)
      ) {
        const methodName = value.property.name;
        if (COMPUTED_METHODS.has(methodName)) {
          hasComputedUsage = true;
          computedImports.add(methodName);
          j(path).replaceWith(j.identifier(methodName));
        }
      }
    });

  // check for run.method usage
  root
    .find(j.MemberExpression, {
      object: { type: "Identifier", name: "run" },
      property: { type: "Identifier" },
    })
    .forEach((path) => {
      const value = path.value;
      if (
        j.Identifier.check(value.object) &&
        j.Identifier.check(value.property)
      ) {
        const methodName = value.property.name;
        if (RUN_METHODS.has(methodName)) {
          hasRunUsage = true;
          runImports.add(methodName);
          j(path).replaceWith(j.identifier(methodName));
        }
      }
    });

  // check if run or import are still used elsewhere
  const isComputedRequired =
    root
      .find(j.CallExpression, {
        callee: { type: "Identifier", name: "computed" },
      })
      .size() > 0 ||
    root
      .find(j.MemberExpression, {
        object: { type: "Identifier", name: "computed" },
      })
      .size() > 0;
  const isRunRequired =
    root
      .find(j.CallExpression, { callee: { type: "Identifier", name: "run" } })
      .size() > 0 ||
    root
      .find(j.MemberExpression, {
        object: { type: "Identifier", name: "run" },
      })
      .size() > 0;

  if (hasComputedUsage || hasRunUsage) {
    // Remove existing comuted/run imports
    root.find(j.ImportDeclaration).forEach((path) => {
      const node = path.value as ImportDeclaration;
      console.log("isComputedRequired", isComputedRequired);
      console.log("node.source.value", node.source.value);
      if (node.source.value === "@ember/object" && !isComputedRequired) {
        console.log("isComputedRequired is false", isComputedRequired);
        node.specifiers = node.specifiers?.filter(
          (spec) =>
            spec.type === "ImportSpecifier" &&
            spec.imported.name !== "computed",
        );
        console.log("node.specifiers.length", (node.specifiers || []).length);
      }
      if (node.source.value === "@ember/runloop" && !isRunRequired) {
        console.log("isRunRequired", isRunRequired);
        node.specifiers = node.specifiers?.filter(
          (spec) =>
            spec.type === "ImportSpecifier" && spec.imported.name !== "run",
        );
        console.log("node.specifiers.length", (node.specifiers || []).length);
      }

      if (node.specifiers?.length === 0) {
        j(path).remove();
      }
    });

    //Insert new imports
    if (runImports.size > 0) {
      const newRunImport = j.importDeclaration(
        Array.from(runImports).map((method) =>
          j.importSpecifier(j.identifier(method)),
        ),
        j.literal("@ember/runloop"),
      );
      root.get().node.program.body.unshift(newRunImport);
    }

    if (computedImports.size > 0) {
      const newComutedImports = j.importDeclaration(
        Array.from(computedImports).map((method) =>
          j.importSpecifier(j.identifier(method)),
        ),
        j.literal("@ember/object/computed"),
      );
      root.get().node.program.body.unshift(newComutedImports);
    }
  }

  return root.toSource({ quote: "single", objectCurlySpacing: false });
}
