config = {};
config.ip = '0.0.0.0';
config.port = 5683;
config.webport = 9999;
config.database = [
    {name: 'Temperatursensor_#1', temp: 0},
    {name: 'Temperatursensor_#2', temp: 0},
    {name: 'Temperatursensor_#3', temp: 0}
];

module.exports = config;