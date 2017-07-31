var db = require('../models');

let addresses = [
  {
  name:"Mission Bay Conference Center",
  address: "1675 Owens Street Suite 251, San Francisco, CA 94158"
  },
  {
  name:"Chartio",
  address: "728 Commercial Street (entrance is at 727 Clay Street),San Francisco, CA 94108"
  },
  {
  name: "Galvanize",
  address: "44 Tehama Street, San Francisco, CA 94105"
  },

  {name:"thoughtbot Inc.",
  address: "85 2nd Street, #700 San Francisco, CA 94105"
  },
  {name: "Rithm School",
  address: "3338 17th street, San Francisco, California 94110"
  },
  {name: "Community Center",
  address: "544 Capp Street, San Francisco, CA 94110"
  },
  {name: "Second Stage",
  address: "144 Taylor St, San Francisco, CA 94102"
  },
  {name: "Galvanize SF",
  address: "44 Tehama St, San Francisco, CA"
  },
  {name: "WHOMentors",
  address: "101A Clay Street, San Francisco, CA 94111"
  },
  {name: "Upload Inc.",
  address: "1535 Mission St, San Francisco, CA 94103"
  },
  {name: "SFSU Library Lobby",
  address: "1630 Holloway Avenue, San Francisco, CA 94132"
  },
  {name: "UpWork",
  address: "1630 Market St, San Francisco, CA 94121"
  }
]

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
    if (err){res.status(500).json({error:err.message});};
    res.json(foundEvent);
  })
};

//POST - All Events - create an event based on request body and respond with JSON
function create (req, res) {
  console.log(`${req.body} submitted`);
  let newEvent = req.body;
  newEvent.venue = {name: newEvent.venue, address:newEvent.address}
  db.Event.create(newEvent, function (err, event) {
    if (err){res.status(500).json({error:err.message});};
    console.log("event posted");
    res.json(event);
  })
}

//Delete one event // DELETE // /api/events/:eventId
function destroy(req,res) {
  console.log(req.params.eventId);
  db.Event.findOneAndRemove({_id:req.params.eventId}, function (err, eventToDelete){
    if (err){res.status(500).json({error:err.message});};
    console.log(JSON.stringify(eventToDelete));
    res.json(eventToDelete);
  });
};

//Update one event // Update // /api/events/:eventId
function update(req, res) {
  db.Event.findById(req.params.eventId, function(err, eventToModify) {
    if (err){res.status(500).json({error:err.message});};
    eventToModify.name = req.body.name;
    eventToModify.description = req.body.description;
    eventToModify.dateAndTime = req.body.dateAndTime;
    eventToModify.venue = {name:req.body.venue,address:req.body.address};
    eventToModify.image = req.body.image;
    eventToModify.save(function(err, eventToModify){
    if (err){res.status(500).json({error:err.message});};
    res.json(eventToModify);
    console.log(eventToModify);
    })
  });
};

function importEventBrite(req, res){
  let eventsAdded = [];
  let eventsToPreserve = ['597f5deac3f41a59c72582e5','597f5deac3f41a59c72582e3','597f5deac3f41a59c72582e1','597f5deac3f41a59c72582de'];

  req.body.events.forEach(function(event,index){
    if (index <= 12){

      let newDescription = event.description.html;
      let newStartDate = {
        year:event.start.local.slice(0,4),
        month:event.start.local.slice(5,7),
        day:event.start.local.slice(8,10),
        hour:event.start.local.slice(11,13),
        minute:event.start.local.slice(14,16),
        ampm:'am'
      }
      let newEndDate = {
        year:event.end.local.slice(0,4),
        month:event.end.local.slice(5,7),
        day:event.end.local.slice(8,10),
        hour:event.end.local.slice(11,13),
        minute:event.end.local.slice(14,16),
        ampm:'am'
      }
      if (newStartDate.hour > 12){
        newStartDate.hour = newStartDate.hour - 12;
        newStartDate.ampm = "pm";
      }

      if (newEndDate.hour > 12){
        newEndDate.hour = newEndDate.hour - 12;
        newEndDate.ampm = "pm";
      }
      let newDateString = `${newStartDate.month}\/${newStartDate.day}\/${newStartDate.year}, ${newStartDate.hour}:${newStartDate.minute} ${newStartDate.ampm} - ${newEndDate.hour}:${newEndDate.minute} ${newEndDate.ampm}`;
      console.log(newDateString);
      if (event.url !== ""){
        newDescription = `${newDescription}<p><a href="${event.url}" target="_blank">view event on EventBrite</a></p>`;
      }

      let newEvent = {
        name: event.name.text,
        description: newDescription,
        dateAndTime: newDateString,
        venue: {name:addresses[index].name, address:addresses[index].address},
        image: event.logo.url
      }

      eventsAdded.push(newEvent);

    }
  });

  db.Event.find({ "groups": { "$nin": eventsToPreserve } }).exec(function (err, foundEvents){
    console.log(JSON.stringify(foundEvents));
    let eventsToDelete = [];
    let thisEvent = {};
    foundEvents.forEach(function(item,index){
      thisEvent = {"_id":item._id}
      eventsToDelete.push(thisEvent);
    });
    if (err){res.status(500).json({error:err.message});};
    db.Event.remove(foundEvents, function(err, events){
      db.Event.create(eventsAdded, function(err, events){
        if (err){res.status(500).json({error:err.message});};
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
  importEventBrite: importEventBrite
};
