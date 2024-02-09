import React from 'react';
import {Button, Paper, Stack, TextField, Typography} from '@mui/material';
import Password from '../components/Password';

const SignupPage = () => {
    const signupFormStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    };
    const paperStyles = {
        borderRadius: '0.5rem',
        padding: '1rem'
    };

    return (
        <div style={signupFormStyles}>
            <Paper sx={paperStyles} elevation={4}>
                <Stack spacing={2}>
                    <Typography variant='h4' sx={{textAlign: 'center'}}><strong>Sign Up</strong></Typography>
                    <Typography sx={{textAlign: 'center'}}>Enter your information to create an account</Typography>
                    <TextField color='black' label="First Name" />
                    <TextField color='black' label="Last Name" />
                    <TextField color='black' label="Email" />
                    <Password />
                    <Button fullWidth variant='contained' sx={{background: 'black', color: 'white', '&:hover': {background: 'black'}}}>Sign Up</Button>
                    <Typography sx={{textAlign: 'center'}}>Already have an accoun?Login</Typography>
                </Stack>
            </Paper>
        </div>
    );
};

export default SignupPage;
