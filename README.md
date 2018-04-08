# Weather Service Accuracy
## Introduction
The simple idea behind this project is to record the forecasts of several
weather services in a database, and then, as those forecasts come to fruition,
check their accuracy against the observed temperature.

## Project Structure
The bulk of this project, i.e. the UI for displaying graphs, is a Node Express
app, that queries a MongoDB (hosted on [MLab](https://www.mlab.com/welcome))
for the forecasts, and then maps them to line chart using [D3.js](https://d3js.org/)

The rest of the project consists of serverless node apps (one for each weather
service) which collect the necessary forecast data for that service as well as
remove any data that is more than 10 days old. These apps are deployed as
[AWS Lambda functions](https://aws.amazon.com/lambda/?sc_channel=PS&sc_campaign=pac_ps_q4&sc_publisher=google&sc_medium=lambda_b_pac_search&sc_content=lambda_p&sc_detail=aws%20lambda&sc_category=lambda&sc_segment=webp&sc_matchtype=p&sc_country=US&sc_geo=namer&sc_outcome=pac&s_kwcid=AL!4422!3!243293321703!p!!g!!aws%20lambda&ef_id=WrRm0wAAAHBoMiua:20180408174031:s) and run on an hourly schedule.
These functions are extremely easy to configure and deploy to AWS thanks to
the node package [serverless](https://serverless.com/).

You can find the code for these Lambda functions in their own repositories as
well as more detailed explanations of how to configure and deploy them.

* [weather underground logger](https://github.com/okputadora/wunderLogger)
