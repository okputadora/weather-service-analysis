var mongoose = require('mongoose')
var PedictionSchema = new mongoose.Schema({
  timeOfPrediction: {type:Date, lowercase=true, required=true, default=''}
  predictions: {type: Array, lowercase=true, required=true, default=''}
})

module.exports = mongoose.model('PredictionSchema', PredictionSchema)
