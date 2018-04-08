// logs forecasts and then checks them against the actual weather as it happens,
// generating accuracy stats for each type of forecast (i.e. 1day 2day 5day 10day etc)

const express = require('express')
const moment = require('moment-timezone')
const Promise = require('bluebird')
const controllers = require('../controllers/')
const router = express.Router()
// load the graph
router.get('/:action', (req, res, next) => {
  var action = req.params.action
  var city = req.query.city.toLowerCase()
  var state = req.query.state.toLowerCase()
  params = {
    city: city,
    state: state
  }
  if (action == 'displayGraph'){
    console.log("displaying graph")
    var apiRequests = [controllers['wunderground'].getByParams(params),
      // controllers['openWeather'].getByParams(params)
    ]
    console.log("stored promises in an array")
    Promise.all(apiRequests).then((responses) => {
      res.json(responses[0].predictions);
      return;
    })
    .catch((err) => {
      console.log("error")
      console.log(err)
    })
  }
  // load the page
  else {
    controllers['wunderground'].getCurrentConditions(params)
    .then((result) => {
      res.render('displayAccuracy', {
        city: city,
        state: state,
        time: result.time,
        temp: result.temp,
        condition: result.condition
      })
    })
    .catch((err) => {
      res.json(err)
    })
  }
})


module.exports = router;
