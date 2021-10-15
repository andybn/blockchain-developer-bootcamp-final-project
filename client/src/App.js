import React, { Component } from 'react'
import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import ExpenseGroup from './pages/expense-group/ExpenseGroup'
import ExpenseGroupInsert from './pages/expense-group-insert/ExpenseGroupInsert'
import Home from './pages/home/Home'

class App extends Component {
  
  render() {
    return (
      <div>
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
                component={ExpenseGroupInsert}
              />           
            </Switch>
          </header>
        </div>
      </div>
    )
  }
}
export default withRouter(App);
