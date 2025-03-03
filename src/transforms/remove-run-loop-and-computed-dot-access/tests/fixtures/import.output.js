import {sort, or} from '@ember/object/computed';
import {set} from '@ember/object';

const sortedItems = sort('items', 'sortConfig');
const foo = or('isRadiusUserSelected', 'isTacacsPlusUserSelected');
set(this, 'bar', 'baz');