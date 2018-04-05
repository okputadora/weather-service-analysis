$(document).on("ready", function(){
  // get the data
  var city = $("#city").html()
  var state = $("#state").html()
  $.get('/wunder/displayGraph?city='+ city  +'&state='+ state, function(response) {
    var data = [];
    for(var idx = 0; idx < response.length; ++idx) {
      var item = response[idx];
      var distance = parseInt(item.distance)
      if (distance != 0){
        distance *= -1
        data.push([distance, parseInt(item.temp)]);
      }
    }
    data = data.slice(9)
    console.log(data)
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
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
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d[0]; }));
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

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
  })
})
