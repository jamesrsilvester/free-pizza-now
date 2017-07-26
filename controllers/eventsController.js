var db = require('../models');

// GET /api/events
function index(req, res) {
  // send back all events as JSON
  db.Event.find({}, function(err, allEvents) {
    res.json(allEvents);
  });
}

// GET /api/events/:eventId
function show(req, res) {
  db.Event.findById(req.params.eventId, function (err, foundEvent){
    if (err){console.log("Error finding single event", err);};
    res.json(foundEvent);
  })
};

//POST - All Events - create an event based on request body and respond with JSON
function create (req, res) {
  console.log(`${req.body} submitted`);
  db.Event.create(req.body, function (err, event) {
    if (err) {
      console.log("Error occurred during post", err)
    };
    console.log("event posted");
    res.json(event);
  })
}

//Delete one event // DELETE // /api/events/:eventId
function destroy(req,res) {
  console.log(req.params.eventId);
  db.Event.findOneAndRemove({_id:req.params.eventId}, function (err, eventToDelete){
    if (err) {
      console.log("Error occurred during delete", err)
    };
    res.json(eventToDelete);
  });
};

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy
};
