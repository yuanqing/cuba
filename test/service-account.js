const cuba = require('..').queryStream
const concat = require('concat-stream')
const fs = require('fs')
const path = require('path')
const test = require('tape')

const id = '1ZlDwhcOm0dE23mtRvbmSZNn3i6eKgHHrfwHHK0xH-fM'

function getServiceAccountCredentials () {
  if (process.env.CLIENT_EMAIL && process.env.PRIVATE_KEY) {
    return {
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY
    }
  }
  const serviceAccountCredentialsPath = path.resolve(
    __dirname,
    '..',
    'service-account-credentials.json'
  )
  if (fs.existsSync(serviceAccountCredentialsPath)) {
    return require(serviceAccountCredentialsPath)
  }
  return null
}
const serviceAccountCredentials = getServiceAccountCredentials()

if (serviceAccountCredentials) {
  test('runs a query on a spreadsheet via a Service Account', async function (t) {
    t.plan(1)
    const queryStream = await cuba(id, serviceAccountCredentials)
    const stream = await queryStream('select *')
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

  test('allows the Service Account credentials to be specified using `camel_case` keys', async function (t) {
    t.plan(1)
    const queryStream = await cuba(id, {
      client_email: serviceAccountCredentials.clientEmail,
      private_key: serviceAccountCredentials.privateKey
    })
    const stream = await queryStream('select *')
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
