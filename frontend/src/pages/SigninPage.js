import {Button, Paper, Stack, TextField, Typography} from '@mui/material';
import React from 'react';
import Password from '../components/Password';

const SigninPage = () => {

  const signinFormStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    marginTop: '7rem',
    height: '100vh'
  };
  const paperStyles = {
    borderRadius: '0.5rem',
    padding: '1rem'
  };

  return (
    <div style={signinFormStyles}>
      <Paper elevation={4} sx={paperStyles}>
        <Stack spacing={2}>
          <Typography variant='h4' sx={{textAlign: 'center'}}><strong>Sign In</strong></Typography>
          <Typography sx={{textAlign: 'center'}}>Enter your credentials to access your account</Typography>
          <TextField color='black' label="Email" />
          <Password />
          <Button fullWidth variant='contained' sx={{background: 'black', color: 'white', '&:hover': {background: 'black'}}}>Sign In</Button>
          <Typography sx={{textAlign: 'center'}}>Don't have an account? Sign Up</Typography>
        </Stack>
      </Paper>
    </div>
  );
};

export default SigninPage;
