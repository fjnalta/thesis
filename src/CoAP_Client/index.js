'use strict';
var coap = require('coap');
var config = require('./config');

function fireRequest(sensor, temp) {
    var req = coap.request(config.destination);
    var payload = {
        title: sensor,
        body: temp
    };
    req.write(JSON.stringify(payload));
    req.on('response', function(res) {
        // Do something on response
        // res.pipe(process.stdout);

        res.on('end', function() {
        // Do nothing if end of conversation
        //    process.exit(0);
        });
    });
    req.end();
 }

setInterval(function() { fireRequest('Temperatursensor_#1', Math.floor(Math.random() * 25) + 250); }, 2*1000);
setInterval(function() { fireRequest('Temperatursensor_#2', Math.floor(Math.random() * 50) + 50); }, 5*1000);
setInterval(function() { fireRequest('Temperatursensor_#3', Math.floor(Math.random() * 100) + 650); }, 3*1000);