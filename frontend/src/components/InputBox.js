import {TextField} from '@mui/material';
import React from 'react';

const InputBox = ({label, onChange}) => {
  return (
    <TextField
      color='black'
      label={label}
      onChange={onChange} />
  );
};

export default InputBox;
