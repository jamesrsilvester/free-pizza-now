let mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/freepizzanow");

let Event = require('./event');
module.exports.Event = Event;
module.exports.Venue = Event.Venue;
