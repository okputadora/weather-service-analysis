
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
        // for(var idx = 0; idx < response.length; ++idx) {
        //     var item = response[idx];
        //     chartData.push([item.year, item.population]);
        // }

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'time');
        data.addColumn('number', 'distance');
        data.addRows(chartData);

        var options = {
            title: 'Hungarian Population Change between 1870 and 2011'
        };

        //create and draw the chart from DIV
        var chart = new google.visualization.LineChart(document.getElementById('linechart'));
        chart.draw(data, options);
    }, 'json');
}
