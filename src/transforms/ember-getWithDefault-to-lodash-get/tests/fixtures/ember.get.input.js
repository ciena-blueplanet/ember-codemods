import {get, getWithDefault} from '@ember/object';

const a = get(foo, 'bar');
const b = getWithDefault(foo, 'bar', 'baz');