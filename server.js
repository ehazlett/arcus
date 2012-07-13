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
var express = require('express')
  , indexRoutes = require('./routes/index')
  , settings = require('./settings').settings
  , i18n = require('i18n')
var RedisStore = require('connect-redis')(express);
var redisOpts = {
    'host': settings.REDIS_HOST,
    'port': settings.REDIS_PORT,
    'db': settings.REDIS_DB,
    'pass': settings.REDIS_PASS
}
app = module.exports.server = express.createServer();
// i18n configuration
i18n.configure({
    locales:['en', 'fr'],
    register: global
});

// express configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view options', {
        layout: false
    });
    app.set('appTitle', 'arcus');
    app.set('appVersion', '0.1.0');
    app.set('secretKey', settings.SECRET_KEY);
    app.set('REDIS_HOST', settings.REDIS_HOST);
    app.set('REDIS_PORT', settings.REDIS_PORT);
    app.set('REDIS_DB', settings.REDIS_DB);
    app.set('REDIS_PASS', settings.REDIS_PASS);
    //app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: settings.SESSION_SECRET, store: new RedisStore(redisOpts) }));
    app.use(i18n.init);
    app.use(app.router);
    app.use(express.static(__dirname + '/static'));
});
app.register('.html', require('ejs'));

app.configure('development', function(){
    app.set('appVersion', 'dev');
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('test', function(){
    app.set('appVersion', 'test');
});
app.configure('production', function(){
    app.use(express.errorHandler());
});

// Middleware

// Routes
app.get('/', indexRoutes.index);
app.get('/env', indexRoutes.env);

