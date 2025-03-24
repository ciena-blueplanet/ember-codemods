import {merge, some} from '@ember/polyfills'
import {Component} from 'frost-core-components'

export default Component.extend({

  // == Functions =============================================================
  setOptions () {
    const options = {}

    merge(options, {
      A: 'B'
    })

    Component.assign(options, {
      A: 'B'
    })
  },

  getOptions () {
    const options = {}

    return Ember.assign(options, {
      A: 'B'
    })
  }
})
