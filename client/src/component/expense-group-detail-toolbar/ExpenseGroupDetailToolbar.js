import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'

const ExpenseGroupDetailToolbar = (address) => {
  
  return (
    <ButtonGroup
      color="primary"
      aria-label="outlined primary button group"
      style={{ marginBottom: 20 }}
    >
      <Button
        component={Link}
        to={`/expense-group/${address.address}/expenses/add`}
        variant="outlined"
        color="inherit"
      >
        Add new expense
      </Button>
      <Button
        component={Link}
        to={`/expense-group/${address.address}/members/add`}
        variant="outlined"
        color="inherit"
      >
        Add new member
      </Button>
    </ButtonGroup>
  )
}

export default ExpenseGroupDetailToolbar
