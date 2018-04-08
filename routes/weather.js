// logs forecasts and then checks them against the actual weather as it happens,
// generating accuracy stats for each type of forecast (i.e. 1day 2day 5day 10day etc)

const express = require('express')
var moment = require('moment')
const weatherController = require('../controllers/weatherController')
const router = express.Router()

router.get('/:action', function(req, res, next){
  var action = req.params.action
  if (action == 'displayDb'){
    weatherController.get()
    .then(function(result){
      res.json(result)
    })
    .catch(function(err){
      res.json(err)
    })
    return
  }
  var city = req.query.city
  city = city.toLowerCase()
  var state = req.query.state
  state = state.toLowerCase()
  console.log(city)
  params = {
    key: process.env.WUNDERGROUND_API_KEY,
    city: city,
    state: state
  }
  weatherController.getByParams(params)
  .then(function(result){
    // this is not an optimal way to return the results...
    // we are querying the database once to load the view and
    // again to display the graph...we should load the view with all of the data
    // hidden in an element
    if (action == 'loadView'){
      // Format city and state and time
      city = result.city.charAt(0).toUpperCase() + result.city.slice(1)
      state = result.state.toUpperCase()
      var time = moment(result.currentTime, "YYYY-MM-DD-HH").format("dddd, MMMM Do, YYYY")
      res.render('displayAccuracy', {
        title: 'Weather Accuracy',
        city: city,
        state: state,
        time: time,
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
