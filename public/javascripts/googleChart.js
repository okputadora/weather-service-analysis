
google.charts.load('visualization', '1', {'packages':['corechart', 'bar']});
console.log('gonna draw the chatry now')
google.charts.setOnLoadCallback(drawChart);



function drawChart() {
  var city = $("#city").html()
  var state = $("#state").html()
  console.log(city)
    $.get('/wunder/displayGraph?city='+ city  +'&state='+ state, function(response) {
        console.log(response);
        var chartData = [];
        for(var idx = 0; idx < response.length; ++idx) {
            var item = response[idx];
            chartData.push([parseInt(item.distance), parseInt(item.temp)]);
        }

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'distance');
        data.addColumn('number', 'temp');
        data.addRows(chartData);

        var options = {
            title: 'weatherunderground accuracy',
            curveType: 'function',
            height: 600,
            width: 600
        };

        //create and draw the chart from DIV
        var chart = new google.visualization.LineChart(document.getElementById('line-chart'));
        chart.draw(data, options);
    }, 'json');
}
