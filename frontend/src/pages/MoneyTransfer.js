import {Avatar, Box, Button, Paper, Stack, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import axios from 'axios';
import {useSearchParams, useNavigate} from 'react-router-dom';

const MoneyTransfer = () => {
    const modalPageStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };
    const modalStyles = {
        padding: '2rem',
        width: '20rem'
    };
    const userDetailsStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        margin: '3rem 0 0',
    };

    const [amount, setAmount] = useState(0);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const updateAmount = (e) => {
        setAmount(e.target.value);
    };

    const transfer = async () => {
        try {
            await axios.post('http://localhost:3000/api/v1/account/transfer', {
                amount,
                to: searchParams.get('id')
            },
                {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
            navigate('/dashboard');
        }
        catch(error) {
            navigate('/dashboard')
        }
    };

    return (
        <div style={modalPageStyles}>
            <Stack component={Paper} elevation={7} spacing={2} style={modalStyles}>
                <h1 style={{textAlign: 'center'}}>Send Money</h1>
                <Box style={userDetailsStyles}>
                    <Avatar sx={{background: 'green'}}>U1</Avatar>
                    <Typography variant='h5' sx={{textAlign: 'center'}}><strong>{searchParams.get('name')}</strong></Typography>
                </Box>
                <TextField color='black' label="Enter amount" onChange={updateAmount} />
                <Button variant='contained' color='success' onClick={transfer}>Initiate Transfer</Button>
            </Stack>
        </div>
    );
};

export default MoneyTransfer;
