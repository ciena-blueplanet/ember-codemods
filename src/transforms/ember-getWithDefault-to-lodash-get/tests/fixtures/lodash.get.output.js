import _get from 'lodash-es/get';

const a = _get(foo, 'bar');
const b = _get(foo, 'bar', 'baz');
const c = _get(this, foo, 'bar');