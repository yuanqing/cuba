const fs = require('fs')
const path = require('path')

module.exports = function () {
  if (process.env.CLIENT_EMAIL && process.env.PRIVATE_KEY) {
    return {
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY
    }
  }
  const serviceAccountCredentialsPath = path.resolve(
    __dirname,
    '..',
    '..',
    'service-account-credentials.json'
  )
  if (fs.existsSync(serviceAccountCredentialsPath)) {
    return require(serviceAccountCredentialsPath)
  }
  return null
}
