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

const BufferList = require('bl');
const babel = require('babel-core');

class Esmall extends Transform {
  constructor(options) {
    super();
    if (!options || typeof options !== 'object') options = {}
    this.opt = Object.assign({
      presets: ['babili'],
      comments: false
    }, options);
    this.bl = new BufferList();
  }
  
  minify(code) {
    if (typeof code !== 'string') {
      this.emit('error', new Error('.minify() require a string as an argument'));
      return false;
    }

    return babel.transform(code, this.opt).code;
  }
  
  _transform(chunk, encoding, callback) {
    this.bl.append(chunk);
    callback();
  }
    
  _flush(callback) {
    this.push(this.minify(this.bl.toString()));
    callback();
  }
}

module.exports = Esmall;
