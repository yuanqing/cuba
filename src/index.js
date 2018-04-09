const buildUrl = require('./build-url')
const GoogleApiClient = require('./google-api-client')
const parse = require('./parse')
const sanitiseResponse = require('./sanitise-response')

class Cuba {
  constructor (id, googleApiClient) {
    if (id == null) {
      throw new Error('Need an ID')
    }
    this.id = id
    this.googleApiClient = googleApiClient
  }

  static async new (id, options) {
    options = options || {}
    const googleApiClient = await GoogleApiClient.new(
      options.clientEmail,
      options.privateKey
    )
    return new Promise(function (resolve) {
      resolve(new Cuba(id, googleApiClient))
    })
  }

  async query (query, options) {
    const url = buildUrl(this.id, query, options)
    const response = await this.googleApiClient.request(url)
    const json = JSON.parse(sanitiseResponse(response.data))
    if (json.errors) {
      throw new Error(json.errors[0].detailed_message)
    }
    return parse(json.table)
  }

  async queryStream (query, options) {
    const url = buildUrl(this.id, query, options)
    const response = await this.googleApiClient.requestStream(url)
    return response.data.pipe(sanitiseResponse.stream()).pipe(parse.stream())
  }
}

module.exports = Cuba
