/*  Copyright 2012 Keymaker Project

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
var http = require('http');
var querystring = require('querystring');

exports.makeRequest = function(options, cb) {
  var postData = null;
  if (options && options.hasOwnProperty('postData')){
    postData = querystring.stringify(options.postData);
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  }
  var req = http.request(options, function(res) {
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      cb(req, res, data);
    });
  });

  if (postData) {
    req.write(postData);
  }
  req.end();
};