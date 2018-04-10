#!/usr/bin/env node

const nopt = require('nopt')
const path = require('path')

const prettyPrintJson = require('./pretty-print-json')
const version = require('../package.json').version

const Cuba = require('../')

const help = `
Usage: cuba [query] [options]

Query:
  Query to run on the spreadsheet. Defaults to 'select *' if
  not specified.

Options:
  -c, --credentials <CREDENTIALS>  Path to the credentials JSON file
                                   for making authenticated requests.
  -h, --help  Print this message.
  -i, --id <ID>  Spreadsheet ID.
  -s, --sheetId <SHEET_ID>  Sheet ID
  -n, --sheetName  Sheet name
  -v, --version  Print the version number.
`

const logError = function (message) {
  console.error('cuba: ' + message)
  process.exit(1)
}

const knownOptions = {
  credentials: String,
  help: Boolean,
  id: String,
  sheetName: String,
  sheetId: String,
  version: Boolean
}
const shorthands = {
  c: '--credentials',
  h: '--help',
  i: '--id',
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
const credentials = require(path.join(process.cwd(), options.credentials))
;(async function () {
  try {
    const database = await Cuba.new(id, credentials)
    const stream = await database.queryStream(query)
    stream.pipe(prettyPrintJson()).pipe(process.stdout)
  } catch (error) {
    logError(error)
  }
})()
