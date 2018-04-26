const fetch =
  typeof window === 'undefined' ? require('node-fetch') : window.fetch

module.exports = function (url, method, headers, body) {
  return fetch(url, {
    method,
    headers: headers || {},
    body
  })
}
