import * as yup from "yup";

const validationsForm = {
  name: yup.string().required("Required")
  .max(50, "Name length cannot be greater than 50"),
  amount: yup.number().required("Required")
   .typeError("Amount must be a number")
   .positive("Amount must be a positive number")
   .min(1,"Amount must be greater than zero"), 
  valueDate: yup.date().required("Required")
  .typeError("Value date must be a date")
};

export default validationsForm;
