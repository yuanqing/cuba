const cuba = require('../src/array')

async function main () {
  const query = cuba('1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU')
  const array = await query('select *')
  console.log(array)
  // => [
  // =>   { id: 1, name: 'foo' },
  // =>   { id: 2, name: 'bar' },
  // =>   { id: 3, name: 'baz' }
  // => ]
}
main()
