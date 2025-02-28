import {getWithDefault} from '@ember/object';
import _ from 'lodash';

const a = _.set(foo, 'bar', baz);
const b = getWithDefault(foo, 'bar', baz);
const c = this.getWithDefault('bar', baz);