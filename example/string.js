const cuba = require('..')
;(async function () {
  const spreadsheet = await cuba('1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU')
  const array = await spreadsheet.query('select *')
  console.log(array)
})()
