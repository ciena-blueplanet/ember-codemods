import Model from '@ember-data/model';
import {
  proxyAttr,
  proxyHasMany,
  proxyBelongsTo,
} from '@ice/data/utils/macros/ember-data/proxy';

export default Model.extends({
  foo: proxyAttr('string'),
  bar: proxyAttr(),
  fooHasMany: proxyHasMany('foo', { async: true, inverse: null }),
  barBelongsTo: proxyBelongsTo('foo', { async: true, inverse: null }),
});
