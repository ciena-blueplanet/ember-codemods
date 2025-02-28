module.exports = function (environment) {
  const ENV = {
    rootURL: '/ui/',
    locationType: 'history',
  }

  if (environment === 'production') {
    ENV.locationType = 'hash'
  }
  return ENV
}
