const cuba = require('..')

cuba('1pmu7es_1Wji_6G8EAvIjoMJvuJjqdr4_N8GoDLMTxC8')
  .then(function (spreadsheet) {
    return spreadsheet.query('select *')
  })
  .then(function (result) {
    console.log(result)
  })
