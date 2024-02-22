import {Avatar, Box, Button, Paper, Stack, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import axios from 'axios';
import {useSearchParams, useNavigate} from 'react-router-dom';
import VerifyUser from '../components/VerifyUser';
import Heading from '../components/Heading';

const MoneyTransfer = () => {
    const modalPageStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#EEEEEE'
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
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const updateAmount = (e) => {
        setIsError(false);
        setErrorMessage('');
        setAmount(e.target.value);
    };

    const transfer = async () => {
        const user = await VerifyUser();
        if (user && amount > 0 && (amount+'').split('.')[1] ? (amount + '').split('.')[1].length <= 2 : true) {
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
            catch (error) {
                // console.log(error);
                // if (error.response.data.message === 'Insufficient balance') {
                    console.log(error);
                    setIsError(true);
                    setErrorMessage(error.response.data.message)
                // }
                // navigate('/dashboard');
            }
        }
        else if (user == null) {
            navigate('/signin');
        }
        else {
            setIsError(true);
            setErrorMessage('Invalid Inputs');
        }
    };

    return (
        <div style={modalPageStyles}>
            <Stack component={Paper} elevation={7} spacing={2} style={modalStyles}>
                <Heading heading={'Send Money'}/>

                <Box style={userDetailsStyles}>
                    <Avatar sx={{background: '#65B741'}}>{searchParams.get('name')[0]}</Avatar>
                    <Typography variant='h5' sx={{textAlign: 'center'}}>{searchParams.get('name')}</Typography>
                </Box>
                <TextField error={isError} color='black' label="Enter amount (in Rs)" onChange={updateAmount} helperText={errorMessage} />
                <Button variant='contained' color='green' sx={{color: 'white'}} onClick={transfer}>Initiate Transfer</Button>
            </Stack>
        </div>
    );
};

export default MoneyTransfer;
