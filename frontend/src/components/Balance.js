import {Typography} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import VerifyUser from './VerifyUser';
import {useNavigate} from 'react-router-dom';

const Balance = () => {

  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  const fetchBalance = async () => {
    const user = await VerifyUser();
    if (!user) {
      navigate('/signin');
      return;
    }
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div sx={{margin: '1rem 0'}}>
      <Typography sx={{margin: '1rem 0'}}>Your Balance Rs.{balance}</Typography>
    </div>
  );
};

export default Balance;
