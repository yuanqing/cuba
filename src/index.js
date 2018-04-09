const buildUrl = require('./build-url')
const GoogleApiClient = require('./google-api-client')
const parse = require('./parse')
const sanitiseResponse = require('./sanitise-response')

class Cuba {
  constructor (id, googleApiClient) {
    this.id = id
    this.googleApiClient = googleApiClient
  }

  static async new (id, options) {
    if (id == null) {
      throw new Error('Need an ID')
    }
    const googleApiClient = await GoogleApiClient.new(options)
    return new Cuba(id, googleApiClient)
  }

  async query (query, options) {
    const url = buildUrl(this.id, query, options)
    const response = await this.googleApiClient.request(url)
    const text = await response.text()
    const json = JSON.parse(sanitiseResponse(text))
    if (json.errors) {
      throw new Error(json.errors[0].detailed_message)
    }
    return parse(json.table)
  }

  async queryStream (query, options) {
    const url = buildUrl(this.id, query, options)
    const response = await this.googleApiClient.request(url)
    return response.body.pipe(sanitiseResponse.stream()).pipe(parse.stream())
  }
}

module.exports = Cuba
