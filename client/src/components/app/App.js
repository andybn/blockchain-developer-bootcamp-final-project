import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Home from "../pages/home/Home";
class App extends Component {
  render() {   
    return (      
      <Router>
      <Navbar />
      <div className="App">
        <header className="App-header">
          <Switch>          
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
    )
  }
}

export default App
