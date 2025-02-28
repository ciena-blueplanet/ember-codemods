import _get from 'lodash-es/get';
import {getWithDefault} from '@ember/object';

const a = _get(foo, 'bar');
const b = getWithDefault(foo, 'bar', 'baz');
const c = this.getWithDefault(foo, 'bar');