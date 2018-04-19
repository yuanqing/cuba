const cuba = require('..')

async function main () {
  const query = await cuba.array('1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU')
  const array = await query('select *')
  console.log(array)
}
main()
