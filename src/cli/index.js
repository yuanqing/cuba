#!/usr/bin/env node

const yargs = require('yargs')
const name = require('../../package.json').name

yargs
  .scriptName(name)
  .command(require('./query'))
  .strict()
  .help()
  .version()
  .parse()
