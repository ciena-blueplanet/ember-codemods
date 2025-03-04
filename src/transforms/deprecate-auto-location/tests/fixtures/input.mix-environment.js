module.exports = function (environment) {
  const ENV = {
    rootURL: '/ui/',
    locationType: 'auto',
  }

  if (environment === 'production') {
    ENV.locationType = 'hash'
  }
  return ENV
}
