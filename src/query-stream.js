const buildUrl = require('./build-url')
const createGoogleApiClient = require('./google-api-client')
const identity = require('./identity')
const parseStream = require('./parse-stream')

const defaultQuery = 'select *'

module.exports = async function (spreadsheetId, serviceAccountCredentials) {
  if (spreadsheetId == null) {
    throw new Error('Need a spreadsheet ID')
  }
  const googleApiClient = await createGoogleApiClient(serviceAccountCredentials)
  return async function (query, options) {
    const url = buildUrl(spreadsheetId, query || defaultQuery, options)
    const jsonStream = await googleApiClient.requestStream(url)
    return jsonStream.pipe(
      parseStream((options && options.transform) || identity)
    )
  }
}
