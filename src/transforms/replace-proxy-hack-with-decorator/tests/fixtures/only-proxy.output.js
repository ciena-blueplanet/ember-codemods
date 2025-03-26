import Model, {attr, belongsTo, hasMany} from '@ember-data/model';
import {expectationProxy} from '@ice/data/utils/decorators/model';

export default expectationProxy()(Model.extends({
  foo: attr('string'),
  bar: attr(),
  fooHasMany: hasMany('foo', { async: true, inverse: null }),
  barBelongsTo: belongsTo('foo', { async: true, inverse: null }),
}));
