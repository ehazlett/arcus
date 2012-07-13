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
try {
    var local = require('./local_settings').settings;
} catch(err) {
    var local = {};
}

var env = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : {};
var redis =  env.hasOwnProperty('redis-2.2') ? env['redis-2.2'][0]['credentials'] : {};
var mongo = env.hasOwnProperty('mongodb-1.8') ? env['mongodb-1.8'][0]['credentials'] : {};
exports.settings = {
    SECRET_KEY: '1q2w3e4r5t6y7u8i9o0pAbCdOIUYT234fdrtjfjru7839d',
    REDIS_HOST: redis.host || 'localhost',
    REDIS_PORT: redis.port || 6379,
    REDIS_DB: redis.name || 5,
    REDIS_PASS: redis.password || '',
    SESSION_SECRET: 'sessionkey',
}
