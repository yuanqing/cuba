const fetch = require('isomorphic-unfetch')
const JwtClient = require('google-auth-library').JWT

const headers = {
  'X-DataSource-Auth': 'true'
}

class GoogleApiClient {
  constructor (accessToken, accessTokenExpiry) {
    this.accessToken = accessToken
    this.accessTokenExpiry = accessTokenExpiry
  }

  static async new (options) {
    if (options == null) {
      return Promise.resolve(new GoogleApiClient())
    }
    const client = new JwtClient({
      email: options.clientEmail,
      key: options.privateKey,
      scopes: ['https://spreadsheets.google.com/feeds']
    })
    return new Promise(function (resolve, reject) {
      client.authorize(function (error, token) {
        if (error) {
          reject(error)
          return
        }
        resolve(new GoogleApiClient(token.access_token, token.expiry_date))
      })
    })
  }

  request (url, responseType) {
    const headers = {
      'X-DataSource-Auth': 'true'
    }
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`
    }
    return fetch(url, {
      headers
    })
  }
}

module.exports = GoogleApiClient
