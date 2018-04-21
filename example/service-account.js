const cuba = require('..')
const serviceAccountCredentials = require('../service-account-credentials.json')

async function main () {
  const query = await cuba.array('1ZlDwhcOm0dE23mtRvbmSZNn3i6eKgHHrfwHHK0xH-fM', serviceAccountCredentials)
  const array = await query('select *')
  console.log(array)
  // => { id: 1, name: 'foo' }
  // => { id: 2, name: 'bar' }
  // => { id: 3, name: 'baz' }
}
main()
