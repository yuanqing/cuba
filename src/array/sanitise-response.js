const startLength = '/*O_o*/\ngoogle.visualization.Query.setResponse('.length
const endLength = ');'.length

module.exports = function (response) {
  return response.substring(startLength, response.length - endLength)
}
