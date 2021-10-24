import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadWeb3, loadAccount, changeNetwork } from '../../redux/interactions'
import { accountSelector, web3Selector } from '../../redux/selectors'
import {
  subscribeToAccountsChanging,
  subscribeToNetworkChanging,
} from '../../redux/subscriptions'
import { IconButton, Typography } from '@material-ui/core'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

class BlockchainConnector extends Component {
  render() {
    const { dispatch, account } = this.props

    const connectBlockchain = async (e) => {
      e.preventDefault()
      //TODO: Add error handling and text to install metamask if no provider is detected
      const web3 = await loadWeb3(dispatch)
      const networkId = await web3.eth.net.getId()
      await loadAccount(dispatch, web3)
      await changeNetwork(dispatch, networkId)
      subscribeToAccountsChanging(dispatch, web3)
      subscribeToNetworkChanging(dispatch, web3)
    }

    const showWalletInfo = () => {
        //TODO: Add new route to show current network, account 
        console.log(account);
        alert(account);
    };

    return (
      <div onClick={connectBlockchain}>
        {!account && (
          <IconButton edge="start" color="inherit">
            <AddCircleOutlineIcon />
            <Typography variant="h6">
              <span>Connect</span>
              {/* Pending to show NetworkId */}
            </Typography>
          </IconButton>
        )}
        {account && (
          <IconButton edge="start" color="inherit" onClick={showWalletInfo}>
            <WalletIcon />
          </IconButton>
        )}
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
