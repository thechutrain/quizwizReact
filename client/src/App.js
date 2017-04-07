import React from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

const App = React.createClass({
  getInitialState () {
    return {
      users: ['alan']
    }
  },
  componentDidMount () {
    axios.get('/api/user')
      .then((response) => {
        console.log(response.data)
        this.setState({ users: response.data })
      })
      .catch((err) => { console.log('axios error dude')})
  },
  render () {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>

        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <code>
          <pre>
          { JSON.stringify(this.state.users, null, 4) }
          </pre>
        </code>
      </div>
    )
  }
})

export default App;
