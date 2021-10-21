import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Grid, ButtonGroup } from '@material-ui/core'
import {
  loadExpenseGroupContract,
  addExpense,
  loadMembers,
} from '../../redux/interactions'
import {
  expenseGroupContractSelector,
  expenseGroupMembersSelector,
  expenseGroupExpensesSelector,
  web3Selector,
  accountSelector,
} from '../../redux/selectors'
class ExpenseGroupExpenseAdd extends Component {
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
    const { dispatch, web3, contract } = props

    const address = props.match.params.contractAddress
    if ((web3 && !contract) || (web3 && address !== contract.options.address)) {
      contract = await loadExpenseGroupContract(dispatch, web3, address)
      await loadMembers(dispatch, contract)
    }

    //TODO: Add support for network changed
  }

  render() {
    const address = this.props.match.params.contractAddress

    const { dispatch, contract, account, members } = this.props

    const prepareExpenseForInsertion = async (e) => {
      e.preventDefault()

      const expense = {
        name: 'test',
        amount: 5000,
        valueDate: Date.now(),
        payees: [String(members[0].memberAddress)],
      }

      await addExpense(dispatch, contract, account, expense)
    }

    return (
      <Grid container style={{ margin: 15 }}>
        <Grid item xs={10}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={prepareExpenseForInsertion}
              variant="outlined"
              color="inherit"
            >
              [ADD EXPENSE TO EXPENSE GROUP {address} ]
            </Button>
          </ButtonGroup>
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

export default withRouter(connect(mapStateToProps)(ExpenseGroupExpenseAdd))
