export function web3Loaded(connection) {
  return {
    type: 'WEB3_LOADED',
    connection,
  }
}

export function accountLoaded(account) {
  return {
    type: 'ACCOUNT_LOADED',
    account,
  }
}

export function factoryContractLoaded(factoryContract) {
  return {
    type: 'FACTORY_CONTRACT_LOADED',
    factoryContract,
  }
}

export function expenseGroupContractsLoaded(expenseGroupContracts) {
  return {
    type: 'EXPENSE_GROUP_CONTRACTS_LOADED',
    expenseGroupContracts,
  }
}

export function expenseGroupContractLoaded(contract) {
  return {
    type: 'EXPENSE_GROUP_CONTRACT_LOADED',
    contract,
  }
}

export function expenseGroupMembersLoaded(members) {
  return {
    type: 'EXPENSE_GROUP_MEMBERS_LOADED',
    members,
  }
}
