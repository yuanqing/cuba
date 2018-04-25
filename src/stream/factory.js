const buildUrl = require('../build-url')
const googleApiClient = require('./google-api-client')
const parse = require('./parse')

module.exports = function (getAccessToken) {
  return function (spreadsheetId, serviceAccountCredentials) {
    if (spreadsheetId == null) {
      throw new Error('Need a spreadsheet ID')
    }
    const request = googleApiClient(getAccessToken)
    return async function (query, options) {
      const url = buildUrl(spreadsheetId, query, options)
      const jsonStream = await request(url, serviceAccountCredentials)
      return jsonStream.pipe(parse(options && options.transform))
    }
  }
}
