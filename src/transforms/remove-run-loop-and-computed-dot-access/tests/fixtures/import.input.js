import {computed, set} from '@ember/object';

const sortedItems = computed.sort('items', 'sortConfig');
const foo = computed.or('isRadiusUserSelected', 'isTacacsPlusUserSelected');
set(this, 'bar', 'baz');