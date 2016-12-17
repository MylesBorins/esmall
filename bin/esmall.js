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
var path = require('path');

var concat = require('concat-stream');
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

function resolve(pathName) {
  try {
    var resolved = path.resolve(pathName);
  }
  catch (err) {
    error('Resolving the path has failed', err);
    process.exit(1);
  }
  return resolved;
}

var input;
var output;
var esmall = new Esmall();

esmall.on('error', (err) => {
  error('Minification failed', err);
  process.exit(1);
})

if (process.stdin.isTTY) {
  input = fs.createReadStream(resolve(argv._[0]));
  input.on('error', (err) => {
    error('Error reading file', err);
  });
}
else {
  input = process.stdin;
}

if (argv.o) {
  output = fs.createWriteStream(resolve(argv.o));
  output.on('error', (err) => {
    error('Error writing file', err);
    process.exit(1)
  })
}
else {
  output = process.stdout;
}

input
  .pipe(esmall)
  .pipe(output)
  .on('end', _ => {
    success('It worked 🎉');
  })
  .on('error', (err) => {
    error('It did not work', err);
    process.exit(1);
  });
