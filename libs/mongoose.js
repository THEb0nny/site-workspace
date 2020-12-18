let mongoose = require('mongoose');
let config = require('./config/config.json');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

module.exports = mongoose;