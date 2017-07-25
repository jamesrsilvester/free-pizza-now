let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/freepizzanow");

var Event = require('./event');

module.exports.Event = Event;
module.exports.Venue = require('./venue');
