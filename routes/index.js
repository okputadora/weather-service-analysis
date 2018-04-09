const moment = require('moment-timezone')
const controllers = require('../controllers/')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log("getting index")
  controllers['wunderground'].getCurrentConditions({city: "philadelphia", state: "PA"})
  .then((result) => {
    // format the date
    var time = moment(result.time, "YYYY-MM-DD-HH").format("dddd, MMMM Do, YYYY")
    res.render('index', {
      city: 'Philadelphia',
      state: "PA",
      time: time,
      temp: result.temp,
      condition: result.condition,
      title: "Weather Accuracy",
      partials:{
        header: "partials/header"
      }
    })
  })
  .catch((err) => {
    res.render(err)
  })
})

router.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'Weather Accuracy',
    partials: {
      header: '../views/partials/header'
    }
  });
});


module.exports = router;
