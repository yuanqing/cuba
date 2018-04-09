const Transform = require('stream').Transform

const Cuba = require('../')
const credentials = require('./credentials.json')
;(async function () {
  const database = await Cuba.new(
    '1jarTHL5x2r-YOY4y7fdUWfMyW419xhz031PKrnZpHJo',
    credentials
  )
  const query = 'select *'
  const stream = await database.queryStream(query)
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
