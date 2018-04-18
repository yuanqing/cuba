const test = require('tape')
const cuba = require('../src/query')

const id = '1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU'

test('runs a query, defaulting to the first sheet', async function (t) {
  t.plan(1)
  const query = await cuba(id)
  const actual = await query('select *')
  const expected = [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
    { id: 3, name: 'baz' }
  ]
  t.deepEqual(actual, expected)
})

test('throws if the query is invalid', async function (t) {
  t.plan(1)
  const query = await cuba(id)
  try {
    await query('qux')
  } catch (error) {
    t.true(/^Error: Invalid query/.test(error.toString()))
  }
})

test('runs the query on the sheet with the specified sheet name', async function (t) {
  t.plan(1)
  const query = await cuba(id)
  const actual = await query('select *', { sheetName: 'Sheet2' })
  const expected = [{ A: 1, B: 42 }, { A: 2, B: 3142 }]
  t.deepEqual(actual, expected)
})

test('runs the query on the sheet with the specified sheet ID', async function (t) {
  t.plan(1)
  const query = await cuba(id)
  const actual = await query('select *', { sheetId: '224335590' })
  const expected = [{ id: 1, sum: 31 }, { id: 2, sum: 4215 }, { id: 3, sum: 1 }]
  t.deepEqual(actual, expected)
})
