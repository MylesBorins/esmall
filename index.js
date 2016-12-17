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

function reggae(code) {
  return code.replace(/^\s+/, '').replace(/[ \t]+$/, '');
}

function isNotEmpty(code) {
  return !((code === '') || (code === ' '));
};

function minify(code, cb) {
  if (typeof code !== 'string') {
    cb(new Error('strings only please'));
    return false;
  }
  try {
    // remove comments
    code = code.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '');
    
    code = code.split('\n');
    code = code.filter(isNotEmpty);
    // remove whitespace at the begining and end of each line
    code = code.map(reggae);
    code = code.join(' ');
    // remove any spaces after a semi colon
    code = code.replace(/;\s+/g, ';');
  }
  catch (e) {
    cb(new Error(e));
    return false;
  }
  cb(null, code);
  return true;
}

module.exports = minify;
