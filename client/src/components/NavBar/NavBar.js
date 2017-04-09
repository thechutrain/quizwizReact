import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = React.createClass({
  render () {
    return (
      <Router>
        <div className="navbar-container">
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
    <p>About Me</p>
  </div>
)

export default NavBar