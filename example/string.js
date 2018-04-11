const cuba = require('../')
const serviceAccountKey = require('./key.json')
;(async function () {
  const database = await cuba(
    '1jarTHL5x2r-YOY4y7fdUWfMyW419xhz031PKrnZpHJo',
    serviceAccountKey
  )
  const query = 'select *'
  const result = await database.query(query)
  console.log(result)
})()
