import { changeNetwork, loadAccount } from './interactions'

export const subscribeToAccountsChanging = (dispatch, web3) => {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', async function (accounts) {
      await loadAccount(dispatch, web3)
    })
  }
}

export const subscribeToNetworkChanging = (dispatch, web3) => {
  if (window.ethereum) {
    window.ethereum.on('networkChanged', async function (networkId) {
      await changeNetwork(dispatch, networkId)
    })
  }
}
