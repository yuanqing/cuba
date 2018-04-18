module.exports = function (columns) {
  return columns.map(function (column) {
    return column.label || column.id
  })
}
