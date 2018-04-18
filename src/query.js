const buildUrl = require('./build-url')
const createGoogleApiClient = require('./google-api-client')
const identity = require('./identity')
const parse = require('./parse')

const defaultQuery = 'select *'

module.exports = async function (spreadsheetId, serviceAccountCredentials) {
  if (spreadsheetId == null) {
    throw new Error('Need a spreadsheet ID')
  }
  const googleApiClient = await createGoogleApiClient(serviceAccountCredentials)
  return async function (query, options) {
    const url = buildUrl(spreadsheetId, query || defaultQuery, options)
    const json = await googleApiClient.request(url)
    return parse(json.table, (options && options.transform) || identity)
  }
}
