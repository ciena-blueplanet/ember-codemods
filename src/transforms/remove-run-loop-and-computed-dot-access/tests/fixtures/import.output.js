import {sort, or} from '@ember/object/computed';
import {computed, set} from '@ember/object';

const sortedItems = sort('items', 'sortConfig');
const foo = or('isRadiusUserSelected', 'isTacacsPlusUserSelected');
set(this, 'bar', 'baz');
const bar = computed('isRadiusUserSelected', function() {
  this.doSomthing()
});