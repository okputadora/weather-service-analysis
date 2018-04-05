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
    var margin = {top: 20, right: 20, bottom: 50, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
      // smoothe the line
      // .curve(d3.curveBasis)
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
    // Scale the range of the data
    // two different ways to do this using extent which calculate min and max
    // or calculating min and max ourselves
    x.domain(d3.extent(data, function(d) { return d[0]; }));
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
    // Add tooltips to show data on hover

    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
    svg.selectAll("dot")
     .data(data)
     .enter().append("circle")
       .attr("r", 20)
       .attr("cx", function(d) { return x(d[0]); })
       .attr("cy", function(d) { return y(d[1]); })
       .style("opacity", 0)
       .on("mouseover", function(d) {
         var dHTML = Object.assign([], d)
         var hoursAgo = dHTML[0].toString().slice(1)
         div.transition()
           .duration(200)
           .style("opacity", .9);
         div.html("Temp: "+d[1] + "(F)<br />Hours ago: "+hoursAgo)
           .style("left", (d3.event.pageX) + "px")
           .style("top", (d3.event.pageY - 28) + "px");
         })
       .on("mouseout", function(d) {
         div.transition()
           .duration(100)
           .style("opacity", 0);
         });
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
    // Add a legend
  })

})
