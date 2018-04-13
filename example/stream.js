const Transform = require('stream').Transform

const cuba = require('../')
const serviceAccountKey = require('./key.json')
;(async function () {
  const spreadsheet = await cuba(
    '1jarTHL5x2r-YOY4y7fdUWfMyW419xhz031PKrnZpHJo',
    serviceAccountKey
  )
  const query = 'select *'
  const stream = await spreadsheet.queryStream(query)
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
