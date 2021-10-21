import { get } from 'lodash'
import { createSelector } from 'reselect'

// WEB3
const web3 = (state) => get(state, 'web3.connection', null)
export const web3Selector = createSelector(web3, (w) => w)

const account = (state) => get(state, 'web3.account', null)
export const accountSelector = createSelector(account, (a) => a)

const networkId = (state) => get(state, 'web3.networkId', null)
export const networkSelector = createSelector(networkId, (a) => a)

//FACTORY CONTRACT
const factoryContract = (state) => get(state, 'contract.factoryContract', null)
export const factoryContractSelector = createSelector(factoryContract, (a) => a)

const expenseGroupContracts = (state) =>
  get(state, 'contract.expenseGroupContracts', null)
export const expenseGroupContractsSelector = createSelector(
  expenseGroupContracts,
  (a) => a,
)

//EXPENSE GROUP CONTRACT
const contract = (state) => get(state, 'contract.contract', null)
export const expenseGroupContractSelector = createSelector(contract, (a) => a)

const members = (state) => get(state, 'contract.members', null)
export const expenseGroupMembersSelector = createSelector(members, (a) => a)

const expenses = (state) => get(state, 'contract.expenses', null)
export const expenseGroupExpensesSelector = createSelector(expenses, (a) => a)