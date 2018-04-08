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
        this.push(string.replace(responsePrefixJunkRegex, ''))
      } else {
        this.push(string)
      }
      callback()
    }
  })
}

module.exports = sanitiseResponse
module.exports.stream = sanitiseResponseStream
