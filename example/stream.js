const cuba = require('..')
const Transform = require('stream').Transform

async function main () {
  const query = await cuba.stream(
    '1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU'
  )
  const stream = await query('select *')
  stream.pipe(
    new Transform({
      objectMode: true,
      transform: function (data, encoding, callback) {
        console.log(data)
        // => { id: 1, name: 'foo' }
        // => { id: 2, name: 'bar' }
        // => { id: 3, name: 'baz' }
        callback()
      }
    })
  )
}
main()
