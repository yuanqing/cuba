const fetch = require('isomorphic-unfetch')
const sign = require('jws').sign

const scope = 'https://spreadsheets.google.com/feeds'
const authURI = 'https://www.googleapis.com/oauth2/v4/token'
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

const grantType = encodeURIComponent(
  'urn:ietf:params:oauth:grant-type:jwt-bearer'
)

async function getAccessToken (clientEmail, privateKey) {
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
    accessTokenExpiry: json.expires_in
  }
}

module.exports = getAccessToken
