import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import Navbar from '../../component/navbar/Navbar'
import ExpenseGroupDetailPage from '../expense-group-detail-page/ExpenseGroupDetailPage'
import ExpenseGroupAddPage from '../expense-group-add-page/ExpenseGroupAddPage'
import ExpenseGroupExpenseAddPage from '../expense-group-expense-add-page/ExpenseGroupExpenseAddPage'
import ExpenseGroupMemberAddPage from '../expense-group-member-add-page/ExpenseGroupMemberAddPage'
import ExpenseGroupsPage from '../expense-groups-page/ExpenseGroupsPage'
import { BlockLoading } from 'react-loadingg'
import { loadingSelector } from '../../redux/selectors'
import FeedbackBar from '../feedback-bar/FeedbackBar'
class App extends Component {
  render() {
    const { loading } = this.props
    
    return (     
     <div>
        <Navbar />                
        <FeedbackBar />
        {(loading)
         && <BlockLoading />}
        <div className="App">     
            <Switch>
              <Route exact path="/" component={ExpenseGroupsPage} />
              <Route
                exact
                path="/expense-group/:contractAddress"
                component={ExpenseGroupDetailPage}
              />
              <Route
                exact
                path="/expense-groups/add"
                component={ExpenseGroupAddPage}
              />
              <Route
                exact
                path="/expense-group/:contractAddress/expenses/add"
                component={ExpenseGroupExpenseAddPage}
              />
              <Route
                exact
                path="/expense-group/:contractAddress/members/add"
                component={ExpenseGroupMemberAddPage}
              />
            </Switch>          
        </div>        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state)
  }
}

export default withRouter(connect(mapStateToProps)(App))
