module.exports = function (schema, row, transform) {
  return row.reduce(function (result, cell, index) {
    if (typeof cell === 'object' && cell !== null) {
      result[schema[index]] = transform(cell.v)
    } else {
      result[schema[index]] = null
    }
    return result
  }, {})
}
