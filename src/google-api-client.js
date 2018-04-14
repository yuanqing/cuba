const request = require('./request')
const getAccessToken = require('./get-access-token')
const sanitiseResponse = require('./sanitise-response')

class GoogleApiClient {
  constructor (clientEmail, privateKey) {
    this.clientEmail = clientEmail
    this.privateKey = privateKey
  }

  async renewAccessToken () {
    if (this.clientEmail === null) {
      return
    }
    if (
      this.accessTokenExpiry == null ||
      this.accessTokenExpiry < +new Date()
    ) {
      const accessToken = await getAccessToken(
        this.clientEmail,
        this.privateKey
      )
      this.accessToken = accessToken.accessToken
      this.accessTokenExpiry = accessToken.accessTokenExpiry
    }
  }

  async request (url) {
    await this.renewAccessToken()
    const response = await request(url, this.accessToken)
    const text = sanitiseResponse(await response.text())
    const json = JSON.parse(text)
    if (json.errors) {
      throw new Error(json.errors[0].detailed_message)
    }
    return json
  }

  async requestStream (url) {
    await this.renewAccessToken()
    const response = await request(url, this.accessToken)
    return response.body.pipe(sanitiseResponse.stream())
  }
}

async function googleApiClient (serviceAccountCredentials) {
  if (serviceAccountCredentials == null) {
    return new GoogleApiClient(null, null)
  }
  const googleApiClient = new GoogleApiClient(
    serviceAccountCredentials.clientEmail ||
      serviceAccountCredentials.client_email,
    serviceAccountCredentials.privateKey ||
      serviceAccountCredentials.private_key
  )
  await googleApiClient.renewAccessToken()
  return googleApiClient
}

module.exports = googleApiClient
