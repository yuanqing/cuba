const Jwt = require('google-auth-library').JWT

const headers = {
  'X-DataSource-Auth': 'true'
}

class GoogleApiClient {
  constructor (client) {
    this.client = client
  }

  static async new (clientEmail, privateKey) {
    const client = new Jwt(
      clientEmail || null,
      null,
      privateKey || null,
      ['https://spreadsheets.google.com/feeds'],
      null
    )
    return new Promise(function (resolve, reject) {
      client.authorize(function (error) {
        if (error) {
          reject(error)
          return
        }
        resolve(new GoogleApiClient(client))
      })
    })
  }

  request (url) {
    return this.client.request({
      url,
      headers
    })
  }

  requestStream (url) {
    return this.client.request({
      url,
      headers,
      responseType: 'stream'
    })
  }
}

module.exports = GoogleApiClient
