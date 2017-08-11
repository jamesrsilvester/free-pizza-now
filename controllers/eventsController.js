var db = require('../models');

/* TODO: Consider extracting this data into a separate file.
  Also, if you are using es6 I would expect this entire app to be written in es6.
  Please use only one JS version.
*/

let addresses = [
  {
    name: 'Mission Bay Conference Center',
    address: '1675 Owens Street Suite 251, San Francisco, CA 94158',
  },
  {
    name: 'Chartio',
    address:
      '728 Commercial Street (entrance is at 727 Clay Street),San Francisco, CA 94108',
  },
  {
    name: 'Galvanize',
    address: '44 Tehama Street, San Francisco, CA 94105',
  },
  {
    name: 'thoughtbot Inc.',
    address: '85 2nd Street, #700 San Francisco, CA 94105',
  },
  {
    name: 'Rithm School',
    address: '3338 17th street, San Francisco, California 94110',
  },
  {
    name: 'Community Center',
    address: '544 Capp Street, San Francisco, CA 94110',
  },
  {
    name: 'Second Stage',
    address: '144 Taylor St, San Francisco, CA 94102',
  },
  // TODO: Is this a duplicate entry?
  {
    name: 'Galvanize SF',
    address: '44 Tehama St, San Francisco, CA',
  },
  {
    name: 'WHOMentors',
    address: '101A Clay Street, San Francisco, CA 94111',
  },
  {
    name: 'Upload Inc.',
    address: '1535 Mission St, San Francisco, CA 94103',
  },
  {
    name: 'SFSU Library Lobby',
    address: '1630 Holloway Avenue, San Francisco, CA 94132',
  },
  {
    name: 'UpWork',
    address: '1630 Market St, San Francisco, CA 94121',
  },
];

// GET /api/events
function index(req, res) {
  // send back all events as JSON
  db.Event.find({}, function(err, allEvents) {
    /* TODO: Consider adding error-handling.  What if there is nothing in the
      database or we receive an error message in the err argument?
    */
    /* TODO: You are sending an array of objects back to your response.
      This is not technically a JSON object, so res.json is not correct.
      Consider sending your response this way;
      res.json({events: allEvents})
    */
    res.json(allEvents);
  });
}

// GET /api/events/:eventId
function show(req, res) {
  /* TODO: Consider extracting req.params.eventId to a named variable for
    a more semantic codebase.
    var eventId = req.params.eventId
  */
  db.Event.findById(req.params.eventId, function(err, foundEvent) {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json(foundEvent);
  });
}

//POST - All Events - create an event based on request body and respond with JSON
function create(req, res) {
  /* TODO: Consider removing console logging in production versions of codebase.
  */
  console.log('EVENT CREATE');
  console.log(`${req.body} submitted`);
  // TODO: A wild es6 variable appears!
  let newEvent = req.body;
  newEvent.venue = { name: newEvent.venue, address: newEvent.address };
  // TODO: Are you actually making a venue model object (complete with unique id?) using this method?
  db.Event.create(newEvent, function(err, event) {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    /* TODO: Consider removing console logging in production versions of codebase.
    */
    console.log('event posted');
    res.json(event);
  });
}

//Delete one event // DELETE // /api/events/:eventId
function destroy(req, res) {
  /* TODO: Consider removing console logging in production versions of codebase.
  */
  console.log(req.params.eventId);
  db.Event.findOneAndRemove({ _id: req.params.eventId }, function(
    err,
    eventToDelete,
  ) {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    /* TODO: Consider removing console logging in production versions of codebase.
    */
    console.log(JSON.stringify(eventToDelete));
    res.json(eventToDelete);
  });
}

