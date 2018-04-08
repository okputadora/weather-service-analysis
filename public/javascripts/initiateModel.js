console.log("linked")

$("#initiateModel").on("click", function(e){
  // grab the city and state
  var city = $("#city").val()
  var state = $("#state").val()
  console.log(city)
  oneHour = 1000 * 60 * 60
  e.preventDefault()
  console.log("clicked")
  $.ajax({
    type: "POST",
    url: "/weather/initiateModel",
    data: {city: city, state: state}
  }).then(function(result){
    console.log(result)
  })
  setInterval(function(){
    $.ajax({
      type: "POST",
      url: "/weather/initiateModel",
      data: {city: city, state: state}
    }).then(function(result){
      console.log(result)
    })
  }, oneHour)
})
