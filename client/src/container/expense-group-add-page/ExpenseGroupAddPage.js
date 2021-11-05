import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import { loadFactoryContract, addExpenseGroup } from '../../redux/interactions'
import {
  factoryContractSelector,
  web3Selector,
  loadingSelector,
  errorSelector,
  accountSelector,
  networkSelector,
} from '../../redux/selectors'
import ExpenseGroupAddForm from '../../component/expense-group-add-form/ExpenseGroupAddForm'
class ExpenseGroupAddPage extends Component {
  async componentDidMount() {
    this.initialize()
  }

  async componentDidUpdate(prevProps) {
    this.initialize(prevProps)
  }

  async initialize(prevProps) {
    const { loading, error, account } = this.props

    if (
      (this.isFactoryContractNotLoaded() ||
        this.hasNetworkChanged(prevProps)) &&
      !loading &&
      !error &&
      account
    ) {
      await this.loadData()
    }
  }

  isFactoryContractNotLoaded() {
    const { web3, factoryContract, expenseGroups } = this.props
    return web3 && !factoryContract && !expenseGroups
  }

  hasNetworkChanged(prevProps) {
    const { networkId } = this.props
    return prevProps && prevProps.networkId !== networkId
  }

  async loadData() {
    try {
      let { web3, dispatch, factoryContract } = this.props
      factoryContract = await loadFactoryContract(dispatch, web3)
      console.log(factoryContract)
    } catch (error) {
      console.log(error)
    }
  }

  render() {

    const { dispatch, factoryContract, web3, account } = this.props

    const prepareExpenseGroupForInsertion = async (values) => {
      
      const expenseGroup = {
        ownerName: values.name,
        title: values.title,
      }

      try {
        await addExpenseGroup(dispatch, factoryContract, web3, account, expenseGroup)
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <Grid container style={{ margin: 15 }}>
        <Grid item xs={12}>
          <ExpenseGroupAddForm onSubmit={prepareExpenseGroupForInsertion} isWalletConnected={web3}></ExpenseGroupAddForm>
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    factoryContract: factoryContractSelector(state),
    web3: web3Selector(state),
    networkId: networkSelector(state),
    loading: loadingSelector(state),
    error: errorSelector(state),
    account: accountSelector(state),
  }
}

export default connect(mapStateToProps)(ExpenseGroupAddPage)
