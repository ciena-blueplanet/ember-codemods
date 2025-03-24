import {Component} from 'frost-core-components'

const {assign, merge} = Ember

export default Component.extend({

  // == Functions =============================================================
  setOptions () {
    const options = {}

    merge(options, {
      A: 'B'
    })

    const some = assign(options, {
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
