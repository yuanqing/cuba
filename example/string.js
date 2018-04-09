const Cuba = require('../')
const credentials = require('./credentials.json')
;(async function () {
  const database = await Cuba.new(
    '1jarTHL5x2r-YOY4y7fdUWfMyW419xhz031PKrnZpHJo',
    credentials
  )
  const query = 'select *'
  const result = await database.query(query)
  console.log(result)
})()
