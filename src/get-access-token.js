const JwtClient = require('google-auth-library').JWT
const promisify = require('util').promisify

const scopes = ['https://spreadsheets.google.com/feeds']

async function getAccessToken (clientEmail, privateKey) {
  // https://github.com/google/google-auth-library-nodejs#using-json-web-tokens
  const jwtClient = new JwtClient({
    email: clientEmail,
    key: privateKey,
    scopes
  })
  const authorize = promisify(jwtClient.authorize).bind(jwtClient)
  const accessToken = await authorize()
  return {
    accessToken: accessToken.access_token,
    accessTokenExpiry: accessToken.expiry_date
  }
}

module.exports = getAccessToken
