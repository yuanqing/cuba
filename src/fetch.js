const fetch = require('isomorphic-unfetch')

module.exports = async function (url, accessToken) {
  return fetch(url, accessToken && {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}
