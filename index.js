const fetch = require('isomorphic-unfetch')

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
  if (typeof id === 'undefined') {
    throw new Error('Need a Google Sheet id')
  }
  if (!(self instanceof Cuba)) {
    return new Cuba(id)
  }
  self.id = id
  return self
}

const options = {
  headers: {
    'X-DataSource-Auth': 'true'
  }
}
const regex = /^\)]\}'\n/

Cuba.prototype.query = async function (query) {
  const url = `https://docs.google.com/a/google.com/spreadsheets/d/${
    this.id
  }/gviz/tq?tq=${encodeURIComponent(query)}`
  const result = await fetch(url, options)
  const text = await result.text()
  const json = JSON.parse(text.replace(regex, '')).table
  const schema = parseSchema(json.cols)
  return parseRows(schema, json.rows)
}

module.exports = Cuba
