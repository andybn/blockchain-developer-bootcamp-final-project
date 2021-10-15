export function web3Loaded(connection){
  return {
    type: 'WEB3_LOADED',
    connection
  }
};

export function accountLoaded(account){
  return {
    type: 'ACCOUNT_LOADED',
    account
  }
};

export function factoryContractLoaded(factoryContract){
  return {
    type: 'FACTORY_CONTRACT_LOADED',
    factoryContract
  }
};

export function expenseGroupContractsLoaded(expenseGroupContracts){
  return {
    type: 'EXPENSE_GROUP_CONTRACTS_LOADED',
    expenseGroupContracts
  }
};