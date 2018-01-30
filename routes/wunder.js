// logs forecasts and then checks them against the actual weather as it happens,
// generating accuracy stats for each type of forecast (i.e. 1day 2day 5day 10day etc)

const express = require('express')
const Wunderground = require('node-weatherunderground')
const router = express.Router()

router.get('/', function(req, res, next){
  console.log('working')
  var city = req.query.city
  var state = req.query.state
  console.log(city)
  console.log(state)
  console.log(process.env.API_KEY)
  // API key and location
  var opts = {
    key: process.env.API_KEY,
    city: city,
    state: state
  }
  console.log(opts.key)
  var client = new Wunderground();
  client.conditions(opts, function(err, data) {
    if (err){
      throw err
      return
    }
    res.json(data)
  });
})

module.exports = router;
