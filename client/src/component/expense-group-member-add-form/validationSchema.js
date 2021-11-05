import Web3 from "web3";
import * as yup from "yup";

const validationsForm = {
  name: yup.string().required("Required"),
  address: yup.string().required("Required").test(
    "address-check",
    "Ethereum address account format is incorrect",
    value => {      
      return Web3.utils.isAddress(value);
    }
  )
};

export default validationsForm;
