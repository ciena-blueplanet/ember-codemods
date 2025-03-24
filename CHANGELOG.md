# @ciena-org/ember-codemods

## 0.3.7

### Patch Changes

- b3c4e9d: Handle ember/polyfills merge deprecation

## 0.3.6

### Patch Changes

- c796a13: Add `ember-code-snippets-helper` transform that can be used when updating `ember-code-snippets` to v3

## 0.3.5

### Patch Changes

- b8d61e3: Preserve the import statements for computed and run in the remove-run-loop-and-computed-dot-access transform if required
- af2a2ec: Add support for non-string routes and non-positional routes to link-to-positional transform
- 49d007c: Fix attributes being removed by `link-to-positional` transform
- b4db25a: Disable string prototype config with ember-string-codemod transform

## 0.3.4

### Patch Changes

- a2bdce9: Add codemods for ember-polyfills.deprecate-assign and deprecate-auto-location"
- 3f80789: Add replace-with-syntax transform to address `ember-glimmer.with-syntax` deprecation

## 0.3.3

### Patch Changes

- b73507e: feat: Add remove-run-loop-and-computed-dot-access transform to address Run loop and computed dot access deprecation
- 9b47834: feat: Add `link-to-positional` transform to address `ember-glimmer.link-to-positional-arguments` deprecation
- 42b2e7c: Add built-in-components-import transform for handling legacy built in template imports

## 0.3.2

### Patch Changes

- c8dc45f: Add ember-getWithDefault-to-lodash-get codemode for ember-metal.getWithDefault deprecation
- b836e2a: feat: Add has-block transform to address has-block-and-has-block-params deprecation

## 0.3.1

### Patch Changes

- 3920191: feat: Add remove-global-ember transform

## 0.3.0

### Minor Changes

- 613a7f7: Add "ember-string-codemod" and "ember-string-htmlsafe-ishtmlsafe" codemods for ember-string.prototype-extensions and ember-string.from-ember-module deprecations respectively.

## 0.2.0

### Minor Changes

- 46977a6: Change package name from `pretty-good-ember-codemods` to `@ciena-org/ember-codemods`

## 0.1.1

### Patch Changes

- b20d99b: Use changeset publish in release action instead of npm publish

## 0.1.0

### Minor Changes

- a5a7304: Setup npm package and port over existing codemod
