const cuba = require('..')

cuba('1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU')
  .then(function (spreadsheet) {
    return spreadsheet.query('select *')
  })
  .then(function (result) {
    console.log(result)
  })
