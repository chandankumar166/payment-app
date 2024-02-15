import {Typography} from '@mui/material';
import React from 'react';

const Subheading = ({text}) => {
  return (
      <Typography sx={{textAlign: 'center'}}>{text}</Typography>
  );
}

export default Subheading;
