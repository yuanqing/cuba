const buildUrl = require('./build-url')
const fetch = require('./fetch')
const parse = require('./parse')
const sanitiseResponse = require('./sanitise-response')

class Cuba {
  constructor(id) {
    if (id == null) {
      throw new Error('Need an ID')
    }
    this.id = id
  }

  async query(query, options) {
    const url = buildUrl(this.id, query, options)
    const response = await fetch(url)
    const text = await response.text()
    const json = JSON.parse(sanitiseResponse(text))
    if (json.errors) {
      throw new Error(json.errors[0].detailed_message)
    }
    return parse(json.table)
  }

  async queryStream(query, options) {
    const url = buildUrl(this.id, query, options)
    const response = await fetch(url)
    return response.body.pipe(sanitiseResponse.stream()).pipe(parse.stream())
  }
}

module.exports = Cuba
