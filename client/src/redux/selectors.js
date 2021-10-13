import {get} from 'lodash';
import {createSelector} from 'reselect';

// WEB3
const web3 = state => get(state, 'web3.connection', null);
export const web3Selector = createSelector(web3, w => w);

const account = state => get(state, 'web3.account', null);
export const accountSelector = createSelector(account, a => a);

//FACTORY CONTRACT
const factoryContract = state => get(state, 'contract.factoryContract', null);
export const factoryContractSelector = createSelector(factoryContract, a => a);

const expenseGroupContracts = state => get(state, 'contract.expenseGroupContracts', null);
export const expenseGroupContractsSelector = createSelector(expenseGroupContracts, a => a);