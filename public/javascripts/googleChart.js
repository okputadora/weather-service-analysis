import {GoogleCharts} from 'google-charts'
console.log('in the file')
GoogleCharts.load(drawChart)

function drawChart() {
  console.log('in the function')
  const data = GoogleCharts.api.visualization.arrayToDataTable([
        ['Chart thing', 'Chart amount'],
        ['Lorem ipsum', 60],
        ['Dolor sit', 22],
        ['Sit amet', 18]
    ]);
    const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart1'));
    pie_1_chart.draw(data);

}
