const parseColumns = require('../parse-columns')
const parseRow = require('../parse-row')

module.exports = function (table, transform) {
  const schema = parseColumns(table.cols)
  return table.rows.map(function (row) {
    return parseRow(schema, row.c, transform)
  })
}
