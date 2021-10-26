function rootReducer(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOAD':
      return {
        ...state,
        fetchInProgress: true,
        error: null,
      }
    case 'WEB3_LOAD_SUCCESS':
      return {
        ...state,
        web3: action.web3,
        fetchInProgress: false,
        error: null,
      }
    case 'WEB3_LOAD_ERROR':
      return { ...state, error: action.error, fetchInProgress: false }

    case 'ACCOUNT_LOAD':
      return {
        ...state,
        fetchInProgress: true,
        error: null,
      }
    case 'ACCOUNT_LOAD_SUCCESS':
      return {
        ...state,
        account: action.account,
        fetchInProgress: false,
        error: null,
      }
    case 'ACCOUNT_LOAD_ERROR':
      return {
        ...state,
        error: action.error,
        fetchInProgress: false,
      }
    case 'NETWORK_CHANGE':
      return {
        ...state,
        fetchInProgress: true,
        error: null,
      }
    case 'NETWORK_CHANGE_SUCCESS':
      return {
        ...state,
        networkId: action.networkId,
        fetchInProgress: false,
      }
    case 'NETWORK_CHANGE_ERROR':
      return {
        ...state,
        networkId: action.networkId,
        error: action.error,
        fetchInProgress: false     
      }
    case 'FACTORY_CONTRACT_LOAD':
      return {
        ...state,
        fetchInProgress: true,
        error: null,
      }
    case 'FACTORY_CONTRACT_LOAD_SUCCESS':
      return {
        ...state,
        factoryContract: action.factoryContract,
        fetchInProgress: false,
      }
    case 'FACTORY_CONTRACT_LOAD_ERROR':
      return {
        ...state,
        error: action.error,
        fetchInProgress: false,
      }
    case 'EXPENSE_GROUP_CONTRACTS_LOAD':
      return {
        ...state,
        fetchInProgress: true,
        error: null,
      }
    case 'EXPENSE_GROUP_CONTRACTS_LOAD_SUCCESS':
      return {
        ...state,
        expenseGroupContracts: action.expenseGroupContracts,
        fetchInProgress: false,
        error: null,
      }
    case 'EXPENSE_GROUP_CONTRACTS_LOAD_ERROR':
      return {
        ...state,
        error: action.error,
        fetchInProgress: false,
      }
    case 'EXPENSE_GROUP_CONTRACT_LOAD':
      return {
        ...state,
        fetchInProgress: true,
        error: null,
      }
    case 'EXPENSE_GROUP_CONTRACT_LOAD_SUCCESS':
      return {
        ...state,
        contract: action.contract,
        fetchInProgress: false,
        error: null,
      }
    case 'EXPENSE_GROUP_CONTRACT_LOAD_ERROR':
      return {
        ...state,
        error: action.error,
        fetchInProgress: false,
      }
    case 'EXPENSE_GROUP_MEMBERS_LOAD':
      return {
        ...state,
        fetchInProgress: true,
        error: null,
      }
    case 'EXPENSE_GROUP_MEMBERS_LOAD_SUCCESS':
      return {
        ...state,
        members: action.members,
        fetchInProgress: false,
        error: null,
      }
    case 'EXPENSE_GROUP_MEMBERS_LOAD_ERROR':
      return {
        ...state,
        error: action.error,
        fetchInProgress: false,
      }

    case 'EXPENSE_GROUP_EXPENSES_LOAD':
      return { ...state, fetchInProgress: true, error: null }

    case 'EXPENSE_GROUP_EXPENSES_LOAD_SUCCESS':
      return {
        ...state,
        expenses: action.expenses,
        fetchInProgress: false,
        error: null,
      }
    case 'EXPENSE_GROUP_EXPENSES_LOAD_ERROR':
      return {
        ...state,
        error: action.error,
        fetchInProgress: false,
      }
    case 'EXPENSE_GROUP_EXPENSE_ADD':
      return { ...state, fetchInProgress: true, error: null }
    case 'EXPENSE_GROUP_EXPENSE_ADD_SUCCESS':
      return {
        ...state,
        expenses: state.expenses
          ? [...state.expenses, action.expense]
          : [action.expense],
        fetchInProgress: false,
        error: null,
      }
    case 'EXPENSE_GROUP_EXPENSE_ADD_ERROR':
      return { ...state, fetchInProgress: false, error: null }
    case 'FEEDBACK_SHOWN':
      return { ...state, feedback: action.options }
    default:
      return state
  }
}

export default rootReducer
