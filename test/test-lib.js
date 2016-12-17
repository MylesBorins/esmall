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

var test = require('tap').test;

var Esmall = require('../lib/');
var esmall = new Esmall();

var simple = `
  var a = 213;
  var b = 123;
  var c = 123456;
  var d = 2134;
  console.log(a + b * c / d);
`;

var expected = 'var a=213,b=123,c=123456,d=2134;console.log(a+b*c/d);';

var esSix = `
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

var poly = new Polygon(100, 100);
`;

var expectedSix = 'class Polygon{constructor(a,b){this.height=a,this.width=b}}var poly=new Polygon(100,100);';

var licensedCode = `
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
 
 var a    = 213;
       var b = 123;
   var c = 123456;
           var d = 2134
      console.log(a + b * c / d);    
`;

test('basic test', (t) => {
  t.equals(esmall.minify(simple), expected, 'a simple example');
  t.equals(esmall.minify(esSix), expectedSix, 'an es6 class');
  t.equals(esmall.minify(licensedCode), expected, 'comments should be stripped');
  t.done();
});
