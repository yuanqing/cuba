const JWT = require('google-auth-library').JWT
const promisify = require('util').promisify

const scopes = ['https://spreadsheets.google.com/feeds']

module.exports = async function (serviceAccountCredentials) {
  const jwtClient = new JWT({
    email:
      serviceAccountCredentials.clientEmail ||
      serviceAccountCredentials.client_email,
    key:
      serviceAccountCredentials.privateKey ||
      serviceAccountCredentials.private_key,
    scopes
  })
  const authorize = promisify(jwtClient.authorize).bind(jwtClient)
  const accessToken = await authorize()
  return accessToken.access_token
}
