const getAccessToken = require('../get-access-token')
const fetch = require('../fetch')
const sanitiseResponse = require('./sanitise-response')

module.exports = function (serviceAccountCredentials) {
  serviceAccountCredentials = serviceAccountCredentials || {}
  const clientEmail =
    serviceAccountCredentials.clientEmail ||
    serviceAccountCredentials.client_email
  const privateKey =
    serviceAccountCredentials.privateKey ||
    serviceAccountCredentials.private_key

  return async function (url) {
    const accessToken =
      clientEmail &&
      privateKey &&
      (await getAccessToken(clientEmail, privateKey))
    const response = await fetch(url, accessToken)
    const text = sanitiseResponse(await response.text())
    const json = JSON.parse(text)
    if (json.errors) {
      throw new Error(json.errors[0].detailed_message)
    }
    return json
  }
}
