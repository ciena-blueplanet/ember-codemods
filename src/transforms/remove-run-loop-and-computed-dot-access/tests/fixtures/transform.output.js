import {later} from '@ember/runloop';
import {sort, or} from '@ember/object/computed';

const sortedItems = sort('items', 'sortConfig');
const foo = or('isRadiusUserSelected', 'isTacacsPlusUserSelected');

later(() => {
  this.someValue = false
}, 100);