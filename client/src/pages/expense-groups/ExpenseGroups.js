import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadExpenseGroupContracts,
  loadFactoryContract,
} from '../../redux/interactions'
import {
  factoryContractSelector,
  expenseGroupContractsSelector,
  web3Selector,
} from '../../redux/selectors'
import ExpenseGroupList from '../../components/expense-group-list/ExpenseGroupList'

class ExpenseGroups extends Component {
  async componentDidMount(prevProps) {
    this.initialize(this.props)
  }

  async componentDidUpdate(prevProps) {
    this.initialize(this.props)
  }

  async initialize(props) {
    const { web3, dispatch, factoryContract, expenseGroupContracts } = props

    if (web3 && !factoryContract) {
      await loadFactoryContract(dispatch, web3)
    }

    if (factoryContract && !expenseGroupContracts) {
      await loadExpenseGroupContracts(dispatch, factoryContract, web3)
    }
  }

  render() {
    const { expenseGroups } = this.props
    return (
      <ExpenseGroupList
        expenseGroupContracts={expenseGroups}
      ></ExpenseGroupList>
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

export default connect(mapStateToProps)(ExpenseGroups)
