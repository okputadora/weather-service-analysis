const express = require('express')
const Wunderground = require('node-weatherunderground')
const PredictionController = require('../controllers/PredictionController')
const router = express.Router()

router.get('/', function(req, res, next){
  var city = req.query.city
  var state = req.query.state

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
