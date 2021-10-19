import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const ExpenseGroupMemberList = (props) => {
  return (
    <div>
      {props.members && props.members.length > 0 && (        
          <Table aria-label="simple table" style={{"width" : "100%"}}>
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
      )}
    </div>
  )
}

export default ExpenseGroupMemberList
