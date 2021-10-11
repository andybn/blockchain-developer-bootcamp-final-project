import React, { Component } from 'react'
import ExpenseGroupContract from './../../contracts/ExpenseGroup.json'
import ExpenseGroupFactoryContract from './../../contracts/ExpenseGroupFactory.json'
import getWeb3 from './../../common/getWeb3'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import './App.css'

class App extends Component {
  state = { expenseGroups: [], web3: null}

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ExpenseGroupFactoryContract.networks[networkId];

      const factoryContractInstance = new web3.eth.Contract(
        ExpenseGroupFactoryContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3 });

      // await factoryContractInstance.methods
      //   .createExpenseGroup('SenderA', 'WorldTrip')
      //   .send({ from: accounts[0] });

      const expenseGroups = await factoryContractInstance.methods
        .getExpenseGroups()
        .call();

      const expenseGroupContracts = [];

      for (let i = 0; i < expenseGroups.length; i++) {
        
        const expenseGroupContractInstance = new web3.eth.Contract(
          ExpenseGroupContract.abi,
          expenseGroups[i],
        )

        let title = await expenseGroupContractInstance.methods.title().call();

        let ownerAddress = await expenseGroupContractInstance.methods
          .memberAddresses(0)
          .call();

        let ownerName = await expenseGroupContractInstance.methods
          .getMemberName(ownerAddress)
          .call();

        let o = {
          expenseGroupTitle: title,
          expenseGroupOwner: ownerName,
          contractAddress: expenseGroups[i]
        };

        expenseGroupContracts.push(o)
      }

      this.setState({ expenseGroups: expenseGroupContracts })
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      )
      console.error(error)
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }

    return (
      <Container maxWidth="lg" className="App">
        <h1> Go Dutch! </h1>
        <h2> Expense groups </h2>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>               
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Owner</TableCell>
                <TableCell align="left">Contract address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.expenseGroups.map((row) => (
                <TableRow key={row.contractAddress}>                 
                  <TableCell align="left">{row.expenseGroupTitle}</TableCell>
                  <TableCell align="left">{row.expenseGroupOwner}</TableCell>
                  <TableCell align="left">{row.contractAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    )
  }
}

export default App
