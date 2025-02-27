import getWithDefault from 'lodash/get';
import {get} from '@ember/object';

const a = get(foo, 'bar');
const b = getWithDefault(foo, 'bar', 'baz');