import React, { Component } from 'react'

import './ExpenseGroupList.css'
import { connect } from 'react-redux'
import {   
       loadExpenseGroups,
       loadFactoryContract
  } from '../../redux/interactions'
  import {
    factoryContractSelector,
    expenseGroupsSelector,    
    web3Selector
  } from '../../redux/selectors'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

class ExpenseGroupList extends Component {
  
    async componentWillUpdate(prevProps){
        const { dispatch, web3 } = this.props;        
        
        if(!prevProps.web3 && this.props.web3) {
            await loadFactoryContract(dispatch, web3);     
        }
    }

    async componentDidUpdate(prevProps){
        
        const { dispatch, factoryContract, web3 } = this.props;

        if(!prevProps.factoryContract && this.props.factoryContract) {            
            await loadExpenseGroups(dispatch, factoryContract, web3); 
        }
    }

    render() {
    
    const { expenseGroups } = this.props

    return (
        <div>      
        <h2>Expense groups</h2>
        {expenseGroups && expenseGroups.length > 0 && (
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
                  {expenseGroups.map((row) => (
                    <TableRow key={row.contractAddress}>
                      <TableCell align="left">
                        {row.expenseGroupTitle}
                      </TableCell>
                      <TableCell align="left">
                        {row.expenseGroupOwner}
                      </TableCell>
                      <TableCell align="left">
                        {row.contractAddress}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    expenseGroups: expenseGroupsSelector(state),
    factoryContract: factoryContractSelector(state),    
    web3: web3Selector(state)
  }
}

export default connect(mapStateToProps)(ExpenseGroupList)
