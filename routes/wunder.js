// logs forecasts and then checks them against the actual weather as it happens,
// generating accuracy stats for each type of forecast (i.e. 1day 2day 5day 10day etc)

const express = require('express')
const Wunderground = require('node-weatherunderground')
const PredictionController = require('../controllers/PredictionController')
const router = express.Router()

// begins the intiation of a new model-building process
// models take a while to build cause we're waiting on real weather data to come
// in each hour. how do we run the script and this function every hour?
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
  console.log(req.body)
  var city = req.body.city
  var state = req.body.state
  console.log(city)

  if (city == null || state == null){
    res.json({
      confirmation: 'fail',
      message: 'enter the name of a city'
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
    // initiate construction of the model every hour
    // setInterval(function(){
      console.log('making a new db entry')
      PredictionController.post(params)
      .then(function(result){
        console.log("success")
        res.json(result)
      })
      .catch(function(err){
        res.json(err)
      })
      return
    // }, 1000 * 60 * 60)
  }
})

router.get('/:action', function(req, res, next){
  var action = req.params.action
  if (action == 'displayDb'){
    PredictionController.get()
    .then(function(result){
      res.json(result)
    })
    .catch(function(err){
      res.json(err)
    })
    return
  }
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
    // this is not an optimal way to return the results...
    // we are querying the database once to load the view and
    // again to display the graph...we should load the view with all of the data
    // hidden in an element
    if (action == 'loadView'){
      res.render('displayAccuracy', {
        title: 'Weather Accuracy',
        city: result.city,
        state: result.state,
        time: result.currentTime,
        temp: result.currentTemp,
        condition: result.condition,
        forecasts: result.predictionData,
        partials: {
          header: '../views/partials/header'
        }
      })
    }
    if (action == 'displayGraph'){
      res.json(result.predictionData)
    }
  })
  .catch(function(err){
    res.json(err)
  })
})

module.exports = router;
