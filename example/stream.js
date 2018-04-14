const cuba = require('..')
const Transform = require('stream').Transform
;(async function () {
  const spreadsheet = await cuba('1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU')
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
