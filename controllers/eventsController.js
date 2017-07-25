var db = require('../models');

// GET /api/events
function index(req, res) {
  // send back all events as JSON
  db.Event.find({}, function(err, allEvents) {
    res.json(allEvents);
  });
}
// QUESTION: We are exporting the index request function, but the syntax is unfamiliar.
module.exports = {
  index: index,
};
