import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Accuracy from './components/Accuracy'
class App extends Component {
  render(){
    return(
      <div>Hello!<Accuracy /></div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
