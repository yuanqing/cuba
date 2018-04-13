const cuba = require('../')
const serviceAccountKey = require('./key.json')
;(async function () {
  const spreadsheet = await cuba(
    '1jarTHL5x2r-YOY4y7fdUWfMyW419xhz031PKrnZpHJo',
    serviceAccountKey
  )
  const query = 'select *'
  const result = await spreadsheet.query(query)
  console.log(result)
})()
