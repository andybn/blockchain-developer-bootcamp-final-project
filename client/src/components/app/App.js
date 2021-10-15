import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  withRouter
} from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import ExpenseGroup from '../pages/expense-group/ExpenseGroup'
import ExpenseGroupCreation from '../pages/expense-group-creation/ExpenseGroupCreation'
import Home from '../pages/home/Home'
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <div className="App">
          <header className="App-header">
            <Switch>           
              <Route 
                exact 
                path="/" 
                component={Home}
              />
              <Route
                exact
                path="/expense-group/:contractAddress"
                component={ExpenseGroup}
              />
              <Route
                exact
                path="/expense-groups/add"
                component={ExpenseGroupCreation}
              />
              <Route Component={Home} />
            </Switch>
          </header>
        </div>
      </BrowserRouter>
    )
  }
}
export default connect()(App)
