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
import { Button, Container, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'

class ExpenseGroups extends Component {
  async componentDidMount() {
    this.initialize(this.props)
  }

  async componentDidUpdate() {
    this.initialize(this.props)
  }

  async initialize(props) {
    const { web3, dispatch, factoryContract, expenseGroups } = props

    if (web3 && !factoryContract) {
      await loadFactoryContract(dispatch, web3)
    }

    if (factoryContract && !expenseGroups) {
      await loadExpenseGroupContracts(dispatch, factoryContract, web3)
    }
  }

  render() {
    const { expenseGroups } = this.props
    return (
      <Container maxWidth="lg" style={{ marginTop: 20 }}>
        <ButtonGroup color="primary" aria-label="outlined primary button group" style={{ marginBottom: 20 }}>
          <Button
            component={Link}
            to="/expense-groups/add"
            variant="outlined"
            color="inherit"
          >
            Add new expense group
          </Button>
        </ButtonGroup>
        <ExpenseGroupList
          expenseGroupContracts={expenseGroups}
        ></ExpenseGroupList>
      </Container>
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
