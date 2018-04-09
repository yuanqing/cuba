#!/usr/bin/env node

const nopt = require('nopt')
const path = require('path')
const stringify = require('JSONStream').stringify
const Transform = require('stream').Transform

const Cuba = require('../')

const logError = function (message) {
  console.error('cuba: ' + message)
  process.exit(1)
}

const knownOptions = {
  credentials: String,
  help: Boolean,
  id: String
}
const shorthands = {
  c: '--credentials',
  h: '--help',
  i: '--id'
}

const args = process.argv.slice(2)
const options = nopt(knownOptions, shorthands, args, 0)
const query = options.argv.remain[0]

const id = options.id
const credentials = require(path.join(process.cwd(), options.credentials))
;(async function () {
  const database = await Cuba.new(id, credentials)
  const stream = await database.queryStream(query)
  stream.pipe(stringify()).pipe(process.stdout)
})()
