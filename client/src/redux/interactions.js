import Web3 from 'web3'
import { tryExtractVMErrorMessage } from '../common/utils'
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
  feedbackCleared,
  expenseGroupExpenseApprove,
  expenseGroupMemberAddError,
  expenseGroupMemberAdd,
  expenseGroupMemberAddSuccess,
  expenseGroupAdd,
  expenseGroupAddSuccess,
  expenseGroupAddError,
  expenseGroupExpenseApproveSuccess,
  expenseGroupExpenseApproveError,
} from './actions'
import ExpenseGroupFactoryContract from '../contracts/ExpenseGroupFactory.json'
import ExpenseGroupContract from '../contracts/ExpenseGroup.json'
import history from '../common/history'

export const numberOfConfirmationsToProvideFeedback = 3

export const loadWeb3 = async (dispatch) => {
  
  let web3 = null
  dispatch(web3Load())

  if (window.ethereum) {
    web3 = handleEthereum(dispatch)
  } else {
    window.addEventListener('ethereum#initialized', handleEthereum, {
      once: true,
    })

    await sleep(3000)
    web3 = await handleEthereum(dispatch)
  }
  return web3
}

const handleEthereum = async (dispatch) => {
  const { ethereum } = window
  let web3 = null
  if (ethereum && ethereum.isMetaMask) {
    web3 = new Web3(window.ethereum)
    try {
      // Request account access if needed
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      // const networkId = await web3.eth.net.getId()
      // dispatch(web3LoadSuccess(web3, networkId))

      const networkId = 4
      dispatch(web3LoadSuccess(web3, networkId))

      showFeedback(dispatch, {
        text: 'Wallet connected',
        type: 'success',
        visible: true,
      })
    } catch (error) {
      dispatch(web3LoadError('Error connecting wallet. Install Metamask.'))
    }
  }

  return web3
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
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
  // eslint-disable-next-line
  return networkId == 4 || networkId > 100
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
      deployedNetwork && deployedNetwork.address
    )

    if (instance.options.address) {
      dispatch(factoryContractLoadSuccess(instance))
    } else {
      throw new Error(
        'Error loading factory contract. Check contract deployment on current network.'
      )
    }
  } catch (error) {
    dispatch(factoryContractLoadError(error.message))
    throw error
  }

  return instance
}

export const loadExpenseGroupContracts = async (dispatch, contract, web3) => {
  const expenseGroupContracts = []
  dispatch(expenseGroupContractsLoad())

  try {
    const expenseGroups = await contract.methods.getExpenseGroups().call()

    for (let i = 0; i < expenseGroups.length; i++) {
      const expenseGroupContractInstance = new web3.eth.Contract(
        ExpenseGroupContract.abi,
        expenseGroups[i]
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

export const addExpenseGroup = async (
  dispatch,
  contract,
  web3,
  account,
  expenseGroup
) => {
  dispatch(expenseGroupAdd())

  try {
    await contract.methods
      .createExpenseGroup(expenseGroup.ownerName, expenseGroup.title)
      .send({ from: account })
      .on('transactionHash', async (tx) => {
        console.log(tx)
      })
      .on('receipt', async (receipt) => {
        dispatch(expenseGroupAddSuccess(expenseGroup))

        await loadExpenseGroupContracts(dispatch, contract, web3)
        history.push('/expense-groups')
        showFeedback(dispatch, {
          text: `Expense group succesfully added. Transaction hash: ${receipt.transactionHash}. Block: ${receipt.blockNumber}`,
          type: 'success',
          visible: true,
        })
      })
      .on('confirmation', (confirmationNumber) => {
        if (confirmationNumber === numberOfConfirmationsToProvideFeedback) {
          showFeedback(dispatch, {
            text: `Expense group insertion transaction confirmed ${confirmationNumber} times`,
            type: 'success',
            visible: true,
          })
        }
      })
      .on('error', (error) => {
        dispatch(
          expenseGroupMemberAddError(tryExtractVMErrorMessage(error.message))
        )
      })
  } catch (error) {
    dispatch(expenseGroupAddError(error.message))
  }
}

export const loadExpenseGroupContract = async (
  dispatch,
  web3,
  contractAddress
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
      deployedNetwork && contractAddress
    )

    if (instance.options.address) {
      dispatch(expenseGroupContractLoadSuccess(instance))
    } else {
      throw new Error(
        'Error loading factory contract. Check contract deployment on current network.'
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
        +expense.creationDate * 1000
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
        }))
      )

      expense.approved = account
        ? await contract.methods.getApproval(i, String(account)).call()
        : false

      expense.approvals = await contract.methods.getNumberOfApprovals(i).call()

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
        expense.payees
      )
      .send({ from: account })
      .on('transactionHash', async (tx) => {
        console.log(tx)
      })
      .on('receipt', async (receipt) => {
        dispatch(expenseGroupExpenseAddSuccess(expense))
        await loadExpenses(dispatch, contract, account)
        history.push(`/expense-group/${contract.options.address}`)
        showFeedback(dispatch, {
          text: `Expense succesfully added. Transaction hash: ${receipt.transactionHash}. Block: ${receipt.blockNumber}`,
          type: 'success',
          visible: true,
        })
      })
      .on('confirmation', (confirmationNumber) => {
        if (confirmationNumber === numberOfConfirmationsToProvideFeedback) {
          showFeedback(dispatch, {
            text: `Expense insertion transaction confirmed ${confirmationNumber} times`,
            type: 'success',
            visible: true,
          })
        }
      })
      .on('error', (error) => {
        dispatch(
          expenseGroupMemberAddError(tryExtractVMErrorMessage(error.message))
        )
      })
  } catch (error) {
    dispatch(expenseGroupExpenseAddError('Unknown error adding new expense'))
    throw error
  }
}

