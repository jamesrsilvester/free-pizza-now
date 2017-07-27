let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Venue = require('./venue.js');

let EventSchema = new Schema({
  name: String,
  description: String,
  dateAndTime: String,
  venue: String,
  address: String,
  image: String
  // location: Venue.Schema // QUESTION: proper format for location.address?
})

//create event model
let Event = mongoose.model('Event', EventSchema);

module.exports = Event;
