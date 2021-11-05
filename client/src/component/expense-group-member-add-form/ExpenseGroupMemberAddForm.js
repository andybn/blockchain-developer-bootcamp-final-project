import React from "react";
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button
} from "@material-ui/core";
import validationsForm from "./validationSchema";
import { withFormik } from "formik";
import * as yup from "yup";

const styles = () => ({
  card: {
    maxWidth: 420,
    marginTop: 50
  },
  container: {
    display: "Flex",
    justifyContent: "center"
  },
  actions: {
    float: "right"
  }
});

const form = props => {
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
    isWalletConnected
  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>          
            <TextField
              id="name"
              label="Member name"
              autoFocus={true}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.name ? errors.name : ""}
              error={touched.name && Boolean(errors.name)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="address"
              label="External account address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.address ? errors.address : ""}
              error={touched.address && Boolean(errors.address)}
              margin="dense"
              variant="outlined"
              fullWidth
            />         
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting || !isWalletConnected}>
              SUBMIT
            </Button>
            <Button color="secondary" onClick={handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const ExpenseGroupMemberForm = withFormik({
  mapPropsToValues: ({   
    name,
    address
  }) => {
    return {
      name: name || "",
      address: address || ""
    };
  },

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: async (values, { props, setSubmitting }) => {
      await props.onSubmit(values);
      setSubmitting(false);
  }
})(form);

export default withStyles(styles)(ExpenseGroupMemberForm);