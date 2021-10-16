import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import ExpenseGroupDetail from './pages/expense-group-detail/ExpenseGroupDetail'
import ExpenseGroupInsert from './pages/expense-group-insert/ExpenseGroupInsert'
import ExpenseGroups from './pages/expense-groups/ExpenseGroups'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route exact path="/" component={ExpenseGroups} />
              <Route
                exact
                path="/expense-group/:contractAddress"
                component={ExpenseGroupDetail}
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
export default withRouter(App)
