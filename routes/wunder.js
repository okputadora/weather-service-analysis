// logs forecasts and then checks them against the actual weather as it happens,
// generating accuracy stats for each type of forecast (i.e. 1day 2day 5day 10day etc)

const express = require('express')
const Wunderground = require('node-weatherunderground')
const router = express.Router()

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
  var date = new Date()
  var currentDate = {
    currentYear: date.getFullYear(),
    // note january = 0 so i'm gonna add 1
    currentMonth: (date.getMonth() + 1),
    currentDay: date.getDate(),
    currentHour: date.getHours()
  }
  console.log(date)
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
        throw err
        return
      }
      var predictions = []
      for (i=0; i < data.length; i++){
        var prediction = {
          date: {
            dateString: data[i].FCTTIME.pretty,
            year: data[i].FCTTIME.year,
            month: data[i].FCTTIME.mon,
            day: data[i].FCTTIME.mday,
            hour: data[i].FCTTIME.hour,
          },
          forecast: {
            temp: data[i].temp.english,
            weather: data[i].condition
          },
          timeOfPrediction:{currentDate}
        }
        predictions.push(prediction)
      }
      res.json(predictions)
    })
  }
})

module.exports = router;
