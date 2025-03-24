import {Component} from 'frost-core-components'

const {merge} = Ember

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

    return Ember.merge(options, {
      A: 'B'
    })
  }
})
