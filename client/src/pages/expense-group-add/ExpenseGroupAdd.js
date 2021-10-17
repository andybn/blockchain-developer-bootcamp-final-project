import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
class ExpenseGroupAdd extends Component {
  render() {
    return (
      <Container maxWidth="sm" style={{marginTop: 100}}>
        <Button variant="contained" color="primary">
          [ADD NEW EXPENSE GROUP]
        </Button>
      </Container>
    )
  }
}

export default withRouter(ExpenseGroupAdd)
