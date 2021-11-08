import React from 'react'

const CustomCheckbox = ({ field, form, label, ...rest }) => {
 
    const { name, value: formikValue } = field;
    const { setFieldValue } = form;
  
    const handleChange = event => {
      const values = formikValue || [];
      const index = values.indexOf(rest.value);
      if (index === -1) {
        values.push(rest.value);
      } else {
        values.splice(index, 1);
      }
      setFieldValue(name, values);
    };
  
    return (
      <label>
        <input
          type="checkbox"
          onChange={handleChange}          
          {...rest}
        />
        <span>{label}</span>
      </label>
    );
  };

  export default CustomCheckbox;