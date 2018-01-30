// logs forecasts and then checks them against the actual weather as it happens,
// generating accuracy stats for each type of forecast (i.e. 1day 2day 5day 10day etc)

const express = require('express')
const Wunderground = require('node-weatherunderground')
const router = express.Router()

router.get('/:action', function(req, res, next){
  var city = req.query.city
  if (city == null){
    res.json({
      confirmation: 'fail',
      message: 'enter the name of a city'
    })
    return
  }
  var state = req.query.state
  if (state == null){
    res.json({
      confirmation: 'fail',
      message: 'enter the name of a state'
    })
    return
  }
  // API key and location
  var opts = {
    key: process.env.API_KEY,
    city: city,
    state: state
  }
  var client = new Wunderground();
  var action = req.params.action
  if (action == 'current'){
    client.conditions(opts, function(err, data) {
      if (err){
        throw err
        return
      }
      res.json(data)
    });
    return;
  }
  if (action == '10day'){
    client.hourly10day(opts, function(err, data){
      if (err){
        throw err
        return
      }
      res.json(data);
    })
  }
})

module.exports = router;
