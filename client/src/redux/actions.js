export function web3Load() {
  return {
    type: 'WEB3_LOAD'
  }
}

export function web3LoadSuccess(web3, networkId) {
  return {
    type: 'WEB3_LOAD_SUCCESS',
    web3,
    networkId
  }
}

export function web3LoadError(error) {
  return {
    type: 'WEB3_LOAD_ERROR',
    error
  }
}

export function accountLoad() {
  return {
    type: 'ACCOUNT_LOAD',
  }
}

export function accountLoadSuccess(account) {
  return {
    type: 'ACCOUNT_LOAD_SUCCESS',
    account: account
  }
}

export function accountLoadError(error) {
  return {
    type: 'ACCOUNT_LOAD_ERROR',
    error: error
  }
}

export function networkChange() {
  return {
    type: 'NETWORK_CHANGE',
  }
}

export function networkChangeSuccess(networkId) {
  return {
    type: 'NETWORK_CHANGE_SUCCESS',
    networkId,
  }
}

export function networkChangeError(networkId, error) {
  return {
    type: 'NETWORK_CHANGE_ERROR',
    networkId: networkId,
    error: error
  }
}

export function factoryContractLoad() {
  return {
    type: 'FACTORY_CONTRACT_LOAD',
  }
}

export function factoryContractLoadSuccess(factoryContract) {
  return {
    type: 'FACTORY_CONTRACT_LOAD_SUCCESS',
    factoryContract,
  }
}

export function factoryContractLoadError(error) {
  return {
    type: 'FACTORY_CONTRACT_LOAD_ERROR',
    error: error
  }
}

export function expenseGroupContractsLoad() {
  return {
    type: 'EXPENSE_GROUP_CONTRACTS_LOAD',
  }
}

export function expenseGroupContractsLoadSuccess(expenseGroupContracts) {
  return {
    type: 'EXPENSE_GROUP_CONTRACTS_LOAD_SUCCESS',
    expenseGroupContracts
  }
}

export function expenseGroupContractsLoadError(error) {
  return {
    type: 'EXPENSE_GROUP_CONTRACTS_LOAD_ERROR',
    error: error
  }
}

export function expenseGroupAdd() {
  return {
    type: 'EXPENSE_GROUP_ADD'
  }
}

export function expenseGroupAddSuccess(expenseGroup) {
  return {
    type: 'EXPENSE_GROUP_ADD_SUCCESS',
    expenseGroup,
  }
}

export function expenseGroupAddError(error) {
  return {
    type: 'EXPENSE_GROUP_ADD_ERROR',
    error
  }
}

export function expenseGroupContractLoad() {
  return {
    type: 'EXPENSE_GROUP_CONTRACT_LOAD',
  }
}

export function expenseGroupContractLoadSuccess(contract) {
  return {
    type: 'EXPENSE_GROUP_CONTRACT_LOAD_SUCCESS',
    contract
  }
}

export function expenseGroupContractLoadError(error) {
  return {
    type: 'EXPENSE_GROUP_CONTRACT_LOAD_ERROR',
    error: error
  }
}

export function expenseGroupMembersLoad() {
  return {
    type: 'EXPENSE_GROUP_MEMBERS_LOAD',
  }
}

export function expenseGroupMembersLoadSuccess(members) {
  return {
    type: 'EXPENSE_GROUP_MEMBERS_LOAD_SUCCESS',
    members
  }
}

export function expenseGroupMembersLoadError(error) {
  return {
    type: 'EXPENSE_GROUP_MEMBERS_LOAD_ERROR',
    error: error
  }
}

export function expenseGroupExpensesLoad() {
  return {
    type: 'EXPENSE_GROUP_EXPENSES_LOAD',
  }
}

export function expenseGroupExpensesLoadSuccess(expenses) {
  return {
    type: 'EXPENSE_GROUP_EXPENSES_LOAD_SUCCESS',
    expenses
  }
}

export function expenseGroupExpensesLoadError(error) {
  return {
    type: 'EXPENSE_GROUP_EXPENSES_LOAD_ERROR',
    error: error
  }
}

export function expenseGroupExpenseAdd() {
  return {
    type: 'EXPENSE_GROUP_EXPENSE_ADD'
  }
}

export function expenseGroupExpenseAddSuccess(expense) {
  return {
    type: 'EXPENSE_GROUP_EXPENSE_ADD_SUCCESS',
    expense
  }
}

export function expenseGroupExpenseAddError(error) {
  return {
    type: 'EXPENSE_GROUP_EXPENSE_ADD_ERROR',
    error
  }
}

export function expenseGroupMemberAdd() {
  return {
    type: 'EXPENSE_GROUP_MEMBER_ADD'
  }
}

export function expenseGroupMemberAddSuccess(member) {
  return {
    type: 'EXPENSE_GROUP_MEMBER_ADD_SUCCESS',
    member,
  }
}

export function expenseGroupMemberAddError(error) {
  return {
    type: 'EXPENSE_GROUP_MEMBER_ADD_ERROR',
    error
  }
}


export function expenseGroupExpenseApprove() {
  return {
    type: 'EXPENSE_GROUP_EXPENSE_APPROVE'
  }
}

export function expenseGroupExpenseApproveSuccess(expense) {
  return {
    type: 'EXPENSE_GROUP_EXPENSE_APPROVE_SUCCESS',
    expense,
  }
}

export function expenseGroupExpenseApproveError(error) {
  return {
    type: 'EXPENSE_GROUP_EXPENSE_APPROVE_ERROR',
    error
  }
}

export function feedbackShown(options) {
  return {
    type: 'FEEDBACK_SHOWN',
    options,
  }
}

