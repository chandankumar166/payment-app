import {Typography} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

const Balance = () => {

  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    const authHeader = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
      headers: {
        Authorization: authHeader
      }
    });
    setBalance(response.data.balance);
  };

  useEffect(() => {
    fetchBalance();
  }, []);
  return (
    <div sx={{margin: '1rem 0'}}>
      <Typography sx={{margin: '1rem 0'}}>Your Balance Rs.{balance}</Typography>
    </div>
  );
};

export default Balance;
