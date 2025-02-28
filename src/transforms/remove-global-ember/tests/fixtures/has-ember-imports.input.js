import {other} from 'ember';
import {something} from 'ember'
import {Component} from 'frost-core-components'

const {testing} = Ember

export default Component.extend({
  // == Functions =============================================================
  getTesting () {
    return testing && other && something
  }
})
