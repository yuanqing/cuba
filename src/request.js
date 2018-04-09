const fetch = require('isomorphic-unfetch')

async function request (url, accessToken) {
  const headers = {
    'X-DataSource-Auth': 'true'
  }
  if (accessToken) {
    // https://developers.google.com/identity/protocols/OAuth2ServiceAccount#callinganapi
    headers['Authorization'] = `Bearer ${accessToken}`
  }
  return fetch(url, {
    headers
  })
}

module.exports = request
