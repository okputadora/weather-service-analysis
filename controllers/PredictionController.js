var Prediction = require('../models/Prediction')
var moment = require('moment')
var Wunderground = require('node-weatherunderground')
var Promise = require('bluebird')

module.exports = {
  post: function(params){
    return new Promise(function(resolve, reject){
      var client = new Wunderground()
      var currentDate = moment().format('YYYY-MM-DD-HH')
      var forecasts = []
      client.hourly10day(params, function(err, data){
        if (err){
          throw err
          return
        }
        // parse data
        for (i=0; i < data.length; i++){
          var month = (data[i].FCTTIME.mon_padded)
          var day = (data[i].FCTTIME.mday_padded )
          var year = (data[i].FCTTIME.year)
          var hour = (data[i].FCTTIME.hour_padded)
          var dateString = year + '-' + month + '-' + day + '-' + hour
          var end = moment(dateString, 'YYYY-MM-DD-HH')
          end = end.format('YYYY-MM-DD-HH')

          // build model
          var forecast = {
            city: params.city,
            state: params.state,
            timeOfPrediction: currentDate,
            timeOfFruition: end,
            temp: data[i].temp.english,
            condition: data[i].condition
          }
          forecasts.push(forecast)
        }
        console.log('getting to here')
        Prediction.collection.insertMany(forecasts, function(err, prediction){
          if (err){
            console.log('couldnt create')
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
