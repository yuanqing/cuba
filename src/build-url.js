function buildUrl (id, query, options) {
  options = options || {}
  const url = `https://docs.google.com/a/google.com/spreadsheets/d/${id}/gviz/tq?tq=${encodeURIComponent(
    query
  )}`
  if (options.sheetName) {
    return `${url}&sheet=${encodeURIComponent(options.sheetName)}`
  }
  return `${url}&gid=${options.sheetId || '0'}`
}

module.exports = buildUrl
