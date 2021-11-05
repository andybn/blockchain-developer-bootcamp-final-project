import * as yup from "yup";

const validationsForm = {
  name: yup.string().required("Required")
  .max(50, "Name length cannot be greater than 50"),
  title: yup.string().required("Required")
  .max(80, "Name length cannot be greater than 80"),
};

export default validationsForm;
