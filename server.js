
//require express
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

var controllers = require('./controllers');

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API Endpoints Placeholder
app.get('/api', controllers.api.index);
app.get('/api/events', controllers.events.index);
app.get('/api/events/:eventId', controllers.events.show);
app.delete('/api/events/:eventId', controllers.events.destroy);
app.post('/api/events', controllers.events.create);
app.put('/api/events/:eventId', controllers.events.update);
//venues

app.get('/api/venues', controllers.venues.index);
app.get('/api/venues/:venueId', controllers.venues.show);
app.delete('/api/venues/:venueId', controllers.venues.destroy);
app.post('/api/venues', controllers.venues.create);
app.put('/api/venues/:venueId', controllers.venues.update);

/**********
 * SERVER *
 **********/
// listen on port 3000
app.listen(process.env.PORT || 5000, function () {
  console.log('Express server is running on http://localhost:5000/');
});
