const test = require('tape')
const cuba = require('..')

const id = '1ZlDwhcOm0dE23mtRvbmSZNn3i6eKgHHrfwHHK0xH-fM'

const serviceAccountCredentials = process.env.CLIENT_EMAIL &&
  process.env.PRIVATE_KEY && {
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
  }

if (serviceAccountCredentials) {
  test('runs a query on a spreadsheet via a Service Account', async function (t) {
    t.plan(1)
    const query = cuba(id, serviceAccountCredentials)
    const actual = await query('select *')
    const expected = [
      { id: 1, name: 'qux' },
      { id: 2, name: 'quux' },
      { id: 3, name: 'quuux' }
    ]
    t.deepEqual(actual, expected)
  })

  test('allows the Service Account credentials to be specified using `camel_case` keys', async function (t) {
    t.plan(1)
    const query = cuba(id, {
      client_email: serviceAccountCredentials.clientEmail,
      private_key: serviceAccountCredentials.privateKey
    })
    const actual = await query('select *')
    const expected = [
      { id: 1, name: 'qux' },
      { id: 2, name: 'quux' },
      { id: 3, name: 'quuux' }
    ]
    t.deepEqual(actual, expected)
  })
}
