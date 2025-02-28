import {computed, getWithDefault} from '@ember/object';

export default Component.extend({
  test: computed('foo', function () {
    const bar = getWithDefault(foo, 'bar', '');
    const baz = this.getWithDefault(qux, '');
    return [bar, baz]
  }).readOnly()
})
