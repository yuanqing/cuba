const Transform = require('stream').Transform

const newlineRegex = /\r?\n/g

function prettyPrintJson () {
  let isFirstChunk = true
  const stream = new Transform({
    objectMode: true,
    transform (chunk, encoding, callback) {
      const string = JSON.stringify(chunk, null, 2).replace(
        newlineRegex,
        '\n  '
      )
      if (isFirstChunk) {
        isFirstChunk = false
        callback(null, `[\n  ${string}`)
        return
      }
      callback(null, `,\n  ${string}`)
    },
    flush (callback) {
      callback(null, '\n]\n')
    }
  })
  return stream
}

module.exports = prettyPrintJson
