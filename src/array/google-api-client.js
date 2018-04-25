const fetch = require('../fetch')
const sanitiseResponse = require('./sanitise-response')

module.exports = function (getAccessToken) {
  return async function (url, serviceAccountCredentials) {
    const accessToken = getAccessToken && serviceAccountCredentials
      ? await getAccessToken(serviceAccountCredentials)
      : null
    const response = await fetch(url, accessToken)
    const text = sanitiseResponse(await response.text())
    const json = JSON.parse(text)
    if (json.errors) {
      throw new Error(json.errors[0].detailed_message)
    }
    return json
  }
}
