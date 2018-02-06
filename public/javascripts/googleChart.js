
google.charts.load('visualization', '1', {'packages':['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var city = $("#city").html()
  var state = $("#state").html()
    $.get('/wunder/displayGraph?city='+ city  +'&state='+ state, function(response) {
        var chartData = [];
        for(var idx = 0; idx < response.length; ++idx) {
            var item = response[idx];
            var distance = parseInt(item.distance)
            if (distance != 0){
              distance *= -1
              chartData.push([distance, parseInt(item.temp)]);
            }

        }
        // add the current temp
        var temp = parseInt($("#temp").html())
        chartData.push([0, temp])
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
