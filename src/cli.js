#!/usr/bin/env node

const nopt = require('nopt')
const path = require('path')

const prettyPrintJson = require('./pretty-print-json')
const version = require('../package.json').version

const Cuba = require('../')

const help = `
Usage: cuba [query] [options]

Query:
  The Google Visualization API Query Language query to run on the
  Google Sheets spreadsheet. Defaults to 'select *'.

Options:
  -h, --help  Print this message.
  -i, --id <id>  A Google Sheets spreadsheet ID.
  -k, --key <path>  Path to a service account key JSON file, if
                    running the query on a private spreadsheet.
  -s, --sheetId <sheetId>  ID of the sheet to run the query on.
                           Defaults to '0'.
  -n, --sheetName <sheetName>  Name of the sheet to run the
                               query on.
  -v, --version  Print the version number.
`

const logError = function (message) {
  console.error('cuba: ' + message)
  process.exit(1)
}

const knownOptions = {
  help: Boolean,
  id: String,
  key: String,
  sheetName: String,
  sheetId: String,
  version: Boolean
}
const shorthands = {
  h: '--help',
  i: '--id',
  k: '--key',
  s: '--sheetId',
  n: '--sheetName',
  v: '--version'
}

const options = nopt(knownOptions, shorthands)

if (options.help) {
  console.log(help)
  process.exit(0)
}

if (options.version) {
  console.log(version)
  process.exit(0)
}

const query = options.argv.remain[0]
const id = options.id
const key = require(path.join(process.cwd(), options.key))
;(async function () {
  try {
    const database = await Cuba.new(id, key)
    const stream = await database.queryStream(query)
    stream.pipe(prettyPrintJson()).pipe(process.stdout)
  } catch (error) {
    logError(error)
  }
})()
