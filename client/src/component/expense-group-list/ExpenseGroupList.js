import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const ExpenseGroupList = (props) => {
  return (
    <Table style={{ width: '100%' }}>
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
      {props.expenseGroupContracts && props.expenseGroupContracts.length > 0 && (
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
      )}
    </Table>
  )
}

export default ExpenseGroupList
