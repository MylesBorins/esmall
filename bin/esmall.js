#!/usr/bin/env node

/* Copyright 2016 Myles Borins
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var fs = require('fs');
var resolve = require('path').resolve;

var pump = require('pump');
var argv = require('yargs')
  .alias('o', 'output')
  .alias('h', 'help')
  .describe('o', 'The output file path')
  .string('o')
  .usage('Usage: $0 <input-file> -o [output-file]')
  .help()
  .argv;

var Esmall = require('../lib');

var {success, error} = require('./logger');

if (process.stdin.isTTY && argv._.length === 0) {
  error('You must provide an input file!');
  process.exit(1);
}

var input = process.stdin.isTTY ?
  fs.createReadStream(resolve(argv._[0])) : process.stdin;

var output = argv.o ?
  fs.createWriteStream(resolve(argv.o)) : process.stdout;

var esmall = new Esmall();

pump(input, esmall, output, (err) => {
  if (err) {
    error('It did not work', err);
    process.exit(1);
  }
  if (argv.o) {
    success('It worked 🎉');
  }
});

