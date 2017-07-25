var db = require('../models');

// GET /api/events
function index(req, res) {
  // send back all events as JSON
  db.Event.find({}, function(err, allEvents) {
    res.json(allEvents);
  });
}

//POST - All Events - create an event based on request body and respond with JSON
function create (req, res) {
  console.log(`${req.body} submitted`);
  db.Event.create(req.body, function (err, event) {
    if (err) {
      console.log("Error occurred during post")
    };
    console.log("event");
    res.json(event);
  })
}

module.exports = {
  index: index,
  create: create
};
