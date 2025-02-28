export default class DashboardRoute {

  setOptions () {
    const options = {}

    Object.assign(options, {
      A: 'B'
    })
  }

  getOptions () {
    const options = {}

    return Object.assign(options, {
      A: 'B'
    });
  }
}
