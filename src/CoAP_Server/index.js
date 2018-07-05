'use strict'
var express = require('express');
var coap = require('coap');
var server = coap.createServer();
var path = require('path');
var config = require('./config');

// Setup Express
var app = express();

// Set static path
app.use('/public', express.static('public'));

// Use EJS as View Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

// Setup CoAP Server
server.on('request', function(req, res) {
    var tempData = JSON.parse(req.payload);
    for (var i=0; i < config.database.length; i++) {
        if(tempData.title == config.database[i].name) {
            config.database[i].temp = tempData.body;
        }
    }
    res.end();
});

/**
 * @param
 * @param
 */
server.listen(config.port, config.ip, function() {
    console.log('CoAP Server started at Port:' + config.port);
});

// Setup Express Routes
app.get('/', function (req, res) {
    res.render('servers');
});

app.get('/help', function (req, res) {
    res.render('help');
});

app.get('/update', function (req, res) {
    if(config.database[0].temp == 0 && config.database[1].temp == 0 && config.database[2].temp == 0) {
        res.status(503).send('No data available');       
    } else {
        res.send(config.database);
    }
});

/**
 * Start Webinterface
 * @param
 * @param
 */
app.listen(config.webport,function () {
    console.log('Webinterface started at Port:' + config.webport);
});