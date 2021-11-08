import React from 'react'
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
} from '@material-ui/core'
import validationsForm from './validationSchema'
import { withFormik, Field } from 'formik'
import * as yup from 'yup'
import { getFormattedDate } from '../../common/utils'
import CustomCheckbox from '../custom-check-box/CustomCheckBox'

const styles = () => ({
  card: {
    maxWidth: 420,
    marginTop: 50,
  },
  container: {
    display: 'Flex',
    justifyContent: 'center',
  },
  actions: {
    float: 'right',
  },
  checkBoxGroup: {
    marginTop: '5px'
  }
})

const form = (props) => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isWalletConnected,
    members,
  } = props

  const defaults = {
    valueDate: getFormattedDate(new Date()),
  }

  const availableMembers = members ? members : []

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography>New expense</Typography>
            <TextField
              id="name"
              label="Expense name"
              autoFocus={true}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.name ? errors.name : ''}
              error={touched.name && Boolean(errors.name)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="amount"
              label="Amount"
              type="number"
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.amount ? errors.amount : ''}
              error={touched.amount && Boolean(errors.amount)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="valueDate"
              label="Value date"
              defaultValue={defaults.valueDate}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.valueDate ? errors.valueDate : ''}
              error={touched.valueDate && Boolean(errors.valueDate)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <div className={classes.checkBoxGroup}>
              <Typography>Members involved:</Typography>
              {availableMembers.map((member) => (
                <div key={member.memberAddress} className={classes.checkBoxGroup}>
                  <Field
                    component={CustomCheckbox}                    
                    name="members"
                    value={member.memberAddress}
                    label={member.name}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              type="submit"
              color="primary"
              disabled={isSubmitting || !isWalletConnected}
            >
              SUBMIT
            </Button>
            <Button color="secondary" onClick={handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  )
}

const ExpenseGroupExpenseAddForm = withFormik({
  mapPropsToValues: ({ name, amount, valueDate }) => {
    return {
      name: name || '',
      amount: amount || '',
      valueDate: valueDate || getFormattedDate(new Date())
    }
  },

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: async (values, { props, setSubmitting }) => {
    await props.onSubmit(values)
    setSubmitting(false)
  },
})(form)

export default withStyles(styles)(ExpenseGroupExpenseAddForm)
