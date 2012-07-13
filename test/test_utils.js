var assert = require('assert');
/*  Copyright 2012 Arcus

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
var utils = require('../lib/utils');
var makeLocals = utils.makeLocals;

suite('utils', function() {
  suite('makeLocals', function() {
    var mockRequest = {}
    mockRequest.flash = function(){}

    test('appTitle key should exist in locals', function() {
      var locals = makeLocals(mockRequest);
      assert.equal(locals.hasOwnProperty('appTitle'), true);
    });
    test('appVersion key should exist in locals', function() {
      var locals = makeLocals(mockRequest);
      assert.equal(locals.hasOwnProperty('appVersion'), true);
    });
    test('extra key should exist in locals', function() {
      var locals = makeLocals(mockRequest, {'demo': null});
      assert.equal(locals.hasOwnProperty('demo'), true);
    });
    test('flash key should exist in locals', function() {
      var locals = makeLocals(mockRequest);
      assert.equal(locals.hasOwnProperty('flash'), true);
    });
    test('req key should exist in locals', function() {
      var locals = makeLocals(mockRequest);
      assert.equal(locals.hasOwnProperty('req'), true);
    });
    test('title key should exist in locals', function() {
      var locals = makeLocals(mockRequest);
      assert.equal(locals.hasOwnProperty('title'), true);
    });
  });
  suite('hash', function() {
    test('should encrypt data', function(){
      var hash = utils.hash('this is test data' );
      assert.notEqual(hash, null);
    });
    test('should have valid encrypted data', function(){
      var hash = utils.hash('this is test data', {key: 'foo'});
      assert.equal(hash, '848ff100b4e6039a6289a60bf69ca05a801570acc7210d989128cb29be60c876');
    });
  });
});