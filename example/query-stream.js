const cuba = require('..').queryStream
const Transform = require('stream').Transform

async function main () {
  const queryStream = await cuba('1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU')
  const stream = await queryStream('select *')
  stream.pipe(
    new Transform({
      objectMode: true,
      transform: function (data, encoding, callback) {
        console.log(data)
        callback()
      }
    })
  )
}
main()
