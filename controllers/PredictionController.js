var Prediction = require('../models/Prediction')
var moment = require('moment')
var Wunderground = require('node-weatherunderground')
var Promise = require('bluebird')

module.exports = {
  post: function(params){
    return new Promise(function(resolve, reject){
      var client = new Wunderground()
      var currentTime = moment().format('YYYY-MM-DD-HH')
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
            timeOfFruition: end,
            temp: data[i].temp.english,
            condition: data[i].condition
          }
          forecasts.push(forecast)
        }
        var prediction = {
          city: params.city,
          state: params.state,
          timeOfPrediction: currentTime,
          forecasts: forecasts
        }
        Prediction.create(prediction, function(err, prediction){
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

  // used for displaying the graph
  getByParams: function(params){
    return new Promise(function(resolve, reject){
      console.log(params)
      // get the current time
      var currentTime = moment().format('YYYY-MM-DD-HH')
      console.log(currentTime)
      var client = new Wunderground()
      // get the current conditions
      console.log(params)
      client.conditions(params, function(err, data){
        console.log('querying wunderapi')
        if (err){
          throw err
          return
        }
        var temp = data.temp_f
        var condition = data.weather
        // pull from the database
        // , forecasts: {timeOfFruition: '2018-02-03-19'}
        Prediction.find({state: params.state, city: params.city, forecasts: {$elemMatch: {timeOfFruition: currentTime}}}, function(err, predictions){
          if (err){
            reject(err)
            return
          }
          var list = []
          // instead of returning the whole array of forecasts,
          // just return the one whos time of fruition matches the currentTime
          for (var i=0; i < predictions.length; i++){
            var prediction = predictions[i]
            list.push(prediction.fruitionFilter(currentTime))
          }
          var displayData = {
            currentTime: currentTime,
            city: params.city,
            state: params.state,
            currentTemp: temp,
            condition: condition,
            predictionData: list
          }
          resolve(displayData)
        })
      })
    })
  },

  destroy: function(){
    //this doesnt work!
    return new Promise(function(resolve, reject){
      Predcition.collection.drop()
      console.log("dropping the table")
      resolve('deleted')
      // })
    })
  }
}
