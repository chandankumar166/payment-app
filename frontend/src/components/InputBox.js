import {TextField} from '@mui/material';
import React from 'react';

const InputBox = ({label, onChange, error, errorMessage}) => {
  return (
    <TextField
      color='black'
      label={label}
      onChange={onChange}
      error={error}
      helperText={errorMessage} />
  );
};

export default InputBox;
