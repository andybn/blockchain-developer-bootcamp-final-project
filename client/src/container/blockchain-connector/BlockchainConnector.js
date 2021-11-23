import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
  loadWeb3,
  loadAccount
} from '../../redux/interactions'
import {
  accountSelector,
  networkSelector,
  web3Selector,
} from '../../redux/selectors'
import {
  subscribeToAccountsChanging,
  subscribeToNetworkChanging,
} from '../../redux/subscriptions'
import {
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

class BlockchainConnector extends Component {
  state = {
    open: false,
  }
  
  openDialog() {
    this.setState({ open: true })
  }

  render() {
    const { dispatch, account, networkId } = this.props

    const connectBlockchain = async (e) => {
      e.preventDefault()

      const web3 = await loadWeb3(dispatch)   
      await loadAccount(dispatch, web3)
      subscribeToAccountsChanging(dispatch, web3)
      subscribeToNetworkChanging(dispatch, web3)

    }

    const showWalletInfo = () => {
      this.setState({ open: true })
    }

    const handleClose = () => {
      this.setState({ open: false })
    }

    return (
      <div>
        {!account && (
          <div>
            <IconButton
              edge="start"
              color="inherit"
              onClick={connectBlockchain}
            >
              <AddCircleOutlineIcon />
              <Typography variant="h6">
                <span>Connect</span>
              </Typography>
            </IconButton>
          </div>
        )}

        {account && (
          <IconButton edge="start" color="inherit" onClick={showWalletInfo}>
            <WalletIcon />
          </IconButton>
        )}

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Current connection</DialogTitle>
          <DialogContent>
            <div>
              <span style={{ fontWeight: 'bold' }}> Account: </span> {account}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}> Network: </span> {networkId}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}> Network: </span> {balance}
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => window.location.reload(false)}>
              Restart
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: accountSelector(state),
    web3: web3Selector(state),
    networkId: networkSelector(state),
  }
}

export default connect(mapStateToProps)(BlockchainConnector)
