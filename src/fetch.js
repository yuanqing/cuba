const fetch =
  typeof window === 'undefined' ? require('node-fetch') : window.fetch

module.exports = function (url, accessToken) {
  return fetch(url, {
    method: 'GET',
    headers: accessToken
      ? {
        Authorization: `Bearer ${accessToken}`
      }
      : {}
  })
}
