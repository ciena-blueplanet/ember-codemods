import {once, next} from '@ember/runloop';

once(this, 'draw')
next(() =>
  doSomething()
)