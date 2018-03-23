import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import DataPoint from './components/DataPoint'
class Accuracy extends Component {
  constructor(){
    super()
    this.state = {
      list: [
        {temp: 27, time: -24},
        {temp: 28, time: -23},
        {temp: 29, time: -22},
        {temp: 30, time: -21}
      ]
    }
  }
  render(){
    const listItems = this.state.list.map((elem, i) => {
      return (
        <li><DataPoint /></li>
      )
    })
    return(
      <div class='graph'></div>
    )
  }
}
export default Accuracy
