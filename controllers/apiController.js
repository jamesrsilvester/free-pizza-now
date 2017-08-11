function index(req, res) {
  res.json({
    message: 'Welcome Free Pizza API Docs',
    documentation_url: 'https://github.com/jamesrsilvester/free-pizza-now',
    base_url: 'localhost:5000',
    endpoints: [
      {
        // TODO: Each method/path/description is deserving of being it's own object literal instead of a large list
        method: 'GET',
        path: '/api',
        description: 'Describes available endpoints',
        method: 'GET',
        path: '/api/events',
        description: 'all events',
        method: 'POST',
        path: '/api/events',
        description: 'add new event',
        method: 'GET',
        path: '/api/events/:eventId',
        description: 'show page for each event',
        method: 'DELETE',
        path: '/api/events/:eventId',
        description: 'delete individual event',
        method: 'PUT',
        path: '/api/events/:eventId',
        description: 'modify existing individual event',
        method: 'GET',
        path: '/api/events',
        description: 'all venues',
        method: 'POST',
        path: '/api/events',
        description: 'add new venue',
        method: 'GET',
        path: '/api/venues/:venueId',
        description: 'show page for each venue',
        method: 'DELETE',
        path: '/api/venues/:venueId',
        description: 'delete individual venue',
        method: 'PUT',
        path: '/api/venues/:venueId',
        description: 'modify existing individual venue',
      },
    ],
  });
}

module.exports = {
  index: index,
};
