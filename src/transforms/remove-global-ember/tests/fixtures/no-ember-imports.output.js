import {Component} from 'frost-core-components'

import Ember from 'ember';

const {testing} = Ember

export default Component.extend({
  // == Functions =============================================================
  getTesting () {
    return testing
  }
})
