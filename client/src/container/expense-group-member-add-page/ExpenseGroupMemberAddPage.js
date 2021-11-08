import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { loadExpenseGroupContract, addMember } from '../../redux/interactions'
import {
  expenseGroupContractSelector,
  web3Selector,
  loadingSelector,
  errorSelector,
  accountSelector,
  networkSelector,
} from '../../redux/selectors'
import ExpenseGroupMemberAddForm from '../../component/expense-group-member-add-form/ExpenseGroupMemberAddForm'
class ExpenseGroupMemberAddPage extends Component {
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
        this.hasAccountChanged(prevProps) ||
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

  hasAccountChanged(prevProps) {
    const { account } = this.props
    return prevProps && prevProps.account && prevProps.account !== account
  }

  async loadData() {
    try {
      const { dispatch, web3 } = this.props
      let { contract } = this.props
      const address = this.props.match.params.contractAddress
      contract = await loadExpenseGroupContract(dispatch, web3, address)
      console.log(contract)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    
    const { dispatch, contract, account, web3 } = this.props

    const prepareMemberForInsertion = async (values) => {
   
      const member = {
        name: values.name,
        address: values.address
      }

      try {
        await addMember(dispatch, contract, account, member)
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <Grid container>
        <Grid item xs={12}>
          <ExpenseGroupMemberAddForm onSubmit={prepareMemberForInsertion} isWalletConnected={web3}></ExpenseGroupMemberAddForm>
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
    loading: loadingSelector(state),
    error: errorSelector(state),
    networkId: networkSelector(state),
  }
}

export default withRouter(connect(mapStateToProps)(ExpenseGroupMemberAddPage))
