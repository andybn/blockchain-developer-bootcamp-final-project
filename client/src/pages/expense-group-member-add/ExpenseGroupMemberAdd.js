import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Grid, ButtonGroup } from '@material-ui/core'
class ExpenseGroupMemberAdd extends Component {
  render() {
    const address = this.props.match.params.contractAddress
    return (
      <Grid container style={{ margin: 15 }}>
        <Grid item xs={10}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button variant="outlined" color="inherit">
              [ADD MEMBER TO EXPENSE GROUP {address} ]
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(ExpenseGroupMemberAdd)
