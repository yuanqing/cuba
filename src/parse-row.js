module.exports = function (schema, row, transform) {
  return row.reduce(function (result, cell, index) {
    result[schema[index]] = transform(cell.v)
    return result
  }, {})
}
