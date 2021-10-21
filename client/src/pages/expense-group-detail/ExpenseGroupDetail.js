import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadExpenseGroupContract,
  loadExpenses,
  loadMembers,
} from '../../redux/interactions'
import {
  expenseGroupContractSelector,
  expenseGroupMembersSelector,
  expenseGroupExpensesSelector,
  web3Selector,
  accountSelector,
  networkSelector,
} from '../../redux/selectors'
import ExpenseGroupMemberList from '../../components/expense-group-member-list/ExpenseGroupMemberList'
import ExpenseGroupExpenseList from '../../components/expense-group-expense-list/ExpenseGroupExpenseList'
import { withRouter } from 'react-router-dom'
import { Button, Grid, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'
class ExpenseGroupDetail extends Component {
  async componentDidMount() {
    this.initialize(this.props)
  }

  async componentDidUpdate(prevProps) {
    this.initialize(this.props, prevProps)
  }

  async initialize(props, prevProps) {
    let { web3, contract, networkId } = props
    const address = props.match.params.contractAddress

    if (web3 && !contract) {
      this.loadData(props)
    }

    if (web3 && contract && address !== contract.options.address) {
      this.loadData(props)
    }

    if (prevProps && prevProps.networkId && prevProps.networkId !== networkId) {
      this.loadData(props)
    }
  }

  async loadData(props) {
    let { dispatch, web3, contract, account } = props
    const address = props.match.params.contractAddress
    contract = await loadExpenseGroupContract(dispatch, web3, address)
    await loadMembers(dispatch, contract)
    await loadExpenses(dispatch, contract, account)
  }

  render() {
    const { members, expenses } = this.props
    const address = this.props.match.params.contractAddress

    return (
      <Grid container style={{ margin: 15 }}>
        <Grid item xs={10}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
            style={{ marginBottom: 20 }}
          >
            <Button
              component={Link}
              to={`/expense-group/${address}/expenses/add`}
              variant="outlined"
              color="inherit"
            >
              Add new expense
            </Button>
            <Button
              component={Link}
              to={`/expense-group/${address}/members/add`}
              variant="outlined"
              color="inherit"
            >
              Add new member
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={10}>
          <ExpenseGroupMemberList members={members}></ExpenseGroupMemberList>
        </Grid>
        <Grid item xs={10}>
          <ExpenseGroupExpenseList
            expenses={expenses}
          ></ExpenseGroupExpenseList>
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    contract: expenseGroupContractSelector(state),
    web3: web3Selector(state),
    account: accountSelector(state),
    members: expenseGroupMembersSelector(state),
    expenses: expenseGroupExpensesSelector(state),
    networkId: networkSelector(state),
  }
}

export default withRouter(connect(mapStateToProps)(ExpenseGroupDetail))