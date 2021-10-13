import React, { Component } from 'react'

import Container from '@material-ui/core/Container'
import './BlockchainConnector.css'
import { connect } from 'react-redux'
import { loadWeb3, loadAccount } from '../../redux/interactions'
import { accountSelector } from '../../redux/selectors'
import { subscribeToAccountsChanging } from '../../redux/subscriptions'
import Paper from '@material-ui/core/Paper'

class BlockchainConnector extends Component {
  render() {
    const { dispatch, contract, account } = this.props

    const connectBlockchain = async (e) => {
      e.preventDefault()
      const web3 = await loadWeb3(dispatch)
      await loadAccount(dispatch, web3)
      subscribeToAccountsChanging(dispatch, web3Library)
    }

    return (
      <Container maxWidth="lg" component={Paper}>
        <form onSubmit={connectBlockchain}>         
              <button
                type="submit"
                className={`${contract !== null ? 'disabled' : ''}`}
              >
                {contract !== null
                  ? 'Blockchain Connected'
                  : 'Connect Blockchain'}
              </button>           
        </form>
        <div>
          <div>
            <label>Account: {account}</label>
            <p>
              Changing accounts in Metamask should refresh this account address
            </p>
          </div>
        </div>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: accountSelector(state),
  }
}

export default connect(mapStateToProps)(BlockchainConnector)
