import React, { Component } from 'react'
import ReactDOM from 'react-dom'
class DataPoint extends Component {
  render(){
    return(
      <div class='dataPoint'>
        <div class='temp'>{this.props.CurrentData.temp}</div>
        <div class='time'>{this.props.CurrentData.time}</div>
    )
  }
}
export default DataPoint
