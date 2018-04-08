var Prediction = require('../models/Prediction')
var moment = require('moment-timezone')
var Wunderground = require('node-weatherunderground')
var Promise = require('bluebird')

module.exports = {
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
      // remember the time zone is hard coded right now
      var currentTime = moment().tz('America/New_York').format("YYYY-MM-DD-HH");
      Prediction.find({state: params.state, city: params.city, forecasts: {$elemMatch: {timeOfFruition: currentTime}}}, function(err, predictions){
        if (err){
          reject(err);
          return;
        }
        var list = [];
        // instead of returning the whole array of forecasts,
        // just return the one whos time of fruition matches the currentTime
        for (var i=0; i < predictions.length; i++){
          var prediction = predictions[i];
          list.push(prediction.fruitionFilter(currentTime))
        }
        var displayData = {
          predictions: list
        }
        resolve(displayData);
      })
    })
  },

  getCurrentConditions: (params) => {
    return new Promise(function(resolve, reject){
      var currentTime = moment().tz('America/New_York').format('YYYY-MM-DD-HH');
      var client = new Wunderground(process.env.WUNDERGROUND_API_KEY);
      client.conditions(params, function(err, data){
        if (err){
          throw err;
          return;
        }
        var temp = data.temp_f;
        var condition = data.weather;
        resolve({temp: temp, condition: condition, time: currentTime});
      })
    })
  },

  destroy: function(){
    //this doesnt work!
    return new Promise(function(resolve, reject){
      Predcition.collection.drop()
      resolve('deleted')
      // })
    })
  }
}
