const unfetch = require('isomorphic-unfetch')

const fetchOptions = {
  headers: {
    'X-DataSource-Auth': 'true'
  }
}
async function fetch (url) {
  return unfetch(url, fetchOptions)
}

module.exports = fetch
