// logs forecasts and then checks them against the actual weather as it happens,
// generating accuracy stats for each type of forecast (i.e. 1day 2day 5day 10day etc)

const express = require('express')
const Wunderground = require('node-weatherunderground')
const PredictionController = require('../controllers/PredictionController')
const router = express.Router()

// begins the intiation of a new model-building process
// models take a while to build cause we're waiting on real weather data to come
// in each hour
router.post('/:action', function(req, res, next){
  var action = req.params.action
  if (action == 'delete'){
    PredictionController.destroy()
    .then(function(result){
      res.json(result)
    })
    .catch(function(err){
      res.json(err)
    })
    return
  }
  // Make sure the parameters are present
  var city = req.body.city
  if (city == null){
    res.json({
      confirmation: 'fail',
      message: 'enter the name of a city'
    })
    return
  }
  var state = req.body.state
  if (state == null){
    res.json({
      confirmation: 'fail',
      message: 'enter the name of a state'
    })
    return
  }
  // i should be able to set this in the model but for some reason
  // 'lowercase: true' is not working
  city = city.toLowerCase();
  state = state.toLowerCase();
  var params = {
    key: process.env.API_KEY,
    city: city,
    state: state
  }
  if (action == 'initiateModel'){
    // initiate construction of the model
    PredictionController.post(params)
    .then(function(result){
      res.json(result)
    })
    .catch(function(err){
      res.json(err)
    })
    return
  }
})

router.get('/:action', function(req, res, next){
  var action = req.params.action

  if (action == 'displayGraph'){
    var city = req.query.city
    var city = city.toLowerCase()
    var state = req.query.state
    var state = state.toLowerCase()
    params = {
      key: process.env.API_KEY,
      city: city,
      state: state
    }
    PredictionController.getByParams(params)
    .then(function(result){
      res.json(result)
    })
    .catch(function(err){
      res.json(err)
    })
  }
  if (action == 'displayDb'){
    PredictionController.get()
    .then(function(result){
      res.json(result)
    })
    .catch(function(err){
      res.json(err)
    })
  }
})

module.exports = router;
