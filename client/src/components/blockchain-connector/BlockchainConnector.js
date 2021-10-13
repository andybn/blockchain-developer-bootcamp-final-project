import React, { Component } from 'react'

import Container from '@material-ui/core/Container'
import './BlockchainConnector.css'
import { connect } from 'react-redux'
import { loadWeb3, loadAccount } from '../../redux/interactions'
import {
  accountSelector,  
  web3Selector
} from '../../redux/selectors'
import { subscribeToAccountsChanging } from '../../redux/subscriptions'
import Paper from '@material-ui/core/Paper'

class BlockchainConnector extends Component {
  render() {
    const { dispatch, contract, account } = this.props

    const connectBlockchain = async (e) => {
      e.preventDefault();
      const web3Library = await loadWeb3(dispatch);
      await loadAccount(dispatch, web3Library);
      subscribeToAccountsChanging(dispatch, web3Library);
    }

    return (
     <div>
        <form onSubmit={connectBlockchain}>
          <button
            type="submit"
            className={`${contract !== null ? 'disabled' : ''}`}>
            {contract !== null ? 'Blockchain Connected' : 'Connect Blockchain'}
          </button>          
          <label style={{marginLeft: '50px' }}>Account: {account}</label>
        </form>
        <div>
          <div>            
            {/* <p>
              Changing accounts in Metamask should refresh this account address
            </p> */}
          </div>
        </div>
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
