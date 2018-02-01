var Prediction = require('../models/Prediction')
var moment = require('moment')
var Wunderground = require('node-weatherunderground')
var Promise = require('bluebird')

module.exports = {
  post: function(params){
    return new Promise(function(resolve, reject){
      var client = new Wunderground()
      // perfrom this operation every hour
      client.hourly10day(params, function(err, data){
        if (err){
          throw err
          return
        }
        // parse data
        var forecasts = []
        for (i=0; i < data.length; i++){
          var month = (data[i].FCTTIME.mon_padded)
          var day = (data[i].FCTTIME.mday_padded )
          var year = (data[i].FCTTIME.year)
          var hour = (data[i].FCTTIME.hour_padded)
          var dateString = year + '-' + month + '-' + day + '-' + hour
          var end = moment(dateString, 'YYYY-MM-DD-HH')


          distance = end.diff(currentDate, "hours")
          distance = distance + 1;
          end = end.format('YYYY-MM-DD-HH')

          // build model
          var forecast = {
            date: end,
            hours_from_fruition: distance,
            forecast: {
              temp: data[i].temp.english,
              weather: data[i].condition
            }
          }
          forecasts.push(forecast)
        }
        var currentDate = moment().format('YYYY-MM-DD-HH')
        console.log(currentDate);
        prediction = {
          city: params.city,
          state: params.state,
          timeOfPrediction: currentDate,
          predictions: forecasts
        }
        console.log(params.city)
        Prediction.create(prediction, function(err, prediction){
          if (err){
            reject(err)
            return
          }
          resolve(prediction)
        })
      })
    })
  },

  get: function(){
    return new Promise(function(resolve, reject){
      Prediction.find(function(err, predictions){
        if (err){
          reject(err)
          return
        }
        resolve(predictions);
      })
    })
  },

  destroy: function(){
    return new Promise(function(resolve, reject){
      Predcition.remove({}, function(err, result){
        if (err){
          reject(err)
          return
        }
        console.log("dropping the table")
        resolve(result)
      })
    })
  }
}
