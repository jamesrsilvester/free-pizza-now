var db = require('../models');

// GET /api/venues
function index(req, res) {
  // send back all venues as JSON
  db.Event.find({}, function(err, allEvents) {
    res.json(allEvents);
  });
}

// GET /api/venues/:eventId
function show(req, res) {
  db.Event.findById(req.params.eventId, function (err, foundEvent){
    if (err){res.status(500).json({error:err.message});};
    res.json(foundEvent);
  })
};

//POST - All Events - create an event based on request body and respond with JSON
function create (req, res) {
  console.log(`${req.body} submitted`);
  db.Event.create(req.body, function (err, event) {
    if (err){res.status(500).json({error:err.message});};
    console.log("event posted");
    res.json(event);
  })
}

//Delete one event // DELETE // /api/venues/:eventId
function destroy(req,res) {
  console.log(req.params.eventId);
  db.Event.findOneAndRemove({_id:req.params.eventId}, function (err, eventToDelete){
    if (err){res.status(500).json({error:err.message});};
    console.log(JSON.stringify(eventToDelete));
    res.json(eventToDelete);
  });
};

//Update one event // Update // /api/venues/:eventId
function update(req, res) {
  db.Event.findById(req.params.eventId, function(err, eventToModify) {
    if (err){res.status(500).json({error:err.message});};
    eventToModify.name = req.body.name;
    eventToModify.description = req.body.description;
    eventToModify.dateAndTime = req.body.dateAndTime;
    eventToModify.venue = req.body.venue;
    eventToModify.address = req.body.address;
    eventToModify.image = req.body.image;
    eventToModify.save(function(err, eventToModify){
    if (err){res.status(500).json({error:err.message});};
    res.json(eventToModify);
    console.log(eventToModify);
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
