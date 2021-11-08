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
import { withFormik } from 'formik'
import * as yup from 'yup'

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
  } = props

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography>New expense group</Typography>
            <TextField
              id="name"
              label="Owner name"
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
              id="title"
              label="Expense group title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.title ? errors.title : ''}
              error={touched.title && Boolean(errors.title)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
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

const ExpenseGroupForm = withFormik({
  mapPropsToValues: ({ name, title }) => {
    return {
      name: name || '',
      title: title || '',
    }
  },

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: async (values, { props, setSubmitting }) => {
    await props.onSubmit(values)
    setSubmitting(false)
  },
})(form)

export default withStyles(styles)(ExpenseGroupForm)
