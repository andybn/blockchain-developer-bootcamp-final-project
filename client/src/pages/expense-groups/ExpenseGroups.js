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
  networkSelector,
} from '../../redux/selectors'
import ExpenseGroupList from '../../components/expense-group-list/ExpenseGroupList'
import { Button, Grid, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'
class ExpenseGroups extends Component {
  constructor(props) {
    super(props)
    this.state = { networkChanged: false }
  }

  async componentDidMount() {
    this.initialize(this.props)
  }

  async componentDidUpdate(prevProps) {
    this.initialize(this.props, prevProps)
  }

  async initialize(props, prevProps) {
    let { web3, factoryContract, networkId } = props

    if (web3 && !factoryContract) {
      this.loadData(props)
    }

    if (prevProps && prevProps.networkId && prevProps.networkId !== networkId) {
      this.loadData(props)
    }
  }

  async loadData(props) {
    let { web3, dispatch, factoryContract } = props
    factoryContract = await loadFactoryContract(dispatch, web3)
    await loadExpenseGroupContracts(dispatch, factoryContract, web3)
  }

  render() {
    const { expenseGroups } = this.props
    return (
      <Grid container style={{ margin: 15 }}>
        <Grid item xs={10}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
            style={{ marginBottom: 20 }}
          >
            <Button
              component={Link}
              to="/expense-groups/add"
              variant="outlined"
              color="inherit"
            >
              Add new expense group
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={10}>
          <ExpenseGroupList
            expenseGroupContracts={expenseGroups}
          ></ExpenseGroupList>
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    expenseGroups: expenseGroupContractsSelector(state),
    factoryContract: factoryContractSelector(state),
    web3: web3Selector(state),
    networkId: networkSelector(state),
  }
}

export default connect(mapStateToProps)(ExpenseGroups)