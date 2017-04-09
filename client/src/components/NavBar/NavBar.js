import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Button, Nav, Navbar, NavItem } from 'react-bootstrap'
import './NavBar.css'

const Navigation = React.createClass({
  render () {
    return (
      <Router>
        <div className="navbar-container">
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a className='brand-name' href='/'>QuizWiz</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem href="#">Home</NavItem>
              <NavItem href="/about">About</NavItem>
            </Nav>
          </Navbar>

        <Button> Click Me! </Button>
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

export default Navigation