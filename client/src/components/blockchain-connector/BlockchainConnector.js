import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadWeb3, loadAccount } from '../../redux/interactions'
import { accountSelector, web3Selector } from '../../redux/selectors'
import { subscribeToAccountsChanging } from '../../redux/subscriptions'
import { IconButton, Typography } from '@material-ui/core'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
class BlockchainConnector extends Component {
  render() {
    const { dispatch, account } = this.props

    const connectBlockchain = async (e) => {
      e.preventDefault()
      //TODO: Add error handling and text to install metamask if no provider is detected
      const web3 = await loadWeb3(dispatch)
      await loadAccount(dispatch, web3)
      subscribeToAccountsChanging(dispatch, web3)
    }

    return (
      <div onClick={connectBlockchain}>
        <IconButton edge="start" color="inherit">
          <WalletIcon />
          <Typography variant="h6">
            <span>{!account ? 'Connect' : `Account: ${account}`}</span>
          </Typography>
        </IconButton>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: accountSelector(state),
    web3: web3Selector(state),
  }
}

export default connect(mapStateToProps)(BlockchainConnector)
