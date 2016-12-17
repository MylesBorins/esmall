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

var chalk = require('chalk');

function error(text, stack) {
  console.error(`\n${chalk.red('Error:')} ${text}${stack ? '' : '\n'}`);
  if (stack && stack.message) {
    console.error(stack.message + '\n');
  }
}

function success(text) {
  console.log(`\n${chalk.green('Success: ')} ${text}\n`);
}

module.exports = {
  error: error,
  success: success
};
