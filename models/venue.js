let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let VenueSchema = new Schema({
  name: String,
  address: String,
  Description: String
})

let Venue = mongoose.model("Venue", VenueSchema);

module.export = Venue;
