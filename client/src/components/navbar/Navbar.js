import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import BlockchainConnector from '../blockchain-connector/BlockchainConnector'

const Navbar = () => {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Link className={classes.link} to="/">
            Go dutch!
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
  },
}))

export default Navbar
