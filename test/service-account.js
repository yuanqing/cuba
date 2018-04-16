const concat = require('concat-stream')
const fs = require('fs')
const path = require('path')
const test = require('tape')
const cuba = require('..')

function getServiceAccountCredentials () {
  if (process.env.CI) {
    return {
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY
    }
  }
  const serviceAccountCredentialsPath = path.resolve(__dirname, '..', 'service-account-credentials.json')
  if (fs.existsSync()) {
    return require(serviceAccountCredentialsPath)
  }
  return null
}

const serviceAccountCredentials = getServiceAccountCredentials()

if (serviceAccountCredentials) {
  const id = '1ZlDwhcOm0dE23mtRvbmSZNn3i6eKgHHrfwHHK0xH-fM'

  test('runs a query on a spreadsheet via a Service Account', async function (t) {
    t.plan(1)
    const database = await cuba(id, serviceAccountCredentials)
    const query = 'select *'
    const stream = await database.queryStream(query)
    const expected = [
      { id: 1, name: 'qux' },
      { id: 2, name: 'quux' },
      { id: 3, name: 'quuux' }
    ]
    stream.pipe(
      concat(function (actual) {
        t.deepEqual(actual, expected)
      })
    )
  })
}
