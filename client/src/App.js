import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import ExpenseGroupDetail from './pages/expense-group-detail/ExpenseGroupDetail'
import ExpenseGroupAdd from './pages/expense-group-add/ExpenseGroupAdd'
import ExpenseGroupExpenseAdd from './pages/expense-group-expense-add/ExpenseGroupExpenseAdd'
import ExpenseGroupMemberAdd from './pages/expense-group-member-add/ExpenseGroupMemberAdd'
import ExpenseGroups from './pages/expense-groups/ExpenseGroups'
import { LoopCircleLoading } from 'react-loadingg'
import { loadingSelector } from './redux/selectors'
class App extends Component {
  render() {
    const { loading } = this.props

    return (
      <div>
        <Navbar />
        {loading && <LoopCircleLoading />}

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
            </Switch>
          </header>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
  }
}

export default withRouter(connect(mapStateToProps)(App))
