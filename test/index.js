const test = require('ava')
const cuba = require('..')

const id = '1pmu7es_1Wji_6G8EAvIjoMJvuJjqdr4_N8GoDLMTxC8'

test('throws if no `id` specified', async function (t) {
  t.plan(1)
  try {
    await cuba()
  } catch (error) {
    t.pass()
  }
})

test('runs a query (defaulting to the first sheet)', async function (t) {
  t.plan(1)
  const database = await cuba(id)
  const query = 'select *'
  const actual = await database.query(query)
  const expected = [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
    { id: 3, name: 'baz' }
  ]
  t.deepEqual(actual, expected)
})

test('throws if the query is invalid', async function (t) {
  t.plan(1)
  const database = await cuba(id)
  const query = 'qux'
  await database.query(query).then(t.fail, function (error) {
    t.true(/^Error: Invalid query/.test(error.toString()))
  })
})

test('runs the query on the sheet with the specified sheet name', async function (t) {
  t.plan(1)
  const database = await cuba(id)
  const query = 'select *'
  const options = { sheetName: 'Sheet 2' }
  const actual = await database.query(query, options)
  const expected = [{ A: 1, B: 42 }, { A: 2, B: 3142 }]
  t.deepEqual(actual, expected)
})

test('runs the query on the sheet with the specified sheet id', async function (t) {
  t.plan(1)
  const database = await cuba(id)
  const query = 'select *'
  const options = { sheetId: '1490511334' }
  const actual = await database.query(query, options)
  const expected = [{ id: 1, sum: 31 }, { id: 2, sum: 4215 }, { id: 3, sum: 1 }]
  t.deepEqual(actual, expected)
})
