# cuba [![npm Version](https://img.shields.io/npm/v/cuba.svg?style=flat)](https://www.npmjs.org/package/cuba) [![Build Status](https://img.shields.io/travis/yuanqing/cuba.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/cuba) ![Stability Experimental](http://img.shields.io/badge/stability-experimental-red.svg?style=flat)

> Stream data out of Google Sheets.

- Run [Google Visualization API Query Language queries](https://developers.google.com/chart/interactive/docs/querylanguage#overview) against a Google Sheets spreadsheet
- Perfect for prototyping or for leveraging Google Sheets as a collaborative datastore

## Usage

## API

```js
const cuba = require('cuba')
```

### const spreadsheet = await cuba(spreadsheetId [, serviceAccountKey])

Returns a Promise for a Cuba instance.

- [`spreadsheetId`](https://developers.google.com/sheets/api/guides/concepts#spreadsheet_id) is a string representing the Google Sheets spreadsheet to be queried. It is the value between `/d/` and `/edit` of the spreadsheet URL.
- [`serviceAccountKey`](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#overview) is an optional object literal containing the credentials for running queries on private spreadsheets.

### const string = await spreadsheet.query([query, options])

Returns a Promise for an array containing the results of executing the specified `query` on the spreadsheet.

- `options` is an optional object literal.

    Key | Description | Default
    :-|:-|:-
    `sheetId` | ID of the sheet to run the query on. Ignored if `sheetName` is specified. | `0`
    `sheetName` | Name of the sheet to run the query on. | `undefined`

### const stream = await spreadsheet.queryStream([query, options])

Just like the `query` method, but returns a [Readable Stream](https://nodejs.org/api/stream.html#stream_class_stream_readable) instead.

## CLI

```
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
