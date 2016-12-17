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

var esmall = require('../');

var code = `
  var a = '123';
  var b = '456';
  console.log('a + b');
`;

var expected = 'var a = \'123\';var b = \'456\';console.log(\'a + b\');';

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
 
     var a = '123';
     var b = '456'; // this comment should be removed
     console.log('a + b');      
`

test('basic test', (t) => {
  t.plan(2);
  esmall(code, (err, result) => {
    t.error(err);
    t.equals(result, expected, 'we should be minified');
  });
});

test('no license', (t) => {
  t.plan(2);
  esmall(licensedCode, (err, result) => {
    t.error(err);
    t.equals(result, expected, 'we should be minified');
  });
});
