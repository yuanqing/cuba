const test = require('tape')

const cuba = require('..').array
const getServiceAccountCredentials = require('./utils/get-service-account-credentials')

const publicSpreadsheetId = '1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU'
const privateSpreadsheetId = '1ZlDwhcOm0dE23mtRvbmSZNn3i6eKgHHrfwHHK0xH-fM'
const serviceAccountCredentials = getServiceAccountCredentials()

test('throws if no `id` specified', async function (t) {
  t.plan(1)
  try {
    await cuba()
  } catch (error) {
    t.pass()
  }
})

test('returns the entire contents of the first sheet', async function (t) {
  t.plan(1)
  const query = await cuba(publicSpreadsheetId)
  const actual = await query()
  const expected = [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
    { id: 3, name: 'baz' }
  ]
  t.deepEqual(actual, expected)
})

test('runs a query, defaulting to the first sheet', async function (t) {
  t.plan(1)
  const query = await cuba(publicSpreadsheetId)
  const actual = await query('select * where A > 1')
  const expected = [{ id: 2, name: 'bar' }, { id: 3, name: 'baz' }]
  t.deepEqual(actual, expected)
})

test('throws if the query is invalid', async function (t) {
  t.plan(1)
  const query = await cuba(publicSpreadsheetId)
  try {
    await query('qux')
  } catch (error) {
    t.true(/^Error: Invalid query/.test(error.toString()))
  }
})

test('runs the query on the sheet with the specified sheet name', async function (t) {
  t.plan(1)
  const query = await cuba(publicSpreadsheetId)
  const actual = await query('select *', { sheetName: 'Sheet2' })
  const expected = [{ A: 1, B: 42 }, { A: 2, B: 3142 }]
  t.deepEqual(actual, expected)
})

test('runs the query on the sheet with the specified sheet ID', async function (t) {
  t.plan(1)
  const query = await cuba(publicSpreadsheetId)
  const actual = await query('select *', { sheetId: '224335590' })
  const expected = [{ id: 1, sum: 31 }, { id: 2, sum: 4215 }, { id: 3, sum: 1 }]
  t.deepEqual(actual, expected)
})

if (serviceAccountCredentials) {
  test('runs a query on a spreadsheet via a Service Account', async function (t) {
    t.plan(1)
    const query = await cuba(
      privateSpreadsheetId,
      serviceAccountCredentials
    )
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
    const query = await cuba(privateSpreadsheetId, {
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
