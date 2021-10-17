import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, ButtonGroup } from '@material-ui/core'
import Container from '@material-ui/core/Container'
class ExpenseGroupAdd extends Component {
  render() {
    return (
      <Container maxWidth="lg" style={{ marginTop: 20 }}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button variant="outlined" color="inherit">
            [ADD NEW EXPENSE GROUP]
          </Button>
        </ButtonGroup>
      </Container>
    )
  }
}

export default withRouter(ExpenseGroupAdd)
