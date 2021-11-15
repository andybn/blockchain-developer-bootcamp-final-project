function rootReducer(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOAD':
    case 'ACCOUNT_LOAD':
    case 'FACTORY_CONTRACT_LOAD':
    case 'EXPENSE_GROUP_CONTRACTS_LOAD':
    case 'EXPENSE_GROUP_CONTRACT_LOAD':
    case 'EXPENSE_GROUP_MEMBERS_LOAD':
    case 'EXPENSE_GROUP_EXPENSES_LOAD':
    case 'EXPENSE_GROUP_ADD':
    case 'EXPENSE_GROUP_EXPENSE_ADD':
    case 'EXPENSE_GROUP_MEMBER_ADD':
    case 'EXPENSE_GROUP_EXPENSE_APPROVE':
      return { ...state, fetchInProgress: true, error: null }
    case 'NETWORK_CHANGE':
      return {
        ...state,
        fetchInProgress: true,
        error: null,
      }
    case 'WEB3_LOAD_SUCCESS':
      return {
        ...state,
        web3: action.web3,
        networkId: action.networkId,
        fetchInProgress: false,
        error: null,
      }
    case 'ACCOUNT_LOAD_SUCCESS':
      return {
        ...state,
        account: action.account,
        fetchInProgress: false,
        error: null,
      }
    case 'NETWORK_CHANGE_SUCCESS':
      return {
        ...state,
        networkId: action.networkId,
        fetchInProgress: false,
      }
    case 'FACTORY_CONTRACT_LOAD_SUCCESS':
      return {
        ...state,
        factoryContract: action.factoryContract,
        fetchInProgress: false,
      }
    case 'EXPENSE_GROUP_CONTRACTS_LOAD_SUCCESS':
      return {
        ...state,
        expenseGroupContracts: action.expenseGroupContracts,
        fetchInProgress: false,
        error: null,
      }
    case 'EXPENSE_GROUP_CONTRACT_LOAD_SUCCESS':
      return {
        ...state,
        contract: action.contract,
        fetchInProgress: false,
        error: null,
      }
    case 'EXPENSE_GROUP_MEMBERS_LOAD_SUCCESS':
      return {
        ...state,
        members: action.members,
        fetchInProgress: false,
        error: null,
      }
    case 'EXPENSE_GROUP_EXPENSES_LOAD_SUCCESS':
      return {
        ...state,
        expenses: action.expenses,
        fetchInProgress: false,
        error: null,
      }
    case 'EXPENSE_GROUP_ADD_SUCCESS':
      return {
        ...state,
        expenseGroupContracts: state.expenseGroupContracts
          ? [...state.expenseGroupContracts, action.expenseGroup]
          : [action.expenseGroup],
        fetchInProgress: false,
        error: null,
      }
    case 'EXPENSE_GROUP_EXPENSE_ADD_SUCCESS':
      return {
        ...state,
        expenses: state.expenses
          ? [...state.expenses, action.expense]
          : [action.expense],
        fetchInProgress: false,
        error: null,
      }
    case 'EXPENSE_GROUP_MEMBER_ADD_SUCCESS':
      return {
        ...state,
        members: state.members
          ? [...state.members, action.member]
          : [action.members],
        fetchInProgress: false,
        error: null,
      }
    case 'EXPENSE_GROUP_EXPENSE_APPROVE_SUCCESS':
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.expenseIndex === action.expense.expenseIndex
            ? { ...expense, approved: action.expense.approved }
            : expense,
        ),
        fetchInProgress: false,
        error: null,
      }
    case 'WEB3_LOAD_ERROR':
    case 'ACCOUNT_LOAD_ERROR':
    case 'FACTORY_CONTRACT_LOAD_ERROR':
    case 'EXPENSE_GROUP_CONTRACTS_LOAD_ERROR':
    case 'EXPENSE_GROUP_CONTRACT_LOAD_ERROR':
    case 'EXPENSE_GROUP_MEMBERS_LOAD_ERROR':
    case 'EXPENSE_GROUP_EXPENSES_LOAD_ERROR':
    case 'EXPENSE_GROUP_ADD_ERROR':
    case 'EXPENSE_GROUP_EXPENSE_ADD_ERROR':
    case 'EXPENSE_GROUP_MEMBER_ADD_ERROR':
    case 'EXPENSE_GROUP_EXPENSE_APPROVE_ERROR':
      return { ...state, fetchInProgress: false, error: action.error }
    case 'NETWORK_CHANGE_ERROR':
      return {
        ...state,
        networkId: action.networkId,
        error: action.error,
        fetchInProgress: false,
      }
    case 'FEEDBACK_SHOWN':
      return { ...state, feedback: action.options }
    case 'FEEDBACK_CLEARED':
        return { ...state, feedback: { visible: false, type: "success", text: ""} }
    default:
      return state
  }
}

export default rootReducer
