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
} from '../../redux/selectors'
import ExpenseGroupMemberList from '../../components/expense-group-member-list/ExpenseGroupMemberList'
import ExpenseGroupExpenseList from '../../components/expense-group-expense-list/ExpenseGroupExpenseList'
import { withRouter } from 'react-router-dom'
import { Button, Grid, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'
class ExpenseGroupDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { contractChanged: false }
  }

  async componentDidMount() {
    this.initialize(this.props)
  }

  async componentDidUpdate() {
    this.initialize(this.props)
  }

  async initialize(props) {
    let { dispatch, web3, contract, members, account, expenses } = props
    const address = props.match.params.contractAddress

    if (web3 && !contract) {
      await loadExpenseGroupContract(dispatch, web3, address)
    }

    if (contract && !members) {
      await loadMembers(dispatch, contract)
    }

    if (contract && !expenses) {
      await loadExpenses(dispatch, contract, account)
    }

    if (web3 && contract && address !== contract.options.address) {
      this.setState({ contractChanged: true })
      contract = null
      await loadExpenseGroupContract(dispatch, web3, address)
    }

    if (web3 && contract && this.state.contractChanged) {
      await loadMembers(dispatch, contract)
      await loadExpenses(dispatch, contract, account)
      this.setState({ contractChanged: false })
    }
  }

  render() {
    const { members, expenses } = this.props
    const address = this.props.match.params.contractAddress
    const contractChanged = this.state.contractChanged

    return (
      <Grid container spacing={20} style={{ margin: 15 }}>
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
          {!contractChanged && (
            <ExpenseGroupMemberList members={members}></ExpenseGroupMemberList>
          )}
        </Grid>
        <Grid item xs={10}>
          {!contractChanged && (
            <ExpenseGroupExpenseList
              expenses={expenses}
            ></ExpenseGroupExpenseList>
          )}
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
  }
}

export default withRouter(connect(mapStateToProps)(ExpenseGroupDetail))
