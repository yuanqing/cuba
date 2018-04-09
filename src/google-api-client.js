const request = require('./request')
const getAccessToken = require('./get-access-token')
const sanitiseResponse = require('./sanitise-response')

class GoogleApiClient {
  constructor (accessToken, accessTokenExpiry) {
    this.accessToken = accessToken
    this.accessTokenExpiry = accessTokenExpiry
  }

  static async new (options) {
    if (options == null) {
      return new GoogleApiClient()
    }
    const accessToken = await getAccessToken(
      options.clientEmail,
      options.privateKey
    )
    return new GoogleApiClient(
      accessToken.accessToken,
      accessToken.accessTokenExpiry
    )
  }

  async request (url) {
    const response = await request(url, this.accessToken)
    const text = sanitiseResponse(await response.text())
    const json = JSON.parse(text)
    if (json.errors) {
      throw new Error(json.errors[0].detailed_message)
    }
    return json
  }

  async requestStream (url) {
    const response = await request(url, this.accessToken)
    return response.body.pipe(sanitiseResponse.stream())
  }
}

module.exports = GoogleApiClient
