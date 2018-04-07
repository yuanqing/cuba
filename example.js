const cuba = require('./')

const database = cuba('1LvhRHAmqCUBDxdxn48ziX_jUn8M8PVaxPPLvJbF0_vM')
;(async function () {
  const result = await database.query('select *')
  console.log(result)
})()
