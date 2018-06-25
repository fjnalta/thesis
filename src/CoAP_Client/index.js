// Simple CoAP Client
// Generates a random temperature value every 5 seconds and sends it to the subscriber.
'use strict';
var coap = require('coap');
var config = require('./config');

function fireRequest() {
    var req = coap.request(config.destination);
    var payload = {
        title: 'molding machine #1 Temp',
        body: Math.floor(Math.random() * 100) + 250 + '°C'
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

 setInterval(fireRequest, 10*1000);