import {sort, or} from '@ember/object/computed';
import {later} from '@ember/runloop';

const sortedItems = sort('items', 'sortConfig');
const foo = or('isRadiusUserSelected', 'isTacacsPlusUserSelected');

later(() => {
  this.someValue = false
}, 100);