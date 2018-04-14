const cuba = require('..')
const serviceAccountKey = require('./key.json')
const Transform = require('stream').Transform

cuba('1pmu7es_1Wji_6G8EAvIjoMJvuJjqdr4_N8GoDLMTxC8')
  .then(function (spreadsheet) {
    return spreadsheet.queryStream('select *')
  })
  .then(function (stream) {
    stream.pipe(
      new Transform({
        objectMode: true,
        transform: function (data, encoding, callback) {
          console.log(data)
          callback()
        }
      })
    )
  })
