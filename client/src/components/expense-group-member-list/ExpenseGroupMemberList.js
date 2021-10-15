import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const ExpenseGroupMemberList = (props) => {
  return (
    <div>
      {props.members && props.members.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={4}>Expense group members</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.members.map((row) => (
                <TableRow key={row.identifier}>
                  <TableCell align="left">{row.identifier}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.memberAddress}</TableCell>
                  <TableCell align="left">{row.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default ExpenseGroupMemberList
