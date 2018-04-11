const buildUrl = require('./build-url')
const createGoogleApiClient = require('./google-api-client')
const parse = require('./parse')

const selectAllQuery = 'select *'

class Cuba {
  constructor (id, googleApiClient) {
    this.id = id
    this.googleApiClient = googleApiClient
  }

  async query (query, options) {
    const url = buildUrl(this.id, query || selectAllQuery, options)
    const json = await this.googleApiClient.request(url)
    return parse(json.table)
  }

  async queryStream (query, options) {
    const url = buildUrl(this.id, query || selectAllQuery, options)
    const jsonStream = await this.googleApiClient.requestStream(url)
    return jsonStream.pipe(parse.stream())
  }
}

async function createCuba (id, serviceAccountKey) {
  if (id == null) {
    throw new Error('Need an ID')
  }
  const googleApiClient = await createGoogleApiClient(serviceAccountKey)
  return new Cuba(id, googleApiClient)
}

module.exports = createCuba
