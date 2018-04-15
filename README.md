# cuba [![npm Version](https://img.shields.io/npm/v/cuba.svg?style=flat)](https://www.npmjs.org/package/cuba) [![Build Status](https://img.shields.io/travis/yuanqing/cuba.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/cuba) ![Stability Experimental](http://img.shields.io/badge/stability-experimental-red.svg?style=flat)

> Stream JSON out of Google Sheets.

- Run sophisticated SQL-like queries written in [Google Visualization API Query Language](https://developers.google.com/chart/interactive/docs/querylanguage#overview) syntax
- Perfect for prototyping or for leveraging your Google Sheets spreadsheet as a collaborative datastore

---

## Usage

Given [a particular spreadsheet,](https://docs.google.com/spreadsheets/d/1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU/edit?usp=sharing) we can stream JSON out of it with [the CLI:](#cli)

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

&hellip;or with [the API:](#api)

```js
// example/stream.js

const cuba = require('cuba')
const Transform = require('stream').Transform

;(async function () {
  const spreadsheet = await cuba('1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU')
  const stream = await spreadsheet.queryStream('select *')
  stream.pipe(
    new Transform({
      objectMode: true,
      transform: function (data, encoding, callback) {
        console.log(data)
        callback()
      }
    })
  )
})()
```

```
$ node example/stream.js
{ id: 1, name: 'foo' }
{ id: 2, name: 'bar' }
{ id: 3, name: 'baz' }
```

---

## Configuration

Some quick set up is needed before we can start querying our spreadsheet. There are two methods:

### Method 1 &mdash; Enable link sharing on your spreadsheet

1. Navigate to your Google Sheets spreadsheet.
2. Click the blue **`Share`** button on the top-right corner of the page.
3. Click **`Get shareable link`** on the top-right corner of the modal.
4. To the left of the grey **`Copy link`** button, ensure that access rights is set to **`Anyone with the link can view`**.

And&hellip; we&rsquo;re done! Querying will work as in [the above Usage example](#usage).

### Method 2 &mdash; Give a Service Account view access to your spreadsheet

This is if you do not want to enable link sharing on your spreadsheet.

<details>
<summary><strong>1. Create a Service Account on the Google API Console.</strong></summary>
<p>

1. Navigate to [the Google API Console](https://console.developers.google.com/apis/dashboard)
2. Select a project from the drop-down box in the top bar.
3. Click **`Credentials`** (the Key icon) on the left navigation bar.
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
2. Click the blue **`Share`** button on the top-right corner of the page.
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

---

## API

```js
const cuba = require('cuba')
```

### const spreadsheet = await cuba(spreadsheetId [, serviceAccountCredentials])

Returns a Promise for a Cuba instance.

- `spreadsheetId` is a string representing the Google Sheets spreadsheet to be queried. This is the value between `/d/` and `/edit` in the spreadsheet URL.
- `serviceAccountCredentials` is an optional object literal. This is only needed when link sharing is not enabled on the spreadsheet.

    Key | Description | Default
    :-|:-|:-
    `clientEmail` | Email address of the Service Account that has view access to the spreadsheet being queried. | `undefined`
    `privateKey` | Private key of the Service Account. | `undefined`

### const array = await spreadsheet.query([query, options])

Returns a Promise for an array containing the results of running the specified `query` on the spreadsheet.

- `query` is a [Google Visualization API Query Language](https://developers.google.com/chart/interactive/docs/querylanguage#overview) query. Defaults to `'select *'`.
- `options` is an optional object literal.

    Key | Description | Default
    :-|:-|:-
    `sheetId` | ID of the sheet to run the query on. This is the value after `#gid=` in the spreadsheet URL. Ignored if `sheetName` is specified. | `0`
    `sheetName` | Name of the sheet to run the query on. | `undefined`
    `transform` | A function for transforming each item in the result. | The identity function

### const stream = await spreadsheet.queryStream([query, options])

Just like the `query` method, but returns a Promise for a [Readable Stream](https://nodejs.org/api/stream.html#stream_class_stream_readable).

---

## CLI

```
Usage: cuba [query] [options]

Query:
  The Google Visualization API Query Language query to run on the
  Google Sheets spreadsheet. Defaults to 'select *'.

Options:
  -h, --help  Print this message.
  -i, --id <id>  The Google Sheets spreadsheet ID. This is the value
                 between `/d/` and `/edit` in the spreadsheet URL.
  -c, --credentials <path>  Path to the Service Account credentials
                            JSON file. This is only needed when link
                            sharing is not enabled on the spreadsheet.
  -s, --sheetId <sheetId>  ID of the sheet to run the query on. This
                           is the value after `#gid=` in the
                           spreadsheet URL. Defaults to '0'.
  -n, --sheetName <sheetName>  Name of the sheet to run the
                               query on.
  -v, --version  Print the version number.
```

---

## Installation

Install via [yarn](https://yarnpkg.com):

```sh
$ yarn add cuba
```

Or [npm](https://npmjs.com):

```sh
$ npm install --save cuba
```

---

## License

[MIT](LICENSE.md)
