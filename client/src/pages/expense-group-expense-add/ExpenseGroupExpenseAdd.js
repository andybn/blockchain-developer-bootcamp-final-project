import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
class ExpenseGroupExpenseAdd extends Component {
  render() {
    const address = this.props.match.params.contractAddress
    return (
      <Container maxWidth="sm" style={{marginTop: 100}}>
        <Button variant="contained" color="primary">
          [ADD EXPENSE TO EXPENSE GROUP {address} ]
        </Button>
      </Container>
    )
  }
}

export default withRouter(ExpenseGroupExpenseAdd)
