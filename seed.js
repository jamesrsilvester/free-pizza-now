let db = require("./models");

//Event Seed Data
var eventList =[];

eventList.push({
              name: "Day Zero at Node Summit 2017",
              description: 'Join us for a full "pre-day" of workshops and NodeTalks on Tuesday, July 25th. Attendance is limited and by invitation only.',
              dateAndTime: "Tuesday, July 25, 2017 from 9:00 AM to 5:00 PM (PDT)",
              venue: "Mission Bay Conference Center",
              address: "1675 Owens Street Suite 251, San Francisco, CA 94158"
            });
eventList.push({
              name: "Food, Beer, Streamlined Dashboards and Data Efficiency.",
              description: "As the volume and variety of data continues to grow more and more companies need to implement scalable big data infrastructure that transfers, manages, and analyzes their data in order to support analytics and insights.",
              dateAndTime: "Thu, July 27, 2017, 6:00 PM – 8:00 PM PDT",
              venue: "Chartio",
              address: "728 Commercial Street (entrance is at 727 Clay Street),San Francisco, CA 94108"
            });
eventList.push({
              name: "What's New In JavaScript: Learn about Distributed Ledgers, IoT and Node-RED",
              description: "It’s been more than a year since Node-RED was contributed as an open-source project to the JS Foundation. Since then, there’s been staggering growth and a surge in use cases. In this meetup, you’ll hear from Node-RED creator Nick O’Leary about the latest with the project and where it’s heading. Refreshments will be served.",
              dateAndTime: "Mon, July 31, 2017, 6:00 PM – 8:00 PM PDT",
              venue: "Galvanize",
              address: "44 Tehama Street, San Francisco, CA 94105"
            });
eventList.push({
              name: "PLIBMTTBHGATY SF",
              description: "PLIBMTTBHGATY is a lightly-structured party where people get together and work on a project in a new programming language, either with or just near each other.",
              dateAndTime: "Sat, August 5, 2017, 10:00 AM – 3:00 PM PDT",
              venue: "thoughtbot Inc.",
              address: "85 2nd Street, #700 San Francisco, CA 94105"
            });

db.Event.remove({}, function(err, events){
  db.Event.create(eventList, function(err, events){
    if (err) { return console.log('ERROR', err); }
    console.log("all events:", events);
    console.log("created", events.length, "events");
    process.exit();
  });

});
