import React, { Component } from 'react'
import BlockchainConnector from '../blockchain-connector/BlockchainConnector'
import ExpenseGroupList from '../expense-group-list/ExpenseGroupList'
import './App.css'
import Container from '@material-ui/core/Container'

class App extends Component {
  render() {
   
    return (
      
      <Container maxWidth="lg">    
        <h1> Go Dutch! </h1>
        <BlockchainConnector></BlockchainConnector>
        <ExpenseGroupList></ExpenseGroupList>
      </Container>
      
    )
  }
}

export default App
