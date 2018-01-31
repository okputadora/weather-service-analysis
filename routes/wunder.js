// logs forecasts and then checks them against the actual weather as it happens,
// generating accuracy stats for each type of forecast (i.e. 1day 2day 5day 10day etc)

const express = require('express')
const Wunderground = require('node-weatherunderground')
const PredictionController = require('../controllers/PredictionController')
const router = express.Router()

router.post('/:action', function(req, res, next){
  var action = req.params.action
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
  var params = {
    key: process.env.API_KEY,
    city: city,
    state: state
  }
  console.log(params);
  if (action == 'forecast'){
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
  //
  // // get the current date and time, consider moving this to a controller at somepoint
  // // we're going to use this as the base by which we compare the distance of predictions
  //
  // console.log(currentDate)
  //
  // // API key and location
  // var opts = {
  //   key: process.env.API_KEY,
  //   city: city,
  //   state: state
  // }
  //
  // var action = req.params.action
  // if (action == 'current'){
  //   client.conditions(opts, function(err, data) {
  //     if (err){
  //       throw err
  //       return
  //     }
  //     res.json(data)
  //   });
  //   return;
  // }
router.get('/:getDb', function(req, res, next){
  console.log('getting predictions')
  PredictionController.get()
  .then(function(result){
    res.json(result)
  })
  .catch(function(err){
    res.json(err)
  })
})

module.exports = router;
