import {Component} from 'frost-core-components'

const {
  other
} = Ember

export default Component.extend({

  // == Functions =============================================================
  setOptions () {
    const options = {}

    Object.assign(options, {
      A: 'B'
    })

    Component.assign(options, {
      A: 'B'
    })
  },

  getOptions () {
    const options = {}

    return Object.assign(options, {
      A: 'B'
    });
  }
})
