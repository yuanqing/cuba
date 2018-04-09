const buildUrl = require('./build-url')
const GoogleApiClient = require('./google-api-client')
const parse = require('./parse')

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
    const json = await this.googleApiClient.request(url)
    return parse(json.table)
  }

  async queryStream (query, options) {
    const url = buildUrl(this.id, query, options)
    const jsonStream = await this.googleApiClient.requestStream(url)
    return jsonStream.pipe(parse.stream())
  }
}

module.exports = Cuba
