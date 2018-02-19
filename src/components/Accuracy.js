import React, { Component } from 'react'
import ReactDOM from 'react-dom'
class Accuracy extends Component {
  constructor(){
    super()
    this.state = {
      list: [
        {temp: 27, time: -24}
        {temp: 28, time: -23}
        {temp: 29, time: -22}
        {temp: 30, time: -21}
      ]
    }
  }
  render(){
    return(
      <div class='graph'></div>
    )
  }
}
export default Accuracy
