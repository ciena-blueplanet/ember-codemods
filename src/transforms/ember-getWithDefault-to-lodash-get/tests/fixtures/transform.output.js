import getWithDefault from 'lodash/get';
import {computed} from '@ember/object';

export default Component.extend({
  test: computed('foo', function () {
    const bar = getWithDefault(foo, 'bar', '');
    const baz = getWithDefault(this, qux, '');
    return [bar, baz]
  }).readOnly()
})
