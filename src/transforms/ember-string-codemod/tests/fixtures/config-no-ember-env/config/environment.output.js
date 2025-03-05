'use strict'

module.exports = function (environment) {
  const ENV = {
    EmberENV: {
      EXTEND_PROTOTYPES: {
        String: false
      }
    }
  }

  return ENV
}

