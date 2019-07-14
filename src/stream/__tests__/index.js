const concat = require('concat-stream')
const test = require('tape')
const cuba = require('..')

const id = '1n6Yz2MfCw3LkeEX31VcpEKlFI5dA0dhWkXBSZ0K03ZQ'

/* eslint-disable indent */
const serviceAccountCredentials = process.env.CLIENT_EMAIL &&
  process.env.PRIVATE_KEY && {
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
  }
/* eslint-enable indent */

if (serviceAccountCredentials) {
  test('runs a query on a spreadsheet via a Service Account', async function (t) {
    t.plan(1)
    const query = cuba(id, serviceAccountCredentials)
    const stream = await query('select *')
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
    const query = cuba(id, {
      client_email: serviceAccountCredentials.clientEmail,
      private_key: serviceAccountCredentials.privateKey
    })
    const stream = await query('select *')
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
