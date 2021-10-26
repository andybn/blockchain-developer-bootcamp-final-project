import { get } from 'lodash'
import { createSelector } from 'reselect'

// WEB3
const web3 = (state) => get(state, 'web3', null)
export const web3Selector = createSelector(web3, (w) => w)

const account = (state) => get(state, 'account', null)
export const accountSelector = createSelector(account, (a) => a)

const networkId = (state) => get(state, 'networkId', null)
export const networkSelector = createSelector(networkId, (a) => a)

//FACTORY CONTRACT
const factoryContract = (state) => get(state, 'factoryContract', null)
export const factoryContractSelector = createSelector(factoryContract, (a) => a)

const expenseGroupContracts = (state) =>
  get(state, 'expenseGroupContracts', null)
export const expenseGroupContractsSelector = createSelector(
  expenseGroupContracts,
  (a) => a,
)

//EXPENSE GROUP CONTRACT
const contract = (state) => get(state, 'contract', null)
export const expenseGroupContractSelector = createSelector(contract, (a) => a)

const members = (state) => get(state, 'members', null)
export const expenseGroupMembersSelector = createSelector(members, (a) => a)

const expenses = (state) => get(state, 'expenses', null)
export const expenseGroupExpensesSelector = createSelector(expenses, (a) => a)

//COMMON
const loading = (state) => get(state, 'fetchInProgress', null)
export const loadingSelector = createSelector(loading, (a) => a)

const feedback = (state) => get(state, 'feedback', null)
export const feedbackSelector = createSelector(feedback, (a) => a)

const error = (state) => get(state, 'error', null)
export const errorSelector = createSelector(error, (a) => a)

