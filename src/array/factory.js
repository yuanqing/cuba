const buildUrl = require('../build-url')
const defaultQuery = require('../default-query')
const googleApiClient = require('./google-api-client')
const identity = require('../identity')
const parse = require('./parse')

module.exports = function (getAccessToken) {
  return async function (spreadsheetId, serviceAccountCredentials) {
    if (spreadsheetId == null) {
      throw new Error('Need a spreadsheet ID')
    }
    const request = googleApiClient(getAccessToken)
    return async function (query, options) {
      const url = buildUrl(spreadsheetId, query || defaultQuery, options)
      const json = await request(url, serviceAccountCredentials)
      return parse(json.table, (options && options.transform) || identity)
    }
  }
}
