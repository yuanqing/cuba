const cuba = require('..')
const concat = require('concat-stream')
const test = require('tape')

const id = '1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU'

test('runs a query, defaulting to the first sheet', async function (t) {
  t.plan(1)
  const database = await cuba(id)
  const query = 'select *'
  const stream = await database.queryStream(query)
  const expected = [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
    { id: 3, name: 'baz' }
  ]
  stream.pipe(concat(function(actual) {
    t.deepEqual(actual, expected)
  }))
})

test('throws if the query is invalid', async function (t) {
  t.plan(1)
  const spreadsheet = await cuba(id)
  const query = 'qux'
  try {
    await spreadsheet.queryStream(query, options)
  } catch (error) {
    t.pass()
  }
})

test('runs the query on the sheet with the specified sheet name', async function (t) {
  t.plan(1)
  const spreadsheet = await cuba(id)
  const query = 'select *'
  const options = { sheetName: 'Sheet2' }
  const stream = await spreadsheet.queryStream(query, options)
  const expected = [{ A: 1, B: 42 }, { A: 2, B: 3142 }]
  stream.pipe(concat(function(actual) {
    t.deepEqual(actual, expected)
  }))
})

test('runs the query on the sheet with the specified sheet ID', async function (t) {
  t.plan(1)
  const spreadsheet = await cuba(id)
  const query = 'select *'
  const options = { sheetId: '224335590' }
  const stream = await spreadsheet.queryStream(query, options)
  const expected = [{ id: 1, sum: 31 }, { id: 2, sum: 4215 }, { id: 3, sum: 1 }]
  stream.pipe(concat(function(actual) {
    t.deepEqual(actual, expected)
  }))
})
