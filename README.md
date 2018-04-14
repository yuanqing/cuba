# cuba [![npm Version](https://img.shields.io/npm/v/cuba.svg?style=flat)](https://www.npmjs.org/package/cuba) [![Build Status](https://img.shields.io/travis/yuanqing/cuba.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/cuba) ![Stability Experimental](http://img.shields.io/badge/stability-experimental-red.svg?style=flat)

> Stream data out of Google Sheets.

- Run [SQL-like queries](https://developers.google.com/chart/interactive/docs/querylanguage#overview) against a [Google Sheets](https://docs.google.com/spreadsheets/u/0/?tgif=d) spreadsheet
- Perfect for prototyping or for leveraging Google Sheets as a collaborative datastore

## Usage

Given [a particular Google Sheets spreadsheet,](https://docs.google.com/spreadsheets/d/1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU/edit?usp=sharing) we can get data out of it using [the API:](#api)

```js
const cuba = require('cuba')

cuba('1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU8')
  .then(function (spreadsheet) {
    return spreadsheet.query('select *')
  })
  .then(function (result) {
    console.log(result)
  })
```

&hellip;or, equivalently, using [the CLI:](#cli)

```
$ cuba 'select *' --id 1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU
[
  {
    "id": 1,
    "name": "foo"
  },
  {
    "id": 2,
    "name": "bar"
  },
  {
    "id": 3,
    "name": "baz"
  }
]
```

## Configuration

Some initial set up is required before we can start querying our spreadsheet using Cuba. There are two ways to go about this:

### Method 1 &mdash; Enable link sharing on the spreadsheet

1. Navigate to your Google Sheets spreadsheet.
2. Click the blue **`Share`** button on the top-right hand corner of the page.
3. Click **`Get shareable link`** on the top-right hand corner of the modal.
4. To the left of the grey **`Copy link`** button, ensure that access rights is set to **`Anyone with the link can view`**.

And&hellip; we&rsquo;re done! Cuba will work as in [the above Usage example](#usage).

### Method 2 &mdash; Give a Service Account view access to the spreadsheet

The procedure is a bit more involved if link sharing is disabled on the spreadsheet.

<details>
<summary><strong>1. Create a Service Account on the Google API Console.</strong></summary>
<p>

1. Navigate to [the Google API Console](https://console.developers.google.com/apis/dashboard)
2. Select a project from the drop-down box in the top bar.
3. Click **`Credentials`** (the Key icon) in the left-hand navigation bar.
4. Click the blue **`Create credentials`** drop-down box, and select **`Service account key`**.
5. Click the **`Select…`** drop-down box, and select **`New service account`**.
6. Enter a **`Service account name`**. For **`Role`**, select **`Project › Viewer`**. For **`Key type`**, select **`JSON`**.
7. Click the blue **`Create`** button. This will generate a JSON file with the Service Account credentials. Note the `client_email` and `private_key` values in this JSON file.

</p>
</details>

<details>
<summary><strong>2. Give view access to the Service Account.</strong></summary>
<p>

1. Navigate to your spreadsheet.
2. Click the blue **`Share`** button on the top-right hand corner of the page.
3. In the **`Enter names or email addresses…`** text box, enter the `client_email` of the Service Account, then click the blue **`Send`** button.

</p>
</details>

<details>
<summary><strong>3. Pass in the Service Account credentials when querying the spreadsheet with Cuba.</strong></summary>
<p>

- With the API, pass in a `serviceAccountCredentials` object, specifying the `clientEmail` and `privateKey`.
- With the CLI, use the `--credentials` (or `-c`) flag to specify the path to the Service Account credentials JSON file.

</p>
</details>

## API

```js
const cuba = require('cuba')
```

### const spreadsheet = await cuba(spreadsheetId [, serviceAccountCredentials])

Returns a Promise for a Cuba instance.

- [`spreadsheetId`](https://developers.google.com/sheets/api/guides/concepts#spreadsheet_id) is a string representing the Google Sheets spreadsheet to be queried. It is the value between `/d/` and `/edit` of the spreadsheet URL.
- [`serviceAccountCredentials`](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#overview) is an optional object literal, for running queries on private spreadsheets.

    Key | Description | Default
    :-|:-|:-
    `clientEmail` | Email address of the service account that has view access to the spreadsheet being queried. | `undefined`
    `privateKey` | Private key. | `undefined`

### const string = await spreadsheet.query([query, options])

Returns a Promise for an array containing the results of executing the specified `query` on the spreadsheet.

- `query` is a [Google Visualization API Query Language](https://developers.google.com/chart/interactive/docs/querylanguage#overview) query. Defaults to `'select *'`.
- `options` is an optional object literal.

    Key | Description | Default
    :-|:-|:-
    `sheetId` | ID of the sheet to run the query on. Ignored if `sheetName` is specified. | `0`
    `sheetName` | Name of the sheet to run the query on. | `undefined`
    `transform` | A function for transforming each item in the result. | The identity function

### const stream = await spreadsheet.queryStream([query, options])

Just like the `query` method, but returns a Promise for a [Readable Stream](https://nodejs.org/api/stream.html#stream_class_stream_readable).

## CLI

```
Usage: cuba [query] [options]

Query:
  The Google Visualization API Query Language query to run on the
  Google Sheets spreadsheet. Defaults to 'select *'.

Options:
  -h, --help  Print this message.
  -i, --id <id>  A Google Sheets spreadsheet ID.
  -c, --credentials <path>  Path to the Service Account credentials
                            JSON file, if running the query on a
                            private spreadsheet.
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
