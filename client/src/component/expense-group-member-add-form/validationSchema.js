import Web3 from "web3";
import * as yup from "yup";

const validationsForm = {
  name: yup.string().required("Required")
  .max(50, "Name length cannot be greater than 50"),
  address: yup.string().required("Required").test(
    "address-check",
    "Ethereum address account format is incorrect",
    value => {      
      return Web3 ? Web3.utils.isAddress(value) : false
    }
  )
};

export default validationsForm;
