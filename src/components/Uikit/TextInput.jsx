import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = (props) => {
  return (
    <TextField
      fullWidth={props.fullWidth}
      label={props.label}
      multiline={props.multiline}
      required={props.required}
      value={props.value}
      rows={props.rows}
      type={props.type}
      onChange={props.onChange}
    />
  );
};

export default TextInput;
