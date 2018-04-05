console.log("linked")

$("#initiateModel").on("click", function(e){
  // grab the city and state
  var city = $("#city").val()
  var state = $("#state").val()
  console.log(city)
  oneHour = 1000 * 60 * 60
  e.preventDefault()
  console.log("clicked")
  setInterval(function(){
    $.ajax({
      type: "POST",
      url: "/wunder/initiateModel",
      data: {city: city, state: state}
    }).then(function(result){
      console.log(result)
    })
  }, oneHour)
})
