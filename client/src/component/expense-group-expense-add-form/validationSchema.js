import * as yup from "yup";

const validationsForm = {
  name: yup.string().required("Required")
  .max(50, "Name length cannot be greater than 50"),
  amount: yup.number().required("Required"), 
  valueDate: yup.date().required("Required"), 
};

export default validationsForm;
