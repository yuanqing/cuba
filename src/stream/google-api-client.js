const fetch = require('../fetch')
const sanitiseResponse = require('./sanitise-response')

module.exports = function (getAccessToken) {
  return async function (url, serviceAccountCredentials) {
    const accessToken = getAccessToken
      ? await getAccessToken(serviceAccountCredentials || {})
      : null
    const response = await fetch(url, accessToken)
    return response.body.pipe(sanitiseResponse())
  }
}
