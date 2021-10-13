import React, { Component } from 'react'

import './BlockchainConnector.css'
import { connect } from 'react-redux'
import { loadWeb3, loadAccount } from '../../redux/interactions'
import {
  accountSelector,  
  web3Selector
} from '../../redux/selectors'
import { subscribeToAccountsChanging } from '../../redux/subscriptions'

class BlockchainConnector extends Component {
  render() {
    const { dispatch, contract, account } = this.props

    const connectBlockchain = async (e) => {
      e.preventDefault();
      //TODO: Add error handling and text if no provider is detected
      const web3 = await loadWeb3(dispatch);
      await loadAccount(dispatch, web3);
      subscribeToAccountsChanging(dispatch, web3);
    }

    return (
     <div>
        <form onSubmit={connectBlockchain}>
          <button
            type="submit"
            className={`${account !== null ? 'disabled' : ''}`}>
            {account !== null ? 'Connected' : 'Connect'}
          </button>          
          <label style={{marginLeft: '50px' }}>Account: {account}</label>
        </form>        
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
