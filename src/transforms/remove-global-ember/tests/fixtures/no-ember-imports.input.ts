import {Component} from 'frost-core-components'

const {testing} = Ember

export default Component.extend({
  // == Functions =============================================================
  getTesting (): boolean {
    return testing
  }
})
