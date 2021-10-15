import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadExpenseGroupContract, loadMembers } from '../../redux/interactions'
import {
  expenseGroupContractSelector,
  expenseGroupMembersSelector,
  web3Selector,
} from '../../redux/selectors'
import ExpenseGroupMemberList from '../../components/expense-group-member-list/ExpenseGroupMemberList'
import {
  withRouter
} from 'react-router-dom'

class ExpenseGroup extends Component {
  
  async componentDidMount() {    
    this.initialize(this.props);
  }

  async componentDidUpdate() {        
    this.initialize(this.props);
  }

  async initialize(props) {
    const { dispatch, web3, contract, members } = props;

    if (web3 && !contract) {
      const address = props.match.params.contractAddress;  
      await loadExpenseGroupContract(dispatch, web3, address)
    }

    if (contract && !members) {      
      await loadMembers(dispatch, contract);
    }
  } 

  render() {
    const { members } = this.props;   
    return  <ExpenseGroupMemberList members={members}></ExpenseGroupMemberList>
  }
}

function mapStateToProps(state) {
  return {
    contract: expenseGroupContractSelector(state),
    web3: web3Selector(state),
    members: expenseGroupMembersSelector(state)
  }
}

export default withRouter(connect(mapStateToProps)(ExpenseGroup));