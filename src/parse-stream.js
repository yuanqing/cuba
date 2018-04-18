const duplexer = require('duplexer')
const parseJson = require('JSONStream').parse
const Readable = require('stream').Readable

const parseColumns = require('./parse-columns')
const parseRow = require('./parse-row')

module.exports = function (transform) {
  const readableStream = new Readable({
    objectMode: true,
    read: function () {}
  })
  const parseRowStream = parseJson('table.rows.*.c')
  let schema = null
  parseRowStream.on('header', function (data) {
    if (data.cols == null) {
      readableStream.emit('error')
      readableStream.push(null)
      return
    }
    schema = parseColumns(data.cols)
  })
  parseRowStream.on('data', function (data) {
    readableStream.push(parseRow(schema, data, transform))
  })
  parseRowStream.on('end', function () {
    readableStream.push(null)
  })
  return duplexer(parseRowStream, readableStream)
}
