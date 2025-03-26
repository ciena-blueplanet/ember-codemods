import Model, {attr, hasMany, belongsTo} from '@ember-data/model';
import {expectationProxy} from '@ice/data/utils/decorators/model';

export default expectationProxy()(Model.extends({
  foo: attr('string'),
  bar: attr(),
  baz: attr(),
  fooHasMany: hasMany('foo', { async: true, inverse: null }),
  bazHasMany: hasMany('baz', {async: true, inverse: null}),
  barBelongsTo: belongsTo('foo', { async: true, inverse: null }),
  bazBelongsTo: belongsTo('baz', {async: true, inverse: null}),
}));
