import {Component} from 'frost-core-components'

const {assign, other} = Ember

export default Component.extend({

  // == Functions =============================================================
  setOptions () {
    const options = {}

    assign(options, {
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
