import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = React.createClass({
  render () {
    return (
      <Router>
        <div>
        <h1>Welcome!!</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <Route exact path="/" component={Home}></Route>
        <Route exact path="/about" component={About}></Route>
        </div>
      </Router>
    )
  }
})

const Home = () => (
  <div>
    <p>Home</p>
  </div>
)

const About = () => (
  <div>
    <p>About</p>
  </div>
)

export default App