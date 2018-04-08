const buildUrl = require('./build-url')
const fetch = require('./fetch')
const parse = require('./parse')
const sanitiseResponse = require('./sanitise-response')

function Cuba (id) {
  const self = this
  if (id == null) {
    throw new Error('Need an ID')
  }
  if (!(self instanceof Cuba)) {
    return new Cuba(id)
  }
  self.id = id
  return self
}

Cuba.prototype.query = async function (query, options) {
  const url = buildUrl(this.id, query, options)
  const response = await fetch(url)
  const text = await response.text()
  const json = JSON.parse(sanitiseResponse(text))
  if (json.errors) {
    throw new Error(json.errors[0].detailed_message)
  }
  return parse(json.table)
}

Cuba.prototype.queryStream = async function (query, options) {
  const url = buildUrl(this.id, query, options)
  const response = await fetch(url)
  return response.body.pipe(sanitiseResponse.stream()).pipe(parse.stream())
}

module.exports = Cuba
