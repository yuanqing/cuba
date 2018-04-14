const cuba = require('..')
const serviceAccountCredentials = require('./service-account-credentials.json')
const Transform = require('stream').Transform

cuba('1ZlDwhcOm0dE23mtRvbmSZNn3i6eKgHHrfwHHK0xH-fM', serviceAccountCredentials)
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
