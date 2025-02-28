module.exports = function (environment) {
  const ENV = {
    rootURL: '/ui/',
    locationType: 'hash',
  }

  if (environment === 'production') {
    ENV.locationType = 'hash'
  }
  return ENV
}
