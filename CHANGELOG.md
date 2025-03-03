# @ciena-org/ember-codemods

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
