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

/* eslint no-console: 0 */

var fs = require('fs');

var argv = require('yargs')
  .alias('o', 'output')
  .alias('h', 'help')
  .describe('o', 'The output file path')
  .string('o')
  .usage('Usage: $0 <input-file> -o [output-file]')
  .help()
  .argv;

// var path = require('path');

var esmall = require('../');
var {success, error} = require('./logger');

if (argv._.length === 0) {
  error('You must provide an input file!');
  process.exit(1);
}

function resolve(pathName) {
  try {
    var resolved = require.resolve(pathName);
  }
  catch (err) {
    error('Resolving the path has failed', err);
    process.exit(1);
  }
  return resolved;
}

function convertFile(err, data) {
  if (err) {
    error('Reading the file failed', err);
  }
  esmall(data.toString(), handleMinified);
}

function handleMinified(err, minified) {
  if (!argv.o) {
    console.log(minified);
    process.exit(0);
  }
  fs.writeFile(resolve(argv.o), minified, cleanup);
}

function cleanup(err) {
  if (err) {
    error('Writing to file failed', err);
    process.exit(1);
  }
  success('It worked 🎉');
  process.exit(0);
}

fs.open(resolve(argv._[0]), 'r', function(err, fd) {
  if (err) {
    if (err.code === 'ENOENT') {
      error(`${argv._[0]} does not exist`);
      process.exit(1);
    } else {
      throw err;
    }
  }
  fs.readFile(fd, convertFile);
});
