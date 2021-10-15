import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

const ExpenseGroupList = (props) => {  
  return (
    <div>      
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>Expense groups</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Owner</TableCell>
              <TableCell align="left">Contract address</TableCell>
            </TableRow>
          </TableHead>
          {props.expenseGroupContracts &&
            props.expenseGroupContracts.length > 0 && 
              <TableBody>
                {props.expenseGroupContracts.map((row) => (
                  <TableRow key={row.contractAddress}>
                    <TableCell align="left">{row.expenseGroupTitle}</TableCell>
                    <TableCell align="left">{row.expenseGroupOwner}</TableCell>
                    <TableCell align="left">
                      <Link to={`/expense-group/${row.contractAddress}`}>
                        {row.contractAddress}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            }
        </Table>
      </TableContainer>     
    </div>
  )
}

export default ExpenseGroupList
