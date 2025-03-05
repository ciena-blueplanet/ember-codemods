import {once, next} from '@ember/runloop';
import {run} from '@ember/runloop';

once(this, 'draw')
next(() =>
  doSomething()
)