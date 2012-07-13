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
var crypto = require('crypto');
var settings = require('../settings').settings;

exports.makeLocals = function(req, options) {
  var locals = {
    'appTitle': app.set('appTitle'),
    'appVersion': app.set('appVersion'),
    'title': null,
    'req': req,
    'flash': req.flash(),
  }
  for (var k in options) {
    locals[k] = options[k] || "";
  }
  return locals;
};

exports.hash = function(data, options){
  var key = options && options.hasOwnProperty('key') ? options.key : settings.SECRET_KEY;
  var c = crypto.createHmac('sha256', key);
  var data = c.update(data);
  var hex = c.digest('hex');
  return hex;
}