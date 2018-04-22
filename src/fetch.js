const fetch = require('isomorphic-unfetch')

module.exports = function (url, accessToken) {
  return fetch(
    url,
    accessToken && {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}
