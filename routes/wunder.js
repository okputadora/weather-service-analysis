// logs forecasts and then checks them against the actual weather as it happens,
// generating accuracy stats for each type of forecast (i.e. 1day 2day 5day 10day etc)

const express = require('express')
const Wunderground = require('node-weatherunderground')
const router = express.Router()
const moment = require('moment')

router.get('/:action', function(req, res, next){
  // Make sure the parameters are present
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
  // get the current date and time, consider moving this to a controller at somepoint
  // we're going to use this as the base by which we compare the distance of predictions
  var currentDate = moment()
  console.log(currentDate)

  // API key and location
  var opts = {
    key: process.env.API_KEY,
    city: city,
    state: state
  }
  var client = new Wunderground()
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
  if (action == 'forecast'){
    client.hourly10day(opts, function(err, data){
      if (err){
        console.log(data);
        throw err
        return
      }
      var predictions = []
      for (i=0; i < data.length; i++){
        var month = (data[i].FCTTIME.mon_padded)
        var day = (data[i].FCTTIME.mday_padded )
        var year = (data[i].FCTTIME.year)
        var hour = (data[i].FCTTIME.hour_padded)
        var dateString = year + '-' + month + '-' + day + '-' + hour
        var end = moment(dateString, 'YYYY-MM-DD-HH');
        console.log(end);
        // consider adding 1 to distance as the first operation seems to be working
        // with a rounded currentDate making the distance 0 when we want 1
        distance = end.diff(currentDate, "hours")
        distance = distance + 1;
        end = end.format('YYYY-MM-DD-HH')
        var prediction = {
          date: end,
          hours_from_fruition: distance,
          forecast: {
            temp: data[i].temp.english,
            weather: data[i].condition
          }
        }
        predictions.push(prediction)
      }
      res.json(predictions)
    })
  }
})

module.exports = router;
