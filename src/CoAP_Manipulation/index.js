'use strict';
var coap = require('coap');

if(process.argv.length == 2 || process.argv.length != 5) {
    console.log('Usage: node index.js [DESTINATION URL] [PAYLOAD TITLE] [INTERVAL]');
    process.exit(0);
}

var destination = process.argv[2];
var payload = process.argv[3];
var interval = process.argv[4];

function fireRequest(sensor, temp) {
    var req = coap.request(destination);
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

setInterval(function() { fireRequest(payload, Math.floor(Math.random() * 25) + 950); }, interval*1000);