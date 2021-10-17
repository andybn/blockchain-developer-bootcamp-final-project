import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Container, ButtonGroup } from '@material-ui/core'

class ExpenseGroupPaymentAdd extends Component {
  render() {
    const address = this.props.match.params.contractAddress
    return (
      <Container maxWidth="lg" style={{ marginTop: 20 }}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button variant="outlined" color="inherit">
            [ADD PAYMENT TO EXPENSE GROUP {address} ]
          </Button>
        </ButtonGroup>
      </Container>
    )
  }
}

export default withRouter(ExpenseGroupPaymentAdd)
