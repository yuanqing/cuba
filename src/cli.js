#!/usr/bin/env node

const nopt = require('nopt')
const path = require('path')

const cuba = require('./stream')
const prettyPrintJson = require('./pretty-print-json')
const version = require('../package.json').version

const usageMessage = `
Usage: cuba [query] [options]

Query:
  The Google Visualization API Query Language query to run on the
  Google Sheets spreadsheet. Defaults to 'select *'.

Options:
  -c, --credentials <path>  Path to the Service Account credentials
                            JSON file. This is only needed when link-
                            sharing is not enabled on the spreadsheet.
  -h, --help  Print this message.
  -i, --id <spreadsheetId>  The Google Sheets spreadsheet ID. This is
                            the value between \`/d/\` and \`/edit\` in
                            the spreadsheet URL.
  -s, --sheetId <sheetId>  ID of the sheet to run the query on. This
                           is the value after \`#gid=\` in the
                           spreadsheet URL. Defaults to '0'.
  -n, --sheetName <sheetName>  Name of the sheet to run the
                               query on.
  -v, --version  Print the version number.
`

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

async function main () {
  const options = nopt(knownOptions, shorthands)

  if (options.help) {
    console.log(usageMessage)
    process.exit(0)
  }

  if (options.version) {
    console.log(version)
    process.exit(0)
  }

  const query = options.argv.remain[0]
  const id = options.id
  const serviceAccountCredentials =
    options.key && require(path.join(process.cwd(), options.key))

  try {
    const queryStream = await cuba(id, serviceAccountCredentials)
    const stream = await queryStream(query)
    stream.pipe(prettyPrintJson()).pipe(process.stdout)
  } catch (error) {
    console.error('cuba: ' + error.message)
    process.exit(1)
  }
}
main()
