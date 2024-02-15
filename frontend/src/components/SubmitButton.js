import {Button} from '@mui/material';
import React from 'react';

const SubmitButton = ({buttonText, onClick}) => {
  const buttonStyles = {
    background: 'black', color: 'white', '&:hover': {background: 'black'}
  };
  return (
    <Button
      onClick={onClick}
      fullWidth
      variant='contained'
      style={buttonStyles}
    >
      {buttonText}
    </Button>
  );
};

export default SubmitButton;
