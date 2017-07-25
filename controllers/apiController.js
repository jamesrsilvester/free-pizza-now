function index(req, res){
  res.json({
    message: "Welcome Free Pizza API Docs",
    documentation_url: "https://github.com/jamesrsilvester/free-pizza-now",
    base_url: "localhost:5000",
    endpoints: [
      {
        method: "GET", path: "/api", description: "Describes available endpoints"
      }
    ]
  })
};

module.exports = {
  index: index
}
