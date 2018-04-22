const buildUrl = require('../build-url')
const defaultQuery = require('../default-query')
const fetch = require('../fetch')
const identity = require('../identity')
const parse = require('../array/parse')
const sanitiseResponse = require('../array/sanitise-response')

module.exports = async function (spreadsheetId, query, options) {
  if (spreadsheetId == null) {
    throw new Error('Need a spreadsheet ID')
  }
  const url = buildUrl(spreadsheetId, query || defaultQuery, options)
  const response = await fetch(url)
  const text = sanitiseResponse(await response.text())
  const json = JSON.parse(text)
  if (json.errors) {
    throw new Error(json.errors[0].detailed_message)
  }
  return parse(json.table, (options && options.transform) || identity)
}
