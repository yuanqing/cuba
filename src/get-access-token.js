const fetch = require('./fetch')
const sign = require('jws/lib/sign-stream').sign

const authURI = 'https://www.googleapis.com/oauth2/v4/token'
const grantType = encodeURIComponent(
  'urn:ietf:params:oauth:grant-type:jwt-bearer'
)
const scope = 'https://spreadsheets.google.com/feeds'

function createJwtClaimSet (clientEmail) {
  const iat = Math.floor(new Date().getTime() / 1000)
  const exp = iat + 3600 // 3600 seconds = 1 hour
  return {
    iss: clientEmail,
    scope,
    aud: authURI,
    exp,
    iat
  }
}

function createSignedJwt (clientEmail, privateKey) {
  return sign({
    header: {
      alg: 'RS256'
    },
    payload: createJwtClaimSet(clientEmail),
    secret: privateKey
  })
}

let accessToken = {}

module.exports = async function (serviceAccountCredentials) {
  const clientEmail =
    serviceAccountCredentials.clientEmail ||
    serviceAccountCredentials.client_email
  const privateKey =
    serviceAccountCredentials.privateKey ||
    serviceAccountCredentials.private_key

  if (accessToken && accessToken.expiry > new Date().getTime()) {
    return accessToken.accessToken
  }
  const assertion = createSignedJwt(clientEmail, privateKey)
  const response = await fetch(
    authURI,
    'POST',
    {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    `grant_type=${grantType}&assertion=${assertion}`
  )
  const text = await response.text()
  const json = JSON.parse(text)
  accessToken = {
    accessToken: json.access_token,
    expiry: json.expires_in
  }
  return accessToken.accessToken
}
