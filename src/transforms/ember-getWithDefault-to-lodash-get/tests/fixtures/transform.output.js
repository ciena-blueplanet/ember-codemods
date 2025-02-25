import get from 'lodash/get';
import {computed} from '@ember/object';

export default Component.extend({
  test: computed('foo', function () {
    const bar = get(foo, 'bar', '');
    const baz = get(this, qux, '');
    return [bar, baz]
  }).readOnly()
})
