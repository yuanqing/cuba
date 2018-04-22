const cuba = require('../src/micro')

async function main () {
  const array = await cuba(
    '1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU',
    'select *'
  )
  console.log(array)
  // => [
  // =>   { id: 1, name: 'foo' },
  // =>   { id: 2, name: 'bar' },
  // =>   { id: 3, name: 'baz' }
  // => ]
}
main()
