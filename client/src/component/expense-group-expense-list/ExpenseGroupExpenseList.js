import React from 'react'
import Table from '@material-ui/core/Table'
import {TableBody, TableCell, TableHead, TableRow, makeStyles } from '@material-ui/core'

const ExpenseGroupExpenseList = (props) => {
  const useStyles = makeStyles({
    table: {
      border: 0,
    },
  });
    
  const classes = useStyles();

  return (
     <div>
      {props.expenses && props.expenses.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={7}>Expenses</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">ValueDate</TableCell>
              <TableCell align="left">CreationDate</TableCell>
              <TableCell align="left">Approved</TableCell>
              <TableCell align="left">Approvals</TableCell>
              <TableCell align="left">Payer</TableCell>
              <TableCell align="left">Payees</TableCell>
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
                <TableCell align="left">{row.approved ? 'Yes' : 'No'}</TableCell>
                <TableCell align="left">{row.approvals}</TableCell>
                <TableCell title={row.payerWithName.address} align="left">
                  {row.payerWithName.name}
                </TableCell>
                <TableCell>
                  <Table>
                    <TableBody>
                      {
                        row.payees.map((payee) => (
                          <TableRow key={payee.address}>
                            <TableCell className={classes.table}
                              title={payee.address}
                              align="left"
                            >
                              {payee.name}
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default ExpenseGroupExpenseList
