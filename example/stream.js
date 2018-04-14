const cuba = require('..')
const serviceAccountKey = require('./key.json')
const Transform = require('stream').Transform

cuba('1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU')
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
