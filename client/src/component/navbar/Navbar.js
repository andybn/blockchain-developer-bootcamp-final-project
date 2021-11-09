import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import BlockchainConnector from '../../container/blockchain-connector/BlockchainConnector'
import AssesmentIcon from '@material-ui/icons/Assessment'
const Navbar = () => {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <AssesmentIcon />
        </IconButton>
        <Typography variant="h6">Go dutch!</Typography>
        <Box display="flex" flexGrow={1}>
          <Link className={classes.link} to="/">
            Home
          </Link>
          <Link className={classes.link} to="/expense-groups">
            Expense groups
          </Link>
        </Box>
        <BlockchainConnector></BlockchainConnector>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    marginRight: '10px',
    marginLeft: '20px'
  },
}))

export default Navbar
