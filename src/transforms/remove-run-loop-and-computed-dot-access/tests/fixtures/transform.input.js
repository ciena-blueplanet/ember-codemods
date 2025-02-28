import {computed} from '@ember/object';
import {run} from '@ember/runloop';

const sortedItems = computed.sort('items', 'sortConfig');
const foo = computed.or('isRadiusUserSelected', 'isTacacsPlusUserSelected');

run.later(() => {
  this.someValue = false
}, 100);