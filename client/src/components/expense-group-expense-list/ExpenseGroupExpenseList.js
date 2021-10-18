import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const ExpenseGroupExpenseList = (props) => {
  return (
    <div>
      {props.expenses && props.expenses.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={6}>Expenses</TableCell>
              </TableRow>
              <TableRow>                
               <TableCell align="left">Id</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">ValueDate</TableCell>
                <TableCell align="left">CreationDate</TableCell>
                <TableCell align="left">Payer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.expenses.map((row) => (
                <TableRow key={row.identifier}>
                  <TableCell align="left">{row.identifier}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.amount}</TableCell>
                  <TableCell align="left">{row.valueDate}</TableCell>
                  <TableCell align="left">{row.creationDate}</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default ExpenseGroupExpenseList
