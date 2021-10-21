import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import { Link } from 'react-router-dom'

const ExpenseGroupsToolbar = () => {
  return (
    <ButtonGroup
      color="primary"
      aria-label="outlined primary button group"
      style={{ marginBottom: 20 }}
    >
      <Button
        component={Link}
        to="/expense-groups/add"
        variant="outlined"
        color="inherit"
      >
        Add new expense group
      </Button>
    </ButtonGroup>
  )
}

export default ExpenseGroupsToolbar
