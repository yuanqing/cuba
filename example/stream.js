const cuba = require('../')
const Transform = require('stream').Transform
;(async function () {
  const database = cuba('1tXLr47ArNQjICWWDtXCABXPH__rlK0yxPsfAzpqysi8')
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
