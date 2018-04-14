const buildUrl = require('./build-url')
const createGoogleApiClient = require('./google-api-client')
const parse = require('./parse')

const selectAllQuery = 'select *'

function identity (object) {
  return object
}

class Cuba {
  constructor (spreadsheetId, googleApiClient) {
    this.spreadsheetId = spreadsheetId
    this.googleApiClient = googleApiClient
  }

  async query (query, options) {
    const url = buildUrl(this.spreadsheetId, query || selectAllQuery, options)
    const json = await this.googleApiClient.request(url)
    return parse(json.table, (options && options.transform) || identity)
  }

  async queryStream (query, options) {
    const url = buildUrl(this.spreadsheetId, query || selectAllQuery, options)
    const jsonStream = await this.googleApiClient.requestStream(url)
    return jsonStream.pipe(
      parse.stream((options && options.transform) || identity)
    )
  }
}

async function createCuba (spreadsheetId, serviceAccountCredentials) {
  if (spreadsheetId == null) {
    throw new Error('Need a spreadsheet ID')
  }
  const googleApiClient = await createGoogleApiClient(serviceAccountCredentials)
  return new Cuba(spreadsheetId, googleApiClient)
}

module.exports = createCuba
