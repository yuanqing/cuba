const cuba = require('..').queryStream
const Transform = require('stream').Transform
const serviceAccountCredentials = require('../service-account-credentials.json')

async function main () {
  const queryStream = await cuba(
    '1ZlDwhcOm0dE23mtRvbmSZNn3i6eKgHHrfwHHK0xH-fM',
    serviceAccountCredentials
  )
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
