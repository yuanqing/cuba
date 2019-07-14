#!/usr/bin/env node

const yargs = require('yargs')
const name = require('../../package.json').name

yargs
  .scriptName(name)
  .command(require('./commands/query'))
  .strict()
  .help()
  .version()
  .parse()
