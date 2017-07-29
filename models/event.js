let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let VenueSchema = new Schema({
  name: String,
  address: String
})

let EventSchema = new Schema({
  name: String,
  description: String,
  dateAndTime: String,
  venue: VenueSchema,
  image: String
  // location: Venue.Schema // QUESTION: proper format for location.address?
})

//create event model
let Event = mongoose.model('Event', EventSchema);
let Venue = mongoose.model('Venue', EventSchema);

module.exports = Event;
