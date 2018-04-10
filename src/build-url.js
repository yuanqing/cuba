function buildUrl (id, query, serviceAccountKey) {
  serviceAccountKey = serviceAccountKey || {}
  const url = `https://docs.google.com/a/google.com/spreadsheets/d/${id}/gviz/tq?tq=${encodeURIComponent(
    query
  )}`
  if (serviceAccountKey.sheetName) {
    return `${url}&sheet=${encodeURIComponent(serviceAccountKey.sheetName)}`
  }
  return `${url}&gid=${serviceAccountKey.sheetId || '0'}`
}

module.exports = buildUrl
