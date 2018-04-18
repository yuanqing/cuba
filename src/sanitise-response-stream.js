const Transform = require('stream').Transform
const sanitiseResponse = require('./sanitise-response')

module.exports = function () {
  let isFirstChunk = true
  return new Transform({
    transform (chunk, encoding, callback) {
      const response = chunk.toString()
      if (isFirstChunk) {
        isFirstChunk = false
        callback(null, sanitiseResponse(response))
        return
      }
      callback(null, response)
    }
  })
}
