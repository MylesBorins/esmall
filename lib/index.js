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

const Transform = require('stream').Transform;

const babel = require('babel-core');

class Esmall extends Transform {
  constructor(options) {
    super();
    if (!options || typeof options !== 'object') options = {}
    this.opt = Object.assign({
      presets: ['babili'],
      comments: false
    }, options);
    this.source = '';
  }
  
  minify(code, cb) {
    if (typeof code !== 'string') {
      cb(new Error('strings only please'));
      return false;
    }

    var result = babel.transform(code, this.opt).code;

    cb(null, result);
    return true;
  }
  
  _transform(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) chunk = chunk.toString();
    this.source += chunk;
    callback();
  }
    
  _flush(callback) {
    this.minify(this.source, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      this.push(result);
      callback();
    });
  }
}

module.exports = Esmall;
