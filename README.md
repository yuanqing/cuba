# cuba [![npm Version](https://img.shields.io/npm/v/cuba.svg?style=flat)](https://www.npmjs.org/package/cuba) [![Build Status](https://img.shields.io/travis/yuanqing/cuba.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/cuba) ![Stability Experimental](http://img.shields.io/badge/stability-experimental-red.svg?style=flat)

> Stream data out of Google Sheets.

- [Execute queries](https://developers.google.com/chart/interactive/docs/querylanguage) against a Google Sheets spreadsheet
- Perfect for prototyping or for using Google Sheets as a collaborative datastore
- Use the string or stream API, or the CLI

## Usage

## API

```js
const cuba = require('cuba')
```

### const database = await cuba(id [, serviceAccountKey])

### const string = await database.query([query])

### const stream = await database.queryStream([query])

## CLI

```
Usage: cuba [query] [options]

Query:
  The Google Visualization API Query Language query to run on the
  Google Sheet spreadsheet. Defaults to 'select *'.

Options:
  -h, --help  Print this message.
  -i, --id <id>  A Google Sheet spreadsheet ID.
  -k, --key <path>  Path to a service account key JSON file, for
                    querying private spreadsheets.
  -s, --sheetId <sheetId>  Sheet ID of the sheet to run the query
                           on. Defaults to '0'.
  -n, --sheetName <sheetName>  Sheet name of the sheet to run the
                               query on.
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
