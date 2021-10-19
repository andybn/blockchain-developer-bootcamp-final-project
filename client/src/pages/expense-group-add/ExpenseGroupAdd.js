import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, ButtonGroup, Grid } from '@material-ui/core'
class ExpenseGroupAdd extends Component {
  render() {
    return (
      <Grid container spacing={20} style={{ margin: 15 }}>
        <Grid item xs={10}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button variant="outlined" color="inherit">
              [ADD NEW EXPENSE GROUP]
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(ExpenseGroupAdd)
