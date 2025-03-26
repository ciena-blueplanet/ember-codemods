import Model, {attr, hasMany, belongsTo} from '@ember-data/model';
import {
  proxyAttr,
  proxyHasMany,
  proxyBelongsTo,
} from '@ice/data/utils/macros/ember-data/proxy';

export default Model.extends({
  foo: proxyAttr('string'),
  bar: proxyAttr(),
  baz: attr(),
  fooHasMany: proxyHasMany('foo', { async: true, inverse: null }),
  bazHasMany: hasMany('baz', {async: true, inverse: null}),
  barBelongsTo: proxyBelongsTo('foo', { async: true, inverse: null }),
  bazBelongsTo: belongsTo('baz', {async: true, inverse: null}),
});
