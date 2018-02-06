var mongoose = require('mongoose')
var moment = require('moment')
var PredictionSchema = new mongoose.Schema({
  city: {type:String, required:true,  lowercase:true,  default:''},
  state: {type:String, required:true, lowercase:true,  default:''},
  timeOfPrediction: {type:String, lowercase:true, required:true, default:''},
  forecasts: {type:Array, lowercase:true, required:true, default:[]}
  // timeOfFruition: {type:String, lowercase:true, required:true, default:''},
  // temp: {type:String, lowercase:true, required:true, default:''},
  // condition: {type:String, lowercase:true, required:true, default:''}
})

// filters through the forecasts looking for the right fruition time
PredictionSchema.methods.fruitionFilter = function(time){
  // forecast will always have length one as the time of fruition
  // is a unique value for each forecast
  var forecast = this.forecasts.filter(function(item){
    return item.timeOfFruition === time
  })
  delete forecast.timeOfFruition
  // get the distance of the prediction
  var predictionTime = moment(this.timeOfPrediction, "YYYY-MM-DD-HH")
  var fruitionTime = moment(time, "YYYY-MM-DD-HH")
  // this should be switched so the time is negative 
  var distance = fruitionTime.diff(predictionTime, 'hours')

  return {
    timeOfPrediction: this.timeOfPrediction,
    distance: distance,
    temp: forecast[0].temp,
    condition: forecast[0].condition
  }
}

module.exports = mongoose.model('PredictionSchema', PredictionSchema)