//Update one event // Update // /api/events/:eventId
function update(req, res) {
  // TODO: Research the db method findOneAndUpdate() - It might work better
  db.Event.findById(req.params.eventId, function(err, eventToModify) {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    eventToModify.name = req.body.name;
    eventToModify.description = req.body.description;
    eventToModify.dateAndTime = req.body.dateAndTime;
    eventToModify.venue = { name: req.body.venue, address: req.body.address };
    eventToModify.image = req.body.image;
    eventToModify.save(function(err, eventToModify) {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      res.json(eventToModify);
      /* TODO: Consider removing console logging in production versions of codebase.
      */
      // TODO: Will this console log ever be triggered after the res.json call?
      console.log(eventToModify);
    });
  });
}

// TODO: Add comments to give other developers some insight to the input/output of your larger functions
function importEventBrite(req, res) {
  let eventsAdded = [];
  let eventsToPreserve = [
    // TODO: are these ids ever created again?  They are time stamps - they will never occur on your laptop more than once.
    '597f5deac3f41a59c72582e5',
    '597f5deac3f41a59c72582e3',
    '597f5deac3f41a59c72582e1',
    '597f5deac3f41a59c72582de',
  ];
  // TODO Would a .map method be more appropriate than a forEach method?
  req.body.events.forEach(function(event, index) {
    // TODO: this is huge. You should consider extracting this into a separate function/set of functions for better code accessibility
    if (index <= 12) {
      let newDescription = event.description.html;
      // TODO: Could you feed all of this data into a Date object to make it easier to handle?
      let newStartDate = {
        year: event.start.local.slice(0, 4),
        month: event.start.local.slice(5, 7),
        day: event.start.local.slice(8, 10),
        hour: event.start.local.slice(11, 13),
        minute: event.start.local.slice(14, 16),
        ampm: 'am',
      };
      let newEndDate = {
        year: event.end.local.slice(0, 4),
        month: event.end.local.slice(5, 7),
        day: event.end.local.slice(8, 10),
        hour: event.end.local.slice(11, 13),
        minute: event.end.local.slice(14, 16),
        ampm: 'am',
      };
      if (newStartDate.hour > 12) {
        newStartDate.hour = newStartDate.hour - 12;
        newStartDate.ampm = 'pm';
      }

      if (newEndDate.hour > 12) {
        newEndDate.hour = newEndDate.hour - 12;
        newEndDate.ampm = 'pm';
      }
      let newDateString = `${newStartDate.month}\/${newStartDate.day}\/${newStartDate.year}, ${newStartDate.hour}:${newStartDate.minute} ${newStartDate.ampm} - ${newEndDate.hour}:${newEndDate.minute} ${newEndDate.ampm}`;
      /* TODO: Consider removing console logging in production versions of codebase.
      */
      console.log(newDateString);
      if (event.url !== '') {
        // TODO: To preserve a separation of concerns, avoid creating string literals (especially of html strings) in the controllers
        newDescription = `${newDescription}<p><a href="${event.url}" target="_blank">view event on EventBrite</a></p>`;
      }

      let newEvent = {
        name: event.name.text,
        description: newDescription,
        dateAndTime: newDateString,
        venue: {
          name: addresses[index].name,
          address: addresses[index].address,
        },
        image: event.logo.url,
      };

      eventsAdded.push(newEvent);
    }
  });

  db.Event
    .find({ groups: { $nin: eventsToPreserve } })
    .exec(function(err, foundEvents) {
      /* TODO: Consider removing console logging in production versions of codebase.
      */
      console.log(JSON.stringify(foundEvents));
      let eventsToDelete = [];
      let thisEvent = {};
      // TODO: Would a .map function be more appropriate?
      // TODO: Why are you including index?
      foundEvents.forEach(function(item, index) {
        thisEvent = { _id: item._id };
        eventsToDelete.push(thisEvent);
      });
      if (err) {
        res.status(500).json({ error: err.message });
      }
      db.Event.remove(foundEvents, function(err, events) {
        db.Event.create(eventsAdded, function(err, events) {
          if (err) {
            res.status(500).json({ error: err.message });
          }
          // TODO: Are you returning an actual JSON object or an array of objects?
          res.json(events);
        });
      });
    });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update,
  importEventBrite: importEventBrite,
};
