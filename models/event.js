let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Venue = require('./venue.js');

let EventSchema = new ({
  name: String,
  description: String,
  dateAndtime: String,
  location: Venue.Schema
})

//create event model
let Event = mongoose.model('Event', EventSchema);

module.exports = Event;
