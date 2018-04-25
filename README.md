![Cuba](media/header.png)

<div align="center">

***Google Sheets + SQL = JSON***

[![npm Version](https://img.shields.io/npm/v/cuba.svg?style=flat)](https://www.npmjs.org/package/cuba) [![Build Status](https://img.shields.io/travis/yuanqing/cuba.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/cuba) [![Prettier](https://img.shields.io/badge/code_style-prettier-41718c.svg)](https://prettier.io) [![JavaScript Standard Style](https://img.shields.io/badge/code_style-standard-e0c807.svg)](https://standardjs.com)

</div>

- Run [SQL-esque queries](https://developers.google.com/chart/interactive/docs/querylanguage#overview) against your Google Sheets spreadsheet
- Get results as an array or stream
- Perfect for prototyping, or leveraging Google Sheets as a collaborative datastore or CMS for your app

<div align="center">

[**Usage**](#usage) &nbsp;&middot;&nbsp; [**Installation**](#installation) &nbsp;&middot;&nbsp; [**Configuration**](#configuration) &nbsp;&middot;&nbsp; [**API**](#api) &nbsp;&middot;&nbsp; [**CLI**](#cli) &nbsp;&middot;&nbsp; [**Prior art**](#prior-art) &nbsp;&middot;&nbsp; [**License**](#license)

</div>

---

## Usage

First, [enable link-sharing](#method-1--enable-link-sharing-on-your-spreadsheet) on your [spreadsheet](https://docs.google.com/spreadsheets/d/1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU/edit?usp=sharing). Then, do:

```js
const cuba = require('cuba').array

async function main () {
  const query = await cuba('1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU')
  const array = await query('select *')
  console.log(array)
  //=> [
  //=>   { id: 1, name: 'foo' },
  //=>   { id: 2, name: 'bar' },
  //=>   { id: 3, name: 'baz' }
  //=> ]
}
main()
```

## Installation

```sh
$ yarn add cuba
```

Or:

```sh
$ npm install --save cuba
```

## Configuration

Some quick set up is needed before we can start querying our spreadsheet. There are two ways to go about this:

### Method 1 &mdash; Enable link-sharing on your spreadsheet

1. Navigate to your Google Sheets spreadsheet.
2. Click the blue **`Share`** button on the top-right corner of the page.
3. Click **`Get shareable link`** on the top-right corner of the modal.
4. To the left of the grey **`Copy link`** button, ensure that access rights is set to **`Anyone with the link can view`**.

And&hellip; we&rsquo;re done! Querying will work as in [the above Usage example](#usage).

### Method 2 &mdash; Give a Service Account view access to your spreadsheet

This is if you do not want to enable link-sharing on your spreadsheet.

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

- With [the API](#const-querystream--await-cubastreamspreadsheetid--serviceaccountcredentials), pass in a `serviceAccountCredentials` object, specifying the `clientEmail` and `privateKey`.
- With [the CLI](#cli), use the `--credentials` (or `-c`) flag to specify the path to the Service Account credentials JSON file.

</p>
</details>

## API

### ➥ Array interface

```js
const cuba = require('cuba').array
```

#### const query = await cuba(spreadsheetId [, serviceAccountCredentials])

- `spreadsheetId` is a string representing the Google Sheets spreadsheet to be queried. This is the value between `/d/` and `/edit` in the spreadsheet URL.
- `serviceAccountCredentials` is an optional object literal. This is only needed when link-sharing is not enabled on the spreadsheet.

    Key | Description | Default
    :-|:-|:-
    `clientEmail` | Email address of the Service Account that has view access to the spreadsheet being queried. | `undefined`
    `privateKey` | Private key of the Service Account. | `undefined`

#### const array = await query([query, options])

Returns a Promise for an array containing the results of running the `query` on the spreadsheet.

- `query` is a [Google Visualization API Query Language](https://developers.google.com/chart/interactive/docs/querylanguage#overview) query. Defaults to `'select *'`.
- `options` is an optional object literal.

    Key | Description | Default
    :-|:-|:-
    `sheetId` | ID of the sheet to run the query on. This is the value after `#gid=` in the spreadsheet URL. Ignored if `sheetName` is specified. | `0`
    `sheetName` | Name of the sheet to run the query on. | `undefined`
    `transform` | A function for transforming each item in the result. | The identity function

---

### ➥ Stream interface

```js
const cuba = require('cuba').stream
```

#### const query = await cuba(spreadsheetId [, serviceAccountCredentials])

The function signature is identical to [the corresponding function in the array interface](#const-query--await-cubaspreadsheetid--serviceaccountcredentials).

#### const stream = await query([query, options])

The function signature is identical to [the corresponding function in the array interface](#const-array--await-queryquery-options), only that here we get a Promise for a [Readable Stream](https://nodejs.org/api/stream.html#stream_class_stream_readable), instead of an array.

---

### ➥ In-browser use

The authentication process when [using a Service Account](#method-2--give-a-service-account-view-access-to-your-spreadsheet) involves the use of Node&rsquo;s [`crypto`](https://nodejs.org/api/crypto.html) library, which will bloat your browser bundle when it is [shimmed](https://github.com/crypto-browserify/crypto-browserify).

To keep your byte footprint small, do:
1. Enable [link-sharing on your spreadsheet](#method-1--enable-link-sharing-on-your-spreadsheet).
2. Change your `require` calls to `cuba/src/array` (**1.14 KB** gzipped) and `cuba/src/stream` (**22.4 KB** gzipped). So, for example, we would have `require('cuba/src/array')` instead of `require('cuba').array`.

## CLI

```
Usage: cuba [query] [options]

Query:
  The Google Visualization API Query Language query to run on the
  Google Sheets spreadsheet. Defaults to 'select *'.

Options:
  -c, --credentials <path>  Path to the Service Account credentials
                            JSON file. This is only needed when link
                            sharing is not enabled on the spreadsheet.
  -h, --help  Print this message.
  -i, --id <spreadsheetId>  The Google Sheets spreadsheet ID. This is
                            the value between `/d/` and `/edit` in
                            the spreadsheet URL.
  -s, --sheetId <sheetId>  ID of the sheet to run the query on. This
                           is the value after `#gid=` in the
                           spreadsheet URL. Defaults to '0'.
  -n, --sheetName <sheetName>  Name of the sheet to run the
                               query on.
  -v, --version  Print the version number.
```

## Prior art

- [Tabletop](https://github.com/jsoma/tabletop)
- [Sheetrock](https://github.com/chriszarate/sheetrock)
- [google-spreadsheet](https://github.com/theoephraim/node-google-spreadsheet)

## License

[MIT](LICENSE.md)
