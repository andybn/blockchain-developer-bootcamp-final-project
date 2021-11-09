import React, { Component } from 'react'
import {
  CardContent,
  Typography,
  Card,
  withStyles
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const styles = () => ({
  card: {
    maxWidth: 650,
    marginTop: 100,
  },
  container: {
    display: 'Flex',
    justifyContent: 'center',
  },
  actions: {
    float: 'right',
  },
})

class HomePage extends Component {
  render() {
    let { classes } = this.props

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              Welcome to GoDutch!
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              Make sharing and tracking expenses simple for travels, daily life or any
              kind of activity with the security, transparency and traceability of the Ethereum
              blockchain.
            </Typography>
            <br />
            <Typography variant="body2" color="textPrimary" component="p"> 
              Connect your wallet and create your first contract for any shared
              activity starting &nbsp;
              <Link to={'/expense-groups'}>here</Link>.
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(HomePage)
