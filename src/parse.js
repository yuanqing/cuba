const duplexer = require('duplexer')
const parseJson = require('JSONStream').parse
const Readable = require('stream').Readable

function parseColumns (columns) {
  return columns.map(function (column) {
    return column.label || column.id
  })
}

function parseRow (schema, row) {
  return row.reduce(function (result, cell, index) {
    result[schema[index]] = cell ? cell.v : null
    return result
  }, {})
}

function parse (table) {
  const schema = parseColumns(table.cols)
  return table.rows.map(function (row) {
    return parseRow(schema, row.c)
  })
}

function parseStream () {
  const readableStream = new Readable({
    objectMode: true,
    read: function () {}
  })
  const parseRowStream = parseJson('table.rows.*.c')
  let schema = null
  parseRowStream.on('header', function (data) {
    schema = parseColumns(data.cols)
  })
  parseRowStream.on('data', function (data) {
    readableStream.push(parseRow(schema, data))
  })
  parseRowStream.on('end', function () {
    readableStream.push(null)
  })
  return duplexer(parseRowStream, readableStream)
}

module.exports = parse
module.exports.stream = parseStream
