'use strict'

module.exports = function (environment) {
  const ENV = {
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        String: true,
        Date: false
      }
    }
  }

  return ENV
}
