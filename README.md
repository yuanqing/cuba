# cuba [![npm Version](https://badgen.net/npm/v/cuba)](https://www.npmjs.org/package/cuba) [![Build Status](https://badgen.net/travis/yuanqing/cuba?label=build)](https://travis-ci.org/yuanqing/cuba) [![Bundle Size](https://badgen.net/bundlephobia/minzip/cuba)](https://bundlephobia.com/result?p=cuba)

> Google Sheets + SQL = JSON

- Run [SQL-esque queries](https://developers.google.com/chart/interactive/docs/querylanguage#overview) against your Google Sheets spreadsheet, get results as JSON
- Perfect for prototyping, or leveraging Google Sheets as a collaborative datastore for your app
- Works in both Node and the browser

## Usage

> [**Editable demo (CodePen)**](https://codepen.io/lyuanqing/pen/bMdXgY)

To start, enable link-sharing on your spreadsheet:

1. Click the **`Share`** button on the top-right corner of the Google Sheets spreadsheet page.
2. Click **`Get shareable link`** on the top-right corner of the modal.
3. To the left of the **`Copy link`** button, ensure that access rights is set to **`Anyone with the link can view`**.

Then:

```js
const cuba = require('cuba')

async function main () {
  const query = cuba('1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU')
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

Here, `1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU` is the ID of [our example spreadsheet](https://docs.google.com/spreadsheets/d/1InLekepCq4XgInfMueA2E2bqDqICVHHTXd_QZab0AOU/edit#gid=0); it is the value between `/d/` and `/edit` in the spreadsheet URL.

### Querying private spreadsheets

In Node, we can also run queries on private spreadsheets that do not have link-sharing enabled:

<details>
<summary><strong>1. Create a Service Account on the Google API Console.</strong></summary>
<p>

1. Navigate to [the Google API Console](https://console.developers.google.com/apis/dashboard)
2. Select a project from the drop-down box in the top bar.
3. Click **`Credentials`** (the Key icon) on the left navigation bar.
4. Click the **`Create credentials`** drop-down box, and select **`Service account key`**.
5. Click the **`Select…`** drop-down box, and select **`New service account`**.
6. Enter a **`Service account name`**. For **`Role`**, select **`Project › Viewer`**. For **`Key type`**, select **`JSON`**.
7. Click the **`Create`** button. This will generate a JSON file with the Service Account credentials. Note the `client_email` and `private_key` values in this JSON file.

</p>
</details>

<details>
<summary><strong>2. Give view access to the Service Account.</strong></summary>
<p>

1. Navigate to your spreadsheet.
2. Click the **`Share`** button on the top-right corner of the page.
3. In the **`Enter names or email addresses…`** text box, enter the `client_email` of the Service Account, then click the **`Send`** button.

</p>
</details>

<details>
<summary><strong>3. Pass in the Service Account credentials when querying the spreadsheet with Cuba.</strong></summary>
<p>

- With [the API](#api), pass in a `serviceAccountCredentials` object, specifying the `clientEmail` and `privateKey`.
- With [the CLI](#cli), use the `--credentials` (or `-c`) flag to specify the path to the Service Account credentials JSON file.

</p>
</details>

## Installation

```sh
$ yarn add cuba
```

## API

Feature | Supported in Node? | Supported in the browser?
:-|:-|:-
[Array interface](#-array-interface) | Yes | Yes
[Stream interface](#-stream-interface) | Yes | No
[Querying private spreadsheets](#querying-private-spreadsheets) | Yes | No

### Array interface

```js
const cuba = require('cuba')
```

#### const querySpreadsheet = cuba(spreadsheetId [, serviceAccountCredentials])

`cuba` returns a function for running queries on the spreadsheet with the given `spreadsheetId`.

- `spreadsheetId` is a string representing the Google Sheets spreadsheet to be queried. This is the value between `/d/` and `/edit` in the spreadsheet URL.

- *(Node only)* `serviceAccountCredentials` is an optional object literal. This is to run queries on private spreadsheets that do not have link-sharing enabled.

    Key | Description | Default
    :-|:-|:-
    `clientEmail` | Email address of the Service Account that has view access to the spreadsheet being queried. | `undefined`
    `privateKey` | Private key of the Service Account. | `undefined`

#### const array = await querySpreadsheet([query, options])

`querySpreadsheet` returns a Promise for an Array containing the results of running the `query` on the spreadsheet.

- `query` is a [Google Visualization API Query Language](https://developers.google.com/chart/interactive/docs/querylanguage#overview) query. Defaults to `'select *'`.
- `options` is an optional object literal.

    Key | Description | Default
    :-|:-|:-
    `sheetId` | ID of the sheet to run the query on. This is the value after `#gid=` in the spreadsheet URL. Ignored if `sheetName` is specified. | `0`
    `sheetName` | Name of the sheet to run the query on. | `undefined`
    `transform` | A function for transforming each item in the result. | The identity function

### Stream interface

```js
const cubaStream = require('cuba').stream
```

#### const querySpreadsheet = cubaStream(spreadsheetId [, serviceAccountCredentials])

`cubaStream` returns a function for running queries on the spreadsheet with the given `spreadsheetId`. The function signature is identical to [the corresponding function in the Array interface](#const-queryspreadsheet--cubaspreadsheetid).

#### const stream = await querySpreadsheet([query, options])

`querySpreadsheet` returns a Promise for a [Readable Stream](https://nodejs.org/api/stream.html#stream_class_stream_readable) containing the results of running the `query` on the spreadsheet. The function signature is identical to [the corresponding function in the Array interface](#const-array--await-queryspreadsheetquery-options).

## CLI

```
cuba [query]

Run the given query on a Google Sheets spreadsheet.

Commands:
  cuba query [query]  Run the given query on a Google Sheets spreadsheet.
                                                                       [default]

Positionals:
  query  The Google Visualization API Query Language query to run on the Google
         Sheets spreadsheet. Defaults to 'select *'.                    [string]

Options:
  --help             Show help                                         [boolean]
  --version          Show version number                               [boolean]
  --credentials, -c  Path to the Service Account credentials JSON file. This is
                     to run queries on private spreadsheets that do not have
                     link-sharing enabled.                              [string]
  --id, -i           The Google Sheets spreadsheet ID. This is the value between
                     `/d/` and `/edit` in the spreadsheet URL.
                                                             [string] [required]
  --sheetId, -s      ID of the sheet to run the query on. This is the value
                     after `#gid=` in the spreadsheet URL. Defaults to '0'.
                                                         [string] [default: "0"]
  --sheetName, -n    Name of the sheet to run the query on.             [string]
```

## Prior art

- [Tabletop](https://github.com/jsoma/tabletop)
- [Sheetrock](https://github.com/chriszarate/sheetrock)
- [google-spreadsheet](https://github.com/theoephraim/node-google-spreadsheet)

## License

[MIT](LICENSE.md)
