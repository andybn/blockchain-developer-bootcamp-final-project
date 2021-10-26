import getWeb3 from '../common/getWeb3'
import {
  web3Load,
  web3LoadSuccess,
  web3LoadError,
  factoryContractLoad,
  factoryContractLoadSuccess,
  factoryContractLoadError,
  accountLoad,
  accountLoadSuccess,
  accountLoadError,
  expenseGroupContractsLoad,
  expenseGroupContractsLoadSuccess,
  expenseGroupContractsLoadError,
  expenseGroupContractLoad,
  expenseGroupContractLoadSuccess,
  expenseGroupContractLoadError,
  expenseGroupMembersLoad,
  expenseGroupMembersLoadSuccess,
  expenseGroupMembersLoadError,
  expenseGroupExpensesLoad,
  expenseGroupExpensesLoadSuccess,
  expenseGroupExpensesLoadError,
  expenseGroupExpenseAdd,
  expenseGroupExpenseAddSuccess,
  expenseGroupExpenseAddError,
  networkChange,
  networkChangeSuccess,
  networkChangeError,
  feedbackShown,
} from './actions'
import ExpenseGroupFactoryContract from '../contracts/ExpenseGroupFactory.json'
import ExpenseGroupContract from '../contracts/ExpenseGroup.json'
import history from '../common/history'

export const loadWeb3 = async (dispatch) => {
  let web3
  dispatch(web3Load())
  try {
    web3 = await getWeb3()
    dispatch(web3LoadSuccess(web3))
  } catch (error) {
    dispatch(web3LoadError(error.message))
  }

  return web3
}

export const loadAccount = async (dispatch, web3) => {
  let account
  dispatch(accountLoad())
  try {
    const accounts = await web3.eth.getAccounts()
    account = accounts[0]
    dispatch(accountLoadSuccess(account))
  } catch (error) {
    dispatch(accountLoadError(error.message))
  }

  return account
}

export const changeNetwork = async (dispatch, networkId) => {
  dispatch(networkChange(networkId))

  try {
    if (!isValidNetwork(networkId)) {
      throw new Error('Invalid network')
    }
    dispatch(networkChangeSuccess(networkId))
  } catch (error) {
    dispatch(networkChangeError(networkId, error.message))
  }

  return networkId
}

export const isValidNetwork = (networkId) => {
  //TODO: Improve when it is deployed to testnets
  return networkId > 100
}

export const loadFactoryContract = async (dispatch, web3) => {
  let instance
  dispatch(factoryContractLoad())

  try {
    const networkId = await web3.eth.net.getId()

    if (!isValidNetwork(networkId)) {
      throw new Error('Invalid network')
    }

    const deployedNetwork = ExpenseGroupFactoryContract.networks[networkId]

    instance = new web3.eth.Contract(
      ExpenseGroupFactoryContract.abi,
      deployedNetwork && deployedNetwork.address,
    )

    if (instance.options.address) {
      dispatch(factoryContractLoadSuccess(instance))
    } else {
      throw new Error(
        'Error loading factory contract. Check contract deployment on current network.',
      )
    }
  } catch (error) {
    dispatch(factoryContractLoadError(error.message))
    throw error
  }

  return instance
}

export const loadExpenseGroupContracts = async (dispatch, contract, web3) => {
  // const accounts = await web3.eth.getAccounts();
  //     await contract.methods
  //       .createExpenseGroup('SenderA', 'WorldTrip')
  //       .send({ from: accounts[0] });

  const expenseGroupContracts = []
  dispatch(expenseGroupContractsLoad())

  try {
    const expenseGroups = await contract.methods.getExpenseGroups().call()

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
    dispatch(expenseGroupContractsLoadSuccess(expenseGroupContracts))

    showFeedback(dispatch, {
      text: 'Expense group contracts succesfully loaded',
      type: 'success',
      visible: true,
    })
  } catch (error) {
    dispatch(expenseGroupContractsLoadError(error.message))
    throw error
  }

  return expenseGroupContracts
}

export const loadExpenseGroupContract = async (
  dispatch,
  web3,
  contractAddress,
) => {
  let instance
  dispatch(expenseGroupContractLoad())

  try {
    const networkId = await web3.eth.net.getId()

    if (!isValidNetwork(networkId)) {
      throw new Error('Invalid network')
    }

    const deployedNetwork = ExpenseGroupContract.networks[networkId]

    instance = new web3.eth.Contract(
      ExpenseGroupContract.abi,
      deployedNetwork && contractAddress,
    )

    if (instance.options.address) {
      dispatch(expenseGroupContractLoadSuccess(instance))
    } else {
      throw new Error(
        'Error loading factory contract. Check contract deployment on current network.',
      )
    }
  } catch (error) {
    dispatch(expenseGroupContractLoadError(error.message))
    throw error
  }

  return instance
}

export const loadMembers = async (dispatch, contract) => {
  let members = []
  dispatch(expenseGroupMembersLoad())

  try {
    const membersCount = await contract.methods.getMemberCount().call()

    for (let i = 0; i < membersCount; i++) {
      const memberAddress = await contract.methods.memberAddresses(i).call()
      const member = await contract.methods.members(memberAddress).call()
      members.push(member)
    }

    dispatch(expenseGroupMembersLoadSuccess(members))
  } catch (error) {
    dispatch(expenseGroupMembersLoadError(error.message))
    throw error
  }

  return members
}

export const loadExpenses = async (dispatch, contract, account) => {
  let expenses = []
  dispatch(expenseGroupExpensesLoad())

  try {
    const expensesCount = await contract.methods.numExpenses().call()

    for (let i = 0; i < expensesCount; i++) {
      const expense = await contract.methods.expenses(i).call()
      expense.identifier = i
      expense.approvals = await contract.methods.getNumberOfApprovals(i)
      expense.valueDate = new Date(+expense.valueDate * 1000).toDateString()
      expense.creationDate = new Date(
        +expense.creationDate * 1000,
      ).toDateString()

      const payer = expense.payer
      const payerName = await contract.methods
        .getMemberName(expense.payer)
        .call()
     
      expense.payerWithName = { address: payer, name: payerName }

      const payeesAddresses = await contract.methods.getPayees(i).call()
      expense.payees = await Promise.all(
        payeesAddresses.map(async (p) => ({
          address: p,
          name: await contract.methods.getMemberName(p).call(),
        })),
      )

      expense.isApprovedByAccount = account
        ? await contract.methods.getApproval(i, String(account)).call()
        : false
      expenses.push(expense)
    }

    dispatch(expenseGroupExpensesLoadSuccess(expenses))

    showFeedback(dispatch, {
      text: 'Expense group detail succesfully loaded',
      type: 'success',
      visible: true,
    })
  } catch (error) {
    dispatch(expenseGroupExpensesLoadError(error.message))
    throw error
  }

  return expenses
}

export const addExpense = async (dispatch, contract, account, expense) => {
  dispatch(expenseGroupExpenseAdd())

  try {
    await contract.methods
      .addExpense(
        expense.name,
        expense.amount,
        expense.valueDate,
        expense.payees,
      )
      .send({ from: account })

    dispatch(expenseGroupExpenseAddSuccess(expense))
    await loadExpenses(dispatch, contract, account)
    history.push(`/expense-group/${contract.options.address}`)
    showFeedback(dispatch, {
      text: 'Expense succesfully added',
      type: 'success',
      visible: true,
    })
  } catch (error) {
    dispatch(expenseGroupExpenseAddError(error.message))
  }

  

  
}

export const showFeedback = async (dispatch, options) => {
  dispatch(feedbackShown(options))
  return options
}
