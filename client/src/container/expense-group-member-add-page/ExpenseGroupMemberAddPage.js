import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Grid, ButtonGroup } from '@material-ui/core'
import { loadExpenseGroupContract, addMember } from '../../redux/interactions'
import {
  expenseGroupContractSelector,
  web3Selector,
  loadingSelector,
  errorSelector,
  accountSelector,
  networkSelector
} from '../../redux/selectors'
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
      console.log(contract)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const address = this.props.match.params.contractAddress

    const { dispatch, contract, account, web3 } = this.props

    const prepareMemberForInsertion = async (e) => {
      e.preventDefault()

      const member = {
        name: 'member1',
        address: '0x0747abf29Ed045f4beb334a8A8FC23a3BF1E6dF7',
      }

      try {
        await addMember(dispatch, contract, account, member)
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <Grid container style={{ margin: 15 }}>
        <Grid item xs={10}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              variant="outlined"
              onClick={prepareMemberForInsertion}
              disabled={!web3}
              color="inherit"
            >
              [ADD MEMBER TO EXPENSE GROUP {address} ]
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
    loading: loadingSelector(state),
    error: errorSelector(state),
    networkId: networkSelector(state)
  }
}

export default withRouter(connect(mapStateToProps)(ExpenseGroupMemberAddPage))
