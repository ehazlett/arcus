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
var app = require('./server');
var PORT = process.env.VCAP_APP_PORT || 3002;

app.server.listen(PORT);
console.log("Application started on port %d in %s mode", app.server.address().port, app.server.settings.env);
