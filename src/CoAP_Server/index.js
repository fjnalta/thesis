// Simple CoAP Server
// Displays incoming payload in console
'use strict'
var coap = require('coap');
var server = coap.createServer();

server.on('request', function(req, res) {
    var obj = JSON.parse(req.payload);
    console.log('Title:' + obj.title);
    console.log('Body:' + obj.body);
    res.end();
});

// the default CoAP port is 5683
server.listen(function() {
    console.log('Server listening on Port 5683');
});