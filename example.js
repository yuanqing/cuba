const cuba = require('./')
;(async function () {
  const database = cuba('1tXLr47ArNQjICWWDtXCABXPH__rlK0yxPsfAzpqysi8')
  const query = 'select *'
  const options = { sheetName: 'Sheet 2' }
  const result = await database.query(query, options)
  console.log(result)
})()
