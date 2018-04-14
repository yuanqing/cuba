const cuba = require('..')
const serviceAccountCredentials = require('./service-account-credentials.json')
const Transform = require('stream').Transform
;(async function () {
  const spreadsheet = await cuba(
    '1ZlDwhcOm0dE23mtRvbmSZNn3i6eKgHHrfwHHK0xH-fM',
    serviceAccountCredentials
  )
  const stream = await spreadsheet.queryStream('select *')
  stream.pipe(
    new Transform({
      objectMode: true,
      transform: function (data, encoding, callback) {
        console.log(data)
        callback()
      }
    })
  )
})()
