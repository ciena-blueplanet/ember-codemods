import getWithDefault from 'lodash/get';
import _ from 'lodash';

const a = _.set(foo, 'bar', baz);
const b = getWithDefault(foo, 'bar', baz);
const c = getWithDefault(this, 'bar', baz);