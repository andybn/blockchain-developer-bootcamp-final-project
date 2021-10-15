import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
 withRouter
} from 'react-router-dom'
import {
  loadExpenseGroupContracts,
  loadFactoryContract,
} from '../../../redux/interactions';
import {
  factoryContractSelector,
  expenseGroupContractsSelector,
  web3Selector,
} from '../../../redux/selectors';
import ExpenseGroupList from '../../expense-group-list/ExpenseGroupList'

class Home extends Component {
  async componentWillUpdate(prevProps) {
    const { dispatch } = this.props;

    if (prevProps.web3 && !this.props.web3) {
      await loadFactoryContract(dispatch, prevProps.web3);
    }
  }

  async componentDidUpdate(prevProps) {
    const { dispatch, factoryContract, web3 } = this.props;

    if (!prevProps.factoryContract && this.props.factoryContract) {
      await loadExpenseGroupContracts(dispatch, factoryContract, web3);
    }
  }

  render() {
    const { expenseGroups } = this.props
    return (
      <ExpenseGroupList expenseGroupContracts={expenseGroups}></ExpenseGroupList>
    )
  }
}

function mapStateToProps(state) {
  return {
    expenseGroups: expenseGroupContractsSelector(state),
    factoryContract: factoryContractSelector(state),
    web3: web3Selector(state),
  }
}

export default connect(mapStateToProps)(Home);
