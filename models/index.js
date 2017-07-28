let mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/freepizzanow");

let Event = require('./event');
let Venue = require('./venue');
module.exports.Event = Event;
module.exports.Venue = Venue;
