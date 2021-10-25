import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadExpenseGroupContracts,
  loadFactoryContract,
  setLoadingFlag,
  showFeedback,
} from '../../redux/interactions'
import {
  factoryContractSelector,
  expenseGroupContractsSelector,
  web3Selector,
  networkSelector,
  loadingSelector
} from '../../redux/selectors'
import ExpenseGroupList from '../../components/expense-group-list/ExpenseGroupList'
import { Grid } from '@material-ui/core'
import ExpenseGroupsToolbar from '../../components/expense-groups-toolbar/ExpenseGroupsToolbar'
class ExpenseGroups extends Component {
  
  
  async componentDidMount() {
    this.initialize()
  }

  async componentDidUpdate(prevProps) {
    this.initialize(prevProps)
  }

  async initialize(prevProps) {
    
    const { web3, dispatch,loading } = this.props

    if(prevProps && prevProps.web3 && !web3) {
      return;
    }
    
    if (
      (this.isFactoryContractNotLoaded() 
      || this.hasNetworkChanged(prevProps)      
      ) 
    ) {   
      if(!loading) {
        setLoadingFlag(dispatch, true)    
        await this.loadData()    
        setLoadingFlag(dispatch, false)          
      }
    }
  }

  isFactoryContractNotLoaded() {
    const { web3, factoryContract, expenseGroups } = this.props
    return web3 && !factoryContract && !expenseGroups
  }

  hasNetworkChanged(prevProps) {
    const { networkId } = this.props
    return prevProps && prevProps.networkId && prevProps.networkId !== networkId
  }

  async loadData() {
    let { web3, dispatch, factoryContract } = this.props

    try {      
      factoryContract = await loadFactoryContract(dispatch, web3)
      await loadExpenseGroupContracts(dispatch, factoryContract, web3)
    } catch (error) {
      showFeedback(dispatch, {
        text: error.message,
        type: 'error',
        visible: true,
      })
    }
  }

  render() {
    const { expenseGroups,loading } = this.props
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
    loading: loadingSelector(state)
  }
}

export default connect(mapStateToProps)(ExpenseGroups)
