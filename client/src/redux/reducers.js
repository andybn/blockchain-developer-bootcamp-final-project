import { combineReducers } from 'redux'

function web3(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.connection }
    case 'ACCOUNT_LOADED':
      return { ...state, account: action.account }
    case 'NETWORK_CHANGED':        
        return { ...state, networkId: action.networkId, factoryContract: null, expenseGroupContracts: [] }
    default:
      return state
  }
}

function contract(state = {}, action) {
  switch (action.type) {
    case 'FACTORY_CONTRACT_LOADED':
      return { ...state, factoryContract: action.factoryContract }
    case 'EXPENSE_GROUP_CONTRACTS_LOADED':
      return { ...state, expenseGroupContracts: action.expenseGroupContracts }
    case 'EXPENSE_GROUP_CONTRACT_LOADED':
      return { ...state, contract: action.contract }
    case 'EXPENSE_GROUP_MEMBERS_LOADED':
      return { ...state, members: action.members }
    case 'EXPENSE_GROUP_EXPENSES_LOADED':
      return { ...state, expenses: action.expenses }
    case 'EXPENSE_GROUP_EXPENSE_ADDED':
      return { ...state, expenses: state.expenses ? [...state.expenses, action.expense] : [action.expense] }      
    default:
      return state
  }
}

function common(state = {}, action) {
  switch (action.type) {
    case 'LOADING_FLAG_SET':
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

const rootReducer = new combineReducers({
  web3,
  contract,
  common
})

export default rootReducer
