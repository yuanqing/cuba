const responsePrefixJunkRegex = /^\)]\}'\n/

module.exports = function (response) {
  return response.replace(responsePrefixJunkRegex, '')
}
