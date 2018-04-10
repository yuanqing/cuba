# cuba [![npm Version](https://img.shields.io/npm/v/cuba.svg?style=flat)](https://www.npmjs.org/package/cuba) [![Build Status](https://img.shields.io/travis/yuanqing/cuba.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/cuba)

> Stream data out of a Google Sheet.

- Executes queries (written in [Google Visualization API Query Language](https://developers.google.com/chart/interactive/docs/querylanguage)) against a Google Sheet
- Offers string and stream interfaces, plus a CLI
- Perfect for prototypes and for using a Google Sheet as a collaborative datastore

## Usage


## API

```js
const Cuba = require('cuba')
```

### const database = Cuba.new(id [, serviceAccountKey])

### database.query([query])

### database.queryStream([query])

## CLI

```
Usage: cuba [query] [options]

Query:
  The Google Visualization API Query Language query to run. Defaults
  to 'select *' if not specified.

Options:
  -h, --help  Print this message.
  -i, --id <ID>  Spreadsheet ID.
  -k, --key <KEY>  Path to the service account key JSON file, for
                   querying private spreadsheets.
  -s, --sheetId <SHEET_ID>  Sheet ID of the sheet to run the query
                            on. Defaults to '0' if not specified.
  -n, --sheetName  Sheet name of the sheet to run the query on.
  -v, --version  Print the version number.
```

## Installation

Install via [npm](https://npmjs.com):

```sh
$ npm install --save cuba
```

Or [yarn](https://yarnpkg.com):

```sh
$ yarn add cuba
```

## License

[MIT](LICENSE.md)
