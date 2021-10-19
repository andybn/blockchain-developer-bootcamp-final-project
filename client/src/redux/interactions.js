import getWeb3 from '../common/getWeb3'
import {
  web3Loaded,
  factoryContractLoaded,
  accountLoaded,
  expenseGroupContractsLoaded,
  expenseGroupContractLoaded,
  expenseGroupMembersLoaded,
  expenseGroupExpensesLoaded,
  expenseGroupExpenseAdded,
} from './actions'
import ExpenseGroupFactoryContract from '../contracts/ExpenseGroupFactory.json'
import ExpenseGroupContract from '../contracts/ExpenseGroup.json'
import history from '../common/history';

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

export const loadExpenses = async (dispatch, contract, account) => {
  let expenses = []

  const expensesCount = await contract.methods.numExpenses().call()

  for (let i = 0; i < expensesCount; i++) {
    const expense = await contract.methods.expenses(i).call()
    expense.identifier = i
    expense.approvals = await contract.methods.getNumberOfApprovals(i)
    //TODO: Extract to common util
    expense.valueDate = new Date(+expense.valueDate * 1000).toDateString();
    expense.creationDate = new Date(+expense.creationDate * 1000).toDateString();
    
    expense.isApprovedByAccount = account ? await contract
      .methods
      .getApproval(i, String(account))
      .call() : false;
    expenses.push(expense)
  }

  dispatch(expenseGroupExpensesLoaded(expenses))

  return expenses
}

export const addExpense = async (dispatch, contract, account, expense) => {
  await contract.methods
    .addExpense(expense.name, expense.amount, expense.valueDate, expense.payees)
    .send({ from: account })

  dispatch(expenseGroupExpenseAdded(expense))

  //TODO: Needs to wait for confirmation, get the event and update UI 
  //TODO: Add also spinner!

  await loadExpenses(dispatch, contract, account);

  history.push(`/expense-group/${contract.options.address}`)
}