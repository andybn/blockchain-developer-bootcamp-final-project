import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadExpenseGroupContract,
  loadExpenses,
  loadMembers,
} from '../../redux/interactions'
import {
  expenseGroupContractSelector,
  expenseGroupMembersSelector,
  expenseGroupExpensesSelector,
  web3Selector,
  accountSelector
} from '../../redux/selectors'
import ExpenseGroupMemberList from '../../components/expense-group-member-list/ExpenseGroupMemberList'
import ExpenseGroupExpenseList from '../../components/expense-group-expense-list/ExpenseGroupExpenseList'
import { withRouter } from 'react-router-dom'
import { Button, Container, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'
class ExpenseGroupDetail extends Component {
  
  constructor(props) {
    super(props)
      this.state = { contractChanged: false };
  }
  
  async componentDidMount() {
    this.initialize(this.props)
  }

  async componentDidUpdate() {
    this.initialize(this.props)
  }

  async initialize(props) {
    let { dispatch, web3, contract, members, account, expenses } = props
    const address = props.match.params.contractAddress;    

    if ((web3 && !contract)) {      
      await loadExpenseGroupContract(dispatch, web3, address)
    }

    if (contract && !members) {
      await loadMembers(dispatch, contract)
    }

    if (contract && !expenses) {
      await loadExpenses(dispatch, contract, account)
    }  

    if(web3 && contract && (address !== contract.options.address)) {           
       await loadExpenseGroupContract(dispatch, web3, address)
       this.setState({contractChanged: true});
    }

    if(web3 && contract && this.state.contractChanged){
      await loadMembers(dispatch, contract)
      await loadExpenses(dispatch, contract, account)
      this.setState({contractChanged: false});
    }
  }

  render() {
    const { members, expenses } = this.props
    const address = this.props.match.params.contractAddress

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
        </ButtonGroup>
        <ExpenseGroupMemberList members={members}></ExpenseGroupMemberList>
        <ExpenseGroupExpenseList expenses={expenses}></ExpenseGroupExpenseList>        
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    contract: expenseGroupContractSelector(state),
    web3: web3Selector(state),
    account: accountSelector(state),
    members: expenseGroupMembersSelector(state),
    expenses: expenseGroupExpensesSelector(state),
  }
}

export default withRouter(connect(mapStateToProps)(ExpenseGroupDetail))
