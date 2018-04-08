var Promise = require('bluebird')
var weather = require('openweather-apis')
   weather.setLang('en');
   // set city by name
   weather.setCity('Philadelphia');
   // 'metric'  'internal'  'imperial'
   weather.setUnits('imperial');

   // check http://openweathermap.org/appid#get for get the APPID
 weather.setAPPID(process.env.OPENWEATHER_API_KEY);
module.exports = {
  getByParams: (params) => {
    return new Promise((resolve, reject) => {
      console.log("geting open weather temp")
      weather.getTemperature(function(err, temp){
        console.log(temp)
        if (err){
          console.log(err)
          reject(err);
          return;
        }
        console.log(temp)
        resolve(temp);
      })
    })
  }
}
