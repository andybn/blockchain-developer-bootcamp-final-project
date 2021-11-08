import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import {
  loadExpenseGroupContract,
  addExpense,
  loadMembers,
  showFeedback
} from '../../redux/interactions'
import {
  expenseGroupContractSelector,
  expenseGroupMembersSelector,
  web3Selector,
  loadingSelector,
  errorSelector,
  accountSelector,
  networkSelector,
} from '../../redux/selectors'
import ExpenseGroupExpenseAddForm from '../../component/expense-group-expense-add-form/ExpenseGroupExpenseAddForm'

class ExpenseGroupExpenseAddPage extends Component {
  async componentDidMount() {
    this.initialize()
  }

  async componentDidUpdate(prevProps) {
    this.initialize(prevProps)
  }

  async initialize(prevProps) {
    const { loading, account, error } = this.props

    if (
      (this.isContractNotLoaded() ||
        this.hasContractChanged() ||
        this.hasNetworkChanged(prevProps)) &&
      !loading &&
      !error &&
      account
    ) {
      this.loadData()
    }
  }

  isContractNotLoaded() {
    const { web3, contract } = this.props
    return web3 && !contract
  }

  hasContractChanged() {
    const { web3, contract } = this.props
    const address = this.props.match.params.contractAddress
    return web3 && contract && address !== contract.options.address
  }

  hasNetworkChanged(prevProps) {
    const { networkId } = this.props
    return prevProps && prevProps.networkId && prevProps.networkId !== networkId
  }

  async loadData() {
    try {
      const { dispatch, web3 } = this.props
      let { contract } = this.props
      const address = this.props.match.params.contractAddress
      contract = await loadExpenseGroupContract(dispatch, web3, address)
      await loadMembers(dispatch, contract)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    

    const { dispatch, contract, account, members, web3 } = this.props

    const prepareExpenseForInsertion = async (values) => {
      
      const expense = {
        name: values.name,
        amount: values.amount,
        valueDate: new Date(values.valueDate).getTime() / 1000 + 900 + 330 * 60,
        payees: values.members
      }

      if(!values.members || values.members.length === 0) {
        showFeedback(dispatch, {
          text: `At least one member must be selected`,
          type: 'error',
          visible: true,
        })
        return;
      }

      try {
        await addExpense(dispatch, contract, account, expense)
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <Grid container style={{ margin: 15 }}>
        <Grid item xs={12}>
          <ExpenseGroupExpenseAddForm
            onSubmit={prepareExpenseForInsertion}
            members={members}
            isWalletConnected={web3}
          ></ExpenseGroupExpenseAddForm>
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
    loading: loadingSelector(state),
    error: errorSelector(state),
    networkId: networkSelector(state),
  }
}

export default withRouter(connect(mapStateToProps)(ExpenseGroupExpenseAddPage))
