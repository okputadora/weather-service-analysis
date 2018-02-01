var mongoose = require('mongoose')
var PredictionSchema = new mongoose.Schema({
  city: {type:String, required:true,  lowercase:true,  default:''},
  state: {type:String, required:true, lowercase:true,  default:''},
  timeOfPrediction: {type:String, lowercase:true, required:true, default:''},
  timeOfFruition: {type:String, lowercase:true, required:true, default:''},
  temp: {type:String, lowercase:true, required:true, default:''},
  condition: {type:String, lowercase:true, required:true, default:''}
})

module.exports = mongoose.model('PredictionSchema', PredictionSchema)
