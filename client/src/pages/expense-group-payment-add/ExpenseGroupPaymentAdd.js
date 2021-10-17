import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ExpenseGroupPaymentAdd extends Component {
  render() {
    const address = this.props.match.params.contractAddress
    return <h6>[ADD PAYMENT TO EXPENSE GROUP { address } ]</h6>
  }
}

export default withRouter(ExpenseGroupPaymentAdd)
