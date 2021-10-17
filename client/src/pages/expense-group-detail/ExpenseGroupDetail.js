import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadExpenseGroupContract, loadMembers } from '../../redux/interactions'
import {
  expenseGroupContractSelector,
  expenseGroupMembersSelector,
  web3Selector,
} from '../../redux/selectors'
import ExpenseGroupMemberList from '../../components/expense-group-member-list/ExpenseGroupMemberList'
import { withRouter } from 'react-router-dom'
import { Button, Container, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'
class ExpenseGroupDetail extends Component {
  async componentDidMount() {
    this.initialize(this.props)
  }

  async componentDidUpdate() {
    this.initialize(this.props)
  }

  async initialize(props) {
    const { dispatch, web3, contract, members } = props

    if (web3 && !contract) {
      const address = this.props.match.params.contractAddress
      await loadExpenseGroupContract(dispatch, web3, address)
    }

    if (contract && !members) {
      await loadMembers(dispatch, contract)
    }
  }

  render() {
    const { members } = this.props
    const address = this.props.match.params.contractAddress;
    
    return (
      <Container maxWidth="lg" style={{ marginTop: 20 }}>
        <ButtonGroup
          color="primary"
          aria-label="outlined primary button group"
          style={{ marginBottom: 20 }}
        >
          <Button
            component={Link}
            to={`/expense-group/${address}/expenses/add`}
            variant="outlined"
            color="inherit"
          >
            Add new expense
          </Button>
          <Button
            component={Link}
            to={`/expense-group/${address}/members/add`}
            variant="outlined"
            color="inherit"
          >
            Add new member
          </Button>
          <Button
            component={Link}
            to={`/expense-group/${address}/payments/add`}
            variant="outlined"
            color="inherit"
          >
            Add new payment
          </Button>
        </ButtonGroup>
        <ExpenseGroupMemberList members={members}></ExpenseGroupMemberList>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    contract: expenseGroupContractSelector(state),
    web3: web3Selector(state),
    members: expenseGroupMembersSelector(state),
  }
}

export default withRouter(connect(mapStateToProps)(ExpenseGroupDetail))
