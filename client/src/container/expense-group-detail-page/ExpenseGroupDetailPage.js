import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadExpenseGroupContract,
  loadExpenses,
  loadMembers,
  approve
} from '../../redux/interactions'
import {
  expenseGroupContractSelector,
  expenseGroupMembersSelector,
  expenseGroupExpensesSelector,
  web3Selector,
  accountSelector,
  networkSelector,
  errorSelector,
  loadingSelector,
} from '../../redux/selectors'
import ExpenseGroupMemberList from '../../component/expense-group-member-list/ExpenseGroupMemberList'
import ExpenseGroupDetailToolbar from '../../component/expense-group-detail-toolbar/ExpenseGroupDetailToolbar'
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from '@material-ui/core'

class ExpenseGroupDetailPage extends Component {
  async componentDidMount() {
    await this.initialize()
  }

  async componentDidUpdate(prevProps) {
    await this.initialize(prevProps)
  }

  async initialize(prevProps) {
    const { loading, error, account } = this.props

    if (
      (this.isContractNotLoaded() ||
        this.hasContractChanged() ||
        this.hasNetworkChanged(prevProps)) &&
      !loading &&
      !error &&
      account
    ) {
      this.loadData(this.props)
    }
  }

  isContractNotLoaded() {
    const { web3, contract } = this.props
    return web3 && !contract
  }

  hasContractChanged() {
    const { web3, contract } = this.props
    const address = this.props.match.params.contractAddress
    return web3 && contract && address !== contract.options.address
  }

  hasNetworkChanged(prevProps) {
    const { networkId } = this.props
    return prevProps && prevProps.networkId && prevProps.networkId !== networkId
  }

  async loadData(props) {
    try {
      let { contract } = props
      const { dispatch, web3, account } = props
      const address = props.match.params.contractAddress
      contract = await loadExpenseGroupContract(dispatch, web3, address)
      await loadMembers(dispatch, contract)
      await loadExpenses(dispatch, contract, account)
    } catch (error) {
      console.log(error)
    }
  }
  
  render() {
    const { members, expenses, contract, loading, web3, account, dispatch } = this.props
    const address = this.props.match.params.contractAddress

    const approveExpense = async (expense) => {
      try {
        await approve(dispatch, contract, account, expense.identifier, !expense.approved)
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <Grid container style={{ margin: 15 }}>
        <Grid item xs={10}>
          <ExpenseGroupDetailToolbar
            address={address}
          ></ExpenseGroupDetailToolbar>
        </Grid>
        {!loading && (
          <Grid item xs={10}>
            <ExpenseGroupMemberList members={members}></ExpenseGroupMemberList>
          </Grid>
        )}
        {!loading && (
          <Grid item xs={10}>
            {expenses && expenses.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={9}>Expenses</TableCell>
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
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((row) => (
                    <TableRow key={row.identifier}>
                      <TableCell align="left">{row.identifier}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.amount}</TableCell>
                      <TableCell align="left">{row.valueDate}</TableCell>
                      <TableCell align="left">{row.creationDate}</TableCell>
                      <TableCell align="left">
                        {row.approved ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell align="left">{row.approvals}</TableCell>
                      <TableCell title={row.payerWithName.address} align="left">
                        {row.payerWithName.name}
                      </TableCell>
                      <TableCell>
                        <Table>
                          <TableBody>
                            {row.payees.map((payee) => (
                              <TableRow key={payee.address}>
                                <TableCell title={payee.address} align="left">
                                  {payee.name}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => approveExpense(row)}
                          disabled={!(web3 && contract)}
                          variant="outlined"
                          color="inherit"
                        >
                          { row.approved ? "Unapprove" : "Approve" }
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Grid>
        )}
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    contract: expenseGroupContractSelector(state),
    web3: web3Selector(state),
    account: accountSelector(state),
    members: expenseGroupMembersSelector(state),
    expenses: expenseGroupExpensesSelector(state),
    networkId: networkSelector(state),
    loading: loadingSelector(state),
    error: errorSelector(state),
  }
}

export default withRouter(connect(mapStateToProps)(ExpenseGroupDetailPage))
