const fetch = require('isomorphic-unfetch')

module.exports = function (url, method, headers, body) {
  return fetch(url, {
    method,
    headers: headers || {},
    body
  })
}
