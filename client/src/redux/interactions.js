import getWeb3 from '../common/getWeb3'
import {
  web3Loaded,
  factoryContractLoaded,
  accountLoaded,
  expenseGroupContractsLoaded,
  expenseGroupContractLoaded,
  expenseGroupMembersLoaded,
} from './actions'
import ExpenseGroupFactoryContract from '../contracts/ExpenseGroupFactory.json'
import ExpenseGroupContract from '../contracts/ExpenseGroup.json'

export const loadWeb3 = async (dispatch) => {
  const web3 = await getWeb3()
  dispatch(web3Loaded(web3))
  return web3
}

export const loadAccount = async (dispatch, web3) => {
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]
  dispatch(accountLoaded(account))
  return account
}

export const loadFactoryContract = async (dispatch, web3) => {
  const networkId = await web3.eth.net.getId()
  const deployedNetwork = ExpenseGroupFactoryContract.networks[networkId]

  const instance = new web3.eth.Contract(
    ExpenseGroupFactoryContract.abi,
    deployedNetwork && deployedNetwork.address,
  )

  dispatch(factoryContractLoaded(instance))
  return instance
}

export const loadExpenseGroupContracts = async (dispatch, contract, web3) => {
  // const accounts = await web3.eth.getAccounts();
  //     await contract.methods
  //       .createExpenseGroup('SenderA', 'WorldTrip')
  //       .send({ from: accounts[0] });

  const expenseGroups = await contract.methods.getExpenseGroups().call()

  const expenseGroupContracts = []

  for (let i = 0; i < expenseGroups.length; i++) {
    const expenseGroupContractInstance = new web3.eth.Contract(
      ExpenseGroupContract.abi,
      expenseGroups[i],
    )

    const title = await expenseGroupContractInstance.methods.title().call()

    const ownerAddress = await expenseGroupContractInstance.methods
      .memberAddresses(0)
      .call()

    const ownerName = await expenseGroupContractInstance.methods
      .getMemberName(ownerAddress)
      .call()

    expenseGroupContracts.push({
      expenseGroupTitle: title,
      expenseGroupOwner: ownerName,
      contractAddress: expenseGroups[i],
    })
  }

  dispatch(expenseGroupContractsLoaded(expenseGroupContracts))
  return expenseGroupContracts
}

export const loadExpenseGroupContract = async (
  dispatch,
  web3,
  contractAddress,
) => {
  const instance = new web3.eth.Contract(
    ExpenseGroupContract.abi,
    contractAddress,
  )

  dispatch(expenseGroupContractLoaded(instance))
  return instance
}

export const loadMembers = async (dispatch, contract) => {
  let members = []

  const membersCount = await contract.methods.getMemberCount().call()

  for (let i = 0; i < membersCount; i++) {
    const memberAddress = await contract.methods.memberAddresses(i).call()
    const member = await contract.methods.members(memberAddress).call()
    members.push(member)
  }

  dispatch(expenseGroupMembersLoaded(members))
  return members
}
