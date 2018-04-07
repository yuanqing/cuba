const cuba = require('./')

const database = cuba('1tXLr47ArNQjICWWDtXCABXPH__rlK0yxPsfAzpqysi8')
;(async function () {
  const result = await database.query('select *', { sheetName: 'Sheet 2' })
  console.log(result)
})()
