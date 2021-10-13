import {combineReducers} from 'redux';

function web3(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.connection };
    case 'ACCOUNT_LOADED':
      return { ...state, account: action.account};
    default:
      return state;
  }
}

function contract(state = {}, action) {
  switch (action.type) {
    case 'FACTORY_CONTRACT_LOADED':
      return { ...state, factoryContract: action.factoryContract };
    case 'EXPENSE_GROUP_CONTRACTS_LOADED':
      return { ...state, expenseGroupContracts: action.expenseGroupContracts };
    default:
      return state;
  }
}

const rootReducer = new combineReducers({
  web3, contract
});

export default rootReducer;