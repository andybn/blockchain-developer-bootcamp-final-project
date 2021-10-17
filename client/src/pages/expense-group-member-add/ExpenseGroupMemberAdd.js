import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ExpenseGroupMemberAdd extends Component {
  render() {
    const address = this.props.match.params.contractAddress
    return <h6>[ADD MEMBER TO EXPENSE GROUP { address } </h6>
  }
}

export default withRouter(ExpenseGroupMemberAdd)
