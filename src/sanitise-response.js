const Transform = require('stream').Transform

const responsePrefixJunkRegex = /^\)]\}'\n/

function sanitiseResponse (response) {
  return response.replace(responsePrefixJunkRegex, '')
}

function sanitiseResponseStream () {
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

module.exports = sanitiseResponse
module.exports.stream = sanitiseResponseStream
