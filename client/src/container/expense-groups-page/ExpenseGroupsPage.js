import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadExpenseGroupContracts,
  loadFactoryContract,
} from '../../redux/interactions'
import {
  factoryContractSelector,
  expenseGroupContractsSelector,
  web3Selector,
  networkSelector,
  loadingSelector,
  errorSelector,
  accountSelector,
} from '../../redux/selectors'
import ExpenseGroupList from '../../component/expense-group-list/ExpenseGroupList'
import { Grid } from '@material-ui/core'
import ExpenseGroupsToolbar from '../../component/expense-groups-toolbar/ExpenseGroupsToolbar'
class ExpenseGroupsPage extends Component {
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
      await loadExpenseGroupContracts(dispatch, factoryContract, web3)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { expenseGroups, loading } = this.props
    return (
      <Grid container style={{ margin: 15 }}>
        <Grid item xs={10}>
          <ExpenseGroupsToolbar></ExpenseGroupsToolbar>
        </Grid>
        <Grid item xs={10}>
          {!loading && (
            <ExpenseGroupList
              expenseGroupContracts={expenseGroups}
            ></ExpenseGroupList>
          )}
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    expenseGroups: expenseGroupContractsSelector(state),
    factoryContract: factoryContractSelector(state),
    web3: web3Selector(state),
    networkId: networkSelector(state),
    loading: loadingSelector(state),
    error: errorSelector(state),
    account: accountSelector(state),
  }
}

export default connect(mapStateToProps)(ExpenseGroupsPage)
