# @ciena-org/ember-codemods

[![node](https://img.shields.io/badge/node-18.20.0-339933?logo=nodedotjs)](https://nodejs.org/en/blog/release/v18.20.0)

A collection of codemods that can be run to quickly refactor Ember code.

## Usage
Replace `TRANSFORM` with one of the transforms listed below.

```
TRANSFORM="revert-computed-macro"; \
npx @ciena-org/ember-codemods $TRANSFORM path/of/files/ or/some**/*glob.js
```

## Transforms

### Deprecations

| Introduced in | Deprecation | Transform |
| ------------- | -- | --------- |
| 3.21          | [ember-metal.get-with-default](https://deprecations.emberjs.com/id/ember-metal-get-with-default) | [ember-getWithDefault-to-lodash-get](./src/transforms/ember-getWithDefault-to-lodash-get/) |
| 3.24          | [ember-string.prototype-extensions](https://deprecations.emberjs.com/id/ember-string-prototype-extensions)  | [ember-string-codemod](./src/transforms/ember-string-codemod/) |
| 3.25          | [ember-string.htmlsafe-ishtmlsafe](https://deprecations.emberjs.com/id/ember-string-htmlsafe-ishtmlsafe) | [ember-string-htmlsafe-ishtmlsafe](./src/transforms/ember-string-htmlsafe-ishtmlsafe/) |
| 3.26          | [ember-glimmer.link-to-positional-arguments](https://deprecations.emberjs.com/id/ember-glimmer-link-to-positional-arguments) | [link-to-positional](./src/transforms/link-to-positional) |
| 3.26          | [ember-glimmer.with-syntax](https://deprecations.emberjs.com/id/ember-glimmer-with-syntax) | [replace-with-styntax](./src/transforms/replace-with-syntax/) |
| 3.26          | [has-block-and-has-block-params](https://deprecations.emberjs.com/id/has-block-and-has-block-params) | [has-block](./src/transforms/has-block/) |
| 3.27          | [deprecated-run-loop-and-computed-dot-access](https://deprecations.emberjs.com/id/deprecated-run-loop-and-computed-dot-access) | [remove-run-loop-and-computed-dot-access](./src/transforms/remove-run-loop-and-computed-dot-access/)|
| 3.27          | [ember.built-in-components.import](https://deprecations.emberjs.com/id/ember-built-in-components-import) | [built-in-components-import](./src/transforms/built-in-components-import/)|
| 3.27          | [ember-global](https://deprecations.emberjs.com/id/ember-global) | [remove-global-ember](./src/transforms/remove-global-ember/) |
| 4.0           | [ember-polyfills.deprecate-assign](https://deprecations.emberjs.com/id/ember-polyfills-deprecate-assign) | [deprecate-ember-assign](./src/transforms/deprecate-ember-assign/) |
| 4.1           | [deprecate-auto-location](https://deprecations.emberjs.com/id/deprecate-auto-location) | [deprecate-auto-location](./src/transforms/deprecate-auto-location/) |
| 4.10          | [deprecate-ember-error](https://deprecations.emberjs.com/id/deprecate-ember-error) | [revert-ember-error](./src/transforms/revert-ember-error/) |
| 4.10          | [ember-string.from-ember-module](https://deprecations.emberjs.com/id/ember-string-from-ember-module) | [ember-string-codemod](./src/transforms/ember-string-codemod/) |

### Miscellaneous

| Transform | Description | Possible issues |
| --------- | ----------- | --------------- |
| [revert-computed-macro](./src/transforms/revert-computed-macro/)| Replace `computed` from `ember-macro-helpers` with `@ember/object` instead. | <ul><li>Will add variable even if not used from function before. Can just remove as need be (or PR fix), was not a common occurence in my code to have unused dependency</li></ul> |

## Contributing

If you are interested in helping contribute to this project, please take a look at our [Contributing Guide](./CONTRIBUTING.md).
