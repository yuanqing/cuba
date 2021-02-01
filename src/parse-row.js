function identity (object) {
  return object
}

module.exports = function (schema, row, transform) {
  transform = transform || identity
  return row.reduce(function (result, cell, index) {
    result[schema[index]] = transform(!!cell ? cell.v : null)
    return result
  }, {})
}
