import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import ExpenseGroupDetail from './pages/expense-group-detail/ExpenseGroupDetail'
import ExpenseGroupAdd from './pages/expense-group-add/ExpenseGroupAdd'
import ExpenseGroupExpenseAdd from './pages/expense-group-expense-add/ExpenseGroupExpenseAdd'
import ExpenseGroupMemberAdd from './pages/expense-group-member-add/ExpenseGroupMemberAdd'
import ExpenseGroupPaymentAdd from './pages/expense-group-payment-add/ExpenseGroupPaymentAdd'
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
                component={ExpenseGroupAdd}
              />
              <Route
                exact
                path="/expense-group/:contractAddress/expenses/add"
                component={ExpenseGroupExpenseAdd}
              />
             <Route
                exact
                path="/expense-group/:contractAddress/members/add"
                component={ExpenseGroupMemberAdd}
              />
              <Route
                exact
                path="/expense-group/:contractAddress/payments/add"
                component={ExpenseGroupPaymentAdd}
              />
            </Switch>
          </header>
        </div>
      </div>
    )
  }
}
export default withRouter(App)
