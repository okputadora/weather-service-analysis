$(document).on("ready", function(){
  // get the data
  var city = $("#city").html()
  var state = $("#state").html()
  // initialize the graph
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 50, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // define the line
  var valueline = d3.line()
    // smoothe the line
    .curve(d3.curveBasis)
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("#line").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("id", "graph")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
  // Add a legend
  d3.select("#legend")
    .append("div")
      .html("<div id='wuLeg'>weatherunderground</div>")
  // wunderground retrieval from db
  var url = '/weather/displayGraph?city='+ city  +'&state='+ state +'&service=wunderground'
  console.log(url)
  $.get(url, function(response){
    var data = [];
    console.log(response)
    for(var idx = 0; idx < response.length; ++idx) {
      var item = response[idx];
      var distance = parseInt(item.distance)
      if (distance != 0){
        distance *= -1
        data.push([distance, parseInt(item.temp)]);
      }
    }
    // console.log(data)
    // add the current temperature to the graph
    var currentTemp = $("#temp").html()
    console.log(currentTemp)
    data.push([0, currentTemp])

    // Scale the range of the data
    x.domain([
      d3.min(data, function(d) { return d[0]; }),
      d3.max(data, function(d) { return d[0]; })
    ]);
    // equivalent to ^
    y.domain([
      d3.min(data, function(d){ return d[1] - 2}),
      d3.max(data, function(d) { return d[1] + 2})
    ]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // text label for the x axis
    svg.append("text")
      .attr("transform",
        "translate(" + (width/2) + " ," +
         (height + margin.bottom -5) + ")")
      .style("text-anchor", "middle")
      .style("color", "black")
      .text("Hours Ago");
    // Add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y));
    // text label for the y axis
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Temp(F)");
  })

  // API request from openWeather (they have access to historical data, so we
  // don't need to log their data in our own database)
  // $.get('http://history.openweathermap.org/data/2.5/history/city?q='+'
  // Philadelphia,USA&type=hour&start={start}&end={end}
})
