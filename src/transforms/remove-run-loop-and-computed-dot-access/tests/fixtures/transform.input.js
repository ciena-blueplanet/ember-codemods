import {run} from '@ember/runloop';
import {computed} from '@ember/object';

const sortedItems = computed.sort('items', 'sortConfig');
const foo = computed.or('isRadiusUserSelected', 'isTacacsPlusUserSelected');

run.later(() => {
  this.someValue = false
}, 100);