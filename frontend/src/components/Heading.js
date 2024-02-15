import {Typography} from '@mui/material';
import React from 'react';

const Heading = ({heading}) => {
  return (
      <Typography variant='h4' sx={{textAlign: 'center'}}><strong>{heading}</strong></Typography>
  );
}

export default Heading;
