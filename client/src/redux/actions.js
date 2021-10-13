export function web3Loaded(connection){
  return {
    type: 'WEB3_LOADED',
    connection
  }
}

export function accountLoaded(account){
  return {
    type: 'ACCOUNT_LOADED',
    account
  }
}

export function factoryContractLoaded(factoryContract){
  return {
    type: 'FACTORY_CONTRACT_LOADED',
    factoryContract
  }
}

export function expenseGroupsLoaded(expenseGroups){
  return {
    type: 'EXPENSE_GROUPS_LOADED',
    expenseGroups
  }
}