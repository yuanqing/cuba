const buildUrl = require('../build-url')
const googleApiClient = require('./google-api-client')
const identity = require('../identity')
const parse = require('./parse')

const defaultQuery = 'select *'

module.exports = async function (spreadsheetId, serviceAccountCredentials) {
  if (spreadsheetId == null) {
    throw new Error('Need a spreadsheet ID')
  }
  const request = googleApiClient(serviceAccountCredentials || {})
  return async function (query, options) {
    const url = buildUrl(spreadsheetId, query || defaultQuery, options)
    const jsonStream = await request(url)
    return jsonStream.pipe(parse((options && options.transform) || identity))
  }
}
