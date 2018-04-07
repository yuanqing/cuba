const fetch = require('isomorphic-unfetch')

function buildSheetUrl (id, query, options) {
  options = options || {}
  const url = `https://docs.google.com/a/google.com/spreadsheets/d/${id}/gviz/tq?tq=${encodeURIComponent(
    query
  )}`
  if (options.sheetName) {
    return `${url}&sheet=${encodeURIComponent(options.sheetName)}`
  }
  if (options.sheetId) {
    return `${url}&gid=${options.sheetId}`
  }
  return url
}

function parseSchema (columns) {
  return columns.map(function (column) {
    return column.label || column.id
  })
}

function parseRows (schema, rows) {
  return rows.map(function (row) {
    return row.c.reduce(function (result, cell, index) {
      result[schema[index]] = cell.v
      return result
    }, {})
  })
}

function Cuba (id) {
  const self = this
  if (id == null) {
    throw new Error('Need a Google Sheet id')
  }
  if (!(self instanceof Cuba)) {
    return new Cuba(id)
  }
  self.id = id
  return self
}

const fetchOptions = {
  headers: {
    'X-DataSource-Auth': 'true'
  }
}
const regex = /^\)]\}'\n/

Cuba.prototype.query = async function (query, options) {
  const url = buildSheetUrl(this.id, query, options)
  const response = await fetch(url, fetchOptions)
  const text = await response.text()
  const json = JSON.parse(text.replace(regex, ''))
  if (json.errors) {
    throw new Error(json.errors[0].detailed_message)
  }
  const schema = parseSchema(json.table.cols)
  return parseRows(schema, json.table.rows)
}

module.exports = Cuba
