const Transform = require('stream').Transform

const responsePrefixJunkRegex = /^\)]\}'\n/

function sanitiseResponse (response) {
  return response.replace(responsePrefixJunkRegex, '')
}

function sanitiseResponseStream () {
  let isFirstChunk = true
  return new Transform({
    transform: function (chunk, encoding, callback) {
      const string = chunk.toString()
      if (isFirstChunk) {
        isFirstChunk = false
        callback(null, string.replace(responsePrefixJunkRegex, ''))
        return
      }
      callback(null, string)
    }
  })
}

module.exports = sanitiseResponse
module.exports.stream = sanitiseResponseStream