export const addMember = async (dispatch, contract, account, member) => {
  dispatch(expenseGroupMemberAdd())

  try {
    await contract.methods
      .addMember(member.name, member.address)
      .send({ from: account })
      .on('transactionHash', async (tx) => {
        console.log(tx)
      })
      .on('receipt', async (receipt) => {
        dispatch(expenseGroupMemberAddSuccess(member))
        await loadMembers(dispatch, contract)
        history.push(`/expense-group/${contract.options.address}`)
        showFeedback(dispatch, {
          text: `Member succesfully added. Transaction hash: ${receipt.transactionHash}. Block: ${receipt.blockNumber}`,
          type: 'success',
          visible: true,
        })
      })
      .on('confirmation', (confirmationNumber) => {
        if (confirmationNumber === numberOfConfirmationsToProvideFeedback) {
          showFeedback(dispatch, {
            text: `Member insertion transaction confirmed ${confirmationNumber} times`,
            type: 'success',
            visible: true,
          })
        }
      })
      .on('error', (error) => {
        dispatch(
          expenseGroupMemberAddError(tryExtractVMErrorMessage(error.message))
        )
      })
  } catch (error) {
    dispatch(expenseGroupMemberAddError('Unknown error adding the new member'))
    throw error
  }
}

export const approve = async (
  dispatch,
  contract,
  account,
  expenseId,
  approved
) => {
  dispatch(expenseGroupExpenseApprove())

  try {
    await contract.methods
      .approve(expenseId, approved)
      .send({ from: account })
      .on('transactionHash', async (tx) => {
        console.log(tx)
      })
      .on('receipt', async (receipt) => {
        dispatch(expenseGroupExpenseApproveSuccess({ expenseId, approved }))
        await loadExpenses(dispatch, contract, account)
        await loadMembers(dispatch, contract)
        history.push(`/expense-group/${contract.options.address}`)
        showFeedback(dispatch, {
          text: `Expense succesfully approved. Transaction hash: ${receipt.transactionHash}. Block: ${receipt.blockNumber}`,
          type: 'success',
          visible: true,
        })
      })
      .on('confirmation', (confirmationNumber) => {
        if (confirmationNumber === numberOfConfirmationsToProvideFeedback) {
          showFeedback(dispatch, {
            text: `Expense approval transaction confirmed ${confirmationNumber} times`,
            type: 'success',
            visible: true,
          })
        }
      })
      .on('error', (error) => {
        dispatch(
          expenseGroupMemberAddError(tryExtractVMErrorMessage(error.message))
        )
      })
  } catch (error) {
    dispatch(expenseGroupExpenseApproveError(error.message))
    throw error
  }
}

export const showFeedback = async (dispatch, options) => {
  dispatch(feedbackShown(options))
  return options
}

export const clearFeedback = async (dispatch) => {
  dispatch(feedbackCleared())
  return
}
