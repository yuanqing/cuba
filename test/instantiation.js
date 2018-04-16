const cuba = require('..')
const test = require('tape')

const id = '1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU'

test('throws if no `id` specified', async function (t) {
  t.plan(1)
  try {
    await cuba()
  } catch (error) {
    t.pass()
  }
})
