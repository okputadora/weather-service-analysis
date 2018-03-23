import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Accuracy from './components/Accuracy'
import styles from './components/style'
class App extends Component {
  render(){
    return(
      <div style='styles.container'>Hello!<Accuracy /></div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
