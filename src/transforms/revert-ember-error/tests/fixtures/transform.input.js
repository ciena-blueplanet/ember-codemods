import EmberError from '@ember/error'
import {Component} from 'frost-core-components'

export default Component.extend({
  // == Functions =============================================================
  getPercent (section, total) {
    throw new EmberError('err')
  }
})
