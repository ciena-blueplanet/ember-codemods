'use strict'

module.exports = function (environment) {
  const ENV = {
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false,
        String: false
      }
    }
  }

  return ENV
}
