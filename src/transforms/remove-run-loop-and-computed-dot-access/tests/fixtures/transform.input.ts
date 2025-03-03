import {run} from '@ember/runloop';

run.once(this, 'draw')
run.next(() =>
  doSomething()
)