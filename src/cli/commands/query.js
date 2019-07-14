const path = require('path')
const cuba = require('../../stream')
const prettyPrintJson = require('../pretty-print-json')

module.exports = {
  command: ['query [query]', '$0 [file]'],
  describe: 'Run the given query on a Google Sheets spreadsheet.',
  builder: function (yargs) {
    yargs.positional('query', {
      type: 'string',
      describe:
        "The Google Visualization API Query Language query to run on the Google Sheets spreadsheet. Defaults to 'select *'."
    })
    yargs.option('credentials', {
      alias: ['c'],
      type: 'string',
      describe:
        'Path to the Service Account credentials JSON file. This is to run queries on private spreadsheets that do not have link-sharing enabled.'
    })
    yargs.option('id', {
      alias: ['i'],
      type: 'string',
      demandOption: true,
      describe:
        'The Google Sheets spreadsheet ID. This is the value between `/d/` and `/edit` in the spreadsheet URL.'
    })
    yargs.option('sheetId', {
      alias: ['s'],
      type: 'string',
      default: '0',
      describe:
        "ID of the sheet to run the query on. This is the value after `#gid=` in the spreadsheet URL. Defaults to '0'."
    })
    yargs.option('sheetName', {
      alias: ['n'],
      type: 'string',
      describe: 'Name of the sheet to run the query on.'
    })
  },
  handler: async function ({ query, credentials, id, sheetId, sheetName }) {
    const serviceAccountCredentials =
      credentials && require(path.join(process.cwd(), credentials))
    try {
      const queryStream = await cuba(id, serviceAccountCredentials)
      const stream = await queryStream(query, {
        sheetId,
        sheetName
      })
      stream.pipe(prettyPrintJson()).pipe(process.stdout)
      return Promise.resolve()
    } catch (error) {
      console.error('cuba: ' + error.message)
      process.exit(1)
    }
  }
}
