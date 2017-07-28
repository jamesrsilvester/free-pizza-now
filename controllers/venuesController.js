var db = require('../models');

// GET /api/venues
function index(req, res) {
  // send back all venues as JSON
  db.Venue.find({}, function(err, allVenues) {
    if (err){res.status(500).json({error:err.message});};
    res.json(allVenues);
  });
}

// GET /api/venues/:venueId
function show(req, res) {
  db.Venue.findById(req.params.venueId, function (err, foundVenue){
    if (err){res.status(500).json({error:err.message});};
    res.json(foundVenue);
  })
};

//POST - All Venues - create an venue based on request body and respond with JSON
function create (req, res) {
  db.Venue.create(req.body, function (err, venue) {
    if (err){res.status(500).json({error:err.message});};
    res.json(venue);
  })
}

//Delete one venue // DELETE // /api/venues/:venueId
function destroy(req,res) {
  db.Venue.findOneAndRemove({_id:req.params.venueId}, function (err, venueToDelete){
    if (err){res.status(500).json({error:err.message});};
    res.json(venueToDelete);
  });
};

//Update one venue // Update // /api/venues/:venueId
function update(req, res) {
  db.Venue.findById(req.params.venueId, function(err, venueToModify) {
    if (err){res.status(500).json({error:err.message});};
    venueToModify.name = req.body.name;
    venueToModify.address = req.body.address;
    venueToModify.description = req.body.description;
    venueToModify.image = req.body.image;
    venueToModify.save(function(err, venueToModify){
    if (err){res.status(500).json({error:err.message});};
    res.json(venueToModify);
    })
  });
};

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
