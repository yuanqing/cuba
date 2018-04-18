const fetch = require('isomorphic-unfetch')
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

module.exports = async function (clientEmail, privateKey) {
  const assertion = createSignedJwt(clientEmail, privateKey)
  const response = await fetch(authURI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=${grantType}&assertion=${assertion}`
  })
  const text = await response.text()
  const json = JSON.parse(text)
  return {
    accessToken: json.access_token,
    expiry: json.expires_in
  }
}
