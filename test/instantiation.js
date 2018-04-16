const test = require('tape')
const cuba = require('..')

test('throws if no `id` specified', async function (t) {
  t.plan(1)
  try {
    await cuba()
  } catch (error) {
    t.pass()
  }
})
