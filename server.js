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

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API Endpoints Placeholder
app.get('/api', controllers.api.index);
// events
app.get('/api/events', controllers.events.index);
app.post('/api/events', controllers.events.create);

app.get('/api/events/:eventId', controllers.events.show);
app.delete('/api/events/:eventId', controllers.events.destroy);
app.put('/api/events/:eventId', controllers.events.update);

app.post('/api/events/eventBrite', controllers.events.importEventBrite);

/**********
 * SERVER *
 **********/
// listen on port 3000
app.listen(process.env.PORT || 5000, function() {
  console.log('Express server is running on http://localhost:5000/');
});
