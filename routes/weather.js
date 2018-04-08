// logs forecasts and then checks them against the actual weather as it happens,
// generating accuracy stats for each type of forecast (i.e. 1day 2day 5day 10day etc)

const express = require('express')
var moment = require('moment-timezone')
const controllers = require('../controllers/')
const router = express.Router()
// load the graph
router.get('/:action', (req, res, next) => {
  var action = req.params.action
  var city = req.query.city.toLowerCase()
  var state = req.query.state.toLowerCase()
  var service = req.query.service
  params = {
    city: city,
    state: state
  }
  if (action == 'displayGraph'){
    controllers[service].getByParams(params)
    .then((result) => {
      res.json(result.predictions);
      return;
    })
    .catch((err) => {
      res.json(err);
      return;
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
