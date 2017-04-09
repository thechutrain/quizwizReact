import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import NavBar from './NavBar/NavBar'

const App = React.createClass({
  render () {
    return (
      <div>
        <NavBar />
      </div>
    )
  }
})

export default App