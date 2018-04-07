const test = require('tape')
const cuba = require('./')

const id = '1LvhRHAmqCUBDxdxn48ziX_jUn8M8PVaxPPLvJbF0_vM'

test('throws if no `id` specified', function (t) {
  t.plan(1)
  t.throws(function () {
    cuba()
  })
})

test('runs the query on the spreadsheet', async function (t) {
  t.plan(1)
  const database = cuba(id)
  const actual = await database.query('select *')
  const expected = [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
    { id: 3, name: 'baz' }
  ]
  t.looseEqual(actual, expected)
})
