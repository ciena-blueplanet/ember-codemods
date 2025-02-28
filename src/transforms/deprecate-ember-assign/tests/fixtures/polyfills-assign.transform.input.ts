import {assign} from '@ember/polyfills'

export default class DashboardRoute {

  setOptions () {
    const options = {}

    assign(options, {
      A: 'B'
    })
  }

  getOptions () {
    const options = {}

    return assign(options, {
      A: 'B'
    })
  }
}
